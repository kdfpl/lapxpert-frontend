<template>
  <div class="navbar bg-base-100 backdrop-blur-lg border-b border-gray-300 shadow-md">
    <div class="ml-auto flex gap-1">
      <!-- Nút thông báo -->
      <button class="btn btn-ghost btn-circle relative">
        <FontAwesomeIcon :icon="faBell" class="text-xl" />
        <span class="badge badge-error badge-sm absolute top-0 right-0">3</span>
      </button>

      <!-- Avatar + Dropdown -->
      <div class="dropdown dropdown-end">
        <button @click="toggleUserMenu" class="btn btn-ghost flex items-center gap-2">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" class="w-8 h-8 rounded-full" />
          <span class="hidden md:inline">Admin</span>
          <FontAwesomeIcon :icon="faChevronDown" class="text-sm" />
        </button>

        <ul v-if="isUserMenuOpen" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border">
          <li><RouterLink to="/profile">Hồ sơ</RouterLink></li>
          <li><RouterLink to="/settings">Cài đặt</RouterLink></li>
          <li>
            <button @click="logout" class="text-red-600 hover:bg-red-100">
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const isUserMenuOpen = ref(false);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logout = () => {
  alert("Đăng xuất thành công!");
};
</script>
