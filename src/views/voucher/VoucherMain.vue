<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section class="mb-5 text-base-content flex w-full items-center justify-between">
      <h1 class="text-3xl  font-bold">DANH SÁCH PHIẾU GIẢM GIÁ</h1>
      <div class="flex gap-2">
        <RouterLink to="/admin/crud-giam-gia" class="btn text-base-content btn-primary btn-soft">
          <Icon icon="icon-park-outline:add-four" class="size-5" />
          Thêm phiếu giảm giá
        </RouterLink>
        <button @click="exportToExcel" class="btn btn-base-content btn-soft">
          <Icon icon="ph:microsoft-excel-logo" class="size-5" />
          Xuất Excel
        </button>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="mb-5 flex w-full items-center justify-end gap-8">
      <div class="relative w-full">
        <div class="flex items-center gap-8">
          <!-- Ô tìm kiếm -->
          <label
            class="input input-ghost bg-base-200 focus-within:bg-base-200 flex-grow focus-within:outline-none flex items-center gap-2 px-2 py-2 rounded-md">
            <Icon icon="streamline:search-visual-solid" class="size-5 text-primary" />
            <input v-model="search" @focus="handleInputFocus" type="search" placeholder="Tìm kiếm phiếu..."
              class="w-full bg-transparent outline-none" />
          </label>

          <div class="flex items-center gap-10">
            <!-- Ngày bắt đầu -->
            <label class="flex items-center gap-2">
              <span class="text-primary font-medium">Ngày bắt đầu:</span>
              <input type="date" v-model="store.startDate" @change="store.setStartDate(store.startDate)"
                class="input custom-input w-40 px-3 py-2 rounded-md border" />
            </label>

            <!-- Ngày kết thúc -->
            <label class="flex items-center gap-2">
              <span class="text-primary font-medium">Ngày kết thúc:</span>
              <input type="date" v-model="store.endDate" @change="store.setEndDate(store.endDate)"
                class="input custom-input w-40 px-3 py-2 rounded-md border" />
            </label>
          </div>

        </div>

        <!-- Danh sách gợi ý -->
        <ul v-if="showSuggestions && searchSuggestions.length"
          class="mt-1 z-10 bg-base-300 shadow-md w-full rounded-md border absolute top-full left-0"
          @click.outside="hideSuggestions">
          <li v-for="(suggestion, index) in searchSuggestions" :key="index" @click="selectSuggestion(suggestion)"
            class="p-2 cursor-pointer hover:bg-base-200">
            {{ suggestion }}
          </li>
        </ul>
      </div>
      <div class="join">
        <!-- Nút xóa bộ lọc -->
        <button class="btn btn-soft btn-primary join-item border-none" @click="resetFilters">
          <Icon icon="line-md:filter-remove" class="size-5" />
        </button>
        <!-- Dropdown lọc trạng thái -->
        <select v-model="statusFilter" @change="setStatusFilter(statusFilter)" class="select w-fit custom-input">
          <option value="all">Tất cả</option>
          <option value="Đã bắt đầu">Đã bắt đầu</option>
          <option value="Đã kết thúc">Đã kết thúc</option>
          <option value="Chưa diễn ra">Chưa diễn ra</option>
        </select>
      </div>
    </section>
    <!-- Bộ lọc giảm giá -->
    <div class="flex items-center space-x-4 w-full">
      <!-- Lọc theo Điều kiện đơn hàng tối thiểu -->
      <label class="text-primary font-medium">Lọc theo điều kiện:</label>
      <div class="flex items-center space-x-2">
        <span>0</span>
        <input type="range" :min="0" :max="maxOrderCondition" step="10" v-model="store.orderCondition"
          @input="store.setOrderCondition(store.orderCondition)"
          class="w-40 appearance-none bg-gray-300 rounded-full h-2" />
        <span>{{ formattedOrderCondition }}</span>
      </div>
    </div>


    <!-- Loading Overlay -->
    <!-- <div v-if="!store.initialized" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <span class="loading loading-ring loading-lg text-white"></span>
    </div> -->

    <!-- Empty state -->
    <div v-if="filteredData.length === 0" class="flex-1 empty-state">
      <Icon icon="mdi:account-search" class="empty-icon" />
      <p>Không tìm thấy phiếu giảm giá phù hợp</p>
      <button @click="resetFilters" class="btn btn-primary">
        Đặt lại bộ lọc
      </button>
    </div>
    <!-- Table -->
    <section v-else class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table text-center w-full">
          <thead class="text-base-content font-extrabold">
            <tr>
              <th>STT</th>
              <th>Mã Voucher</th>
              <th>Loại</th>
              <th>Giá Trị</th>
              <th>Điều kiện</th>
              <th>Ngày BĐ</th>
              <th>Ngày KT</th>
              <th>Số Lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-base-content" v-for="(phieu, index) in paginatedData" :key="phieu.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ phieu.maPhieuGiamGia }}</td>
              <td>{{ phieu.loaiGiamGia ? "Theo phần trăm" : "Theo tiền" }}</td>
              <td>{{ phieu.giaTriGiam }}</td>
              <td>{{ phieu.giaTriDonHangToiThieu }}</td>
              <td>{{ phieu.thoiGianBatDau }}</td>
              <td>{{ phieu.thoiGianKetThuc }}</td>
              <td>{{ phieu.soLuong }}</td>
              <td>
                <div v-if="phieu.trangThai == 'Đã bắt đầu'" class="badge badge-soft badge-success">
                  Đã bắt đầu
                </div>
                <div v-else-if="phieu.trangThai == 'Đã kết thúc'" class="badge badge-soft badge-error">
                  Đã kết thúc
                </div>
                <div v-else class="badge badge-soft badge-warning">
                  Chưa diễn ra
                </div>
              </td>

              <td>
                <div class="join">
                  <RouterLink :to="`/admin/crud-giam-gia/${phieu.id}`" class="join-item btn btn-soft btn-sm">
                    <Icon icon="heroicons-outline:pencil-alt" class="size-4 text-primary" />
                  </RouterLink>
                  <button @click="deletePhieuGiamGia(phieu)" class="join-item btn btn-soft btn-sm"
                    v-if="phieu.tinhTrang">
                    <Icon icon="material-symbols:delete-outline" class="size-4 text-red-500" />
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
        <select v-model="itemsPerPage" class="ml-2 px-2 bg-base-300 py-1 border rounded">
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
        <button v-for="page in totalPages" :key="page" @click="setPage(page)"
          :class="{ 'btn-primary': currentPage === page }" class="btn btn-soft">
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
import { storeToRefs } from "pinia";
import { usePhieuGiamGiaStore } from "../../stores/phieugiamgiastore.js";
import { onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const store = usePhieuGiamGiaStore();
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
  deletePhieuGiamGia,
  revivePhieuGiamGia,
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
const formattedOrderCondition = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(store.orderCondition);
});

</script>