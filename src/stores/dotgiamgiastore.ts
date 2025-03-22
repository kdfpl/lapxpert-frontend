import { defineStore } from "pinia"
import type { DotGiamGia, DotGiamGiaChiTiet } from "../types/dotgiamgiatypes"
import { fetchAllDotGiamGia, fetchAllDotGiamGiaChiTiet } from "../apis/graphql/dotgiamgia"

export const useDotGiamGiaStore = defineStore("dotGiamGia", {
  state: () => ({
    dotGiamGiaList: [] as DotGiamGia[],
    DotGiamGiaChiTietList: [] as DotGiamGiaChiTiet[],
  }),
  actions: {
    async fetchDotGiamGiaList() {
      this.dotGiamGiaList = await fetchAllDotGiamGia();
    },

    async fetchDotGiamGiaChiTietList() {
      this.DotGiamGiaChiTietList = await fetchAllDotGiamGiaChiTiet();
    }
  }
})