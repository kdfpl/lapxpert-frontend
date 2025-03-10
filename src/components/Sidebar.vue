<script setup>
import { ref } from "vue";
import router from "../router";
import {
  Home,
  ContactRound,
  Package,
  User,
  AlignJustify,
  ShoppingCart,
  Power,
  SquarePercent ,
  BookUser 
} from "lucide-vue-next";

// Danh sách menu
const menuItems = ref([
  { name: "Trang chủ", icon: Home, link: "/" },
  { name: "Profile", icon: User, link: "/profile" },
  {
    name: "Kho hàng",
    icon: Package,
    link: "/san-pham",
    subItems: [
      { name: "Sản phẩm", link: "/san-pham" },
      { name: "Ram", link: "/ram" },
      { name: "Màn hình", link: "/manHInh" },
      { name: "CPU", link: "/cpu" },
      { name: "GPU", link: "/gpu" },
      { name: "Ổ cứng", link: "/oCung" },
      { name: "Màu Sắc", link: "/color" },
      { name: "Pin", link: "/pin" },
    ],
  },
  {
    name: "Tài khoản",
    icon: ContactRound,
    link: "#",
    subItems: [
      { name: "Nhân viên", link: "/NhanVien" },
      { name: "Khách hàng", link: "/KhachHang" },
    ],
  },
  {
    name: "Bán hàng",
    icon: ShoppingCart,
    link: "#",
    subItems: [
      { name: "Hoá đơn", link: "#" },
      { name: "Giảm giá", link: "#" },
    ],
  },
  {
    name: "Giảm giá",
    icon: SquarePercent,
    link: "/GiamGia"
  },
]);

const isShow = ref(true);
const showSubItems = ref({});

// Toggle submenu
const toggleSubMenu = (index) => {
  showSubItems.value[index] = !showSubItems.value[index];
};
</script>

<template>
  <div
    :class="[isShow ? 'w-90 py-4' : 'w-20 p-2']"
    class="h-full bg-white transition-all duration-300 ease-in-out overflow-hidden"
  >
    <ul class="space-y-2 font-medium">
      <li class="flex justify-evenly items-center">
        <router-link
          to="/"
          :class="[{ hidden: !isShow }]"
          class="flex items-center p-2 hover:bg-gray-300 border-0 rounded-2xl"
        >
          <img src="../assets/img/logo.png" alt="" />
        </router-link>

        <div class="flex h-15 items-center">
          <component
            @click="isShow = !isShow"
            :is="AlignJustify"
            class="w-8 h-8"
          />
        </div>
      </li>
      <div class="border-1"></div>

      <li class="inline-flex mt-3 gap-3 items-end mb-16">
        <img
          class="w-12 h-12 rounded-full object-cover"
          src="https://i.pravatar.cc/150"
          alt="User Avatar"
        />
        <div :class="[{ hidden: !isShow }]" class="text-2xl">
          User name
          <div class="border-1 border-gray-300"></div>
        </div>
      </li>

      <li
        class="items-center m-0"
        v-for="(menu, index) in menuItems"
        :key="index"
      >
        <router-link :to="menu.link">
          <div
            class="flex items-center m-0 hover:bg-gray-300 border-0 rounded-2xl cursor-pointer"
            @click="toggleSubMenu(index)"
          >
            <div class="border-r border-gray-800 p-4">
              <component :is="menu.icon" class="w-6 h-6" />
            </div>
            <div
              :class="[{ hidden: !isShow }]"
              class="ml-3 pr-4 grow flex justify-between items-center"
            >
              {{ menu.name }}
              <svg
                v-if="menu.subItems"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide w-6 h-6 lucide-chevron-down"
                @click="showSubItem = !showSubItem"
                :class="{ 'rotate-180': showSubItems[index] }"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </router-link>

        <!-- Dropdown Submenu với hiệu ứng xổ xuống -->
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            showSubItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          "
        >
          <ul class="pl-10">
            <li
              v-for="subMenu in menu.subItems"
              :key="subMenu.name"
              
              :class="[{ hidden: !isShow }]"
            >
              <router-link class="pl-4 py-1 hover:bg-gray-300 flex items-center border-0 rounded-2xl" :to="subMenu.link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                {{ subMenu.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <footer class="text-red-500 cursor-pointer">
      <div
        class="flex items-center m-0 hover:bg-gray-300 border-0 rounded-2xl cursor-pointer"
        @click="toggleSubMenu(index)"
      >
        <div class="border-r border-red-500 p-4">
          <component :is="Power" class="w-6 h-6" />
        </div>
        <div
          :class="[{ hidden: !isShow }]"
          class="ml-3 pr-4 grow flex justify-between items-center"
        >
          Đăng xuất
        </div>
      </div>
    </footer>
  </div>
</template>
