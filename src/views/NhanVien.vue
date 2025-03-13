<template>
    <div class="p-6 mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <div class="relative h-40 bg-cover"
           style="background-image: url('https://res.cloudinary.com/dieecfslw/image/upload/v1741460349/12345c36aa3437fa03063025316842dd_ecpkm6.png'); background-position: center -70px; margin-bottom: 20px;">
      </div>
  
  
      <!-- Tìm kiếm -->
      <div class="flex items-center gap-3 mb-4">
        <input type="text" placeholder="Mã, tên, sdt, email..."
               class="border border-gray-300 rounded-lg p-2 w-64 outline-none" />
        <button class="bg-black text-white px-4 py-2 rounded-lg duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">Tìm kiếm</button>
      </div>
  
  
      <!-- Bộ lọc trạng thái -->
      <div class="flex items-center gap-4 mb-4 ml-12">
        <span class="text-gray-600 font-semibold">Trạng thái:</span>
        <label class="flex items-center">
          <input type="radio" name="status" class="mr-2" checked />
          Tất cả
        </label>
        <label class="flex items-center">
          <input type="radio" name="status" class="mr-2" checked />
          Hoạt động
        </label>
        <label class="flex items-center">
          <input type="radio" name="status" class="mr-2" />
          Nghỉ việc
        </label>
      </div>
  
      <div class="flex justify-end items-center gap-3 mb-4">
        <!-- Ô chọn file -->
        <div class="border border-gray-300 rounded-lg p-2 flex items-center gap-2">
          <input type="file" class="hidden" id="fileUpload" />
          <label for="fileUpload"
                 class="cursor-pointer text-gray-600 px-3 py-1 border border-gray-300 rounded-md">
            Choose file
          </label>
          <input type="text" placeholder="No file chosen"
                 class="border border-gray-300 px-2 py-1 rounded-md w-40 outline-none bg-white text-gray-600"
                 disabled />
        </div>
  
        <!-- Nút Nhập Excel & Thêm nhân viên -->
        <button class="border border-gray-300 px-4 py-2 duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md rounded-lg bg-gray-100 hover:bg-gray-200">
          Nhập Excel
        </button>
        <button class="border border-gray-300 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
          Thêm nhân viên
        </button>
      </div>
  
  
  
      <!-- Bảng danh sách nhân viên -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2 w-10">STT</th>
            <th class="border border-gray-300 p-2 w-20">Mã</th>
            <th class="border border-gray-300 p-2 w-40">Họ tên</th>
            <th class="border border-gray-300 p-2 w-32">Số điện thoại</th>
            <th class="border border-gray-300 p-2 w-60">Địa chỉ</th>
            <th class="border border-gray-300 p-2 w-28">Trạng Thái</th>
            <th class="border border-gray-300 p-2 w-32">Thao Tác</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(employee, index) in employees" :key="index" class="text-center">
            <td class="border border-gray-300 p-2">{{ index + 1 }}</td>
            <td class="border border-gray-300 p-2">{{ employee.code }}</td>
            <td class="border border-gray-300 p-2">{{ employee.name }}</td>
            <td class="border border-gray-300 p-2">{{ employee.phone }}</td>
            <td class="border border-gray-300 p-2">{{ employee.address }}</td>
            <td class="border border-gray-300 p-2">
                              <span
                                  :class="employee.status === 'Hoạt động' ? 'text-green-600 border border-green-600 px-2 py-1 rounded' : 'text-red-600 border border-red-600 px-2 py-1 rounded'">
                                  {{ employee.status }}
                              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <button class="text-black-500 hover:text-black mx-2">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="hover:text-black mx-2">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="text-black-500 hover:text-black mx-2">
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Phân trang -->
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center gap-2">
          <span>Xem</span>
          <select class="border border-gray-300 rounded-lg p-1">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
          <span>Nhân viên</span>
        </div>
        <div class="flex gap-2">
          <button class="border border-gray-300 px-3 py-1 rounded"><i class="fa-solid fa-arrow-left"></i></button>
          <button class="border border-gray-300 px-3 py-1 rounded bg-gray-200">1</button>
          <button class="border border-gray-300 px-3 py-1 rounded">2</button>
          <button class="border border-gray-300 px-3 py-1 rounded">3</button>
          <button class="border border-gray-300 px-3 py-1 rounded"><i
              class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const employees = ref([
    { code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội", status: "Hoạt động" },
    { code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội", status: "Nghỉ việc" },
    { code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội", status: "Hoạt động" },
    { code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội", status: "Nghỉ việc" },
  ]);
  </script>