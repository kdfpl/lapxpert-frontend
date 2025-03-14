<script setup>
import RichTextEditor from "../../components/RichTextEditor.vue";
import { ref } from "vue";
import TabPanel from "../../components/TabPanel.vue";

const tabs = [
  { label: "1. MEDIA RAM", key: "panel1" },
  { label: "2. THÔNG TIN RAM", key: "panel2" },
];

const ram = ref({
  id_loai_ram: "",
  ma_ram: "",
  dung_luong_ram: "",
  so_khe_ram: "",
  ho_tro_toi_da: "",
});

// Danh sách loại RAM (giả lập từ database)
const ramTypes = ref([
  { id: 1, name: "DDR3" },
  { id: 2, name: "DDR4" },
  { id: 3, name: "DDR5" },
]);
</script>
<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg">
      <img
        class="w-full h-full object-cover"
        src="../../assets/img/RamBanner.jpg"
        alt="Banner"
      />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4"
    >
      <h1 class="text-3xl font-bold">THÊM/SỬA RAM</h1>
      <button
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md"
      >
        <router-link to="/ram">Danh Sách</router-link>
      </button>
    </div>
  </div>
  <div class="w-[90%] flex-none items-center mx-auto justify-center mt-20">
    <TabPanel :tabs="tabs">
      <template #panel2>
        <h2 class="text-3xl font-bold mb-3">Nhập thông tin</h2>
        <form action="" class="grid grid-cols-2 gap-4 p-4 rounded-lg shadow-md">
          <!-- Loại RAM (Foreign Key - FK) -->
          <div class="flex flex-col">
            <label for="id_loai_ram" class="text-sm font-semibold text-gray-600"
              >Loại RAM</label
            >
            <select
              id="id_loai_ram"
              v-model="ram.id_loai_ram"
              class="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              <option
                v-for="(type, index) in ramTypes"
                :key="index"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
          </div>

          <!-- Mã RAM -->
          <div class="flex flex-col">
            <label for="ma_ram" class="text-sm font-semibold text-gray-600"
              >Mã RAM</label
            >
            <input
              type="text"
              id="ma_ram"
              v-model="ram.ma_ram"
              class="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>

          <!-- Dung lượng RAM -->
          <div class="flex flex-col">
            <label
              for="dung_luong_ram"
              class="text-sm font-semibold text-gray-600"
              >Dung lượng RAM</label
            >
            <input
              type="text"
              id="dung_luong_ram"
              v-model="ram.dung_luong_ram"
              class="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>

          <!-- Số khe RAM -->
          <div class="flex flex-col">
            <label for="so_khe_ram" class="text-sm font-semibold text-gray-600"
              >Số khe RAM</label
            >
            <input
              type="number"
              id="so_khe_ram"
              v-model="ram.so_khe_ram"
              class="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>

          <!-- Hỗ trợ tối đa -->
          <div class="flex flex-col">
            <label
              for="ho_tro_toi_da"
              class="text-sm font-semibold text-gray-600"
              >Hỗ trợ tối đa</label
            >
            <input
              type="text"
              id="ho_tro_toi_da"
              v-model="ram.ho_tro_toi_da"
              class="border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            />
          </div>

          <!-- Nút Gửi -->
          <div class="col-span-2 flex justify-end">
            <button
              @click="TabPanel.setActiveTab('panel2')"
              class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md"
            >
              Lưu
            </button>
          </div>
        </form>
      </template>
      <template #panel1>
        <div class="w-full flex-none mr-5 items-center bg-white p-5 rounded-lg">
          <img
            src="../../assets/img/CPUBanner.jpg"
            alt="Ảnh sản phẩm"
            class="rounded-lg w-full h-100 object-cover mb-2"
          />

          <div
            class="border-dashed border-2 border-gray-300 p-6 text-gray-400 rounded-lg text-center"
          >
            THẢ FILE HOẶC TẢI ẢNH LÊN
          </div>
        </div>
      </template>
    </TabPanel>
  </div>
</template>
