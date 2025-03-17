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
import AddVoucher from "../views/voucher/AddVoucher.vue";
import VoucherMain from "../views/voucher/VoucherMain.vue";
import SaleoffMain from "../views/sale/SaleoffMain.vue";
import AddSaleoff from "../views/sale/AddSaleoff.vue";
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
import EmployeeAdd from "../views/user/employee/EmployeeAdd.vue";
import CustomerMain from "../views/user/customer/CustomerMain.vue";
import CustomerAdd from "../views/user/customer/CustomerAdd.vue";
import ProductDetail from "../views/product/laptop/ProductVariant.vue";

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
            path: "/employee/add",
            name: "EmployeeAdd",
            component: EmployeeAdd,
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
            path: "/customer/add",
            name: "CustomerAdd",
            component: CustomerAdd,
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
            path: "/saleoff/add",
            name: "AddSaleoff",
            component: AddSaleoff,
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
            path: "/voucher/add",
            name: "AddVoucher",
            component: AddVoucher,
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
            path: "/product/add",
            name: "ProductAdd",
            component: ProductAdd,
          },
          {
            path: "/product/variant",
            name: "ProductVariant",
            component: ProductDetail,
          }
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
            path: "/cpu/add",
            name: "CpuAdd",
            component: AddCpu,
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
            path: "/ram/add",
            name: "RamAdd",
            component: RamAdd,
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
            path: "/gpu/add",
            name: "GpuAdd",
            component: GpuAdd,
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
            path: "/disk/add",
            name: "DiskAdd",
            component: DiskAdd,
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
            path: "/display/add",
            name: "DisplayAdd",
            component: DisplayAdd,
          },
        ],
      },
      {
        path: "/color",
        name: "Color",
        component: Color,
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
