<template>
    <div
      class="flex h-13 items-center py-1 justify-end px-6 bg-white/40 backdrop-blur-lg border-b border-gray-300 relative z-50"
    >
      <!-- User Actions -->
      <div class="flex items-center gap-6">
        <button class="relative p-2 hover:bg-gray-200 rounded-full">
          <FontAwesomeIcon :icon="faBell" class="text-xl" />
          <span
            class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
            >3</span
          >
        </button>
  
        <div class="relative">
          <button @click="toggleUserMenu" class="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              class="w-8 h-8 rounded-full"
            />

            <span class="hidden md:block">Admin</span>

            <FontAwesomeIcon :icon="faChevronDown" class="text-sm" />
          </button>
  
          <!-- User Dropdown -->
          <div
            v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <RouterLink to="/profile" class="block px-4 py-2 hover:bg-gray-100"
              >Hồ sơ</RouterLink
            >
            <RouterLink to="/settings" class="block px-4 py-2 hover:bg-gray-100"
              >Cài đặt</RouterLink
            >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import {
    faBell,
    faChevronDown,
  } from "@fortawesome/free-solid-svg-icons";
  
  const isUserMenuOpen = ref(false);
  
  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  };
  
  const logout = () => {
    alert("Đăng xuất thành công!");
  };
  </script>
  