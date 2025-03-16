<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import customerService from "../../api/service/KhachHangService";
import TabPanel from "../../components/TabPanel.vue";
import { Plus, Trash2, Check } from "lucide-vue-next";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const customerId = route.params.id;

const tabs = [
  { label: "1. Thông tin khách hàng", key: "panel1" },
  { label: "2. Địa chỉ khách hàng", key: "panel2" },
  { label: "3. Xác nhận thông tin", key: "panel3" },
];

const activeTab = ref("panel1");

const khachHang = ref({ hoTen: "", email: "", sdt: "" });
const diaChiList = ref([]);
const errors = ref({});

onMounted(async () => {
  if (customerId) {
    try {
      const response = await customerService.getCustomerById(customerId);
      if (response.data) {
        khachHang.value = {
          hoTen: response.data.hoTen || "",
          email: response.data.email || "",
          sdt: response.data.sdt || "",
        };

        const diaChiHopLe =
          response.data.diaChiList?.filter((dc) => dc.tinhTrang) || [];

        diaChiList.value =
          diaChiHopLe.length > 0
            ? diaChiHopLe
            : [
                {
                  thanhPho: "",
                  quanHuyen: "",
                  phuongXa: "",
                  soNhaDuong: "",
                  macDinh: true,
                  tinhTrang: true,
                },
              ];
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu khách hàng:", error);
    }
  } else {
    diaChiList.value = [
      {
        thanhPho: "",
        quanHuyen: "",
        phuongXa: "",
        soNhaDuong: "",
        macDinh: true,
        tinhTrang: true,
      },
    ];
  }
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (sdt) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(sdt);
};

const addDiaChi = () => {
  diaChiList.value.push({
    thanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    soNhaDuong: "",
    macDinh: false,
    tinhTrang: true,
  });
};

const diaChiHienThi = computed(() =>
  diaChiList.value.filter((dc) => dc.tinhTrang)
);

const cityData = ref([]);
const citis = ref([]);
const districts = ref([]);
const wards = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    cityData.value = response.data;
    citis.value = cityData.value.map((city) => city.Name);
  } catch (error) {
    console.error("Lỗi tải dữ liệu địa phương:", error);
  }
});

watch(
  () => diaChiList.value.map((dc) => dc.thanhPho),
  (newCities) => {
    districts.value = [];
    newCities.forEach((newCity, index) => {
      const city = cityData.value.find((c) => c.Name === newCity);
      districts.value = city ? city.Districts.map((d) => d.Name) : [];
    });
  },
  { deep: true }
);

watch(
  () => diaChiList.value.map((dc) => dc.quanHuyen),
  (newDistricts) => {
    wards.value = [];
    newDistricts.forEach((newDistrict, index) => {
      const city = cityData.value.find(
        (c) => c.Name === diaChiList.value[index].thanhPho
      );
      if (city) {
        const district = city.Districts.find((d) => d.Name === newDistrict);
        wards.value = district ? district.Wards.map((w) => w.Name) : [];
      }
    });
  },
  { deep: true }
);

const removeDiaChi = (id) => {
  const index = diaChiList.value.findIndex((dc) => dc.id === id);
  if (index === -1) return;

  const activeAddresses = diaChiList.value.filter((dc) => dc.tinhTrang);
  if (activeAddresses.length === 1) {
    alert("Phải có ít nhất một địa chỉ hợp lệ!");
    return;
  }

  diaChiList.value[index].tinhTrang = false;

  if (diaChiList.value[index].macDinh) {
    const firstValid = diaChiList.value.find((dc) => dc.tinhTrang);
    if (firstValid) firstValid.macDinh = true;
  }
};

const setMacDinh = (index) => {
  if (!diaChiList.value[index].tinhTrang) return;

  diaChiList.value.forEach((dc, i) => {
    dc.macDinh = i === index;
  });
};

const thongTinHopLe = computed(() => {
  return (
    khachHang.value.hoTen &&
    isValidEmail(khachHang.value.email) &&
    isValidPhone(khachHang.value.sdt) &&
    diaChiHienThi.value.length > 0 &&
    diaChiHienThi.value.every(
      (dc) => dc.thanhPho && dc.quanHuyen && dc.phuongXa && dc.soNhaDuong
    )
  );
});

