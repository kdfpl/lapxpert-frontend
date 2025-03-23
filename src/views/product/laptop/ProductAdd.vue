<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useSpctStore } from "../../../stores/spctstore";
import { useSanPhamStore } from "../../../stores/sanphamstore";
import { addSanPham } from "../../../apis/services/sanphamservice";
import { addSPCT } from "../../../apis/services/spctservice";

const spctStore = useSpctStore();
const sanPhamStore = useSanPhamStore();
const sanPhamData = reactive({
  loai: 0,
  heDieuHanh: 0,
  thuongHieu: 0,
  maSp: "",
  tenSp: "",
  moTa: "",
  baoHanhThang: 0,
  trangThai: "",
  hinhAnh: "",
});

const spctList = reactive([
  {
    sanPham: 0,
    ram: 0,
    manHinh: 0,
    pin: 0,
    mau: 0,
    gpu: 0,
    cpu: 0,
    ocung: 0,
    seri: 0,
    maChiTietSp: "",
    giaBan: 0.0,
  },
]);

const addNewSPCT = () => {
  spctList.push({
    sanPham: 0,
    ram: 0,
    manHinh: 0,
    pin: 0,
    mau: 0,
    gpu: 0,
    cpu: 0,
    ocung: 0,
    seri: 0,
    maChiTietSp: "",
    giaBan: 0.0,
  });
};

const validateForm = () => {
  for (const key in sanPhamData) {
    const value = sanPhamData[key as keyof typeof sanPhamData];

    if (typeof value === "string" && value.trim() === "") {
      console.error(`Trường ${key} không được để trống`);
      return false;
    }

    if (typeof value === "number" && value <= 0 && key !== "baoHanhThang") {
      console.error(`Trường ${key} phải lớn hơn 0`);
      return false;
    }
  }
  return true;
};

const validateSPCTList = () => {
  for (const spctData of spctList) {
    for (const key in spctData) {
      if (key === "sanPham") continue;

      const value = spctData[key as keyof typeof spctData];

      if (typeof value === "string" && value.trim() === "") {
        console.error(`Trường ${key} trong SPCT không được để trống`);
        return false;
      }
      if (typeof value === "number" && value <= 0 && key !== "seri") {
        console.error(`Trường ${key} trong SPCT phải lớn hơn 0`);
        return false;
      }
    }
  }
  return true;
};

const validateAll = () => {
  if (!validateForm()) return false;
  if (!validateSPCTList()) return false;
  return true;
};



const submitForm = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!validateAll()) {
      alert(
        "Vui lòng điền đầy đủ thông tin và đảm bảo các trường không trống hoặc bằng 0"
      );
      return;
    }

    // Bước 1: Thêm sản phẩm trước
    const sanPhamMoi = await addSanPham(sanPhamData);
    console.log("Sản phẩm mới:", sanPhamMoi);

    // Bước 2: Thêm nhiều SPCT
    const responses = [];
    for (const spctData of spctList) {
      spctData.sanPham = sanPhamMoi;
      console.log("Dữ liệu SPCT gửi đi:", spctData);
      const response = await addSPCT(spctData);
      responses.push(response);
      console.log("Sản phẩm Chi Tiết đã thêm:", response);
    }

    alert("Thêm sản phẩm và chi tiết sản phẩm thành công!");
    return responses;
  } catch (error) {
    console.error("Lỗi khi thêm Sản Phẩm và SPCT:", error);
    alert("Có lỗi xảy ra khi thêm sản phẩm và chi tiết sản phẩm");
    throw error;
  }
};

