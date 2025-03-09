<template>
    <div class="h-screen bg-gray-400 flex gap-3">
      <!-- Sidebar cố định -->
      <Sidebar class="rounded-lg p-4" />
  
      <!-- Nội dung mở rộng -->
      <div class="bg-gray-100 flex-grow p-4">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "../components/Sidebar.vue";
  </script>
  