const validateAndProceed = async (nextTab) => {
  errors.value = {};

  if (activeTab.value === "panel1") {
    if (
      !khachHang.value.hoTen ||
      !khachHang.value.email ||
      !khachHang.value.sdt
    ) {
      errors.value.khachHang = "Vui lòng nhập đầy đủ thông tin!";
      return;
    }

    if (!isValidEmail(khachHang.value.email)) {
      errors.value.khachHang = "Email không đúng định dạng!";
      return;
    }

    if (!isValidPhone(khachHang.value.sdt)) {
      errors.value.khachHang = "Số điện thoại phải có 10 chữ số!";
      return;
    }

    try {
      const response = await customerService.checkDuplicate(
        khachHang.value.email,
        khachHang.value.sdt,
        customerId ? customerId : 0
      );

      if (response?.data) {
        errors.value.khachHang = "Email hoặc số điện thoại đã tồn tại!";
        return;
      }
    } catch (error) {
      console.error("Lỗi kiểm tra trùng lặp:", error);
      errors.value.khachHang = "Lỗi khi kiểm tra trùng lặp!";
      return;
    }
  }

  if (activeTab.value === "panel2") {
    if (diaChiHienThi.value.length === 0) {
      errors.value.diaChi = "Vui lòng nhập ít nhất một địa chỉ!";
      return;
    }
  }

  activeTab.value = nextTab;
};

const submitForm = async () => {
  if (!thongTinHopLe.value) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng và ít nhất một địa chỉ!");
    return;
  }

  try {
    const customerData = {
      ...khachHang.value,
      diaChiList: diaChiList.value, // Chỉ gửi danh sách địa chỉ mới
    };

    if (customerId) {
      await customerService.updateCustomer(customerId, customerData);
      alert("Cập nhật khách hàng thành công!");
    } else {
      await customerService.addCustomer(customerData);
      alert("Thêm khách hàng thành công!");
    }

    router.push("/KhachHang");
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
</script>

<template>
  <div class="w-[90%] mx-auto mt-10">
    <TabPanel :tabs="tabs" v-model:activeTab="activeTab">
      <template #panel1>
        <form class="space-y-4 p-6 bg-base-100">
          <div
            v-for="(value, key) in khachHang"
            :key="key"
            class="flex items-center border rounded-lg p-2 w-full focus-within:ring-2 focus:ring-base-300"
          >
            <component
              :is="
                key === 'hoTen'
                  ? User
                  : key === 'email'
                  ? Mail
                  : key === 'sdt'
                  ? Phone
                  : Lock
              "
              class="w-5 h-5 mr-2"
            />
            <input
              v-model="khachHang[key]"
              :placeholder="key"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <p v-if="errors.khachHang" class="text-red-500">
            {{ errors.khachHang }}
          </p>
          <p v-if="duplicateError" class="text-red-500">{{ duplicateError }}</p>
        </form>
        <button @click="validateAndProceed('panel2')" class="btn btn-primary">
          Tiếp tục
        </button>
      </template>

      <template #panel2>
        <div
          v-for="(dc, index) in diaChiHienThi"
          :key="index"
          class="p-6 rounded-lg border-base-300 shadow-md bg-white mb-4"
        >
          <div class="grid grid-cols-2 gap-4">
            <select v-model="dc.thanhPho" class="select select-bordered">
              <option value="">Chọn thành phố</option>
              <option v-for="city in citis" :key="city" :value="city">
                {{ city }}
              </option>
            </select>

            <select
              v-model="dc.quanHuyen"
              :disabled="!dc.thanhPho"
              class="select select-bordered"
            >
              <option value="">Chọn quận huyện</option>
              <option
                v-for="district in districts"
                :key="district"
                :value="district"
              >
                {{ district }}
              </option>
            </select>

            <select
              v-model="dc.phuongXa"
              :disabled="!dc.quanHuyen"
              class="select select-bordered"
            >
              <option value="">Chọn phường xã</option>
              <option v-for="ward in wards" :key="ward" :value="ward">
                {{ ward }}
              </option>
            </select>

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
        <p v-if="errors.diaChi" class="text-red-500">{{ errors.diaChi }}</p>
        <div class="flex gap-1">
          <button @click="addDiaChi" class="btn btn-outline btn-primary">
            + Thêm địa chỉ
          </button>
          <button @click="validateAndProceed('panel3')" class="btn btn-primary">
            Tiếp tục
          </button>
        </div>
      </template>

      <template #panel3>
        <div class="grid grid-cols-2 gap-6">
          <div class="p-6 bg-base border rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Thông tin khách hàng</h2>
            <p v-for="(value, key) in khachHang" :key="key" class="">
              {{ key }}: {{ value || '""' }}
            </p>
          </div>
          <div class="p-6 rounded-lg shadow-md">
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
        <button @click="submitForm" class="btn btn-primary">Xác nhận</button>
      </template>
    </TabPanel>
  </div>
</template>
