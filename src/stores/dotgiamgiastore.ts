import { defineStore } from "pinia"
import { fetchDotGiamGiaList } from "../apis/dotgiamgia"

export const useDotGiamGiaStore = defineStore("dotGiamGia", {
  state: () => ({
    dotGiamGiaList: []
  }),
  actions: {
    async getDotGiamGiaList() {
      this.dotGiamGiaList = await fetchDotGiamGiaList();
    }
  }
})