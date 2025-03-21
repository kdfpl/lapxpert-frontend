import { defineStore } from "pinia"
import { getAllDotGiamGia, getAllDotGiamGiaChiTiet } from "@/api/service/dotgiamgia.ts"
import type { DotGiamGia, DotGiamGiaChiTiet } from "@/types/dotgiamgiatypes"

export const useDotGiamGiaStore = defineStore("dotGiamGia", {
  state: () => ({
    dotGiamGiaList: [] as DotGiamGia[],
    DotGiamGiaChiTietList: [] as DotGiamGiaChiTiet[],
  }),
  actions: {
    async fetchDotGiamGiaList() {
      this.dotGiamGiaList = await getAllDotGiamGia();
    },

    async fetchDotGiamGiaChiTietList() {
      this.DotGiamGiaChiTietList = await getAllDotGiamGiaChiTiet();
    }
  }
})