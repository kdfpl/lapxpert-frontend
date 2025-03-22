import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Profile from "@/views/user/Profile.vue";
import ThongKe from "@/views/statistical/ThongKe.vue";
import HoaDon from "@/views/shop/InvoiceMain.vue";
import ChiTietHoaDon from "@/views/shop/ChiTietHoaDon.vue";
import GiamGia from "@/views/voucher/VoucherMain.vue";
import SaleoffMain from "@/views/sale/SaleoffMain.vue";
import AddSaleoff from "@/views/sale/AddSaleoff.vue";

const routes = [
  { path: "/", name: "Home", component: ThongKe },
  { path: "/login", name: "Login", component: Login },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/thongke", name: "thongke", component: ThongKe },

  // Quản lý hoá đơn
  { path: "/invoice", name: "HoaDon", component: HoaDon },
  { path: "/chi-tiet-hoa-don/:id", name: "ChiTietHoaDon", component: ChiTietHoaDon },
  { path: "/admin/hoa-don-crud", name: "HoaDonCRUD", component: () => import("@/views/shop/InvoiceAdd.vue") },

  // Quản lý khuyến mãi
  { path: "/admin/giam-gia", name: "GiamGia", component: GiamGia },
  { path: "/admin/crud-giam-gia/:id", name: "GiamGiaCRUD", component: () => import("@/views/voucher/VoucherAdd.vue"), props: true },
  { path: "/admin/crud-giam-gia", name: "GiamGiaCRUD_Add", component: () => import("@/views/voucher/VoucherAdd.vue") },
  { path: "/admin/saleoff", name: "SaleoffDefault", component: SaleoffMain },
  { path: "/admin/saleoff/add", name: "AddSaleoff", component: AddSaleoff },

  // Quản lý sản phẩm
  { path: "/admin/san-pham", name: "SanPham", component: () => import("@/views/product/laptop/ProductMain.vue") },
  { path: "/admin/san-pham-chi-tiet", name: "SanPhamChiTiet", component: () => import("@/views/product/laptop/ProductVariant.vue") },
  { path: "/admin/san-pham-crud/:id?", name: "SanPhamCRUD", component: () => import("@/views/product/laptop/ProductAdd.vue"), props: true },

  // Quản lý nhân viên và khách hàng
  { path: "/admin/khach-hang", name: "KhachHang", component: () => import("@/views/user/customer/CustomerMain.vue") },
  { path: "/admin/nhan-vien", name: "NhanVien", component: () => import("@/views/user/employee/EmployeeMain.vue") },
  { path: "/admin/khach-hang-crud/:id?", name: "KhachHangCRUD", component: () => import("@/views/user/customer/CustomerAdd.vue"), props: true },
  { path: "/admin/nhan-vien-crud/:id?", name: "NhanVienCRUD", component: () => import("@/views/user/employee/EmployeeAdd.vue"), props: true },

  // Quản lý linh kiện
  { path: "/admin/cpu", name: "CPU", component: () => import("@/views/product/cpu/CpuMain.vue") },
  { path: "/admin/gpu", name: "GPU", component: () => import("@/views/product/gpu/GpuMain.vue") },
  { path: "/admin/o-cung", name: "OCung", component: () => import("@/views/product/disk/DiskMain.vue") },
  { path: "/admin/ram", name: "Ram", component: () => import("@/views/product/ram/RamMain.vue") },
  { path: "/admin/man-hinh", name: "ManHinh", component: () => import("@/views/product/display/DisplayMain.vue") },
  { path: "/admin/pin", name: "Pin", component: () => import("@/views/product/laptop/ProductMain.vue") },
  { path: "/admin/mau-sac", name: "Color", component: () => import("@/views/product/color/Color.vue") },

  // CRUD linh kiện
  { path: "/admin/cpu-crud/:id?", name: "CpuCRUD", component: () => import("@/views/product/cpu/CpuAdd.vue"), props: true },
  { path: "/admin/gpu-crud/:id?", name: "GpuCRUD", component: () => import("@/views/product/gpu/GpuAdd.vue"), props: true },
  { path: "/admin/o-cung-crud/:id?", name: "OCungCRUD", component: () => import("@/views/product/disk/DiskAdd.vue"), props: true },
  { path: "/admin/ram-crud/:id?", name: "RamCRUD", component: () => import("@/views/product/ram/RamAdd.vue"), props: true },
  { path: "/admin/man-hinh-crud/:id?", name: "ManHinhCRUD", component: () => import("@/views/product/display/DisplayAdd.vue"), props: true },
  { path: "/admin/pin-crud/:id?", name: "PinCRUD", component: () => import("@/views/product/laptop/ProductAdd.vue"), props: true },
  { path: "/admin/mau-sac-crud/:id?", name: "MauSacCRUD", component: () => import("@/views/product/color/Color.vue"), props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
