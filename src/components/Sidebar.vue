<template>
  <div
    :class="[
      'transition-all duration-300 bg-base-100 flex flex-col overflow-hidden',
      isCollapsed ? 'w-fit' : 'w-72 ',
    ]"
  >
    <!-- Logo + Toggle Button -->
    <div
      class="flex justify-between items-center gap-4 p-4 border-b border-base-300"
    >
      <DotLottieVue
        src="/src/assets/lapxpert/lapxpert.json"
        autoplay
        :speed=1
        v-if="!isCollapsed"
      />

      <button
        @click="toggleSidebar"
        class="btn btn-ghost text-primary btn-sm"
      >
        <FontAwesomeIcon :icon="faList" class="text-2xl" />
      </button>
    </div>

    <!-- Menu -->
    <ul class="menu text-primary p-2 flex-1 mt-2">
      <li v-for="(menu, index) in menuItems" :key="index">
        <details v-if="menu.subItems">
          <summary class="flex items-center">
            <FontAwesomeIcon
              :icon="menu.icon"
              class="text-xl text-primary"
            />
            <span v-if="!isCollapsed" class="ml-3 text-primary">{{
              menu.name
            }}</span>
          </summary>
          <ul>
            <li v-for="(subMenu, subIndex) in menu.subItems" :key="subIndex">
              <RouterLink
                v-if="!subMenu.subItems"
                :to="subMenu.link"
                class="hover:bg-base-200 rounded"
              >
                <FontAwesomeIcon
                  :icon="subMenu.icon"
                  class="text-lg text-primary"
                />
                <span v-if="!isCollapsed" class="ml-3 text-primary">{{
                  subMenu.name
                }}</span>
              </RouterLink>
              <details v-else>
                <summary class="flex items-center">
                  <FontAwesomeIcon
                    :icon="subMenu.icon"
                    class="text-lg text-primary"
                  />
                  <span v-if="!isCollapsed" class="ml-3 text-primary">{{
                    subMenu.name
                  }}</span>
                </summary>
                <ul>
                  <li
                    v-for="(subSubMenu, subSubIndex) in subMenu.subItems"
                    :key="subSubIndex"
                  >
                    <RouterLink
                      :to="subSubMenu.link"
                      class="hover:bg-base-200 rounded"
                    >
                      <FontAwesomeIcon
                        :icon="subSubMenu.icon"
                        class="text-primary"
                      />
                      <span
                        v-if="!isCollapsed"
                        class="ml-3 text-primary"
                        >{{ subSubMenu.name }}</span
                      >
                    </RouterLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
        <RouterLink v-else :to="menu.link" class="hover:bg-base-200 rounded">
          <FontAwesomeIcon
            :icon="menu.icon"
            class="text-xl text-primary"
          />
          <span v-if="!isCollapsed" class="ml-3 text-primary">{{
            menu.name
          }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faUsers,
  faUser,
  faUserGroup,
  faCashRegister,
  faTruck,
  faFileInvoice,
  faTicket,
  faBox,
  faLaptop,
  faMicrochip,
  faMemory,
  faHardDrive,
  faDisplay,
  faPalette,
  faBatteryEmpty,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const isCollapsed = ref(false);
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const menuItems = ref([
  { name: "Bảng thống kê", icon: faHouse, link: "/thongke" },
  {
    name: "Bán hàng",
    icon: faCashRegister,
    subItems: [
      { name: "Đơn hàng", icon: faTruck, link: "/order" },
      { name: "Hóa đơn", icon: faFileInvoice, link: "/invoice" },
    ],
  },
  {
    name: "Sản phẩm",
    icon: faBox,
    subItems: [
      { name: "Danh sách sản phẩm", icon: faLaptop, link: "/admin/san-pham" },
      {
        name: "Danh sách phiên bản",
        icon: faClipboardList,
        link: "/admin/san-pham-chi-tiet",
      },
      {
        name: "Thuộc tính",
        icon: faMicrochip,
        subItems: [
          { name: "CPU", icon: faMicrochip, link: "/admin/cpu" },
          { name: "RAM", icon: faMemory, link: "/admin/ram" },
          { name: "GPU", icon: faMicrochip, link: "/admin/gpu" },
          { name: "Ổ cứng", icon: faHardDrive, link: "/admin/o-cung" },
          { name: "Màn hình", icon: faDisplay, link: "/admin/man-hinh" },
          { name: "Pin", icon: faBatteryEmpty, link: "/admin/pin" },
          { name: "Màu sắc", icon: faPalette, link: "/admin/mau-sac" },
        ],
      },
    ],
  },
  {
    name: "Giảm giá",
    icon: faTicket,
    subItems: [
      { name: "Phiếu giảm giá", icon: faTicket, link: "/admin/giam-gia" },
      { name: "Đợt giảm giá", icon: faTicket, link: "/admin/saleoff" },
    ],
  },
  {
    name: "Người dùng",
    icon: faUsers,
    subItems: [
      { name: "Nhân viên", icon: faUser, link: "/admin/nhan-vien" },
      { name: "Khách hàng", icon: faUserGroup, link: "/admin/khach-hang" },
    ],
  },
]);
</script>
