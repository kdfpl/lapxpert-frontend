export interface DotGiamGia {
  id: number;
  maDot: string;
  tenDot: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaTriGiam: number;
  loaiGiamGia: string;
  moTa?: string;
  trangThai: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface SanPham {
  id: number;
  maSp: string;
  tenSp: string;
  moTa: string;
  baoHanhThang: number;
  trangThai: boolean;
  hinhAnh: string;
}

export interface SanPhamChiTiet {
  id: number;
  sanPham: SanPham;
  giaBan: number;
  maChiTietSp: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface DotGiamGiaChiTiet {
  id: number;
  dotGiamGiaId: number;
  sanPhamChiTietId: number;
  maDotChiTiet: string;
  ngayTao: string;
  tinhTrang: boolean;
}