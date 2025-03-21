import { defineStore } from "pinia";
import { getAllSP, getAllHeDieuHanh, getAllLoaiSanPham, getAllThuongHieu } from "@/api/service/sanphamservice";
import type { Loai, HeDieuHanh, ThuongHieu, SanPham } from "@/types/spcttypes";

// Định nghĩa store
export const useSanPhamStore = defineStore("sanPham", {
  state: () => ({
    sanPhamList: [] as SanPham[],
    loaiList: [] as Loai[],
    heDieuHanhList: [] as HeDieuHanh[],
    thuongHieuList: [] as ThuongHieu[],
    loading: false,
  }),

  actions: {
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

    async fetchAllData() {
      this.loading = true;
      try {
        await Promise.all([
          this.fetchSanPhamList(),
          this.fetchLoaiSanPhamList(),
          this.fetchHeDieuHanhList(),
          this.fetchThuongHieuList(),
        ]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu tổng:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
