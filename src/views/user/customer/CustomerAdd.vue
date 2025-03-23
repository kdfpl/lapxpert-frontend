<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useKhachHangStore } from "../../../stores/khachhangstore";
import TabPanel from "../../../components/TabPanel.vue";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const customerId = route.params.id;

const store = useKhachHangStore();
const { diaChiList, khachHang, diaChiHienThi, citis } = storeToRefs(store);

const {
  validateAndProceed,
  fetchCityData,
  fetchKhachHangById,
  createNewAddress,
  updateDistrictsAndWards,
  submitForm,
  addDiaChi,
  removeDiaChi,
  setMacDinh,
} = store;

const tabs = [
  { label: "1. Thông tin khách hàng", key: "panel1" },
  { label: "2. Địa chỉ khách hàng", key: "panel2" },
  { label: "3. Xác nhận thông tin", key: "panel3" },
];

const activeTab = ref("panel1");
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await fetchCityData();
    if (customerId) {
      await fetchKhachHangById(customerId);
    } else {
      diaChiList.value = [createNewAddress(true)];
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    alert("Lỗi khi tải dữ liệu, vui lòng thử lại!");
  } finally {
    isLoading.value = false;
  }
});

// Theo dõi thay đổi địa chỉ
watch(
  () => diaChiList.value.map((dc) => [dc.thanhPho, dc.quanHuyen]),
  () => updateDistrictsAndWards(),
  { deep: true },
);

const handleProceed = async (nextTab) => {
  const isValid = await validateAndProceed(nextTab, customerId);
  if (isValid) {
    activeTab.value = nextTab;
  }
};

const handleSubmit = async () => {
  const success = await submitForm(customerId, router);
  if (success) {
    alert("Thao tác thành công!");
  }
};
</script>

<template>
  <div class="mx-auto mt-10 w-[90%]">
    <TabPanel :tabs="tabs" v-model:activeTab="activeTab">
      <!-- Panel 1: Thông tin khách hàng -->
      <template #panel1>
        <form class="bg-base-100 space-y-4 p-6">
          <div
            v-for="(value, key) in khachHang"
            :key="key"
            class="focus:ring-base-300 flex w-full items-center rounded-lg border p-2 focus-within:ring-2"
          >
            <input
              v-model="khachHang[key]"
              :placeholder="key"
              class="w-full border-0 focus:outline-none"
            />
          </div>
        </form>
        <button @click="handleProceed('panel2')" class="btn btn-primary">
          Tiếp tục
        </button>
      </template>

      <!-- Panel 2: Địa chỉ khách hàng -->
      <template #panel2>
        <div
          v-for="(dc, index) in diaChiHienThi"
          :key="index"
          class="border-base-300 bg-base-200 mb-4 rounded-lg p-6 shadow-md"
        >
          <div class="grid grid-cols-2 gap-4">
            <!-- Thành phố -->
            <select v-model="dc.thanhPho" class="select select-bordered">
              <option value="">Chọn thành phố</option>
              <option v-for="city in citis" :key="city" :value="city">
                {{ city }}
              </option>
            </select>

            <!-- Quận/huyện -->
            <select
              v-model="dc.quanHuyen"
              :disabled="!dc.thanhPho"
              class="select select-bordered"
            >
              <option value="">Chọn quận huyện</option>
              <option
                v-for="district in dc.availableDistricts"
                :key="district"
                :value="district"
              >
                {{ district }}
              </option>
            </select>

            <!-- Phường/xã -->
            <select
              v-model="dc.phuongXa"
              :disabled="!dc.quanHuyen"
              class="select select-bordered"
            >
              <option value="">Chọn phường xã</option>
              <option
                v-for="ward in dc.availableWards"
                :key="ward"
                :value="ward"
              >
                {{ ward }}
              </option>
            </select>

            <!-- Số nhà, đường -->
            <input
              v-model="dc.soNhaDuong"
              placeholder="Số nhà, Đường"
              class="input input-bordered focus:ring-primary"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <label class="flex items-center">
              <input
                type="radio"
                :checked="dc.macDinh"
                @change="setMacDinh(index)"
                class="mr-2"
              />
              Mặc định
            </label>
            <button
              v-if="diaChiList.length > 1"
              @click="removeDiaChi(index)"
              class="flex items-center text-red-500 hover:text-red-700"
            >
              <span class="icon-[mdi--bin] mr-1 h-4 w-4">Xóa</span>
            </button>
          </div>
        </div>
        <div class="flex gap-1">
          <button @click="addDiaChi" class="btn btn-outline btn-primary">
            + Thêm địa chỉ
          </button>
          <button @click="handleProceed('panel3')" class="btn btn-primary">
            Tiếp tục
          </button>
        </div>
      </template>

      <!-- Panel 3: Xác nhận thông tin -->
      <template #panel3>
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-base rounded-lg border p-6 shadow-md">
            <h2 class="text-lg font-semibold">Thông tin khách hàng</h2>
            <p v-for="(value, key) in khachHang" :key="key" class="">
              {{ key }}: {{ value || '""' }}
            </p>
          </div>
          <div class="rounded-lg p-6 shadow-md">
            <h2 class="text-lg font-semibold">Địa chỉ khách hàng</h2>
            <table class="w-full border-collapse border">
              <thead>
                <tr class="bg-base-200">
                  <th class="border p-2">Thành phố</th>
                  <th class="border p-2">Quận/Huyện</th>
                  <th class="border p-2">Phường/Xã</th>
                  <th class="border p-2">Số nhà, Đường</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dc, index) in diaChiHienThi" :key="index">
                  <td class="border p-2">{{ dc.thanhPho || '""' }}</td>
                  <td class="border p-2">{{ dc.quanHuyen || '""' }}</td>
                  <td class="border p-2">{{ dc.phuongXa || '""' }}</td>
                  <td class="border p-2">{{ dc.soNhaDuong || '""' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button @click="handleSubmit" class="btn btn-primary">Xác nhận</button>
      </template>
    </TabPanel>
  </div>
</template>
