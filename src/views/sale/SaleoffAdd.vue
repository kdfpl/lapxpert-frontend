<script setup>
import { onMounted, reactive, computed } from "vue";
import { useSanPhamStore } from "@/stores/sanphamstore";
import { useSpctStore } from "@/stores/spctstore";
import {
  createDotGiamGia,
  createDotGiamGiaChiTiet,
} from "@/apis/graphql/dotgiamgia";

const sanPhamStore = useSanPhamStore();
const sanPhamChiTietStore = useSpctStore();
const selectedSanPhams = reactive([]);
const selectedSanPhamChiTietIds = reactive(new Set());

onMounted(() => {
  sanPhamStore.fetchSanPhamList();
  sanPhamChiTietStore.fetchSpct();
});

const dotGiamGiaData = reactive({
  maDot: "",
  tenDot: "",
  giaTriGiam: 0,
  loaiGiamGia: "",
  moTa: "",
  thoiGianBatDau: "",
  thoiGianKetThuc: "",
  trangThai: "",
});

const thoiGianBatDauUTC = computed(() =>
  dotGiamGiaData.thoiGianBatDau
    ? new Date(dotGiamGiaData.thoiGianBatDau).toISOString()
    : "",
);

const thoiGianKetThucUTC = computed(() =>
  dotGiamGiaData.thoiGianKetThuc
    ? new Date(dotGiamGiaData.thoiGianKetThuc).toISOString()
    : "",
);
// Khi checkbox thay đổi, thêm hoặc xóa sản phẩm khỏi danh sách
const toggleSanPhamSelection = (sanPhamId) => {
  const index = selectedSanPhams.indexOf(sanPhamId);
  if (index === -1) {
    selectedSanPhams.push(sanPhamId);
  } else {
    selectedSanPhams.splice(index, 1);
  }
};

const toggleSanPhamChiTiet = (id) => {
  if (selectedSanPhamChiTietIds.has(id)) {
    selectedSanPhamChiTietIds.delete(id);
  } else {
    selectedSanPhamChiTietIds.add(id);
  }
};

// Lọc danh sách sản phẩm chi tiết theo sản phẩm đã chọn
const selectedSanPhamChiTietList = computed(() => {
  return sanPhamChiTietStore.spctList.filter((spct) =>
    selectedSanPhams.includes(spct.sanPham.id),
  );
});

const submitForm = async () => {
  try {
    const formattedData = {
      ...dotGiamGiaData,
      thoiGianBatDau: thoiGianBatDauUTC.value,
      thoiGianKetThuc: thoiGianKetThucUTC.value,
    };

    const dotGiamGiaResponse = await createDotGiamGia(formattedData);
    const dotGiamGiaId = dotGiamGiaResponse.id;

    const dotGiamGiaChiTietData = Array.from(selectedSanPhamChiTietIds).map(
      (spctId) => ({
        dotGiamGiaId,
        sanPhamChiTietId: spctId,
        maDotChiTiet: `DGGCT-${dotGiamGiaId}-${spctId}`,
        tinhTrang: true,
      }),
    );

    for (const chiTiet of dotGiamGiaChiTietData) {
      await createDotGiamGiaChiTiet({
        dotGiamGiaId: chiTiet.dotGiamGiaId,
        sanPhamChiTietId: chiTiet.sanPhamChiTietId,
        maDotChiTiet: chiTiet.maDotChiTiet,
        tinhTrang: chiTiet.tinhTrang,
      });
    }

    console.log("Thêm đợt giảm giá và chi tiết thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm đợt giảm giá:", error);
  }
};

