import { defineStore } from "pinia";
import {
  getAllCpu,
  addCpu,
  updateCpu,
  deleteCpu,
  getCpuById,
} from "../apis/services/spctservice";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const useCpuStore = defineStore("cpu", {
  state: () => ({
    cpuList: [], // Danh sách CPU từ API
    currentPage: 1, // Trang hiện tại
    itemsPerPage: 5, // Số lượng item mỗi trang
    search: "", // Từ khóa tìm kiếm
    statusFilter: "all", // Bộ lọc trạng thái
    showSuggestions: false, // Hiển thị gợi ý tìm kiếm
    initialized: false, // Trạng thái khởi tạo
    cpuData: {
      // Dữ liệu CPU hiện tại
      maCpu: "",
      tenCpu: "",
      hangCpu: "Intel",
      theHeCpu: "",
      soNhan: null,
      soLuong: null,
      xungNhip: null,
      tinhTrang: true,
    },
  }),

  getters: {
    // Lọc dữ liệu dựa trên từ khóa tìm kiếm và bộ lọc trạng thái
    filteredData(state) {
      if (!state.initialized) return [];

      const searchTerm = state.search.toLowerCase();
      const statusFilter = state.statusFilter;

      return state.cpuList.filter((cpu) => {
        const matchSearch = [
          cpu.maCpu,
          cpu.hangCpu,
          cpu.tenCpu,
          cpu.theHeCpu,
          `Nhân: ${cpu.soNhan.toString }`,
          `Luồng: ${cpu.soLuong.toString}`,
          `Xung nhịp: ${cpu.xungNhip.toString} GHz`,
        ].some((field) => field?.toLowerCase().includes(searchTerm));

        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? cpu.tinhTrang
            : !cpu.tinhTrang;

        return matchSearch && matchStatus;
      });
    },

    // Gợi ý tìm kiếm
    searchSuggestions(state) {
      if (!state.search || state.search.length < 2) return [];

      const searchTerm = state.search.toLowerCase();
      const suggestions = new Set();

      const fieldMap = new Map();

      state.cpuList.forEach((cpu) => {
        const fields = [
          { value: cpu.maCpu, label: `${cpu.maCpu}` },
          { value: cpu.hangCpu, label: `${cpu.hangCpu}` },
          { value: cpu.tenCpu, label: `${cpu.tenCpu}` },
          { value: cpu.theHeCpu, label: `${cpu.theHeCpu}` },
          { value: cpu.soNhan?.toString(), label: `Nhân: ${cpu.soNhan}` },
          { value: cpu.soLuong?.toString(), label: `Luồng: ${cpu.soLuong}` },
          {
            value: cpu.xungNhip?.toString(),
            label: `Xung nhịp: ${cpu.xungNhip} GHz`,
          },
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

    // Tính tổng số trang
    totalPages(state) {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    },

    // Dữ liệu phân trang
    paginatedData(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredData.slice(start, start + state.itemsPerPage);
    },
  },

  actions: {
    // Khởi tạo store
    async initialize() {
      if (!this.initialized) {
        await this.fetchCpu();
        this.initialized = true;
      }
    },

    // Hiển thị/ẩn gợi ý tìm kiếm
    toggleSuggestions(show) {
      this.showSuggestions = show;
    },

    // Đặt lại bộ lọc
    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.currentPage = 1;
      this.toggleSuggestions(false);
    },

    // Đặt bộ lọc trạng thái
    setStatusFilter(filter) {
      this.statusFilter = filter;
      this.currentPage = 1;
    },

    // Lấy danh sách CPU từ API
    async fetchCpu() {
      try {
        const data = await getAllCpu();
        if (!Array.isArray(data)) return;

        this.cpuList = data;
        this.initialized = true;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách CPU:", error);
        throw error;
      }
    },

    // Lấy thông tin CPU theo ID
    async fetchCpuById(id) {
      try {
        const cpu = await getCpuById(id);
        if (cpu) {
          this.cpuData = { ...cpu }; // Gán dữ liệu vào state
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin CPU:", error);
        throw error;
      }
    },

    // Lấy CPU theo id
    async fetchCpuById(id) {
      try {
        const cpu = await getCpuById(id);
        if (cpu) {
          this.cpuData = { ...cpu };
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin CPU:", error);
        throw error;
      }
    },

    // Thêm CPU mới
    async addCpu(cpuData) {
      try {
        const response = await addCpu(cpuData);
        await this.fetchCpu(); // Cập nhật lại danh sách sau khi thêm

        return response;
      } catch (error) {
        console.error("Lỗi khi thêm CPU:", error);
        throw error;
      }
    },

    // Cập nhật thông tin CPU
    async updateCpu(id, cpuData) {
      try {
        await updateCpu(id, cpuData);
        await this.fetchCpu(); // Cập nhật lại danh sách sau khi sửa
      } catch (error) {
        console.error("Lỗi khi cập nhật CPU:", error);
        throw error;
      }
    },

    // Xóa CPU
    async deleteCpu(id) {
      try {
        await deleteCpu(id);
        await this.fetchCpu(); // Cập nhật lại danh sách sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa CPU:", error);
        throw error;
      }
    },

    // Xuất danh sách CPU ra Excel
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("CPU");

      worksheet.addRow([
        "STT",
        "Mã CPU",
        "Hãng",
        "Tên",
        "Thế hệ",
        "Số nhân",
        "Số luồng",
        "Xung nhịp (GHz)",
        "Trạng thái",
      ]);

      this.cpuList.forEach((cpu, index) => {
        worksheet.addRow([
          index + 1,
          cpu.maCpu,
          cpu.hangCpu,
          cpu.tenCpu,
          cpu.theHeCpu,
          cpu.soNhan,
          cpu.soLuong,
          cpu.xungNhip,
          cpu.tinhTrang ? "Hoạt động" : "Ngừng hoạt động",
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "DanhSachCPU.xlsx");
    },

    // Đặt trang hiện tại
    setPage(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },

    // Đặt số lượng item mỗi trang
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },
  },
});