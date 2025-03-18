<script setup>
import { storeToRefs } from "pinia";
import { useNhanVienStore } from "../../../stores/nhanvienstore";
import { onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";

const store = useNhanVienStore();
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
} = storeToRefs(store);

const {
  initialize,
  deleteNhanVien,
  reviveNhanVien,
  exportToExcel,
  setPage,
  setItemsPerPage,
  setStatusFilter,
  resetFilters,
  toggleSuggestions,
} = store;

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

watch(search, (newValue) => {
  if (newValue === "") {
    store.resetFilters();
  }
});

onMounted(() => {
  initialize();
});
</script>
<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section class="mb-5 flex w-full items-center justify-between">
      <h1 class="text-base-content text-3xl font-bold">DANH SÁCH NHÂN VIÊN</h1>
      <div class="flex gap-2">
        <RouterLink
          to="/employee/crud"
          class="btn btn-primary btn-soft"
        >
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
      <div class="relative w-full">
        <div class="flex">
          <label
            class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none"
          >
            <Icon
              icon="streamline:search-visual-solid"
              class="text-primary size-5"
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
          class="bg-base-300 z-10 mt-1 w-full rounded-md border shadow-md"
          @click.outside="hideSuggestions"
        >
          <li
            v-for="(suggestion, index) in searchSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
            class="hover:bg-base-200 cursor-pointer p-2"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <div class="join">
        <!-- Nút xóa bộ lọc -->
        <button
          class="btn btn-soft btn-primary join-item border-none"
          @click="resetFilters"
        >
          <Icon icon="line-md:filter-remove" class="size-5" />
        </button>
        <!-- Dropdown lọc trạng thái -->
        <select
          v-model="statusFilter"
          @change="setStatusFilter(statusFilter)"
          class="select custom-input w-fit"
        >
          <option value="all">Trạng thái</option>
          <option value="active">Đang làm</option>
          <option value="inactive">Nghỉ làm</option>
        </select>
      </div>
    </section>

    <!-- Loading Overlay -->
    <!-- <div
      v-if="!store.initialized"
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <span class="loading loading-ring loading-lg text-white"></span>
    </div> -->

    <!-- Empty state -->
    <div v-if="filteredData.length === 0" class="empty-state flex-1">
      <Icon icon="mdi:account-search" class="empty-icon" />
      <p>Không tìm thấy nhân viên phù hợp</p>
      <button @click="resetFilters" class="btn btn-base-content">
        Đặt lại bộ lọc
      </button>
    </div>
    <!-- Table -->
    <section v-else class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table w-full text-center">
          <thead class="text-base-content font-extrabold">
            <tr>
              <th>STT</th>
              <th>Mã nhân viên</th>
              <th>Họ Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Chức Vụ</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-base-content"
              v-for="(nv, index) in paginatedData"
              :key="nv.id"
            >
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ nv.maNhanVien }}</td>
              <td>{{ nv.hoTen }}</td>
              <td>{{ nv.email }}</td>
              <td>{{ nv.sdt }}</td>
              <td>{{ nv.chucVu.tenChucVu }}</td>
              <td>
                <div v-if="nv.tinhTrang" class="badge badge-soft badge-success">
                  Đang làm
                </div>
                <div v-if="!nv.tinhTrang" class="badge badge-soft badge-error">
                  Nghỉ làm
                </div>
              </td>

              <td>
                <div class="join">
                  <RouterLink
                    :to="`/admin/nhan-vien-crud/${nv.id}`"
                    class="join-item btn btn-soft btn-sm"
                  >
                    <Icon
                      icon="heroicons-outline:pencil-alt"
                      class="text-base-content size-4"
                    />
                  </RouterLink>
                  <button
                    @click="deleteNhanVien(nv)"
                    class="join-item btn btn-soft btn-sm"
                    v-if="nv.tinhTrang"
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      class="size-4 text-red-500"
                    />
                  </button>

                  <button
                    @click="reviveNhanVien(nv)"
                    class="join-item btn btn-soft btn-sm"
                    v-if="!nv.tinhTrang"
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
    <section class="flex justify-between">
      <div class="flex items-center">
        <label class="label">
          <span>Xem</span>
          <span class="badge badge-soft badge-primary">
            <select v-model="itemsPerPage" class="focus:outline-none">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </span>

          <span class="ml-2">dòng 1 trang</span>
        </label>
      </div>

      <div class="flex gap-2">
        <button
          @click="setPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn btn-soft btn-primary"
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
          class="btn btn-soft btn-primary"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    </section>
  </section>
</template>
