<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section class="mb-5 text-primary flex w-full items-center justify-between">
      <h1 class="text-4xl font-bold">DANH SÁCH KHÁCH HÀNG</h1>
      <div class="flex gap-2">
        <RouterLink
          to="/admin/khach-hang-crud"
          class="btn btn-primary btn-soft"
        >
          <Icon icon="icon-park-outline:add-four" class="size-5" />
          Thêm khách hàng
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
      <div class="relative w-full">
        <div class="flex">
          <label
            class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none"
          >
            <Icon
              icon="streamline:search-visual-solid"
              class="size-5 text-primary"
            />
            <input
              v-model="search"
              @focus="handleInputFocus"
              type="search"
              placeholder="Tìm kiếm nhân viên..."
              class="w-full"
            />
          </label>
        </div>

        <!-- Danh sách gợi ý -->
        <ul
          v-if="showSuggestions && searchSuggestions.length"
          class="mt-1 z-10 bg-base-300 shadow-md w-full rounded-md border"
          @click.outside="hideSuggestions"
        >
          <li
            v-for="(suggestion, index) in searchSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
            class="p-2 cursor-pointer hover:bg-base-200"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <div class="join">
        <button
          class="btn btn-soft btn-primary join-item border-none"
          @click="resetFilters"
        >
          <Icon icon="line-md:filter-remove" class="size-5" />
        </button>

        <select
          v-model="statusFilter"
          @change="setStatusFilter(statusFilter)"
          class="select w-fit custom-input"
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng hoạt động</option>
        </select>
      </div>
    </section>

    <!-- Loading Overlay -->
    <div
      v-if="!store.initialized"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <span class="loading loading-ring loading-lg text-white"></span>
    </div>

    <!-- Empty state -->
    <div v-if="filteredData.length === 0" class="flex-1 empty-state">
      <Icon icon="mdi:account-search" class="empty-icon" />
      <p>Không tìm thấy nhân viên phù hợp</p>
      <button @click="resetFilters" class="btn btn-primary">
        Đặt lại bộ lọc
      </button>
    </div>

    <!-- Table -->
    <section v-else class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table text-center w-full">
          <thead class="font-extrabold">
            <tr>
              <th>STT</th>
              <th>Mã KH</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Trạng thái</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kh, index) in paginatedData" :key="kh.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ kh.maKhachHang }}</td>
              <td>{{ kh.hoTen }}</td>
              <td>{{ kh.email }}</td>
              <td>{{ kh.sdt }}</td>
              <td>
                <div v-if="kh.tinhTrang" class="badge badge-soft badge-success">
                  Hoạt động
                </div>
                <div v-if="!kh.tinhTrang" class="badge badge-soft badge-error">
                  Ngừng hoạt động
                </div>
              </td>
              <td>
                {{
                  diaChiMacDinh[kh.id].thanhPho +
                    ", " +
                    diaChiMacDinh[kh.id].quanHuyen +
                    ", " +
                    diaChiMacDinh[kh.id].phuongXa +
                    ", " +
                    diaChiMacDinh[kh.id].soNhaDuong || "Đang tải..."
                }}
              </td>
              <td>
                <div class="join">
                  <RouterLink
                    :to="`/admin/khach-hang-crud/${kh.id}`"
                    class="join-item btn btn-soft btn-sm"
                  >
                    <Icon icon="heroicons-outline:pencil-alt" class="size-4" />
                  </RouterLink>

                  <button
                    @click="deleteKhachHang(kh)"
                    class="join-item btn btn-soft btn-sm"
                    v-if="kh.tinhTrang"
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      class="size-4 text-red-500"
                    />
                  </button>

                  <button
                    @click="reviveKhachHang(kh)"
                    class="join-item btn btn-soft btn-sm"
                    v-if="!kh.tinhTrang"
                  >
                    <Icon
                      icon="mdi:account-arrow-up-outline"
                      class="size-4 text-green-500"
                    />
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
        <select v-model="itemsPerPage" class="ml-2 bg-base-300 px-2 py-1 border rounded">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <span class="ml-2">dòng 1 trang</span>
      </div>
      <div class="flex gap-2">
        <button
          @click="setPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn btn-soft"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="setPage(page)"
          :class="{ 'btn-primary': currentPage === page }"
          class="btn btn-soft"
        >
          {{ page }}
        </button>
        <button
          @click="setPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn btn-soft"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useKhachHangStore } from "@/stores/khachhangstore";
import { onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
const store = useKhachHangStore();
const {
  currentPage,
  itemsPerPage,
  search,
  filteredData,
  totalPages,
  paginatedData,
  statusFilter,
  searchSuggestions,
  showSuggestions,
  diaChiMacDinh,
} = storeToRefs(store);

const {
  initialize,
  deleteKhachHang,
  reviveKhachHang,
  exportToExcel,
  setPage,
  setItemsPerPage,
  setStatusFilter,
  resetFilters,
  toggleSuggestions,
  getDiaChiMacDinh,
} = store;

// Xử lý tìm kiếm
const selectSuggestion = (suggestion) => {
  search.value = suggestion;
  toggleSuggestions(false);
};

const hideSuggestions = () => {
  toggleSuggestions(false);
};

const handleInputFocus = () => {
  if (search.value.length > 0) {
    toggleSuggestions(true);
  }
};

watch(search, (newVal) => {
  toggleSuggestions(newVal.length > 0);
});

onMounted(() => {
  initialize();
});
</script>
