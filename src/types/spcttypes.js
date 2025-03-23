export const Loai = {
  id: Number,
  maLoai: String,
  tenLoai: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const HeDieuHanh = {
  id: Number,
  maHeDieuHanh: String,
  tenHeDieuHanh: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const ThuongHieu = {
  id: Number,
  maThuongHieu: String,
  tenThuongHieu: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const SanPham = {
  id: Number,
  loai: Loai,
  heDieuHanh: HeDieuHanh,
  thuongHieu: ThuongHieu,
  maSp: String,
  tenSp: String,
  ngayTao: String,
  tinhTrang: Boolean,
  moTa: String,
  baoHanhThang: Number,
  trangThai: Boolean,
  hinhAnh: String,
};

export const LoaiRam = {
  id: Number,
  maLoai: String,
  tenLoaiRam: String,
  busRam: Number,
  dienAp: Number,
  hoTroXmp: Boolean,
  ngayTao: String, // Định dạng ISO 8601
  tinhTrang: Boolean,
};

export const Ram = {
  id: Number,
  maRam: String,
  loaiRam: LoaiRam,
  dungLuongRam: Number,
  soKheRam: Number,
  hoTroToiDa: Number,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const ManHinh = {
  id: Number,
  maManHinh: String,
  kichThuoc: Number,
  tanSoQuet: Number,
  loaiTamNen: String,
  doSang: Number,
  chuanMau: String,
  doPhanGiai: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const OCung = {
  id: Number,
  maOCung: String,
  loaiOCung: String,
  dungLuong: Number,
  chuanKetNoi: String,
  tocDoDoc: Number,
  tocDoGhi: Number,
  hoTroNangCap: Boolean,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const Pin = {
  id: Number,
  maPin: String,
  dungLuongPin: Number,
  thoiLuongPin: Number,
  congSuatSac: Number,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const Mau = {
  id: Number,
  maMau: String,
  tenMau: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const GPU = {
  id: Number,
  maGpu: String,
  loaiGpu: String,
  tenGpu: String,
  boNhoVram: Number,
  congNgheGpu: String,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const CPU = {
  id: Number,
  maCpu: String,
  hangCpu: String,
  tenCpu: String,
  theHeCpu: String,
  soNhan: Number,
  soLuong: Number,
  xungNhip: Number,
  ngayTao: String,
  tinhTrang: Boolean,
};

export const Seri = {
  id: Number,
  maSeri: String,
  trangThai: String,
  ngayNhapKho: String,
  tinhTrang: Boolean,
  ngayTao: String,
};

export const SPCT = {
  id: Number,
  sanPham: SanPham,
  ram: Ram,
  manHinh: ManHinh,
  pin: Pin,
  mau: Mau,
  gpu: GPU,
  cpu: CPU,
  seri: Seri,
  ocung: OCung,
  maChiTietSp: String,
  giaBan: Number,
  ngayTao: String,
  tinhTrang: Boolean,
};
