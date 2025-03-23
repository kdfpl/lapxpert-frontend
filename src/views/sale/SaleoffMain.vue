<script setup>
import { onMounted, reactive, computed } from "vue";
import { useDotGiamGiaStore } from "@/stores/dotgiamgiastore";
import { useSanPhamStore } from "@/stores/sanphamstore";
import { useSpctStore } from "@/stores/spctstore";
import { deleteDotGiamGia } from "@/apis/graphql/dotgiamgia";
import { DotGiamGia } from "@/types/dotgiamgiatypes";
import { SPCT } from "@/types/spcttypes";
import {
  updateDotGiamGiaChiTiet,
  updateDotGiamGia,
} from "@/apis/graphql/dotgiamgia";

const store = useDotGiamGiaStore();
const sanPhamStore = useSanPhamStore();
const sanPhamChiTietStore = useSpctStore();
const selectedSanPhams = reactive([]);
const selectedSanPhamChiTietIds = reactive(new Set());

onMounted(async () => {
  await store.fetchDotGiamGiaList();
  await store.fetchDotGiamGiaChiTietList();
  await sanPhamStore.fetchSanPhamList();
  await sanPhamChiTietStore.fetchSpct();
});

const deleteRow = async (id) => {
  await deleteDotGiamGia(id);
};

