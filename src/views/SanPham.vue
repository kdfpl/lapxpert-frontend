<script setup>
import { ref, computed } from "vue";
import GlassTable from "../components/customTable.vue";

  const headers = [
    "STT",
    "Tên SP",
    "Ảnh",
    "Ngày Thêm",
    "Số lượng",
    "Trạng thái",
    "Thao tác",
  ];
  const data = Array(20).fill([
    "demo",
    "demo",
    "demo",
    "demo",
    "demo",
    "demo",
    "demo",
  ]);

const search = ref("");
const searchLength = computed(() => search.value.length);
</script>
<template>
  <div class="h-screen flex flex-col">
    <div class="flex-grow flex">
      <div v-if="activePanel === 'left'" class="w-full bg-gray-100 p-4">
        <h2 class="text-xl font-bold mb-5">Thêm Sản Phẩm</h2>

        <div class="flex flex-col space-y-5">
          <div class="flex">
            <div class="w-90 flex-none mr-5 items-center bg-white p-5 border rounded-lg">
              <img src="../assets/img/images.jpg" alt="Ảnh sản phẩm" class="rounded-lg w-80 mb-2" />
              <div class="flex">
                <h3 class="mt-0.5 flex-none text-lg font-semibold mr-4">ẢNH SẢN PHẨM</h3>
                <button class="flex-1 p-1 bg-blue-500 text-white rounded-lg">CHỌN FILE</button>
              </div>
            </div>
            <div class="flex-initial w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Thông tin chung</h3>
              <input type="text" placeholder="Tên" class="w-40 h-10 mr-4 p-2 border rounded" />
              <select class="w-40 h-10 mr-4 p-2 border rounded">
                <option value="" disabled selected>Loại máy</option>
                <option>Loai 1</option>
                <option>Loai 2</option>
                <option>Loai 3</option>
                <option>Loai 4</option>
              </select>
              <select class="w-40 h-10 p-2 border rounded">
                <option value="" disabled selected>Trạng thái</option>
                <option>Đang Bán</option>
                <option>Ngừng Bán</option>
              </select>
              <div class="flex">
                <div>
                                    <textarea placeholder="Mô tả"
                                              class="w-84 h-24 mt-4 mr-4 p-2 border rounded"></textarea>
                </div>
                <div class="flex flex-col space-y-4">
                  <select class="w-40 h-10 mt-4 p-2 border rounded">
                    <option value="" disabled selected>Hãng</option>
                    <option>Hang 1</option>
                    <option>Hang 2</option>
                    <option>Hang 3</option>
                    <option>Hang 4</option>
                  </select>
                  <select class="w-40 h-10 p-2 border rounded">
                    <option value="" disabled selected>Hệ điều hành</option>
                    <option>Hdh 1</option>
                    <option>Hdh 2</option>
                    <option>Hdh 3</option>
                    <option>Hdh 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="flex-none mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
              <h3 class="text-lg font-semibold mb-4">Thông tin chi tiết</h3>

              <select class="w-40 h-10 mr-4 p-2 border rounded">
                <option value="" disabled selected>Pin</option>
                <option>Pin 1</option>
                <option>Pin 2</option>
                <option>Pin 3</option>
                <option>Pin 4</option>
              </select>
              <select class="w-40 h-10 mr-4 p-2 border rounded">
                <option value="" disabled selected>Màu</option>
                <option>Color 1</option>
                <option>Color 2</option>
                <option>Color 3</option>
                <option>Color 4</option>
              </select>
              <select class="w-40 h-10 p-2 border rounded">
                <option value="" disabled selected>Ổ Cứng</option>
                <option>Drive 1</option>
                <option>Drive 2</option>
                <option>Drive 3</option>
                <option>Drive 4</option>
              </select>
              <select class="w-40 h-10 mt-4 mr-4 p-2 border rounded">
                <option value="" disabled selected>RAM</option>
                <option>RAM 1</option>
                <option>RAM 2</option>
                <option>RAM 3</option>
                <option>RAM 4</option>
              </select>
              <select class="w-40 h-10 mt-4 mr-4 p-2 border rounded">
                <option value="" disabled selected>CPU</option>
                <option>CPU 1</option>
                <option>CPU 2</option>
                <option>CPU 3</option>
                <option>CPU 4</option>
              </select>
              <select class="w-40 h-10 mt-4 p-2 border rounded">
                <option value="" disabled selected>GPU</option>
                <option>GPU 1</option>
                <option>GPU 2</option>
                <option>GPU 3</option>
                <option>GPU 4</option>
              </select>
              <select class="w-128 h-10 mt-4 p-2 border rounded">
                <option value="" disabled selected>Màn hình</option>
                <option>Screen 1</option>
                <option>Screen 2</option>
                <option>Screen 3</option>
                <option>Screen 4</option>
              </select>
            </div>
            <div class="flex w-90 flex-initial items-center bg-white p-5 border rounded-lg">
              <div class="flex flex-col">
                <input type="number" class="w-80 h-10 p-2 border rounded-lg" placeholder="Giá">
                <input type="number" class="w-80 h-10 mt-4 mb-4 p-2 border rounded-lg"
                       placeholder="Số lượng">
                <button class="justify-self-center p-1 bg-blue-500 text-white rounded-lg"
                        @click="activePanel = 'right'">Thêm Sản Phẩm</button>
                <button class="justify-self-center p-1 bg-red-600 mt-2 text-white rounded-lg"
                        @click="activePanel = 'right'">Quay lại danh sách</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-if="activePanel === 'right'" class="w-full h-full bg-gray-200 p-4">
        <h2 class="text-xl font-bold">Danh Sách Sản Phẩm</h2>
        <div class="relative w-full mt-5">
          <!-- Banner -->
          <div class="w-full h-50 overflow-hidden rounded-lg">
            <img class="w-full h-full object-cover" src="../assets/img/RamBanner.jpg" alt="Banner" />
          </div>

          <!-- Thẻ thông tin đè lên -->
          <div
              class="absolute bottom-[-40px] justify-center bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex items-center space-x-4">
            <h1 class="text-3xl font-bold">DANH SÁCH SẢN PHẨM</h1>
          </div>
        </div>
        <div class="flex justify-between mt-16">
          <div class="flex items-center max-w-md shadow-md bg-white rounded-md" v-data="{ search: '' }">
            <div class="w-60">
              <input v-model="search" type="search"
                     class="w-full px-5 py-1 rounded-full bg-white text-gray-900 focus:outline-none"
                     placeholder="search" />
            </div>
            <div>
              <button type="submit"
                      class="flex items-center justify-center w-12 h-12 text-white rounded-r-lg" :class="searchLength > 0 ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'
                                    " :disabled="searchLength === 0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button
                class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md"
                @click="activePanel = 'left'">
              + THÊM
            </button>

            <button
                class="px-6 py-2 rounded-lg font-semibold border text-black bg-white/20 backdrop-blur-lg shadow-lg transition-all duration-200 ease-out hover:bg-white/30 hover:border-white/60 hover:scale-105 active:scale-95 active:shadow-md">
              XUẤT
            </button>
          </div>
        </div>
        <div class="flex mt-3">
          <label class="ml-1 mr-1 font-semibold">Trạng thái: </label>
          <input type="radio" checked class="mr-1 ml-3"> Tất Cả
          <input type="radio" class="mr-1 ml-3"> Đang Bán
          <input type="radio" class="mr-1 ml-3"> Ngừng Bán
        </div>
        <div class="flex justify-center sticky top-[100vh] mt-5 items-center">
          <GlassTable :headers="headers" :data="data" rowHeight="h-20"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TwoPanelView",
  data() {
    return {
      activePanel: 'right',
    };
  },
};
</script>

<style scoped></style>