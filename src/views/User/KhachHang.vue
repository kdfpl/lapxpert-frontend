<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section class="mb-5 flex w-full items-center justify-between">
      <h1 class="text-4xl font-bold">DANH SÁCH KHÁCH HÀNG</h1>
      <div class="flex gap-2">
        <RouterLink to="/admin/khach-hang-crud" class="btn btn-primary btn-soft">
          <Icon icon="icon-park-outline:add-four" class="size-5" />
          Thêm khách hàng
        </RouterLink>
        <button class="btn btn-primary btn-soft">
          <Icon icon="ph:microsoft-excel-logo" class="size-5" />
          Xuất Excel
        </button>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="mb-5 flex w-full items-center justify-end gap-2">
      <label class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none">
        <Icon icon="streamline:search-visual-solid" class=" size-5" />
        <input v-model="search" type="search" placeholder="Tìm kiếm khách hàng..." />
      </label>
    </section>

    <!-- Table -->
    <section class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table text-center w-full">
          <thead class="">
            <tr>
              <th>STT</th>
              <th>Mã KH</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr class="" v-for="(kh, index) in paginatedData" :key="kh.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ kh.maKhachHang }}</td>
              <td>{{ kh.hoTen }}</td>
              <td>{{ kh.email }}</td>
              <td>{{ kh.sdt }}</td>
              <td>
                <div class="join">
                  <RouterLink :to="`/admin/khach-hang-crud/${kh.id}`" class="join-item btn btn-soft btn-sm">
                    <Icon icon="heroicons-outline:pencil-alt" class="size-4" />
                  </RouterLink>
                  <button @click="deleteKhachHang(kh)" class="join-item btn btn-soft btn-sm">
                    <Icon icon="mdi:bin-outline" class="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Pagination -->
    <section class="flex justify-between mt-4">
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
import KhachHangService from '@/api/service/KhachHangService';
import { Icon } from '@iconify/vue';

const currentPage = ref(1);
const itemsPerPage = ref(5);
const khachHangList = ref([]);
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

const fetchKhachHang = async () => {
  try {
    const data = await KhachHangService.getAllCustomers();
    if (Array.isArray(data)) khachHangList.value = data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error.message);
  }
};

const filteredData = computed(() => {
  return khachHangList.value.filter(kh =>
    kh.hoTen.toLowerCase().includes(search.value.toLowerCase()) ||
    kh.email.toLowerCase().includes(search.value.toLowerCase()) ||
    kh.sdt.toLowerCase().includes(search.value.toLowerCase())
  );
});

const deleteKhachHang = async (kh) => {
  if (!confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;
  try {
    await KhachHangService.deleteCustomer(kh.id);
    await fetchKhachHang();
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
  }
};

onMounted(fetchKhachHang);
</script>