onMounted(() => {
  spctStore.fetchAllData();
  sanPhamStore.fetchAllData();
});
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm Sản Phẩm</legend>

        <!-- Thông tin chung -->
        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Mã Sản Phẩm</label>
            <input
              type="text"
              class="input w-full"
              placeholder="SP001"
              v-model="sanPhamData.maSp"
            />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên Sản Phẩm</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Dell Inspiron 15"
              v-model="sanPhamData.tenSp"
            />
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Loại</label>
            <select class="select w-full" v-model="sanPhamData.loai">
              <option
                v-for="loai in sanPhamStore.loaiList"
                :key="loai.id"
                :value="loai"
              >
                {{ loai.tenLoai }}
              </option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hệ Điều Hành</label>
            <select class="select w-full" v-model="sanPhamData.heDieuHanh">
              <option
                v-for="heDieuHanh in sanPhamStore.heDieuHanhList"
                :key="heDieuHanh.id"
                :value="heDieuHanh"
              >
                {{ heDieuHanh.tenHeDieuHanh }}
              </option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Thương Hiệu</label>
            <select class="select w-full" v-model="sanPhamData.thuongHieu">
              <option
                v-for="thuongHieu in sanPhamStore.thuongHieuList"
                :key="thuongHieu.id"
                :value="thuongHieu"
              >
                {{ thuongHieu.tenThuongHieu }}
              </option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Bảo Hành (Tháng)</label>
            <input
              type="number"
              class="input w-full"
              placeholder="24"
              v-model="sanPhamData.baoHanhThang"
            />
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Trạng Thái</label>
            <select class="select w-full" v-model="sanPhamData.trangThai">
              <option value="true">Còn hàng</option>
              <option value="false">Hết hàng</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hình Ảnh</label>
            <input
              type="text"
              class="input w-full"
              v-model="sanPhamData.hinhAnh"
            />
          </fieldset>
        </div>

        <label class="fieldset-label">Mô Tả</label>
        <textarea
          class="textarea w-full"
          placeholder="Mô tả sản phẩm..."
          v-model="sanPhamData.moTa"
        ></textarea>
      </fieldset>

      <!-- Chi tiết sản phẩm -->
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm thuộc tính sản phẩm</legend>
        <div v-for="(spctData, index) in spctList" :key="index" class="mb-4">
          <div class="bg-base-100 p-4  rounded-2xl">
            <div class="flex gap-4">
              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">RAM</label>
                <select class="select w-full" v-model="spctData.ram">
                  <option value="" disabled selected>RAM</option>
                  <option
                    v-for="ram in spctStore.ramList"
                    :key="ram.id"
                    :value="ram"
                  >
                    {{ ram.loaiRam.tenLoaiRam }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Màn Hình</label>
                <select class="select w-full" v-model="spctData.manHinh">
                  <option value="" disabled selected>Màn hình</option>
                  <option
                    v-for="mh in spctStore.manHinhList"
                    :key="mh.id"
                    :value="mh"
                  >
                    {{ mh.maManHinh }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Pin</label>
                <select class="select w-full" v-model="spctData.pin">
                  <option value="" disabled selected>Pin</option>
                  <option
                    v-for="pin in spctStore.pinList"
                    :key="pin.id"
                    :value="pin"
                  >
                    {{ pin.maPin }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Màu Sắc</label>
                <select class="select w-full" v-model="spctData.mau">
                  <option value="" disabled selected>Màu sắc</option>
                  <option
                    v-for="mau in spctStore.mauSacList"
                    :key="mau.id"
                    :value="mau"
                  >
                    {{ mau.tenMau }}
                  </option>
                </select>
              </fieldset>
            </div>

            <div class="flex gap-4">
              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">GPU</label>
                <select class="select w-full" v-model="spctData.gpu">
                  <option value="" disabled selected>Gpu</option>
                  <option
                    v-for="gpu in spctStore.gpuList"
                    :key="gpu.id"
                    :value="gpu"
                  >
                    {{ gpu.tenGpu }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">CPU</label>
                <select class="select w-full" v-model="spctData.cpu">
                  <option value="" disabled selected>Cpu</option>
                  <option
                    v-for="cpu in spctStore.cpuList"
                    :key="cpu.id"
                    :value="cpu"
                  >
                    {{ cpu.tenCpu }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Ổ Cứng</label>
                <select class="select w-full" v-model="spctData.ocung">
                  <option value="" disabled selected>Ổ Cứng</option>
                  <option
                    v-for="ocung in spctStore.ocungList"
                    :key="ocung.id"
                    :value="ocung"
                  >
                    {{ ocung.maOCung }}
                  </option>
                </select>
              </fieldset>
            </div>

            <div class="flex gap-4">
              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Seri</label>
                <select class="select w-full" v-model="spctData.seri">
                  <option value="" disabled selected>Seri</option>
                  <option
                    v-for="seri in spctStore.seriList"
                    :key="seri.id"
                    :value="seri"
                  >
                    {{ seri.maSeri }}
                  </option>
                </select>
              </fieldset>
              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Mã chi tiết Sản Phẩm</label>
                <input
                  type="text"
                  class="input w-full"
                  placeholder="Mã chi tiết Sản Phẩm"
                  v-model="spctData.maChiTietSp"
                />
              </fieldset>

              <fieldset class="fieldset flex-1">
                <label class="fieldset-label">Giá Bán (VNĐ)</label>
                <input
                  type="number"
                  class="input w-full"
                  placeholder="25000000"
                  v-model.number="spctData.giaBan"
                />
              </fieldset>
            </div>
            <button
              v-if="index > 0"
              @click="spctList.splice(index, 1)"
              class="btn btn-error btn-soft mt-4"
            >
              Xóa
            </button>
          </div>
        </div>
        <button @click="addNewSPCT" class="btn btn-secondary btn-soft mt-4">
          Thêm SPCT
        </button>
        <button @click="submitForm" class="btn btn-primary btn-soft mt-4">
          Thêm
        </button>
      </fieldset>
    </div>
  </section>
</template>