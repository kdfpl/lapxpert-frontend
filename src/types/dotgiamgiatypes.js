import { SPCT } from "./spcttypes";

// Define the structure for DotGiamGia
export const DotGiamGia = {
  id: Number,
  maDot: String,
  tenDot: String,
  thoiGianBatDau: String,
  thoiGianKetThuc: String,
  giaTriGiam: Number,
  loaiGiamGia: String,
  moTa: String,
  trangThai: String,
  ngayTao: String,
  tinhTrang: Boolean,
  chiTiet: Array, // This can be an array of DotGiamGiaChiTiet
};

// Define the structure for DotGiamGiaChiTiet
export const DotGiamGiaChiTiet = {
  id: Number,
  dotGiamGia: DotGiamGia,
  sanPhamChiTiet: SPCT,
  maDotChiTiet: String,
  ngayTao: String,
  tinhTrang: Boolean,
};