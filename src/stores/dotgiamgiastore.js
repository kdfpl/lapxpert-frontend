import { defineStore } from "pinia"
import {
  fetchAllDotGiamGia,
  fetchAllDotGiamGiaChiTiet
} from "../apis/graphql/dotgiamgia"

export const useDotGiamGiaStore = defineStore("dotGiamGia", {
  state: () => ({
    dotGiamGiaList: [],
    DotGiamGiaChiTietList: []
  }),
  actions: {
    async fetchDotGiamGiaList() {
      this.dotGiamGiaList = await fetchAllDotGiamGia()
    },

    async fetchDotGiamGiaChiTietList() {
      this.DotGiamGiaChiTietList = await fetchAllDotGiamGiaChiTiet()
    }
  }
})
