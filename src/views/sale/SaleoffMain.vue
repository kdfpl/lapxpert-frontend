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
      <RouterLink to="/saleoff/add" class="btn btn-primary btn-soft">
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
     <dialog></dialog>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDotGiamGiaStore } from "../../stores/dotgiamgiastore";
import { deleteDotGiamGia } from "../../apis/graphql/dotgiamgia";

const store = useDotGiamGiaStore();

onMounted(async () => {
  await store.fetchDotGiamGiaList();
});

const deleteRow = async (id: number) => {
  await deleteDotGiamGia(id);
};
</script>
