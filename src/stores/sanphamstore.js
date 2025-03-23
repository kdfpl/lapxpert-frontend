import { defineStore } from "pinia";
import {
  getAllSP,
  getAllLoaiSanPham,
  getAllHeDieuHanh,
  getAllThuongHieu,
} from "../apis/services/sanphamservice";
import {
  getAllSpct,
  getAllCpu,
  getAllGpu,
  getAllRam,
  getAllLoaiRam,
  getAllManHinh,
  getAllOCung,
  getAllPin,
  getAllMauSac,
  getAllSeri,
} from "../apis/services/spctservice";

export const useSanPhamStore = defineStore("combinedStore", {
  state: () => ({
    // State từ spct store
    spctList: [],
    cpuList: [],
    gpuList: [],
    ramList: [],
    loaiRamList: [],
    manHinhList: [],
    ocungList: [],
    pinList: [],
    mauSacList: [],
    seriList: [],

    // State từ sanPham store
    sanPhamList: [],
    loaiList: [],
    heDieuHanhList: [],
    thuongHieuList: [],

    // State cho tìm kiếm và lọc
    search: "",
    statusFilter: "all",
    loaiFilter: null,
    thuongHieuFilter: null,
    currentPage: 1,
    itemsPerPage: 10,

    // State để điều khiển hiển thị gợi ý
    showSuggestions: false,

    // Common state
    loading: false,
    error: null,
  }),

  getters: {
    // Getters từ spct store
    getSpctById: (state) => (id) => state.spctList.find((spct) => spct.id === id),
    getCpuById: (state) => (id) => state.cpuList.find((cpu) => cpu.id === id),
    getGpuById: (state) => (id) => state.gpuList.find((gpu) => gpu.id === id),
    getRamById: (state) => (id) => state.ramList.find((ram) => ram.id === id),
    getManHinhById: (state) => (id) => state.manHinhList.find((mh) => mh.id === id),

    // Getters từ sanPham store
    getSanPhamById: (state) => (id) => state.sanPhamList.find((sp) => sp.id === id),
    getLoaiById: (state) => (id) => state.loaiList.find((loai) => loai.id === id),
    getHeDieuHanhById: (state) => (id) => state.heDieuHanhList.find((hdh) => hdh.id === id),
    getThuongHieuById: (state) => (id) => state.thuongHieuList.find((th) => th.id === id),

    // Getters cho tìm kiếm và lọc
    filteredData: (state) => {
      const searchTerm = state.search.toLowerCase();
      const { statusFilter, loaiFilter, thuongHieuFilter } = state;

      return state.sanPhamList.filter((sp) => {
        const matchSearch = [
          sp.tenSp,
          sp.maSp,
          sp.loai?.tenLoai,
          sp.heDieuHanh?.tenHeDieuHanh,
          sp.thuongHieu?.tenThuongHieu,
          sp.moTa,
        ].some((field) => field?.toLowerCase().includes(searchTerm));

        const matchStatus =
          statusFilter === "all" ? true : statusFilter === "active" ? sp.trangThai : !sp.trangThai;

        const matchLoai = loaiFilter ? sp.loai?.id === loaiFilter : true;
        const matchThuongHieu = thuongHieuFilter ? sp.thuongHieu?.id === thuongHieuFilter : true;

        return matchSearch && matchStatus && matchLoai && matchThuongHieu;
      });
    },

    searchSuggestions: (state) => {
      if (!state.search || state.search.length < 2) return [];

      const searchTerm = state.search.toLowerCase();
      const suggestions = new Set();
      const fieldMap = new Map();

      state.sanPhamList.forEach((sp) => {
        const fields = [
          { value: sp.tenSanPham, label: `Tên sản phẩm: ${sp.tenSanPham}` },
          { value: sp.maSp, label: `Mã : ${sp.maSp}` },
          { value: sp.tenSp, label: `Tên sản phẩm : ${sp.tenSp}` },
          { value: sp.loai?.tenLoai, label: `Loại: ${sp.loai?.tenLoai}` },
          { value: sp.heDieuHanh?.tenHeDieuHanh, label: `Hệ điều hành: ${sp.heDieuHanh?.tenHeDieuHanh}` },
          { value: sp.thuongHieu?.tenThuongHieu, label: `Thương hiệu: ${sp.thuongHieu?.tenThuongHieu}` },
          { value: sp.moTa, label: `Mô tả: ${sp.moTa}` },
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

    totalPages: (state) => Math.ceil(state.filteredData.length / state.itemsPerPage),

    paginatedData: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredData.slice(start, start + state.itemsPerPage);
    },
  },

  actions: {
    // Helper function để xử lý lỗi
    handleError(error) {
      this.error = String(error);
      console.error("Error:", error);
    },

    // Action để điều khiển hiển thị gợi ý
    toggleSuggestions(show) {
      this.showSuggestions = show;
    },

    // Actions từ spct store
    async fetchSpct() {
      this.loading = true;
      try {
        this.spctList = await getAllSpct();
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCpu() {
      try {
        this.cpuList = await getAllCpu();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchGpu() {
      try {
        this.gpuList = await getAllGpu();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchRam() {
      try {
        this.ramList = await getAllRam();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchLoaiRam() {
      try {
        this.loaiRamList = await getAllLoaiRam();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchManHinh() {
      try {
        this.manHinhList = await getAllManHinh();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchOCung() {
      try {
        this.ocungList = await getAllOCung();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchPin() {
      try {
        this.pinList = await getAllPin();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchMauSac() {
      try {
        this.mauSacList = await getAllMauSac();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchSeri() {
      try {
        this.seriList = await getAllSeri();
      } catch (error) {
        this.handleError(error);
      }
    },

    // Actions từ sanPham store
    async fetchSanPhamList() {
      this.loading = true;
      try {
        this.sanPhamList = await getAllSP();
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLoaiSanPhamList() {
      try {
        this.loaiList = await getAllLoaiSanPham();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchHeDieuHanhList() {
      try {
        this.heDieuHanhList = await getAllHeDieuHanh();
      } catch (error) {
        this.handleError(error);
      }
    },

    async fetchThuongHieuList() {
      try {
        this.thuongHieuList = await getAllThuongHieu();
      } catch (error) {
        this.handleError(error);
      }
    },

    // Fetch tất cả dữ liệu
    async fetchAllData() {
      this.loading = true;
      try {
        await Promise.all([
          this.fetchSpct(),
          this.fetchCpu(),
          this.fetchGpu(),
          this.fetchRam(),
          this.fetchLoaiRam(),
          this.fetchManHinh(),
          this.fetchOCung(),
          this.fetchPin(),
          this.fetchMauSac(),
          this.fetchSeri(),
          this.fetchSanPhamList(),
          this.fetchLoaiSanPhamList(),
          this.fetchHeDieuHanhList(),
          this.fetchThuongHieuList(),
        ]);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    // Actions cho tìm kiếm và lọc
    setSearch(searchTerm) {
      this.search = searchTerm;
      this.currentPage = 1;
      this.toggleSuggestions(searchTerm.length > 0); // Hiển thị gợi ý khi có từ khóa
    },

    setStatusFilter(filter) {
      this.statusFilter = filter;
      this.currentPage = 1;
    },

    setLoaiFilter(loaiId) {
      this.loaiFilter = loaiId;
      this.currentPage = 1;
    },

    setThuongHieuFilter(thuongHieuId) {
      this.thuongHieuFilter = thuongHieuId;
      this.currentPage = 1;
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },

    resetFilters() {
      this.search = "";
      this.statusFilter = "all";
      this.loaiFilter = null;
      this.thuongHieuFilter = null;
      this.currentPage = 1;
      this.toggleSuggestions(false); // Ẩn gợi ý khi reset
    },
  },
});