<template>
  <div class="h-screen flex">
    <!-- Sidebar bên trái -->
    <Sidebar />

    <!-- Phần Main bên phải với Scroll Panel -->
    <div class="flex flex-col flex-grow bg-gray-100 h-screen overflow-hidden">
      <!-- Global Bar (Cố định trên cùng) -->
      <GlobalBar class="flex-shrink-0" />

      <!-- Nội dung chính có thanh cuộn -->
      <div class="flex-grow p-6 overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import GlobalBar from "../components/GlobalBar.vue";
</script>
