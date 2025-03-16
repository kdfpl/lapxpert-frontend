import { defineStore } from "pinia"
import { fetchDotGiamGiaList } from "../apis/services/dotgiamgia"

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