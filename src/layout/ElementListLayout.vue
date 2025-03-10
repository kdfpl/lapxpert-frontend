<script setup>
import { ref, computed } from 'vue';
import customTable from '../components/customTable.vue';
defineProps({
  title: String,
  image: String,
  headers: Array,
  data: Array,
  rowHeight: {
    type: String,
    default: "h-24", 
  },
  link: String
});

const search = ref("");
const searchLength = computed(() => search.value.length);
</script>

<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg">
      <img class="w-full h-full object-cover" :src="image"  alt="Banner" />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] justify-center bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex items-center space-x-4"
    >
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
  </div>

  <div class="flex justify-between mt-16">
    <div class="flex items-center max-w-md shadow-md bg-white rounded-md">
      <div class="w-60">
        <input
          v-model="search"
          type="search"
          class="w-full px-5 py-1 rounded-full bg-white text-gray-900 focus:outline-none"
          placeholder="search"
        />
      </div>
      <div>
        <button
          type="submit"
          class="flex items-center justify-center w-12 h-12 text-white rounded-r-lg"
          :class="searchLength > 0 ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'"
          :disabled="searchLength === 0"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex space-x-3">
      <button class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
        <router-link :to="link">+ THÊM</router-link>
      </button>

      <button class="px-6 py-2 rounded-lg font-semibold border text-black bg-white/20 backdrop-blur-lg shadow-lg transition-all duration-200 ease-out hover:bg-white/30 hover:border-white/60 hover:scale-105 active:scale-95 active:shadow-md">
        XUẤT
      </button>
    </div>
  </div>

  <div class="flex justify-center sticky top-[100vh] mt-5 items-center">
    <customTable :headers="headers" :data="data" :rowHeight="rowHeight"/>
  </div>
</template>
