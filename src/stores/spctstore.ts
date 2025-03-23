import { defineStore } from "pinia";
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
import type { CPU, GPU, Ram, LoaiRam, ManHinh, OCung, Pin, Mau, Seri, SPCT } from "../types/spcttypes";

export const useSpctStore = defineStore("spctStore", {
  state: () => ({
    spctList: [] as SPCT[],
    cpuList: [] as CPU[],
    gpuList: [] as GPU[],
    ramList: [] as Ram[],
    loaiRamList: [] as LoaiRam[],
    manHinhList: [] as ManHinh[],
    ocungList: [] as OCung[],
    pinList: [] as Pin[],
    mauSacList: [] as Mau[],
    seriList: [] as Seri[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
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
        ]);
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getSpctById: (state) => (id: number) => state.spctList.find((spct) => spct.id === id),
    getCpuById: (state) => (id: number) => state.cpuList.find((cpu) => cpu.id === id),
    getGpuById: (state) => (id: number) => state.gpuList.find((gpu) => gpu.id === id),
    getRamById: (state) => (id: number) => state.ramList.find((ram) => ram.id === id),
    getManHinhById: (state) => (id: number) => state.manHinhList.find((mh) => mh.id === id),
  },
});
