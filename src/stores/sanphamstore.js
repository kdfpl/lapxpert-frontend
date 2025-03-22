import { defineStore } from "pinia";
import {
  getAllSP,
  getAllLoaiSanPham,
  getAllHeDieuHanh,
  getAllThuongHieu,
} from "@/api/service/sanphamservice"; // Import từ file sanphamservice

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
} from "@/api/service/spctservice"; // Import từ file spctservice

export const useCombinedStore = defineStore("combinedStore", {
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

    // Common state
    loading: false,
    error: null,
  }),

  actions: {
    // Actions từ spct store
    async fetchSpct() {
      this.loading = true;
      try {
        this.spctList = await getAllSpct();
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCpu() {
      try {
        this.cpuList = await getAllCpu();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchGpu() {
      try {
        this.gpuList = await getAllGpu();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchRam() {
      try {
        this.ramList = await getAllRam();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchLoaiRam() {
      try {
        this.loaiRamList = await getAllLoaiRam();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchManHinh() {
      try {
        this.manHinhList = await getAllManHinh();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchOCung() {
      try {
        this.ocungList = await getAllOCung();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchPin() {
      try {
        this.pinList = await getAllPin();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchMauSac() {
      try {
        this.mauSacList = await getAllMauSac();
      } catch (error) {
        this.error = String(error);
      }
    },

    async fetchSeri() {
      try {
        this.seriList = await getAllSeri();
      } catch (error) {
        this.error = String(error);
      }
    },

    // Actions từ sanPham store
    async fetchSanPhamList() {
      this.loading = true;
      try {
        this.sanPhamList = await getAllSP();
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchLoaiSanPhamList() {
      try {
        this.loaiList = await getAllLoaiSanPham();
      } catch (error) {
        console.error("Lỗi khi tải danh sách loại sản phẩm:", error);
      }
    },

    async fetchHeDieuHanhList() {
      try {
        this.heDieuHanhList = await getAllHeDieuHanh();
      } catch (error) {
        console.error("Lỗi khi tải danh sách hệ điều hành:", error);
      }
    },

    async fetchThuongHieuList() {
      try {
        this.thuongHieuList = await getAllThuongHieu();
      } catch (error) {
        console.error("Lỗi khi tải danh sách thương hiệu:", error);
      }
    },

    // Combined fetch all data
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
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },

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

    totalPages: (state) => {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    },

    paginatedData: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredData.slice(start, start + state.itemsPerPage);
    },
  },
});