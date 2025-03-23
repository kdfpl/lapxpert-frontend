import type { SPCT } from "./spcttypes";

export interface DotGiamGia {
  id: number;
  maDot: string;
  tenDot: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaTriGiam: number;
  loaiGiamGia: string;
  moTa: string;
  trangThai: string;
  ngayTao?: string;
  tinhTrang?: boolean;
  chiTiet?: DotGiamGiaChiTiet[];
}

export interface DotGiamGiaChiTiet {
  id: number;
  dotGiamGia: DotGiamGia;
  sanPhamChiTiet: SPCT;
  maDotChiTiet: string;
  ngayTao: string;
  tinhTrang?: boolean;
}