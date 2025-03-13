<template>
  <!-- Sidebar -->
  <div
    :class="[
      'transition-all  duration-300 border-r border-gray-300 shadow-lg flex flex-col backdrop-blur-lg',
      isCollapsed ? 'w-20 bg-white' : 'w-72 bg-white',
    ]"
  >
    <!-- Logo + Toggle Button -->
    <div class="flex justify-between items-center gap-4 p-4">
      <img
        v-if="!isCollapsed"
        src="../assets/img/logo.png"
        alt="Logo"
        class="h-7 transition-all duration-300"
      />
      <button
        @click="toggleSidebar"
        class="rounded  hover:bg-gray-300 transition"
      >
        <FontAwesomeIcon :icon="faList" class="text-2xl" />
      </button>
    </div>

    <!-- Menu -->
    <ul class="flex-1 mt-10">
      <li v-for="(menu, index) in menuItems" :key="index">
        <div class="group">
          <!-- Nếu có submenu, hiển thị nút toggle -->
          <button
            v-if="menu.subItems"
            @click="toggleSubMenu(index)"
            class="flex items-center justify-between p-3 w-full hover:bg-gray-300 rounded transition"
          >
            <div class="flex items-center transition duration-300">
              <FontAwesomeIcon  :icon="menu.icon" class="text-2xl" />
              <span v-if="!isCollapsed" class="ml-3">{{ menu.name }}</span>
            </div>
            <FontAwesomeIcon
              v-if="!isCollapsed"
              :icon="showSubItems[index] ? faChevronDown : faChevronRight"
              class="size-4 transition-transform duration-200"
              :class="{ 'rotate-90': showSubItems[index] }"
            />
          </button>

          <!-- Nếu không có submenu, dùng RouterLink -->
          <RouterLink
            v-else
            :to="menu.link"
            class="flex items-center p-3 w-full hover:bg-gray-300 rounded transition"
          >
            <FontAwesomeIcon :icon="menu.icon" class="text-2xl" />
            <span v-if="!isCollapsed" class="ml-3">{{ menu.name }}</span>
          </RouterLink>

          <!-- Submenu -->
          <ul
            v-if="menu.subItems && showSubItems[index] && !isCollapsed"
            class="pl-6"
          >
            <li v-for="(subMenu, subIndex) in menu.subItems" :key="subIndex">
              <div class="group">
                <RouterLink
                  v-if="!subMenu.subItems"
                  :to="subMenu.link"
                  class="flex items-center p-2 hover:bg-gray-200/50 rounded transition"
                >
                  <FontAwesomeIcon :icon="subMenu.icon" class="" />
                  <span class="ml-3">{{ subMenu.name }}</span>
                </RouterLink>
                <button
                  v-else
                  @click="toggleSubMenu(subMenu.name)"
                  class="flex items-center justify-between p-2 w-full hover:bg-gray-200/50 rounded transition"
                >
                  <div class="flex items-center">
                    <FontAwesomeIcon :icon="subMenu.icon" class="" />
                    <span class="ml-3">{{ subMenu.name }}</span>
                  </div>
                  <FontAwesomeIcon
                    :icon="showSubItems[subMenu.name] ? faChevronDown : faChevronRight"
                    class=" transition-transform duration-200"
                    :class="{ 'rotate-90': showSubItems[subMenu.name] }"
                  />
                </button>

                <!-- Sub-submenu -->
                <ul
                  v-if="subMenu.subItems && showSubItems[subMenu.name]"
                  class="pl-6"
                >
                  <li v-for="(subSubMenu, subSubIndex) in subMenu.subItems" :key="subSubIndex">
                    <RouterLink
                      :to="subSubMenu.link"
                      class="flex items-center p-2 hover:bg-gray-200/50 rounded transition"
                    >
                      <FontAwesomeIcon :icon="subSubMenu.icon" />
                      <span class="ml-3">{{ subSubMenu.name }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faList,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
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
  faBatteryEmpty,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

const isCollapsed = ref(false);
const showSubItems = ref({});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const toggleSubMenu = (key) => {
  showSubItems.value[key] = !showSubItems.value[key];
};

const menuItems = ref([
  { name: "Bảng thống kê", icon: faHouse, link: "/monitor" },
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
      {
        name: "Danh sách sản phẩm",
        icon: faLaptop,
        link: "/san-pham",
      },
      {
        name: "Thuộc tính",
        icon: faMicrochip,
        link: "#",
        subItems: [
          { name: "CPU", icon: faMicrochip, link: "/cpu" },
          { name: "RAM", icon: faMemory, link: "/ram" },
          { name: "GPU", icon: faMicrochip, link: "/gpu" },
          { name: "Ổ cứng", icon: faHardDrive, link: "/oCung" },
          { name: "Màn hình", icon: faDisplay, link: "/manHInh" },
          { name: "Màu sắc", icon: faPalette, link: "/color" },
          { name: "pin", icon: faBatteryEmpty, link: "/pin" },
        ],
      },
    ],
  },
  { name: "Giảm giá", icon: faTicket, link: "/saleoff" },
  {
    name: "Người dùng",
    icon: faUsers,
    subItems: [
      { name: "Nhân viên", icon: faUser, link: "/NhanVien" },
      { name: "Khách hàng", icon: faUserGroup, link: "/KhachHang" },
    ],
  },
]);
</script>
