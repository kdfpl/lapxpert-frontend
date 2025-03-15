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

      <CustomTable :headers="headers" :data="employees" @row-click="handleRowClick" />
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import CustomTable from "../components/CustomTable.vue"; 
  import { getAll} from "../service/NhanVienService.js"; 
  
  const headers = ["Mã NV", "Họ Tên", "Email", "SĐT", "Chức Vụ", "Trạng Thái"];
  
  const employees = ref([]);
  
  const fetchEmployees = async () => {
    const data = await getAll();
    employees.value = data.map(nv => ({
      maNhanVien: nv.maNhanVien,
      hoTen: nv.hoTen,
      email: nv.email,
      sdt: nv.sdt,
      chucVu: nv.chucVu?.tenChucVu || "N/A",
      tinhTrang: nv.tinhTrang ? "Hoạt động" : "Nghỉ việc"
    }));
  };
  
  onMounted(fetchEmployees);
  </script>