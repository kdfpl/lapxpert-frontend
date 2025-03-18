<template>
  <div class="h-screen flex">
    <!-- Sidebar bên trái -->
    <Sidebar class="flex-shrink-0" />

    <!-- Phần Main bên phải -->
    <div class="flex flex-col flex-grow h-screen bg-base-300 col-span-1 shadow-[inset_1px_1px_25px_rgba(0,0,0,0.5)]">
      <!-- Global Bar (Cố định trên cùng) -->
      <GlobalBar class="flex-shrink-0 z-20" />

      <div class="p-5 flex-col h-fit bg-base-300 flex-grow">
        <!-- Nội dung chính có thanh cuộn -->
        <div
          class="p-3 h-full bg-base-100 z-10 rounded-2xl "
        >
          <router-view />
        </div>
      </div>
      <footer
        class="flex-shrink-0 justify-center bg-base-100 shadow-[0_-1px_4px_rgba(0,0,0,0.2)] items-center p-2 footer "
      >
        <h6>Đây là footer</h6>
      </footer>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import GlobalBar from "../components/GlobalBar.vue";
</script>
