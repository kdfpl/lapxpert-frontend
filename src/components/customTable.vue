<template>
  <div class="p-6 w-full shadow-xl border border-gray-200" :class="round">
    <div class="flex justify-between items-center mb-7">
      <div class="flex items-center space-x-2">
        <label for="entries" class="text-sm text-black">Show</label>
        <select
          id="entries"
          v-model="itemsPerPage"
          class="border px-3 py-1 rounded-lg bg-white shadow-sm text-black"
        >
          <option v-for="num in [5, 10, 15, 20]" :key="num" :value="num">
            {{ num }}
          </option>
        </select>
        <span class="text-sm text-black">số thành phần trong trang</span>
      </div>
    </div>

    <div class="overflow-auto rounded-lg shadow-md">
      <table class="w-full  border-collapse">
        <thead>
          <tr class="bg-gray-100" :class="rowHeight">
            <th
              v-for="(header, index) in visibleHeaders"
              :key="index"
              class="px-4 py-2 text-left text-black  font-semibold border-b border-[#C8C7C7] cursor-pointer"
            >
              {{ header }}
            </th>
            <th class="px-4 py-2 text-left text-black font-semibold border-b border-[#C8C7C7]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in filteredData"
            :key="rowIndex"
            class="border-t border-[#C8C7C7] cursor-pointer hover:bg-[#F7F7F7] hover:shadow-lg transition-all duration-300 ease-in-out"
            :class="rowHeight"
          >
            <td
              v-for="(cell, cellIndex) in Object.values(row)"
              :key="cellIndex"
              class="px-4 py-3 text-black border-b border-[#C8C7C7]"
            >
              <div class="flex items-center space-x-4">
                <div v-html="cell" class="flex-1"></div>
              </div>
            </td>
            <td class="px-4 py-3 text-black border-b border-[#C8C7C7]">
              <router-link :to="`${link}/${paginatedData[rowIndex].id}`">
                <button
                  class="p-2 text-gray-700 rounded-lg hover:bg-yellow-400 hover:text-white transition duration-300"
                >
                  <Edit class="w-5 h-5" />
                </button>
              </router-link>
              <button
                @click="handleDelete(paginatedData[rowIndex])"
                class="p-2 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <p class="text-sm text-gray-600">
        Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} đến
        {{ Math.min(currentPage * itemsPerPage, data.length) }} trên
        {{ data.length }} phần tử
      </p>
      <div class="flex space-x-2">
        <button
          @click="setPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-lg border bg-white shadow-md text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          Trước
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="setPage(page)"
          class="px-3 py-1 rounded-lg border shadow-md transition duration-300"
          :class="
            currentPage === page
              ? 'bg-gray-400 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          "
        >
          {{ page }}
        </button>

        <button
          @click="setPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-lg border bg-white shadow-md text-black hover:bg-gray-100 transition duration-300"
        >
          Tiếp
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { Trash2, Edit } from "lucide-vue-next";

const props = defineProps({
  headers: { type: Array, required: true },
  data: { type: Array, required: true },
  deleteFunc: { type: Function },
  link: { type: String },
  rowHeight: { type: String, default: "h-24" },
  round: { type: String, default: "rounded-xl" },
});

const emit = defineEmits(["row-click", "add-row"]);
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = ref(5);

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

const totalPages = computed(() =>
  Math.ceil(props.data.length / itemsPerPage.value)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return props.data.slice(start, start + itemsPerPage.value);
});

const filteredData = computed(() => {
  return paginatedData.value.map(({ id, ...rest }) => rest);
});

const visibleHeaders = computed(() => props.headers.filter(header => header.toLowerCase() !== "id"));

const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleDelete = (row) => {
  if (confirm("Bạn có chắc muốn xóa không?")) {
    props.deleteFunc(row);
  }
};
</script>
