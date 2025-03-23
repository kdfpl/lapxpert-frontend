<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNhanVienStore } from "@/stores/nhanVienStore";
import TabPanel from "@/components/TabPanel.vue";
import { Plus, Trash2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import roleService from "@/api/service/ChucVuService";

const route = useRoute();
const router = useRouter();
const staffId = route.params.id;

const store = useNhanVienStore();
const { diaChiList, nhanVien, diaChiHienThi, citis } = storeToRefs(store);

const {
  validateAndProceed,
  fetchCityData,
  fetchNhanVienById,
  createNewAddress,
  updateDistrictsAndWards,
  submitForm,
  addDiaChi,
  removeDiaChi,
  setMacDinh,
} = store;

const tabs = [
  { label: "1. Thông tin nhân viên", key: "panel1" },
  { label: "2. Địa chỉ nhân viên", key: "panel2" },
  { label: "3. Xác nhận thông tin", key: "panel3" },
];

const activeTab = ref("panel1");
const isLoading = ref(false);
const chucVuList = ref([]);

onMounted(async () => {
  isLoading.value = true;
  try {
    await fetchCityData();
    const roleResponse = await roleService.getAllRoles();
    chucVuList.value = roleResponse.data || [];

    if (staffId) {
      await fetchNhanVienById(staffId);
    } else {
      diaChiList.value = [createNewAddress(true)];
      nhanVien.value.chucVu = chucVuList.value[0]; 
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
  { deep: true }
);

const handleProceed = async (nextTab) => {
  const isValid = await validateAndProceed(nextTab, staffId);
  if (isValid) {
    activeTab.value = nextTab;
  }
};

const handleSubmit = async () => {
  const success = await submitForm(staffId, router);
  if (success) {
    alert("Thao tác thành công!");
  }
};
</script>

<template>
  <div class="w-[90%] mx-auto mt-10">
    <TabPanel :tabs="tabs" v-model:activeTab="activeTab">
      <!-- Panel 1: Thông tin nhân viên -->
      <template #panel1>
        <form class="space-y-4 p-6 bg-base-100">
          <div class="flex items-center border rounded-lg p-2 w-full">
            <input
              v-model="nhanVien.hoTen"
              placeholder="Họ tên"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <input
              v-model="nhanVien.email"
              placeholder="Email"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <input
              v-model="nhanVien.sdt"
              placeholder="Số điện thoại"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <select v-model="nhanVien.chucVu" class="w-full select border-0">
              <option
                v-for="chucVu in chucVuList"
                :key="chucVu.id"
                :value="chucVu"
              >
                {{ chucVu.tenChucVu }}
              </option>
            </select>
          </div>
        </form>
        <button @click="handleProceed('panel2')" class="btn btn-primary">
          Tiếp tục
        </button>
      </template>

      <!-- Panel 2: Địa chỉ nhân viên -->
      <template #panel2>
        <div
          v-for="(dc, index) in diaChiHienThi"
          :key="index"
          class="p-6 rounded-lg border-base-300 shadow-md bg-base-200 mb-4"
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
              <option v-for="ward in dc.availableWards" :key="ward" :value="ward">
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
          <div class="flex justify-between mt-4">
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
              class="text-red-500 hover:text-red-700 flex items-center"
            >
              <Trash2 class="w-4 h-4 mr-1" /> Xóa
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
          <div class="p-6 bg-base border rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Thông tin nhân viên</h2>
            <p>Họ tên: {{ nhanVien.hoTen }}</p>
            <p>Email: {{ nhanVien.email }}</p>
            <p>Số điện thoại: {{ nhanVien.sdt }}</p>
            <p>Chức vụ: {{ nhanVien.chucVu?.tenChucVu || "Không xác định" }}</p>
          </div>
          <div class="p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Địa chỉ nhân viên</h2>
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
        <button @click="handleSubmit" class="btn btn-primary">
          Xác nhận
        </button>
      </template>
    </TabPanel>
  </div>
</template>