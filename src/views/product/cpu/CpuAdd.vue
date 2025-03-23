<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">{{ isEditMode ? "Chỉnh sửa CPU" : "Thêm CPU" }}</legend>

        <!-- Mã CPU -->
        <label class="fieldset-label">Mã CPU</label>
        <input
          v-model="cpuData.maCpu"
          type="text"
          class="input w-full"
          placeholder="Nhập mã CPU"
        />

        <div class="flex gap-4">
          <!-- Tên CPU -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên CPU</label>
            <input
              v-model="cpuData.tenCpu"
              type="text"
              class="input w-full"
              placeholder="Ví dụ: Core i9-13900K"
            />
          </fieldset>

          <!-- Hãng CPU -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hãng CPU</label>
            <select v-model="cpuData.hangCpu" class="select w-full">
              <option value="Intel">Intel</option>
              <option value="AMD">AMD</option>
              <option value="Qualcomm">Qualcomm</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <!-- Thế hệ CPU -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Thế hệ CPU</label>
            <input
              v-model="cpuData.theHeCpu"
              type="text"
              class="input w-full"
              placeholder="Ví dụ: Zen 4, Alder Lake"
            />
          </fieldset>

          <!-- Số nhân -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Số nhân</label>
            <input
              v-model="cpuData.soNhan"
              type="number"
              class="input w-full"
              placeholder="Ví dụ: 6"
            />
          </fieldset>

          <!-- Số luồng -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Số luồng</label>
            <input
              v-model="cpuData.soLuong"
              type="number"
              class="input w-full"
              placeholder="Ví dụ: 12"
            />
          </fieldset>

          <!-- Xung nhịp -->
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Xung nhịp (GHz)</label>
            <input
              v-model="cpuData.xungNhip"
              type="number"
              step="0.1"
              class="input w-full"
              placeholder="Ví dụ: 2.5"
            />
          </fieldset>
        </div>

        <!-- Nút thêm/chỉnh sửa CPU -->
        <button @click="handleSubmit" class="btn btn-primary btn-soft mt-4">
          {{ isEditMode ? "Cập nhật CPU" : "Thêm CPU" }}
        </button>
      </fieldset>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute ,useRouter} from "vue-router";
import { useCpuStore } from "@/stores/cpustore";

const router = useRouter()
const route = useRoute();
const store = useCpuStore();

// Kiểm tra xem có phải chế độ chỉnh sửa không
const isEditMode = ref(false);
const cpuId = route.params.id; 

// Dữ liệu CPU
const cpuData = ref({
  maCpu: "",
  tenCpu: "",
  hangCpu: "Intel",
  theHeCpu: "",
  soNhan: null,
  soLuong: null,
  xungNhip: null,
  tinhTrang: true,
});

// Hàm lấy thông tin CPU theo ID
const fetchCpuById = async (id) => {
  try {
    await store.fetchCpuById(id);
    cpuData.value = { ...store.cpuData }; // Gán dữ liệu vào form
  } catch (error) {
    console.error("Lỗi khi lấy thông tin CPU:", error);
    alert("Không thể tải thông tin CPU, vui lòng thử lại!");
  }
};

// Hàm xử lý khi submit form
const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      // Nếu là chế độ chỉnh sửa, gọi action updateCpu
      await store.updateCpu(cpuId, cpuData.value);
      alert("Cập nhật CPU thành công!");
      router.push("/admin/cpu")
    } else {
      // Nếu là chế độ thêm mới, gọi action addCpu
      await store.addCpu(cpuData.value);
      alert("Thêm CPU thành công!");
    }

    // Reset form sau khi thành công
    cpuData.value = {
      maCpu: "",
      tenCpu: "",
      hangCpu: "Intel",
      theHeCpu: "",
      soNhan: null,
      soLuong: null,
      xungNhip: null,
      tinhTrang: true,
    };
  } catch (error) {
    console.error("Lỗi khi xử lý CPU:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

// Khi component được mount, kiểm tra xem có id không
onMounted(() => {
  if (cpuId) {
    isEditMode.value = true;
    fetchCpuById(cpuId); 
  }
});
</script>