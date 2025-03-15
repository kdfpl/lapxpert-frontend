import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import SanPham from "../views/SanPham.vue";
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
import HoaDon from "../views/HoaDon.vue";
import ChiTietHoaDon from "../views/ChiTietHoaDon.vue";
import HoaDonCRUD from "../views/crud/HoaDonCRUD.vue";

const routes = [
    {
        path: '/GiamGia',
        name: 'GiamGia',
        component: GiamGia,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/KhachHang',
        name: 'KhachHang',
        component: KhachHang,
    },
    {
        path: '/NhanVien',
        name: 'NhanVien',
        component: NhanVien,
    },
    {
        path: '/color',
        name: 'color',
        component: color,
    },
    {
        path: '/pin',
        name: 'pin',
        component: pin,
    },
    {
        path: '/oCung',
        name: 'oCung',
        component: oCung,
    },
    {
        path: '/gpu',
        name: 'gpu',
        component: gpu,
    },
    {
        path: '/ram',
        name: 'Ram',
        component: Ram,
    },
    {
        path: '/RamCRUD',
        name: 'RamCRUD',
        component: RamCRUD,
    },
    {
        path: '/cpu',
        name: 'CPU',
        component: CPU,
    },
    {
        path: '/manHInh',
        name: 'ManHInh',
        component: ManHInh,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/san-pham',
        name: 'SanPham',
        component: SanPham,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },

    {
        path: '/invoice',
        name: 'HoaDon',
        component: HoaDon
    },

    {
        path: '/chi-tiet-hoa-don/:id',
        name: 'ChiTietHoaDon',
        component: ChiTietHoaDon, // Đảm bảo rằng bạn đã import đúng component
    },



    {
        path: '/hoa-don-crud',
        name: 'HoaDonCRUD',
        component: HoaDonCRUD
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;