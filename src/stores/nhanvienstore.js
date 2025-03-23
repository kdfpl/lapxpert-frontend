import { defineStore } from "pinia";
import NhanVienService from "@/api/service/NhanVienService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";

export const useNhanVienStore = defineStore("nhanVien", {
  state: () => ({
    nhanVienList: [],
    currentPage: 1,
    itemsPerPage: 5,
    search: "",
    statusFilter: "all",
    showSuggestions: false,
    diaChiMacDinh: {},
    nhanVien: { hoTen: "", email: "", sdt: "", chucVu: null },
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

      return state.nhanVienList.filter((nv) => {
        const diaChi = state.diaChiMacDinh[nv.id] || {};

        const matchSearch = [
          nv.hoTen,
          nv.email,
          nv.sdt,
          nv.maNhanVien,
          nv.chucVu?.tenChucVu,
          diaChi.soNhaDuong,
          diaChi.phuongXa,
          diaChi.quanHuyen,
          diaChi.thanhPho,
        ].some((field) => field?.toLowerCase().includes(searchTerm));

        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? nv.tinhTrang
            : !nv.tinhTrang;

        return matchSearch && matchStatus;
      });
    },

    searchSuggestions: (state) => {
      if (!state.search || state.search.length < 2) return [];

      const searchTerm = state.search.toLowerCase();
      const suggestions = new Set();

      const fieldMap = new Map();

      state.nhanVienList.forEach((nv) => {
        const diaChi = state.diaChiMacDinh[nv.id] || {};

        const fields = [
          { value: nv.hoTen, label: `${nv.hoTen}` },
          { value: nv.email, label: `${nv.email}` },
          { value: nv.sdt, label: `${nv.sdt}` },
          { value: nv.chucVu?.tenChucVu, label: `${nv.chucVu?.tenChucVu}` },
          { value: nv.maNhanVien, label: `${nv.maNhanVien}` },
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
        state.nhanVien.hoTen &&
        isValidEmail(state.nhanVien.email) &&
        isValidPhone(state.nhanVien.sdt) &&
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
        await this.fetchNhanVien();
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

    async fetchNhanVienById(staffId) {
      try {
        console.log("Fetching staff ID:", staffId); // Kiểm tra ID gửi đi
        const response = await NhanVienService.getStaffById(staffId);
        console.log("Response data:", response.data); // Kiểm tra dữ liệu trả về
    
        if (response.data) {
          this.nhanVien = {
            hoTen: response.data.hoTen || "",
            email: response.data.email || "",
            sdt: response.data.sdt || "",
            chucVu: response.data.chucVu || null,
          };
    
          this.diaChiList = response.data.diaChiList
            ?.filter((dc) => dc.tinhTrang)
            .map((dc) => ({
              ...dc,
              availableDistricts: [],
              availableWards: [],
            })) || [this.createNewAddress(true)];
    
          this.updateDistrictsAndWards();
        } else {
          console.warn("API không trả về dữ liệu");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu nhân viên:", error);
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

    async validateAndProceed(nextTab, staffId) {
      this.errorMessage = "";

      if (nextTab === "panel2") {
        const errors = [];

        if (!this.nhanVien.hoTen?.trim()) {
          errors.push("Vui lòng nhập họ tên!");
        }

        if (!this.nhanVien.email?.trim()) {
          errors.push("Vui lòng nhập email!");
        } else if (!this.isValidEmail(this.nhanVien.email)) {
          errors.push("Email không đúng định dạng!");
        }

        if (!this.nhanVien.sdt?.trim()) {
          errors.push("Vui lòng nhập số điện thoại!");
        } else if (!this.isValidPhone(this.nhanVien.sdt)) {
          errors.push("Số điện thoại phải có 10 chữ số!");
        }

        if (errors.length > 0) {
          this.errorMessage = errors.join("\n");
          alert(this.errorMessage); // Hiển thị lỗi bằng alert
          return false;
        }

        try {
          const response = await NhanVienService.checkDuplicate(
            this.nhanVien.email,
            this.nhanVien.sdt,
            staffId || 0
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

    async submitForm(staffId, router) {
      if (!this.thongTinHopLe) {
        this.errorMessage =
          "Vui lòng nhập đầy đủ thông tin nhân viên và ít nhất một địa chỉ!";
        alert(this.errorMessage); // Hiển thị lỗi bằng alert
        return false;
      }

      try {
        const staffData = {
          ...this.nhanVien,
          diaChiList: this.diaChiList,
        };

        if (staffId) {
          await NhanVienService.updateStaff(staffId, staffData);
          this.errorMessage = "Cập nhật nhân viên thành công!";
        } else {
          await NhanVienService.addStaff(staffData);
          this.errorMessage = "Thêm nhân viên thành công!";
        }
        await this.fetchNhanVien();
        router.push("/admin/nhan-vien");
        
        return true;
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        this.errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
        alert(this.errorMessage); // Hiển thị lỗi bằng alert
        return false;
      }
    },

    async getDiaChiMacDinh(nhanVienId) {
      try {
        const response = await NhanVienService.getAddressById(nhanVienId);
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

    async fetchNhanVien() {
      try {
        const data = await NhanVienService.getAllStaff();
        if (!Array.isArray(data)) return;

        this.nhanVienList = data;

        const addressPromises = data.map(async (nv) => ({
          id: nv.id,
          address: await this.getDiaChiMacDinh(nv.id),
        }));

        const addresses = await Promise.all(addressPromises);
        addresses.forEach(({ id, address }) => {
          this.diaChiMacDinh[id] = address;
        });

        this.initialized = true;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
        throw error;
      }
    },

    async deleteNhanVien(nv) {
      if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
      try {
        if (nv.tinhTrang) {
          await NhanVienService.deleteStaff(nv.id);
          await this.fetchNhanVien();
        } else {
          alert("Nhân viên vốn đã không còn hoạt động");
        }
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        throw error;
      }
    },

    async reviveNhanVien(nv) {
      if (!confirm("Bạn có chắc chắn muốn khôi phục nhân viên này?")) return;
      try {
        if (nv.tinhTrang) {
          alert("Nhân viên vẫn hoạt động!");
        } else {
          nv.tinhTrang = true;
          await NhanVienService.updateStaff(nv.id, nv);
          await this.fetchNhanVien();
        }
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        throw error;
      }
    },

    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Nhân Viên");

      worksheet.addRow(["STT", "Mã NV", "Họ tên", "Email", "SĐT","Chức vụ", "Địa chỉ"]);

      this.nhanVienList.forEach((nv, index) => {
        worksheet.addRow([
          index + 1,
          nv.maNhanVien,
          nv.hoTen,
          nv.email,
          nv.sdt,
          nv.chucVu?.tenChucVu || "",
          this.diaChiMacDinh[nv.id] || "Chưa có địa chỉ",
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "DanhSachNhanVien.xlsx");
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