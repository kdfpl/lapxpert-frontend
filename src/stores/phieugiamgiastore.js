import { defineStore } from "pinia";
import PhieuGiamGiaService from "@/api/service/PhieuGiamGiaService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const usePhieuGiamGiaStore = defineStore("PhieuGiamGia", {
  state: () => ({
    PhieuGiamGiaList: [],
    currentPage: 1,
    itemsPerPage: 5,
    search: "",
    statusFilter: "all",
    showSuggestions: false,
  }),

  getters: {
    filteredData: (state) => {
      if (!state.initialized) return [];

      const searchTerm = state.search.toLowerCase();
      const statusFilter = state.statusFilter;

      return state.PhieuGiamGiaList.filter((nv) => {
        const matchSearch = [nv.maPhieuGiamGia, nv.soLuong].some((field) =>
          String(field)?.toLowerCase().includes(searchTerm)
        );

        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? nv.trangThai
            : !nv.trangThai;

        return matchSearch && matchStatus;
      });
    },

    searchSuggestions: (state) => {
      if (!state.search || state.search.length < 2) return [];

      const suggestions = new Set();
      const searchTerm = state.search.toLowerCase();

      state.PhieuGiamGiaList.forEach((nv) => {
        const fieldsToCheck = [nv.maPhieuGiamGia, nv.soLuong];

        fieldsToCheck.forEach((field) => {
          if (String(field)?.toLowerCase().includes(searchTerm)) {
            suggestions.add(field);
          }
        });
      });

      return Array.from(suggestions).slice(0, 5);
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    },

    paginatedData: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredData.slice(start, start + state.itemsPerPage);
    },
  },

  actions: {
    toggleSuggestions(show) {
      this.showSuggestions = show;
    },

    async initialize() {
      if (!this.initialized) {
        await this.fetchPhieuGiamGia();
        this.initialized = true;
      }
    },

    async fetchPhieuGiamGia() {
      try {
        const data = await PhieuGiamGiaService.getAllVoucher();
        if (Array.isArray(data)) {
          this.PhieuGiamGiaList = data;
          this.resetFilters();
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phiếu giảm giá:", error.message);
        throw error;
      }
    },

    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.currentPage = 1;
    },

    async fetchPhieuGiamGia() {
      try {
        const data = await PhieuGiamGiaService.getAllVoucher();
        if (Array.isArray(data)) this.PhieuGiamGiaList = data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phiếu giảm giá:", error.message);
        throw error;
      }
    },

    async deletePhieuGiamGia(nv) {
      if (!confirm("Bạn có chắc chắn muốn cho nghỉ phiếu giảm giá này?"))
        return;
      try {
        if (nv.trangThai) {
          await PhieuGiamGiaService.deleteVoucher(nv.id);
          await this.fetchPhieuGiamGia();
        } else {
          alert("phiếu giảm giá vốn đã nghỉ làm!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa phiếu giảm giá:", error);
        throw error;
      }
    },

    async revivePhieuGiamGia(nv) {
      if (!confirm("Bạn có chắc chắn muốn cho phiếu giảm giá này làm lại?"))
        return;

      try {
        if (!nv.trangThai) {
          const updatedPhieuGiamGia = { ...nv, trangThai: true };
          await PhieuGiamGiaService.updateVoucher(
            updatedPhieuGiamGia.id,
            updatedPhieuGiamGia
          );
          await this.fetchPhieuGiamGia();
        } else {
          alert("phiếu giảm giá vốn đã đang làm!");
        }
      } catch (error) {
        console.error("Lỗi khi sửa phiếu giảm giá:", error);
        throw error;
      }
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    setStatusFilter(filter) {
      this.statusFilter = filter;
      this.currentPage = 1;
    },

    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("phiếu giảm giá");

      worksheet.addRow([
        "STT",
        "Mã",
        "Loại",
        "Giá Trị",
        "Điều kiện",
        "Ngày BĐ",
        "Ngày KT",
        "Số lượng",
        "Trạng Thái",
      ]);

      this.filteredData.forEach((nv, index) => {
        worksheet.addRow([
          index + 1,
          nv.maPhieuGiamGia,
          nv.loaiGiamGia ? "Theo phần trăm" : "Theo tiền",
          nv.giaTriGiam,
          nv.giaTriDonHangToiThieu,
          nv.thoiGianBatDau,
          nv.thoiGianKetThuc,
          nv.soLuong,
          nv.trangThai ? "Còn hiệu lực" : "Hết hiệu lực",
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "DanhSachPhieuGiamGia.xlsx");
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },
  },
});
