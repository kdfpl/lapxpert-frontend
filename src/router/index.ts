import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import SanPham from "../views/Product/SanPham.vue";
import ThongKe from "../views/ThongKe.vue";
import SPCT from "../views/SanPhamChiTiet.vue";
import RamCRUD from "../views/crud/RamCRUD.vue";
import Ram from "../views/list/Ram.vue";
import ManHInh from "../views/list/ManHInh.vue";
import CPU from "../views/list/cpu.vue";
import gpu from "../views/list/gpu.vue";
import oCung from "../views/list/oCung.vue";
import pin from "../views/list/pin.vue";
import color from "../views/list/color.vue";
import GiamGia from "../views/GiamGia.vue";
import KhachHang from "../views/KhachHang.vue";
import NhanVien from "../views/NhanVien.vue";
import CpuCRUD from "../views/crud/CpuCRUD.vue";
import MauSacCRUD from "../views/crud/MauSacCRUD.vue";
import GpuCRUD from "../views/crud/GpuCRUD.vue";
import ManHinhCRUD from "../views/crud/ManHinhCRUD.vue";
import OCungCRUD from "../views/crud/OCungCRUD.vue";
import PinCRUD from "../views/crud/PinCRUD.vue";
import SanPhamCRUD from "../views/crud/SanPhamCRUD.vue";
import SpctCRUD from "../views/crud/SpctCRUD.vue";
import KhachHangCRUD from "../views/crud/KhachHangCRUD.vue";
import NhanVienCRUD from "../views/crud/NhanVienCRUD.vue";
import HoaDon from "../views/HoaDon.vue";
import ChiTietHoaDon from "../views/ChiTietHoaDon.vue";
import HoaDonCRUD from "../views/crud/HoaDonCRUD.vue";
import GiamGiaCRUD from "../views/crud/PhieuGiamGiaCRUD.vue";
import SaleoffMain from "../views/saleOff/SaleoffMain.vue";
import AddSaleoff from "../views/saleOff/AddSaleoff.vue";

const routes = [
  {
    path: "/KhachHangCRUD/:id?",
    name: "KhachHangCRUD",
    component: KhachHangCRUD,
    props: true,
  },{
    path: '/SaleoffDefault',
    name: 'SaleoffDefault',
    component: SaleoffMain,
  },
  {
    path: '/saleoff/add',
    name: 'AddSaleoff',
    component: AddSaleoff,
  },
  { path: "/thongke", name: "thongke", component: ThongKe },
  {
    path: "/invoice",
    name: "HoaDon",
    component: HoaDon,
  },
  {
    path: "/crud-giam-gia/:id",
    name: "GiamGiaCRUD",
    component: GiamGiaCRUD,
    props: true,
  },
  {
    path: "/crud-giam-gia",
    name: "GiamGiaCRUD_Add",
    component: GiamGiaCRUD,
    props: false,
  },
  {
    path: "/chi-tiet-hoa-don/:id",
    name: "ChiTietHoaDon",
    component: ChiTietHoaDon,
  },
  {
    path: "/hoa-don-crud",
    name: "HoaDonCRUD",
    component: HoaDonCRUD,
  },
  {
    path: "/NhanVienCRUD/:id?",
    name: "NhanVienCRUD",
    component: NhanVienCRUD,
    props: true,
  },
  {
    path: "/GiamGia",
    name: "GiamGia",
    component: GiamGia,
  },
  {
    path: "/",
    name: "Home",
    component: ThongKe,
  },
  {
    path: "/KhachHang",
    name: "KhachHang",
    component: KhachHang,
  },
  {
    path: "/NhanVien",
    name: "NhanVien",
    component: NhanVien,
  },
  {
    path: "/color",
    name: "color",
    component: color,
  },
  {
    path: "/pin",
    name: "pin",
    component: pin,
  },
  {
    path: "/oCung",
    name: "oCung",
    component: oCung,
  },
  {
    path: "/gpu",
    name: "gpu",
    component: gpu,
  },
  {
    path: "/ram",
    name: "Ram",
    component: Ram,
  },
  {
    path: "/RamCRUD/:id?",
    name: "RamCRUD",
    component: RamCRUD,
    props: true,
  },
  {
    path: "/SanPhamCRUD/:id?",
    name: "SanPhamCRUD",
    component: SanPhamCRUD,
    props: true,
  },
  {
    path: "/SpctCRUD/:id?",
    name: "SpctCRUD",
    component: SpctCRUD,
    props: true,
  },
  {
    path: "/CpuCRUD/:id?",
    name: "CpuCRUD",
    component: CpuCRUD,
    props: true,
  },
  {
    path: "/MauSacCRUD/:id?",
    name: "MauSacCRUD",
    component: MauSacCRUD,
    props: true,
  },
  {
    path: "/ManHinhCRUD/:id?",
    name: "ManHinhCRUD",
    component: ManHinhCRUD,
    props: true,
  },
  {
    path: "/GpuCRUD/:id?",
    name: "GpuCRUD",
    component: GpuCRUD,
    props: true,
  },
  {
    path: "/OCungCRUD/:id?",
    name: "OCungCRUD",
    component: OCungCRUD,
    props: true,
  },
  {
    path: "/PinCRUD/:id?",
    name: "PinCRUD",
    component: PinCRUD,
    props: true,
  },
  {
    path: "/cpu",
    name: "CPU",
    component: CPU,
  },
  {
    path: "/manHInh",
    name: "ManHInh",
    component: ManHInh,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/san-pham",
    name: "SanPham",
    component: SanPham,
  },
  {
    path: "/san-pham-chi-tiet",
    name: "SanPhamChiTiet",
    component: SPCT,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
