<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import staffService from "../../api/service/NhanVienService";
import TabPanel from "../../components/TabPanel.vue";
import { Check, Plus, Trash2, User, Mail, Lock, Phone } from "lucide-vue-next";
import roleService from "../../api/service/ChucVuService";

const route = useRoute();
const router = useRouter();
const staffId = route.params.id;
const activeTab = ref("panel1");

const nhanVien = ref({ hoTen: "", email: "", sdt: "", vaiTro: null });
const chucVuList = ref([]);
const errors = ref({});
console.log(staffId);

onMounted(async () => {
  try {
    const roleResponse = await roleService.getAllRoles();
    chucVuList.value = roleResponse.data || [];

    console.log("Danh sách chức vụ nhận từ API:", chucVuList.value);

    if (staffId) {
      const staffResponse = await staffService.getStaffById(staffId);
      console.log("Dữ liệu nhân viên từ API:", staffResponse);

      if (staffResponse) {
        nhanVien.value = {
          hoTen: staffResponse.hoTen,
          email: staffResponse.email,
          sdt: staffResponse.sdt,
          vaiTro: staffResponse.chucVu,
        };
        console.log("Nhân viên sau khi cập nhật:", nhanVien.value);
      }
    }

    if (!staffId && chucVuList.value.length > 0) {
      nhanVien.value.vaiTro = chucVuList.value[0];
    }

    console.log("Nhân viên sau khi xử lý vai trò:", nhanVien.value);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
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

const thongTinHopLe = computed(() => {
  return nhanVien.value.hoTen && nhanVien.value.email && nhanVien.value.sdt && isValidEmail(nhanVien.value.email)&& isValidPhone(nhanVien.value.sdt);
});

const validateAndProceed = async (nextTab) => {
  errors.value = {};

  if (
    activeTab.value === "panel1" &&
    (!nhanVien.value.hoTen || !nhanVien.value.email || !nhanVien.value.sdt)
  ) {
    errors.value.nhanVien = "Vui lòng nhập đầy đủ thông tin nhân viên!";
    return;
  }

  if (!isValidEmail(nhanVien.value.email)) {
      errors.value.nhanVien = "Email không đúng định dạng!";
      return;
    }

    if (!isValidPhone(nhanVien.value.sdt)) {
      errors.value.nhanVien = "Số điện thoại phải có 10 chữ số!";
      return;
    }

  if (activeTab.value === "panel1") {
    const { email, sdt } = nhanVien.value;

    if (email || sdt) {
      try {
        const response = await staffService.checkDuplicate(
          email,
          sdt,
          staffId ? staffId : 0
        );

        if (response?.data) {
          errors.value.nhanVien = "Email hoặc số điện thoại đã tồn tại!";
          return;
        }
      } catch (error) {
        console.error("Lỗi kiểm tra trùng lặp:", error);
        errors.value.nhanVien = "Lỗi khi kiểm tra trùng lặp!";
        return;
      }
    }
  }
  activeTab.value = "panel2"
}

const submitForm = async () => {
  if (!thongTinHopLe.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  try {
    const staffData = {
      hoTen: nhanVien.value.hoTen,
      email: nhanVien.value.email,
      sdt: nhanVien.value.sdt,
      chucVu: { id: nhanVien.value.vaiTro?.id },
    };
    if (staffId) {
      await staffService.updateStaff(staffId, staffData);
      alert("Cập nhật thành công!");
    } else {
      await staffService.addStaff(staffData);
      alert("Thêm nhân viên thành công!");
    }
    router.push("/NhanVien");
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
</script>

<template>
  <div class="w-[90%] mx-auto mt-10">
    <TabPanel
      :tabs="[
        { label: '1. Thông tin nhân viên', key: 'panel1' },
        { label: '2. Xác nhận thông tin', key: 'panel2' },
      ]"
      v-model:activeTab="activeTab"
    >
      <template #panel1>
        <form class="space-y-4 p-6 bg-white rounded-lg shadow-md">
          <div class="flex items-center border rounded-lg p-2 w-full">
            <User class="w-5 h-5 text-gray-500 mr-2" />
            <input
              v-model="nhanVien.hoTen"
              placeholder="Họ tên"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <Mail class="w-5 h-5 text-gray-500 mr-2" />
            <input
              v-model="nhanVien.email"
              placeholder="Email"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <Phone class="w-5 h-5 text-gray-500 mr-2" />
            <input
              v-model="nhanVien.sdt"
              placeholder="Số điện thoại"
              class="w-full border-0 focus:outline-none"
            />
          </div>
          <div class="flex items-center border rounded-lg p-2 w-full">
            <Lock class="w-5 h-5 text-gray-500 mr-2" />
            <select
              v-model="nhanVien.vaiTro"
              class="w-full border-0 outline-0 focus:outline-none"
            >
              <option
                v-for="chucVu in chucVuList"
                :key="chucVu.id"
                :value="chucVu"
              >
                {{ chucVu.tenChucVu }}
              </option>
            </select>
          </div>
          <p v-if="errors.nhanVien" class="text-red-500">
            {{ errors.nhanVien }}
          </p>
        </form>
        <button
          @click="validateAndProceed('panel2')"
          class="mt-4 px-6 py-2 rounded-lg bg-gray-900 text-white"
        >
          Tiếp tục
        </button>
      </template>

      <template #panel2>
        <div class="grid grid-cols-2 gap-6">
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-lg font-semibold">Thông tin nhân viên</h2>
            <p>Họ tên: {{ nhanVien.hoTen }}</p>
            <p>Email: {{ nhanVien.email }}</p>
            <p>Số điện thoại: {{ nhanVien.sdt }}</p>
            <p>Chức vụ: {{ nhanVien.vaiTro?.tenChucVu || "Không xác định" }}</p>
          </div>
        </div>
        <button
          @click="submitForm"
          class="mt-4 px-6 py-2 rounded-lg bg-gray-900 text-white"
        >
          Xác nhận
        </button>
      </template>
    </TabPanel>
  </div>
</template>
