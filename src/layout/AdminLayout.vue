<template>
    <div class="h-screen bg-gray-300 flex">
      <!-- Sidebar cố định -->
      <Sidebar class=" p-4" />
  
      <!-- Nội dung mở rộng -->
      <div class="bg-gray-100 h-100vh  flex-grow px-2">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "../components/Sidebar.vue";
  </script>
  