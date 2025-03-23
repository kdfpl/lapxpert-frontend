export interface Loai {
  id: number;
  maLoai: string;
  tenLoai: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface HeDieuHanh {
  id: number;
  maHeDieuHanh: string;
  tenHeDieuHanh: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface ThuongHieu {
  id: number;
  maThuongHieu: string;
  tenThuongHieu: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface SanPham {
  id: number;
  loai: Loai;
  heDieuHanh: HeDieuHanh;
  thuongHieu: ThuongHieu;
  maSp: string;
  tenSp: string;
  ngayTao: string;
  tinhTrang: boolean;
  moTa: string;
  baoHanhThang: number;
  trangThai: boolean;
  hinhAnh: string;
}

export interface LoaiRam {
  id: number;
  maLoai: string;
  tenLoaiRam: string;
  busRam: number;
  dienAp: number;
  hoTroXmp: boolean;
  ngayTao: string; // Định dạng ISO 8601
  tinhTrang: boolean;
}

export interface Ram {
  id: number;
  maRam: string;
  loaiRam: LoaiRam;
  dungLuongRam: number;
  soKheRam: number;
  hoTroToiDa: number;
  ngayTao: string;
  tinhTrang: boolean;
}


export interface ManHinh {
  id: number;
  maManHinh: string;
  kichThuoc: number;
  tanSoQuet: number;
  loaiTamNen: string;
  doSang: number;
  chuanMau: string;
  doPhanGiai: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface OCung {
  id: number;
  maOCung: string;
  loaiOCung: string;
  dungLuong: number;
  chuanKetNoi: string;
  tocDoDoc: number;
  tocDoGhi: number;
  hoTroNangCap: boolean;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface Pin {
  id: number;
  maPin: string;
  dungLuongPin: number;
  thoiLuongPin: number;
  congSuatSac: number;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface Mau {
  id: number;
  maMau: string;
  tenMau: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface GPU {
  id: number;
  maGpu: string;
  loaiGpu: string;
  tenGpu: string;
  boNhoVram: number;
  congNgheGpu: string;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface CPU {
  id: number;
  maCpu: string;
  hangCpu: string;
  tenCpu: string;
  theHeCpu: string;
  soNhan: number;
  soLuong: number;
  xungNhip: number;
  ngayTao: string;
  tinhTrang: boolean;
}

export interface Seri {
  id: number;
  maSeri: string;
  trangThai: string;
  ngayNhapKho: string;
  tinhTrang: boolean;
  ngayTao: string;
}

export interface SPCT {
  id: number;
  sanPham: SanPham;
  ram: Ram;
  manHinh: ManHinh;
  pin: Pin;
  mau: Mau;
  gpu: GPU;
  cpu: CPU;
  seri: Seri;
  ocung: OCung;
  maChiTietSp: string;
  giaBan: number;
  ngayTao: string;
  tinhTrang: boolean;
}
