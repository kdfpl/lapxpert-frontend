<script setup>
import { ref, computed, defineProps, watch, defineEmits } from "vue";

// Nhận props
const props = defineProps({
  headers: { type: Array, required: true },
  data: { type: Array, required: true },
  func: { type: Function, required: false },
  rowHeight: { type: String, default: "h-24" }, 
});

const emit = defineEmits(["row-click", "add-row"]);

// Trạng thái
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Cập nhật trang khi số dòng hiển thị thay đổi
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

// Gọi hàm động nếu có
const handleRowClick = (row) => {
  if (props.func) {
    props.func(row);
  }
  emit("row-click", row);
};
</script>

<template>
  <div class="p-6 w-full  rounded-xl shadow-xl border border-gray-200">
    <!-- Điều chỉnh số dòng hiển thị -->
    <div class="flex justify-between items-center mb-7">
      <div class="flex items-center space-x-2">
        <label for="entries" class="text-sm text-black ">Show</label>
        <select id="entries" v-model="itemsPerPage" class="border px-3 py-1 rounded-lg bg-white shadow-sm text-black">
          <option v-for="num in [5, 10, 15, 20]" :key="num" :value="num">{{ num }}</option>
        </select>
        <span class="text-sm text-black">entries per page</span>
      </div>
    </div>

    <!-- Bảng -->
    <div class="overflow-auto rounded-lg shadow-md">
      <table class="w-full  border-collapse">
        <thead>
          <tr class=" g">
            <th 
              v-for="(header, index) in props.headers" 
              :key="index" 
              class="px-4 py-2 text-left text-black  font-semibold border-b border-[#C8C7C7] cursor-pointer" 
              :class="rowHeight"
              @click="sortBy(index)"
            >
              {{ header }}
              <span v-if="sortColumn === index">{{ sortDirection === 1 ? ' ▲' : ' ▼' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, rowIndex) in paginatedData" 
            :key="rowIndex" 
            class="border-t border-[#C8C7C7] cursor-pointer hover:bg-[#F7F7F7] hover:shadow-lg hover:h-25 transition-all duration-300 ease-in-out"
            @click="handleRowClick(row)"
          >
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-3 text-black border-b border-[#C8C7C7]" :class="rowHeight">
              <div class="flex items-center space-x-4">
                <div v-html="cell" class="flex-1"></div>
              </div>
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
          class="px-3 py-1 rounded-lg border bg-white shadow-md text-gray-700 hover:bg-gray-100 transition duration-300">
          Prev
        </button>

        <button v-for="page in totalPages" :key="page" @click="setPage(page)"
          class="px-3 py-1 rounded-lg border shadow-md transition duration-300"
          :class="currentPage === page ? 'bg-gray-400 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'">
          {{ page }}
        </button>

        <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-lg border bg-white shadow-md text-black hover:bg-gray-100 transition duration-300">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
