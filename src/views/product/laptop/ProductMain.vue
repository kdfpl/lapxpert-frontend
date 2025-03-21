<script setup lang="ts">
import { onMounted } from "vue";
import { useSanPhamStore } from "@/stores/sanphamstore";

const store = useSanPhamStore();

onMounted(() => {
  store.fetchSanPhamList();
});
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <!-- search&filter -->
    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <label class="input input-ghost bg-base-200 custom-input grow">
        <span
          class="icon-[streamline--search-visual-solid] bg-primary size-5"
        ></span>
        <input type="search" placeholder="Tên cpu..." />
      </label>
      <div class="join">
        <button class="btn btn-soft btn-primary join-item border-none">
          <span class="icon-[line-md--filter-remove] size-5"></span>
        </button>
        <select class="select custom-input">
          <option selected disabled>Trạng thái</option>
          <option>Hoạt động</option>
          <option>Ngừng hoạt động</option>
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
    </section>

    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <div class="join">
        <button class="btn btn-soft btn-primary join-item border-none">
          <span class="icon-[line-md--filter-remove] size-5"></span>
        </button>
        <select class="select custom-input">
          <option selected disabled>Hãng</option>
          <option>Intel</option>
          <option>AMD</option>
          <option>Qualcomm</option>
        </select>
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
      <RouterLink to="/admin/san-pham-crud" class="btn btn-primary btn-soft">
        <span class="icon-[icon-park-outline--add-four] size-5"></span>
        Thêm sản phẩm
      </RouterLink>
    </section>
    <!-- table -->
    <section class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã SKU</th>
              <th>Tên laptop</th>
              <th>Loại</th>
              <th>Hệ điều hành</th>
              <th>Thương hiệu</th>
              <th>Thời gian bảo hành</th>
              <th>Trạng thái</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sanPham, index) in store.sanPhamList" :key="sanPham.id">
              <td>{{ index + 1 }}</td>
              <td>{{ sanPham.maSp }}</td>
              <td>{{ sanPham.tenSp }}</td>
              <td>{{ sanPham.loai.tenLoai }}</td>
              <td>{{ sanPham.heDieuHanh.tenHeDieuHanh }}</td>
              <td>{{ sanPham.thuongHieu.tenThuongHieu }}</td>
              <td>{{ sanPham.baoHanhThang }} tháng</td>
              <td>
                <div
                  :class="
                    sanPham.trangThai
                      ? 'badge badge-soft badge-success'
                      : 'badge badge-soft badge-error'
                  "
                >
                  {{ sanPham.trangThai ? "Hoạt động" : "Ngừng hoạt động" }}
                </div>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-10 w-10">
                      <img :src="sanPham.hinhAnh" alt="Hình ảnh" />
                    </div>
                  </div>
                </div>
              </td>
              <td>{{ sanPham.moTa }}</td>
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
                    @click=""
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
  </section>
</template>