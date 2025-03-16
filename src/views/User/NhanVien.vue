<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section class="mb-5 flex w-full items-center justify-between">
      <h1 class="text-4xl text-primary font-bold">DANH SÁCH NHÂN VIÊN</h1>
      <div class="flex gap-2">
        <RouterLink to="/admin/nhan-vien-crud" class="btn btn-primary btn-soft">
          <Icon icon="icon-park-outline:add-four" class="size-5" />
          Thêm nhân viên
        </RouterLink>
        <button @click="exportToExcel" class="btn btn-primary btn-soft">
          <Icon icon="ph:microsoft-excel-logo" class="size-5" />
          Xuất Excel
        </button>
        <button class="btn btn-primary btn-soft">
          <Icon icon="ph:microsoft-excel-logo" class="size-5" />
          Nhập Excel
        </button>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="mb-5 flex w-full items-center justify-end gap-2">
      <label class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none">
        <Icon icon="streamline:search-visual-solid" class=" size-5 text-primary" />
        <input v-model="search" type="search" placeholder="Tìm kiếm nhân viên..." />
      </label>
    </section>

    <!-- Table -->
    <section class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows text-primary table text-center w-full">
          <thead class="text-primary">
            <tr>
              <th>STT</th>
              <th>Mã nhân viên</th>
              <th>Họ Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Chức Vụ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nv, index) in paginatedData" :key="nv.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ nv.maNhanVien }}</td>
              <td>{{ nv.hoTen }}</td>
              <td>{{ nv.email }}</td>
              <td>{{ nv.sdt }}</td>
              <td>{{ nv.chucVu.tenChucVu }}</td>
              <td>
                <div class="join">
                  <RouterLink :to="`/admin/nhan-vien-crud/${nv.id}`" class="join-item btn btn-soft btn-sm">
                    <Icon icon="heroicons-outline:pencil-alt" class="size-4 text-primary" />
                  </RouterLink>
                  <button @click="deleteNhanVien(nv)" class="join-item btn btn-soft btn-sm">
                    <Icon icon="mdi:bin-outline" class="size-4 text-primary" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Pagination -->
    <section class="flex justify-between border-t pt-2 mt-4">
      <div class="flex items-center">
        <span>Xem</span>
        <select v-model="itemsPerPage" class="ml-2 px-2 py-1 border rounded">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <span class="ml-2">dòng 1 trang</span>
      </div>
      <div class="flex gap-2">
        <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-soft">
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="{'btn-primary': currentPage === page}" class="btn btn-soft">
          {{ page }}
        </button>
        <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-soft">
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import NhanVienService from '@/api/service/NhanVienService';
import { Icon } from '@iconify/vue';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Nhân viên");

  worksheet.addRow(["STT", "Mã NV", "Họ tên", "Email", "SĐT","Chức vụ"]);

  nhanVienList.value.forEach((nv, index) => {
    worksheet.addRow([index + 1, nv.maNhanVien, nv.hoTen, nv.email, nv.sdt,nv.chucVu.tenChucVu]);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "DanhSachNhanVien.xlsx");
};

const currentPage = ref(1);
const itemsPerPage = ref(5);
const nhanVienList = ref([]);
const search = ref('');

watch(itemsPerPage, () => (currentPage.value = 1));

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredData.value.slice(start, start + itemsPerPage.value);
});

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};

const fetchNhanVien = async () => {
  try {
    const data = await NhanVienService.getAllStaff();
    if (Array.isArray(data)) nhanVienList.value = data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error.message);
  }
};

const filteredData = computed(() => {
  return nhanVienList.value.filter(nv =>
    nv.hoTen.toLowerCase().includes(search.value.toLowerCase()) ||
    nv.email.toLowerCase().includes(search.value.toLowerCase()) ||
    nv.sdt.toLowerCase().includes(search.value.toLowerCase())
  );
});

const deleteNhanVien = async (nv) => {
  if (!confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) return;
  try {
    await NhanVienService.deleteStaff(nv.id);
    await fetchNhanVien();
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error);
  }
};

onMounted(fetchNhanVien);
</script>
