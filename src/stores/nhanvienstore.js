import { defineStore } from "pinia";
import NhanVienService from "@/api/service/NhanVienService";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const useNhanVienStore = defineStore("nhanVien", {
  state: () => ({
    nhanVienList: [],
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

      return state.nhanVienList.filter((nv) => {
        const matchSearch = [
          nv.maNhanVien,
          nv.hoTen,
          nv.email,
          nv.sdt,
          nv.chucVu?.tenChucVu,
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

      const suggestions = new Set();
      const searchTerm = state.search.toLowerCase();

      state.nhanVienList.forEach((nv) => {
        const fieldsToCheck = [
          nv.maNhanVien,
          nv.hoTen,
          nv.email,
          nv.sdt,
          nv.chucVu?.tenChucVu,
        ];

        fieldsToCheck.forEach((field) => {
          if (field?.toLowerCase().includes(searchTerm)) {
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
        await this.fetchNhanVien();
        this.initialized = true;
      }
    },

    async fetchNhanVien() {
      try {
        const data = await NhanVienService.getAllStaff();
        if (Array.isArray(data)) {
          this.nhanVienList = data;
          this.resetFilters();
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error.message);
        throw error;
      }
    },

    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.currentPage = 1;
    },

    async fetchNhanVien() {
      try {
        const data = await NhanVienService.getAllStaff();
        if (Array.isArray(data)) this.nhanVienList = data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error.message);
        throw error;
      }
    },

    async deleteNhanVien(nv) {
      if (!confirm("Bạn có chắc chắn muốn cho nghỉ nhân viên này?")) return;
      try {
        if (nv.tinhTrang) {
          await NhanVienService.deleteStaff(nv.id);
          await this.fetchNhanVien();
        } else {
          alert("Nhân viên vốn đã nghỉ làm!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        throw error;
      }
    },

    async reviveNhanVien(nv) {
      if (!confirm("Bạn có chắc chắn muốn cho nhân viên này làm lại?")) return;

      try {
        if (!nv.tinhTrang) {
          const updatedNhanVien = { ...nv, tinhTrang: true };
          await NhanVienService.updateStaff(
            updatedNhanVien.id,
            updatedNhanVien
          );
          await this.fetchNhanVien();
        } else {
          alert("Nhân viên vốn đã đang làm!");
        }
      } catch (error) {
        console.error("Lỗi khi sửa nhân viên:", error);
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
      const worksheet = workbook.addWorksheet("Nhân viên");

      worksheet.addRow([
        "STT",
        "Mã NV",
        "Họ tên",
        "Email",
        "SĐT",
        "Chức vụ",
        "Tình trạng",
      ]);

      this.filteredData.forEach((nv, index) => {
        worksheet.addRow([
          index + 1,
          nv.maNhanVien,
          nv.hoTen,
          nv.email,
          nv.sdt,
          nv.chucVu?.tenChucVu || "",
          nv.tinhTrang ? "Đang làm" : "Nghỉ làm",
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "DanhSachNhanVien.xlsx");
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },
  },
});
