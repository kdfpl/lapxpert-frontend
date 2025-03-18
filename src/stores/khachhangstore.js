import { defineStore } from "pinia";
import KhachHangService from "@/api/service/KhachHangService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";

export const useKhachHangStore = defineStore("khachHang", {
  state: () => ({
    khachHangList: [],
    currentPage: 1,
    itemsPerPage: 5,
    search: "",
    statusFilter: "all",
    showSuggestions: false,
    diaChiMacDinh: {},
    khachHang: { hoTen: "", email: "", sdt: "" },
    diaChiList: [],
    cityData: [],
    citis: [],
    errorMessage: "",
    initialized: false,
  }),

  getters: {
    filteredData: (state) => {
      if (!state.initialized) return [];

      const searchTerm = state.search.toLowerCase();
      const statusFilter = state.statusFilter;

      return state.khachHangList.filter((kh) => {
        const diaChi = state.diaChiMacDinh[kh.id] || {};

        const matchSearch = [
          kh.hoTen,
          kh.email,
          kh.sdt,
          kh.maKhachHang,
          diaChi.soNhaDuong,
          diaChi.phuongXa,
          diaChi.quanHuyen,
          diaChi.thanhPho,
        ].some((field) => field?.toLowerCase().includes(searchTerm));

        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? kh.tinhTrang
            : !kh.tinhTrang;

        return matchSearch && matchStatus;
      });
    },

    searchSuggestions: (state) => {
      if (!state.search || state.search.length < 2) return [];

      const searchTerm = state.search.toLowerCase();
      const suggestions = new Set();

      const fieldMap = new Map();

      state.khachHangList.forEach((kh) => {
        const diaChi = state.diaChiMacDinh[kh.id] || {};

        const fields = [
          { value: kh.hoTen, label: `${kh.hoTen}` },
          { value: kh.email, label: `${kh.email}` },
          { value: kh.sdt, label: `${kh.sdt}` },
          { value: kh.maKhachHang, label: `${kh.maKhachHang}` },
          { value: diaChi.soNhaDuong, label: `${diaChi.soNhaDuong}` },
          { value: diaChi.phuongXa, label: `${diaChi.phuongXa}` },
          { value: diaChi.quanHuyen, label: `${diaChi.quanHuyen}` },
          { value: diaChi.thanhPho, label: `${diaChi.thanhPho}` },
        ];

        fields.forEach(({ value, label }) => {
          if (value?.toLowerCase().includes(searchTerm)) {
            if (!fieldMap.has(value)) {
              fieldMap.set(value, label);
              suggestions.add(label);
            }
          }
        });
      });

      return Array.from(suggestions).slice(0, 10);
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    },

    paginatedData: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredData.slice(start, start + state.itemsPerPage);
    },

    diaChiHienThi: (state) => state.diaChiList.filter((dc) => dc.tinhTrang),

    thongTinHopLe: (state) => {
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const isValidPhone = (sdt) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(sdt);
      };

      return (
        state.khachHang.hoTen &&
        isValidEmail(state.khachHang.email) &&
        isValidPhone(state.khachHang.sdt) &&
        state.diaChiHienThi.length > 0 &&
        state.diaChiHienThi.every(
          (dc) => dc.thanhPho && dc.quanHuyen && dc.phuongXa && dc.soNhaDuong
        )
      );
    },
  },

  actions: {
    async initialize() {
      if (!this.initialized) {
        await this.fetchKhachHang();
        this.initialized = true;
      }
    },

    toggleSuggestions(show) {
      this.showSuggestions = show;
    },

    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.currentPage = 1;
      this.toggleSuggestions(false);
    },

    setStatusFilter(filter) {
      this.statusFilter = filter;
      this.currentPage = 1;
    },

    createNewAddress(isDefault = false) {
      return {
        thanhPho: "",
        quanHuyen: "",
        phuongXa: "",
        soNhaDuong: "",
        macDinh: isDefault,
        tinhTrang: true,
        availableDistricts: [],
        availableWards: [],
      };
    },

    async fetchCityData() {
      try {
        const cityResponse = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        this.cityData = cityResponse.data;
        this.citis = this.cityData.map((city) => city.Name);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thành phố:", error);
      }
    },

    async fetchKhachHangById(customerId) {
      try {
        const response = await KhachHangService.getCustomerById(customerId);
        if (response.data) {
          this.khachHang = {
            hoTen: response.data.hoTen || "",
            email: response.data.email || "",
            sdt: response.data.sdt || "",
          };

          this.diaChiList = response.data.diaChiList
            ?.filter((dc) => dc.tinhTrang)
            .map((dc) => ({
              ...dc,
              availableDistricts: [],
              availableWards: [],
            })) || [this.createNewAddress(true)];

          this.updateDistrictsAndWards();
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
      }
    },

    updateDistrictsAndWards() {
      this.diaChiList.forEach((dc) => {
        const city = this.cityData.find((c) => c.Name === dc.thanhPho);
        dc.availableDistricts = city ? city.Districts.map((d) => d.Name) : [];
        if (dc.quanHuyen) {
          const district = city?.Districts.find((d) => d.Name === dc.quanHuyen);
          dc.availableWards = district ? district.Wards.map((w) => w.Name) : [];
        } else {
          dc.availableWards = [];
        }
      });
    },

    addDiaChi() {
      this.diaChiList.push(this.createNewAddress(false));
    },

    removeDiaChi(index) {
      if (this.diaChiList.length === 1) {
        alert("Phải có ít nhất một địa chỉ hợp lệ!");
        return;
      }

      const removedAddress = this.diaChiList[index];

      this.diaChiList.splice(index, 1);

      if (removedAddress.macDinh && this.diaChiList.length > 0) {
        this.diaChiList[0].macDinh = true;
      }
    },

    setMacDinh(index) {
      if (!this.diaChiList[index].tinhTrang) return;
      this.diaChiList.forEach((dc, i) => {
        dc.macDinh = i === index;
      });
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    isValidPhone(sdt) {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(sdt);
    },

    async validateAndProceed(nextTab, customerId) {
      this.errorMessage = "";

      if (nextTab === "panel2") {
        const errors = [];

        if (!this.khachHang.hoTen?.trim()) {
          errors.push("Vui lòng nhập họ tên!");
        }

        if (!this.khachHang.email?.trim()) {
          errors.push("Vui lòng nhập email!");
        } else if (!this.isValidEmail(this.khachHang.email)) {
          errors.push("Email không đúng định dạng!");
        }

        if (!this.khachHang.sdt?.trim()) {
          errors.push("Vui lòng nhập số điện thoại!");
        } else if (!this.isValidPhone(this.khachHang.sdt)) {
          errors.push("Số điện thoại phải có 10 chữ số!");
        }

        if (errors.length > 0) {
          this.errorMessage = errors.join("\n");
          alert(this.errorMessage); // Hiển thị lỗi bằng alert
          return false;
        }

        try {
          const response = await KhachHangService.checkDuplicate(
            this.khachHang.email,
            this.khachHang.sdt,
            customerId || 0
          );

          if (response?.data) {
            this.errorMessage = "Email hoặc số điện thoại đã tồn tại!";
            alert(this.errorMessage); // Hiển thị lỗi bằng alert
            return false;
          }
        } catch (error) {
          console.error("Lỗi kiểm tra trùng lặp:", error);
          this.errorMessage = "Lỗi khi kiểm tra trùng lặp!";
          alert(this.errorMessage); // Hiển thị lỗi bằng alert
          return false;
        }
      }

      if (nextTab === "panel3") {
        const errors = [];

        if (this.diaChiHienThi.length === 0) {
          errors.push("Vui lòng nhập ít nhất một địa chỉ!");
        } else {
          this.diaChiHienThi.forEach((dc, index) => {
            if (!dc.thanhPho?.trim()) {
              errors.push(`Địa chỉ ${index + 1}: Thiếu thành phố!`);
            }
            if (!dc.quanHuyen?.trim()) {
              errors.push(`Địa chỉ ${index + 1}: Thiếu quận/huyện!`);
            }
            if (!dc.phuongXa?.trim()) {
              errors.push(`Địa chỉ ${index + 1}: Thiếu phường/xã!`);
            }
            if (!dc.soNhaDuong?.trim()) {
              errors.push(`Địa chỉ ${index + 1}: Thiếu số nhà/đường!`);
            }
          });
        }

        if (errors.length > 0) {
          this.errorMessage = errors.join("\n");
          alert(this.errorMessage); // Hiển thị lỗi bằng alert
          return false;
        }
      }

      return true;
    },

    async submitForm(customerId, router) {
      if (!this.thongTinHopLe) {
        this.errorMessage =
          "Vui lòng nhập đầy đủ thông tin khách hàng và ít nhất một địa chỉ!";
        alert(this.errorMessage); // Hiển thị lỗi bằng alert
        return false;
      }

      try {
        const customerData = {
          ...this.khachHang,
          diaChiList: this.diaChiList,
        };

        if (customerId) {
          await KhachHangService.updateCustomer(customerId, customerData);
          this.errorMessage = "Cập nhật khách hàng thành công!";
        } else {
          await KhachHangService.addCustomer(customerData);
          this.errorMessage = "Thêm khách hàng thành công!";
        }
        await this.fetchKhachHang();
        router.push("/admin/khach-hang");
        
        return true;
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        this.errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
        alert(this.errorMessage); // Hiển thị lỗi bằng alert
        return false;
      }
    },

    async getDiaChiMacDinh(khachHangId) {
      try {
        const response = await KhachHangService.getAddressrById(khachHangId);
        if (!response.data) return {};

        return {
          soNhaDuong: response.data.soNhaDuong || "",
          phuongXa: response.data.phuongXa || "",
          quanHuyen: response.data.quanHuyen || "",
          thanhPho: response.data.thanhPho || "",
        };
      } catch (error) {
        console.error("Lỗi khi tải địa chỉ:", error);
        return {};
      }
    },

    async fetchKhachHang() {
      try {
        const data = await KhachHangService.getAllCustomers();
        if (!Array.isArray(data)) return;

        this.khachHangList = data;

        const addressPromises = data.map(async (kh) => ({
          id: kh.id,
          address: await this.getDiaChiMacDinh(kh.id),
        }));

        const addresses = await Promise.all(addressPromises);
        addresses.forEach(({ id, address }) => {
          this.diaChiMacDinh[id] = address;
        });

        this.initialized = true;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
        throw error;
      }
    },

    async deleteKhachHang(kh) {
      if (!confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;
      try {
        if (kh.tinhTrang) {
          await KhachHangService.deleteCustomer(kh.id);
          await this.fetchKhachHang();
        } else {
          alert("Khách hàng vốn đã không còn hoạt động");
        }
      } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
        throw error;
      }
    },

    async reviveKhachHang(kh) {
      if (!confirm("Bạn có chắc chắn muốn khôi phục khách hàng này?")) return;
      try {
        if (kh.tinhTrang) {
          alert("Khách hàng vẫn hoạt động!");
        } else {
          kh.tinhTrang = true;
          await KhachHangService.updateCustomer(kh.id, kh);
          await this.fetchKhachHang();
        }
      } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
        throw error;
      }
    },

    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Khách Hàng");

      worksheet.addRow(["STT", "Mã KH", "Họ tên", "Email", "SĐT", "Địa chỉ"]);

      this.khachHangList.forEach((kh, index) => {
        worksheet.addRow([
          index + 1,
          kh.maKhachHang,
          kh.hoTen,
          kh.email,
          kh.sdt,
          this.diaChiMacDinh[kh.id] || "Chưa có địa chỉ",
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "DanhSachKhachHang.xlsx");
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },
  },
});