const dotGiamGiaData = reactive({
  id: 0,
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

// Utility function to format date
const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

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

const isDetailVisible = computed(() => selectedSanPhams.length > 0);
const openModal = (dotGiamGia) => {
  console.log("Opening modal with DotGiamGia:", dotGiamGia);
  dotGiamGiaData.id = dotGiamGia.id;
  dotGiamGiaData.maDot = dotGiamGia.maDot;
  dotGiamGiaData.tenDot = dotGiamGia.tenDot;
  dotGiamGiaData.giaTriGiam = dotGiamGia.giaTriGiam;
  dotGiamGiaData.loaiGiamGia = dotGiamGia.loaiGiamGia;
  dotGiamGiaData.moTa = dotGiamGia.moTa;

  // Format the dates correctly
  dotGiamGiaData.thoiGianBatDau = formatDateForInput(dotGiamGia.thoiGianBatDau);
  dotGiamGiaData.thoiGianKetThuc = formatDateForInput(
    dotGiamGia.thoiGianKetThuc,
  );

  dotGiamGiaData.trangThai = dotGiamGia.trangThai;

  // Open the modal
  const modal = document.getElementById("saleoff_details");
  if (modal) {
    modal.showModal();
  }
};
const submitForm = async () => {
  try {
    const formattedData = {
      ...dotGiamGiaData,
      thoiGianBatDau: thoiGianBatDauUTC.value,
      thoiGianKetThuc: thoiGianKetThucUTC.value,
    };

    await updateDotGiamGia(formattedData);

    console.log("Sửa đợt giảm giá và chi tiết thành công!");
  } catch (error) {
    console.error("Lỗi khi sửa đợt giảm giá:", error);
  }
};
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <!-- search&filter -->
    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <label
        class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none"
      >
        <span
          class="icon-[streamline--search-visual-solid] bg-primary size-5"
        ></span>
        <input type="search" placeholder="Tên đợt giảm giá..." />
      </label>

      <label class="input custom-input w-fit">
        <span class="label text-primary font-medium">Ngày bắt đầu</span>
        <input type="datetime-local" />
      </label>

      <label class="input custom-input w-fit">
        <span class="label text-primary font-medium">Ngày kết thúc</span>
        <input type="datetime-local" />
      </label>
    </section>

    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <div class="join">
        <button class="btn btn-soft btn-primary join-item border-none">
          <span class="icon-[line-md--filter-remove] size-5"></span>
        </button>
        <select class="select custom-input">
          <option selected disabled>Trạng thái</option>
          <option>Đang diễn ra</option>
          <option>Ngừng/Hết hạn</option>
        </select>
      </div>

      <div class="join">
        <button class="btn btn-soft btn-primary join-item border-none">
          <span class="icon-[line-md--filter-remove] size-5"></span>
        </button>
        <select class="select custom-input join-item">
          <option selected disabled>Loại</option>
          <option>Hoạt động</option>
          <option>Ngừng/Hết hạn</option>
        </select>
      </div>

      <div class="join">
        <button class="btn btn-soft btn-primary join-item border-none">
          <span class="icon-[line-md--filter-remove] size-5"></span>
        </button>
        <div class="bg-base-200 join-item flex items-center gap-2">
          <input
            type="text"
            placeholder="%"
            class="input input-ghost join-item custom-input w-15"
          />
          <input
            type="range"
            min="0"
            max="100"
            value="40"
            class="range range-primary range-xs mr-3 w-100"
          />
        </div>
      </div>
    </section>

    <!-- button -->
    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <button class="btn btn-primary btn-soft">
        <span class="icon-[ph--microsoft-excel-logo] size-5"></span>
        Nhập Excel
      </button>
      <button class="btn btn-primary btn-soft">
        <span class="icon-[ph--microsoft-excel-logo] size-5"></span>
        Xuất Excel
      </button>
      <RouterLink to="/saleoff/crud" class="btn btn-primary btn-soft">
        <span class="icon-[icon-park-outline--add-four] size-5"></span>
        Thêm đợt giảm giá
      </RouterLink>
    </section>

    <!-- table -->
    <section class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table text-center">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã</th>
              <th>Tên</th>
              <th>Giá trị giảm</th>
              <th>Loại giảm giá</th>
              <th>Mô tả</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(dotGiamGia, index) in store.dotGiamGiaList"
              :key="dotGiamGia.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ dotGiamGia.maDot }}</td>
              <td>{{ dotGiamGia.tenDot }}</td>
              <td>{{ dotGiamGia.giaTriGiam }}</td>
              <td>{{ dotGiamGia.loaiGiamGia }}</td>
              <td>{{ dotGiamGia.moTa }}</td>
              <td>{{ dotGiamGia.thoiGianBatDau }}</td>
              <td>{{ dotGiamGia.thoiGianKetThuc }}</td>
              <td>
                <div
                  :class="
                    dotGiamGia.trangThai === 'Đang diễn ra'
                      ? 'badge badge-soft badge-success'
                      : 'badge badge-soft badge-error'
                  "
                >
                  {{ dotGiamGia.trangThai }}
                </div>
              </td>
              <td>
                <div class="join">
                  <button
                    class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                    @click="openModal(dotGiamGia)"
                  >
                    <!-- Icon mặc định -->
                    <span
                      class="icon-[heroicons-outline--pencil-alt] size-4 group-hover:hidden"
                    ></span>
                    <!-- Icon khi hover -->
                    <span
                      class="icon-[heroicons-solid--pencil-alt] hidden size-4 group-hover:inline"
                    ></span>
                  </button>
                  <button
                    @click="deleteRow(dotGiamGia.id)"
                    class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                  >
                    <!-- Icon mặc định -->
                    <span
                      class="icon-[mdi--bin-outline] size-4 group-hover:hidden"
                    ></span>
                    <!-- Icon khi hover -->
                    <span
                      class="icon-[mdi--bin] hidden size-4 group-hover:inline"
                    ></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="divider divider-primary"></div>
    <!-- pagination -->
    <section class="flex justify-between">
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
    </section>

    <!-- dialog -->
    <dialog id="saleoff_details" class="modal">
      <div class="modal-box h-[800px] w-11/12 max-w-7xl">
        <h1 class="mb-4 text-2xl font-bold">Chi tiết đợt giảm giá</h1>
        <!-- div-form -->
        <section class="mb-4 flex flex-col items-center">
          <!-- form -->
          <div
            class="rounded-box bg-base-200 border-base-300 h-fit w-full border p-4"
          >
            <fieldset class="fieldset w-full">
              <div class="flex gap-4">
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">ID</label>
                  <input
                    v-model="dotGiamGiaData.id"
                    type="number"
                    class="input w-full"
                    readonly
                  />
                </fieldset>
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">Mã</label>
                  <input
                    v-model="dotGiamGiaData.maDot"
                    type="text"
                    class="input w-full"
                    placeholder="KM100..."
                  />
                </fieldset>
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">Tên</label>
                  <input
                    v-model="dotGiamGiaData.tenDot"
                    type="text"
                    class="input w-full"
                    placeholder="Flash Sale, Black Friday,..."
                  />
                </fieldset>
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">Giá trị giảm</label>
                  <input
                    v-model="dotGiamGiaData.giaTriGiam"
                    type="number"
                    class="input w-full"
                    placeholder="100.000,..."
                  />
                </fieldset>
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">Loại</label>
                  <input
                    v-model="dotGiamGiaData.loaiGiamGia"
                    type="text"
                    class="input w-full"
                    placeholder="Name"
                  />
                </fieldset>
              </div>

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
                <fieldset class="fieldset flex-1">
                  <label class="fieldset-label">Tình trạng</label>
                  <select
                    class="select w-full"
                    v-model="dotGiamGiaData.trangThai"
                  >
                    <option selected>Đang diễn ra</option>
                    <option>Kết thúc</option>
                  </select>
                </fieldset>
              </div>

              <button @click="submitForm" class="btn btn-primary btn-soft mt-4">
                Thêm
              </button>
            </fieldset>
          </div>

          <div class="divider divider-primary"></div>

          <!-- div-table -->
          <div
            class="rounded-box bg-base-200 border-base-300 flex h-fit w-full flex-col border p-4"
          >
            <span class="text-base-content mb-2 text-2xl font-bold"
              >Sản phẩm áp dụng</span
            >
            <!-- table-san-pham -->
            <div class="mb-2 max-h-[600px] w-full overflow-auto">
              <table class="table-pin-rows table w-full">
                <thead>
                  <tr>
                    <th class="w-[30px]"></th>
                    <th>#</th>
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
          <div class="max-h-[70vh] w-full overflow-auto">
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
                <span class="icon-[ep--arrow-right-bold]"></span>
              </button>
            </div>
          </div>
        </section>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </section>
</template>