const isDetailVisible = computed(() => selectedSanPhams.length > 0);
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <!-- div-form -->
    <section class="my-4 flex h-[650px] w-full items-center">
      <!-- form -->
      <div
        class="rounded-box bg-base-200 border-base-300 flex-1 border h-full"
      >
        <fieldset class="fieldset w-full px-5">
          <legend class="fieldset-legend">Thêm đợt giảm giá</legend>

          <label class="fieldset-label">Mã</label>
          <input
            v-model="dotGiamGiaData.maDot"
            type="text"
            class="input w-full"
            placeholder="KM100..."
          />

          <label class="fieldset-label">Tên</label>
          <input
            v-model="dotGiamGiaData.tenDot"
            type="text"
            class="input w-full"
            placeholder="Flash Sale, Black Friday,..."
          />

          <label class="fieldset-label">Giá trị giảm</label>
          <input
            v-model="dotGiamGiaData.giaTriGiam"
            type="number"
            class="input w-full"
            placeholder="100.000,..."
          />

          <label class="fieldset-label">Loại</label>
          <input
            v-model="dotGiamGiaData.loaiGiamGia"
            type="text"
            class="input w-full"
            placeholder="Name"
          />

          <label class="fieldset-label">Mô tả</label>
          <textarea
            v-model="dotGiamGiaData.moTa"
            class="textarea w-full"
            placeholder="..."
          ></textarea>

          <div class="flex gap-4">
            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày bắt đầu</label>
              <input
                v-model="dotGiamGiaData.thoiGianBatDau"
                type="datetime-local"
                class="input w-full"
              />
            </fieldset>

            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày kết thúc</label>
              <input
                v-model="dotGiamGiaData.thoiGianKetThuc"
                type="datetime-local"
                class="input w-full"
              />
            </fieldset>
          </div>

          <label class="fieldset-label">Tình trạng</label>
          <select class="select w-full" v-model="dotGiamGiaData.trangThai">
            <option selected>Đang diễn ra</option>
            <option>Kết thúc</option>
          </select>

          <button @click="submitForm" class="btn btn-primary btn-soft mt-4">
            Thêm
          </button>
        </fieldset>
      </div>

      <div class="divider divider-primary divider-horizontal"></div>

      <!-- div-table -->
      <div
        class="rounded-box bg-base-200 border-base-300 flex h-full flex-1 flex-col border p-4"
      >
        <span class="text-base-content mb-2 text-2xl font-bold">Sản phẩm</span>
        <!-- table-san-pham -->
        <div class="mb-2 max-h-[600px] w-full overflow-auto">
          <table class="table-pin-rows table w-full">
            <thead>
              <tr>
                <th class="w-[20px]">
                  <input type="checkbox" class="checkbox" />
                </th>
                <th class="w-[20px]">STT</th>
                <th>Tên</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sanPham, index) in sanPhamStore.sanPhamList"
                :key="sanPham.id"
              >
                <td>
                  <input
                    type="checkbox"
                    class="checkbox"
                    :checked="selectedSanPhams.includes(sanPham.id)"
                    @change="toggleSanPhamSelection(sanPham.id)"
                  />
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ sanPham.tenSp }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- pagination -->
        <div class="mt-auto flex justify-between">
          <div class="flex items-center">
            <label class="label">
              <span>Xem</span>
              <span class="badge badge-soft badge-primary">
                <select class="focus:outline-none">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </span>
              <span>dòng 1 trang</span>
            </label>
          </div>

          <div class="join gap-2">
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              <span class="icon-[ep--arrow-left-bold]"></span>
            </button>
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              1
            </button>
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              2
            </button>
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              3
            </button>
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              4
            </button>
            <button
              class="join-item btn btn-circle btn-sm btn-soft btn-primary"
            >
              <span class="icon-[ep--arrow-right-bold]"></span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- div-table-detail -->
    <section
      class="rounded-box bg-base-200 border-base-300 flex max-h-[650px] flex-1 flex-col border p-4"
      v-if="isDetailVisible"
    >
      <span class="text-base-content mb-2 text-2xl font-bold"
        >Chi tiết sản phẩm</span
      >
      <!-- table -->
      <div class="max-h-[600px] w-full overflow-auto">
        <table class="table-pin-rows table w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th class="w-[20px]">
                <input type="checkbox" class="checkbox" />
              </th>
              <th>ID</th>
              <th>Tên Sản Phẩm</th>
              <th>RAM</th>
              <th>Màn</th>
              <th>Pin</th>
              <th>Màu</th>
              <th>GPU</th>
              <th>CPU</th>
              <th>Drive</th>
              <th>Seri</th>
              <th>Giá bán</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(spct, index) in selectedSanPhamChiTietList"
              :key="spct.id"
            >
              <td>{{ index + 1 }}</td>
              <!-- Checkbox trong bảng sản phẩm chi tiết -->
              <td>
                <input
                  type="checkbox"
                  class="checkbox"
                  :value="spct.id"
                  @change="toggleSanPhamChiTiet(spct.id)"
                />
              </td>

              <td>{{ spct.maChiTietSp }}</td>
              <td>{{ spct.sanPham.tenSp }}</td>
              <td>{{ spct.ram.loaiRam.tenLoaiRam }}</td>
              <td>{{ spct.manHinh.id }}</td>
              <td>{{ spct.pin.maPin }}</td>
              <td>{{ spct.mau.tenMau }}</td>
              <td>{{ spct.gpu.tenGpu }}</td>
              <td>{{ spct.cpu.tenCpu }}</td>
              <td>{{ spct.ocung.maOCung }}</td>
              <td>{{ spct.seri.maSeri }}</td>
              <td>{{ spct.giaBan }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- pagination -->
      <div class="mt-auto flex justify-between">
        <div class="flex items-center">
          <label class="label">
            <span>Xem</span>
            <span class="badge badge-soft badge-primary">
              <select class="focus:outline-none">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </span>
            <span>dòng 1 trang</span>
          </label>
        </div>

        <div class="join gap-2">
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            <span class="icon-[ep--arrow-left-bold]"></span>
          </button>
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            1
          </button>
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            2
          </button>
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            3
          </button>
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            4
          </button>
          <button class="join-item btn btn-circle btn-sm btn-soft btn-primary">
            <span class="icon-[ep--arrow-right-bold]"></span>
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
