<script setup>
import { onMounted, watch, ref } from "vue";
import { useSanPhamStore } from "@/stores/sanphamstore";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";

const store = useSanPhamStore();
const {
  currentPage,
  itemsPerPage,
  filteredData,
  totalPages,
  paginatedData,
  statusFilter,
  loaiFilter,
  thuongHieuFilter,
  loaiList,
  thuongHieuList,
  loading,
  error,
  search,
  searchSuggestions,
  showSuggestions,
} = storeToRefs(store);

const {
  fetchSanPhamList,
  fetchLoaiSanPhamList,
  fetchThuongHieuList,
  setSearch,
  setStatusFilter,
  setLoaiFilter,
  setThuongHieuFilter,
  setPage,
  setItemsPerPage,
  resetFilters,
  toggleSuggestions,
} = store;

const handleInputFocus = () => {
  if (search.value.length > 0) {
    toggleSuggestions(true);
  }
};

const hideSuggestions = () => {
  toggleSuggestions(false);
};

const selectSuggestion = (suggestion) => {
  setSearch(suggestion);
  toggleSuggestions(false);
};

onMounted(async () => {
  await fetchSanPhamList();
  await fetchLoaiSanPhamList();
  await fetchThuongHieuList();
});

watch(search, (newVal) => {
  console.log("Search term:", newVal);
  console.log("Search suggestions:", searchSuggestions.value);
  toggleSuggestions(newVal.length > 0);
});
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <!-- Header -->
    <section
      class="mb-5 text-primary flex w-full items-center justify-between"
    >
      <h1 class="text-3xl font-bold">DANH SÁCH SẢN PHẨM</h1>
      <div class="flex gap-2">
        <RouterLink
          to="/admin/san-pham-crud"
          class="btn btn-primary btn-soft"
        >
          <Icon icon="icon-park-outline:add-four" class="size-5" />
          Thêm sản phẩm
        </RouterLink>
        <button class="btn btn-primary btn-soft">
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
              @blur="hideSuggestions"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
            />
          </label>
        </div>

        <!-- Danh sách gợi ý -->
        <ul v-if="showSuggestions && searchSuggestions.length"
        class="mt-1 z-10 bg-base-300 shadow-md w-full rounded-md border">
          <li
            v-for="(suggestion, index) in searchSuggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
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

      <div class="join">
        <button
          class="btn btn-soft btn-primary join-item border-none"
          @click="resetFilters"
        >
          <Icon icon="line-md:filter-remove" class="size-5" />
        </button>
        <select
          v-model="loaiFilter"
          @change="setLoaiFilter(loaiFilter)"
          class="select w-fit custom-input"
        >
          <option :value="null">Tất cả loại</option>
          <option v-for="loai in loaiList" :key="loai.id" :value="loai.id">
            {{ loai.tenLoai }}
          </option>
        </select>
      </div>

      <div class="join">
        <button
          class="btn btn-soft btn-primary join-item border-none"
          @click="resetFilters"
        >
          <Icon icon="line-md:filter-remove" class="size-5" />
        </button>
        <select
          v-model="thuongHieuFilter"
          @change="setThuongHieuFilter(thuongHieuFilter)"
          class="select w-fit custom-input"
        >
          <option :value="null">Tất cả thương hiệu</option>
          <option
            v-for="thuongHieu in thuongHieuList"
            :key="thuongHieu.id"
            :value="thuongHieu.id"
          >
            {{ thuongHieu.tenThuongHieu }}
          </option>
        </select>
      </div>
    </section>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="fixed inset-0 flex items-center justify-center bg-base-200">
        <div class="relative flex items-center justify-center">
          <div
            class="absolute w-32 h-32 border-8 border-primary rounded-full animate-spin"
          ></div>
          <div
            class="absolute w-28 h-28 border-8 border-secondary rounded-full animate-ping"
          ></div>
          <div
            class="absolute w-24 h-24 border-8 border-accent rounded-full animate-pulse"
          ></div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredData.length === 0" class="flex-1 empty-state">
      <Icon icon="mdi:package-variant-closed" class="empty-icon" />
      <p>Không tìm thấy sản phẩm phù hợp</p>
      <button @click="resetFilters" class="btn btn-primary">
        Đặt lại bộ lọc
      </button>
    </div>

    <!-- Table -->
    <section v-else class="relative flex-1">
      <div class="absolute text-neutral inset-0 overflow-auto">
        <table class="table-pin-rows table text-center w-full">
          <thead class="text-base-content font-extrabold">
            <tr>
              <th>STT</th>
              <th>Mã SKU</th>
              <th>Tên laptop</th>
              <th>Loại</th>
              <th>Hệ điều hành</th>
              <th>Thương hiệu</th>
              <th>Thời gian bảo hành</th>
              <th>Trạng thái</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-base-content"
              v-for="(sanPham, index) in paginatedData"
              :key="sanPham.id"
            >
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ sanPham.maSp }}</td>
              <td>{{ sanPham.tenSp }}</td>
              <td>{{ sanPham.loai?.tenLoai }}</td>
              <td>{{ sanPham.heDieuHanh?.tenHeDieuHanh }}</td>
              <td>{{ sanPham.thuongHieu?.tenThuongHieu }}</td>
              <td>{{ sanPham.baoHanhThang }} tháng</td>
              <td>
                <div
                  :class="
                    sanPham.trangThai
                      ? 'badge badge-soft badge-success'
                      : 'badge badge-soft badge-error'
                  "
                >
                  {{ sanPham.trangThai ? "Hoạt động" : "Ngừng hoạt động" }}
                </div>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-10 w-10">
                      <img :src="sanPham.hinhAnh" alt="Hình ảnh" />
                    </div>
                  </div>
                </div>
              </td>
              <td>{{ sanPham.moTa }}</td>
              <td>
                <div class="join">
                  <RouterLink
                    :to="`/admin/san-pham-crud/${sanPham.id}`"
                    class="join-item btn btn-soft btn-sm"
                  >
                    <Icon
                      icon="heroicons-outline:pencil-alt"
                      class="size-4 text-base-content"
                    />
                  </RouterLink>
                  <button @click="" class="join-item btn btn-soft btn-sm">
                    <Icon
                      icon="material-symbols:delete-outline"
                      class="size-4 text-red-500"
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
        <select
          v-model="itemsPerPage"
          @change="setItemsPerPage(itemsPerPage)"
          class="ml-2 bg-base-300 px-2 py-1 border rounded"
        >
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