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
    startDate: "",
    endDate: "",
    orderCondition: 0,
    showSuggestions: false,
  }),

  getters: {
    maxOrderCondition: (state) => {
      return Math.max(...state.PhieuGiamGiaList.map(item => item.giaTriDonHangToiThieu), 0);
    },
  
    filteredData: (state) => {
      const searchTerm = state.search.toLowerCase();
      return state.PhieuGiamGiaList.filter((phieu) => {
        const matchSearch = [phieu.maPhieuGiamGia, phieu.soLuong, phieu.giaTriDonHangToiThieu]
          .some((field) => String(field)?.toLowerCase().includes(searchTerm));
    
        const matchStatus = state.statusFilter === "all" || phieu.trangThai === state.statusFilter;
    
        const ngayBatDau = new Date(phieu.thoiGianBatDau);
        const ngayKetThuc = new Date(phieu.thoiGianKetThuc);
        const startDate = state.startDate ? new Date(state.startDate) : null;
        const endDate = state.endDate ? new Date(state.endDate) : null;
    
        const startDateMatch = !startDate || ngayBatDau >= startDate;
        const endDateMatch = !endDate || ngayKetThuc <= endDate;
    
        // Điều kiện lọc theo giá trị đơn hàng tối thiểu
        const matchOrderCondition = !state.orderCondition || phieu.giaTriDonHangToiThieu >= state.orderCondition;
    
        return matchSearch && matchStatus && startDateMatch && endDateMatch && matchOrderCondition;
      });
    },
    searchSuggestions: (state) => {
      if (!state.search || state.search.length < 2) return [];

      const suggestions = new Set();
      const searchTerm = state.search.toLowerCase();

      state.PhieuGiamGiaList.forEach((phieu) => {
        const fieldsToCheck = [phieu.maPhieuGiamGia, phieu.soLuong];

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

    async deletePhieuGiamGia(phieu) {
      try {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa phiếu giảm giá này?");
        if (!confirmDelete) return;
    
        await PhieuGiamGiaService.deleteVoucher(phieu.id);
        await this.fetchPhieuGiamGia();
    
        alert("Xóa thành công");
      } catch (error) {
        console.error("Lỗi khi xóa phiếu giảm giá:", error);
        alert("Xóa thất bại!");
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

      this.filteredData.forEach((phieu, index) => {
        worksheet.addRow([
          index + 1,
          phieu.maPhieuGiamGia,
          phieu.loaiGiamGia ? "Theo phần trăm" : "Theo tiền",
          phieu.giaTriGiam,
          phieu.giaTriDonHangToiThieu,
          phieu.thoiGianBatDau,
          phieu.thoiGianKetThuc,
          phieu.soLuong,
          phieu.trangThai ? "Còn hiệu lực" : "Hết hiệu lực",
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