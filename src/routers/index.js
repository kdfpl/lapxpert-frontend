import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Voucher from "../views/voucher/Voucher.vue";
import Invoice from "../views/shop/Invoice.vue";
import Customer from "../views/user/customer/Customer.vue";
import Order from "../views/shop/Order.vue";
import Product from "../views/product/laptop/Product.vue";
import Ram from "../views/product/ram/Ram.vue";
import Gpu from "../views/product/gpu/Gpu.vue";
import Cpu from "../views/product/cpu/Cpu.vue";
import Disk from "../views/product/disk/Disk.vue";
import Display from "../views/product/display/Display.vue";
import Color from "../views/product/color/Color.vue";
import Profile from "../views/user/Profile.vue";
import Saleoff from "../views/sale/Saleoff.vue";
import DataDisplay from "../views/DataDisplay.vue";
import Admin from "../views/Admin.vue";
import VoucherMain from "../views/voucher/VoucherMain.vue";
import SaleoffMain from "../views/sale/SaleoffMain.vue";
import AddCpu from "../views/product/cpu/CpuAdd.vue";
import CpuMain from "../views/product/cpu/CpuMain.vue";
import RamAdd from "../views/product/ram/RamAdd.vue";
import RamMain from "../views/product/ram/RamMain.vue";
import GpuMain from "../views/product/gpu/GpuMain.vue";
import GpuAdd from "../views/product/gpu/GpuAdd.vue";
import DiskMain from "../views/product/disk/DiskMain.vue";
import DiskAdd from "../views/product/disk/DiskAdd.vue";
import DisplayMain from "../views/product/display/DisplayMain.vue";
import DisplayAdd from "../views/product/display/DisplayAdd.vue";
import ProductMain from "../views/product/laptop/ProductMain.vue";
import ProductAdd from "../views/product/laptop/ProductAdd.vue";
import Employee from "../views/user/employee/Employee.vue";
import EmployeeMain from "../views/user/employee/EmployeeMain.vue";
import ProductDetail from "../views/product/laptop/ProductVariant.vue";
import CustomerMain from "../views/user/customer/CustomerMain.vue";
import EmployeeAdd from "../views/user/employee/EmployeeAdd.vue";
import CustomerAdd from "../views/user/customer/CustomerAdd.vue";
import SaleoffAdd from "../views/sale/SaleoffAdd.vue";
import Battery from "../views/product/battery/Battery.vue";
import BatteryMain from "../views/product/battery/BatteryMain.vue";
import VoucherAdd from "../views/voucher/VoucherAdd.vue";
import ProductVariant from "../views/product/laptop/ProductVariant.vue";

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/monitor",
        name: "Monitor",
        component: DataDisplay,
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "/employee",
        name: "Employee",
        component: Employee,
        children: [
          {
            path: "",
            name: "EmployeeDefault",
            component: EmployeeMain,
          },
          {
            path: "/employee/crud/:id?",
            name: "EmployeeCrud",
            component: () => import("../views/user/employee/EmployeeAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/customer",
        name: "Customer",
        component: Customer,
        children: [
          {
            path: "",
            name: "CustomerDefault",
            component: CustomerMain,
          },
          {
            path: "/customer/crud/:id?",
            name: "CustomerCrud",
            component: () => import("../views/user/customer/CustomerAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
      },
      {
        path: "/invoice",
        name: "Invoice",
        component: Invoice,
      },
      {
        path: "/saleoff",
        name: "Saleoff",
        component: Saleoff,
        children: [
          {
            path: "",
            name: "SaleoffDefault",
            component: SaleoffMain,
          },
          {
            path: "/saleoff/crud",
            name: "SaleoffCrud",
            component: SaleoffAdd,
          },
        ],
      },
      {
        path: "/voucher",
        name: "Voucher",
        component: Voucher,
        children: [
          {
            path: "",
            name: "VoucherDefault",
            component: VoucherMain,
          },
          {
            path: "/voucher/crud",
            name: "VoucherCrud",
            component: VoucherAdd,
          },
        ],
      },
      {
        path: "/product",
        name: "Product",
        component: Product,
        children: [
          {
            path: "",
            name: "ProductDefault",
            component: ProductMain,
          },
          {
            path: "/product/crud",
            name: "ProductCrud",
            component: ProductAdd,
          },
          {
            path: "/product/variant/:id?",
            name: "ProductVariant",
            component: () => import("../views/product/laptop/ProductVariant.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/cpu",
        name: "Cpu",
        component: Cpu,
        children: [
          {
            path: "",
            name: "CpuDefault",
            component: CpuMain,
          },
          {
            path: "/cpu/crud/:id?",
            name: "CpuCrud",
            component: () => import("../views/product/cpu/CpuAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/ram",
        name: "Ram",
        component: Ram,
        children: [
          {
            path: "",
            name: "RamDefault",
            component: RamMain,
          },
          {
            path: "/ram/crud/:id?",
            name: "RamCrud",
            component: () => import("../views/product/ram/RamAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/gpu",
        name: "Gpu",
        component: Gpu,
        children: [
          {
            path: "",
            name: "GpuDefault",
            component: GpuMain,
          },
          {
            path: "/gpu/crud/:id?",
            name: "GpuCrud",
            component: () => import("../views/product/gpu/GpuAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/disk",
        name: "Disk",
        component: Disk,
        children: [
          {
            path: "",
            name: "DiskDefault",
            component: DiskMain,
          },
          {
            path: "/disk/crud/:id?",
            name: "DiskCrud",
            component: () => import("../views/product/disk/DiskAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/display",
        name: "Display",
        component: Display,
        children: [
          {
            path: "",
            name: "DisplayDefault",
            component: DisplayMain,
          },
          {
            path: "/display/crud/:id?",
            name: "DisplayCrud",
            component: () => import("../views/product/display/DisplayAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/battery",
        name: "battery",
        component: Battery,
        children: [
          {
            path: "",
            name: "BatteryDefault",
            component: BatteryMain,
          },
          {
            path: "/battery/crud/:id?",
            name: "BatteryCrud",
            component: () => import("../views/product/battery/BatteryAdd.vue"),
            props: true,
          },
        ],
      },
      {
        path: "/color",
        name: "Color",
        component: Color,
        children: [
          {
            path: "/color/crud/:id?",
            name: "ColorCrud",
            component: () => import("../views/product/color/Color.vue"),
            props: true,
          },
        ]
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
