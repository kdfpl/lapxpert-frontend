import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Voucher from "../views/shop/Voucher.vue";
import Invoice from "../views/shop/Invoice.vue";
import User from "../views/user/User.vue";
import Customer from "../views/user/Customer.vue";
import Order from "../views/shop/Order.vue";
import Product from "../views/product/Product.vue";
import Ram from "../views/product/Ram.vue";
import Gpu from "../views/product/Gpu.vue";
import Cpu from "../views/product/Cpu.vue";
import Disk from "../views/product/Disk.vue";
import Display from "../views/product/Display.vue";
import Color from "../views/product/Color.vue";
import Profile from "../views/user/Profile.vue";
import Saleoff from "../views/shop/Saleoff.vue";
import AddProduct from "../views/product/AddProduct.vue";
import DataDisplay from "../views/DataDisplay.vue";
import Admin from "../views/Admin.vue";
import AddVoucher from "../views/shop/AddVoucher.vue";
import VoucherMain from "../views/shop/VoucherMain.vue";

const routes = [
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/monitor',
                name: 'Monitor',
                component: DataDisplay,
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
            },
            {
                path: '/user',
                name: 'User',
                component: User,
            },
            {
                path: '/customer',
                name: 'Customer',
                component: Customer,
            },
            {
                path: '/order',
                name: 'Order',
                component: Order,
            },
            {
                path: '/invoice',
                name: 'Invoice',
                component: Invoice,
            },
            {
                path: '/saleoff',
                name: 'Saleoff',
                component: Saleoff,
            },
            {
                path: '/voucher',
                name: 'Voucher',
                component: Voucher,
                children: [
                  {
                    path: '',
                    name: 'VoucherDefault',
                    component: VoucherMain,
                  },
                  {
                    path: '/voucher/add',
                    name: 'AddVoucher',
                    component: AddVoucher,
                  }
                ],
            },
            {
                path: '/product',
                name: 'Product',
                component: Product,
            },
            {
                path: '/add-product',
                name: 'AddProduct',
                component: AddProduct,
            },
            {
                path: '/cpu',
                name: 'Cpu',
                component: Cpu,
            },
            {
                path: '/ram',
                name: 'Ram',
                component: Ram,
            },
            {
                path: '/gpu',
                name: 'Gpu',
                component: Gpu,
            },
            {
                path: '/disk',
                name: 'Disk',
                component: Disk,
            },
            {
                path: '/display',
                name: 'Display',
                component: Display,
            },
            {
                path: '/color',
                name: 'Color',
                component: Color,
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;