<script setup lang="ts"></script>

<template>
  <!-- canvas -->
  <div class="bg-base-100 flex h-full w-full flex-col rounded-2xl p-5">
    <!-- search&filter -->
    <div class="mb-2 flex w-full items-center justify-end gap-2">
      <label
        class="input input-ghost bg-base-200 focus-within:bg-base-200 grow focus-within:outline-none"
      >
        <span class="icon-[streamline--search-visual-solid] bg-primary size-5"></span>
        <input type="search" placeholder="Màu sắc..." />
      </label>

      <label
        class="select custom-input"
      >
        <span class="label text-primary font-medium">Màu sắc</span>
        <select>
          <option selected disabled>Chọn</option>
          <option>Đỏ</option>
          <option>Đen</option>
          <option>Vàng</option>
        </select>
      </label>
      <label
        class="select custom-input"
      >
        <span class="label text-primary font-medium">Trạng thái</span>
        <select>
          <option selected disabled>Chọn</option>
          <option>Hoạt động</option>
          <option>Không hoạt động</option>
        </select>
      </label>
    </div>

    <!-- button -->
    <div class="mb-2 flex w-full items-center justify-end gap-2">
      <button class="btn btn-primary btn-soft">
        <span class="icon-[ph--microsoft-excel-logo] size-5"></span>
        Nhập Excel
      </button>
      <button class="btn btn-primary btn-soft">
        <span class="icon-[ph--microsoft-excel-logo] size-5"></span>
        Xuất Excel
      </button>
      <button class="btn btn-primary btn-soft">
        <span class="icon-[icon-park-outline--add-four] size-5"></span>
        Thêm màu sắc
      </button>
    </div>

    <!-- table -->
    <div
      class="mb-2 max-h-[640px] flex-1 overflow-x-auto sm:max-h-full xl:max-h-[640px]"
    >
      <table class="table-pin-rows table text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã màu</th>
            <th>Tên màu</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>dalkjf</td>
            <td>Đen</td>
            <td>
              <div class="badge badge-soft badge-success">Hoạt động</div>
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

    <!-- pagination -->
    <div class="flex justify-between">
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
  </div>
</template>

<style scoped></style>
