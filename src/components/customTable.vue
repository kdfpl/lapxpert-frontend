<script setup>
import { ref, computed, defineProps, watch } from "vue";

// Nhận props
const props = defineProps({
  headers: { type: Array, required: true },
  data: { type: Array, required: true },
});

// Trạng thái
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Cập nhật lại trang khi số dòng hiển thị thay đổi
watch(itemsPerPage, () => {
  currentPage.value = 1;
});

// Tính tổng số trang
const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage.value));

// Lấy dữ liệu theo trang
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return props.data.slice(start, start + itemsPerPage.value);
});

// Chuyển trang
const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="p-6 w-full bg-white rounded-lg shadow-md">
    <!-- Điều chỉnh số dòng hiển thị -->
    <div class="flex justify-between items-center mb-7">
      <div class="flex items-center space-x-2">
        <label for="entries" class="text-sm text-gray-600">Show</label>
        <select id="entries" v-model="itemsPerPage" class="border px-2 py-1 rounded">
          <option v-for="num in [5, 10, 15, 20]" :key="num" :value="num">{{ num }}</option>
        </select>
        <span class="text-sm text-gray-600">entries per page</span>
      </div>
    </div>

    <!-- Bảng -->
    <div class="overflow-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th v-for="(header, index) in props.headers" :key="index" class="px-4  h-25 py-2 text-left">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="border-t">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4  h-25 py-2">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phân trang -->
    <div class="mt-4 flex justify-between items-center">
      <p class="text-sm text-gray-600">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, props.data.length) }} of {{ props.data.length }} entries
      </p>
      <div class="flex space-x-2">
        <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Prev
        </button>

        <button v-for="page in totalPages" :key="page" @click="setPage(page)"
          class="px-3 py-1 rounded"
          :class="currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'">
          {{ page }}
        </button>

        <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
          Next 
        </button>
      </div>
    </div>
  </div>
</template>
