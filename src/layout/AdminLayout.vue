<template>
  <div class="h-screen flex">
    <!-- Sidebar bên trái -->
    <Sidebar class="flex-shrink-0" />

    <!-- Phần Main bên phải -->
    <div class="flex flex-col flex-grow bg-base h-screen">
      <!-- Global Bar (Cố định trên cùng) -->
      <GlobalBar class="flex-shrink-0 z-20" />

      <!-- Nội dung chính có thanh cuộn -->
      <div class="flex-grow pl-6 pr-6 z-10 pt-6 overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import GlobalBar from "../components/GlobalBar.vue";
</script>