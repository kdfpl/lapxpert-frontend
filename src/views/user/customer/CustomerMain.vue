<template>
  <section class="flex h-full w-full flex-col">
    <!-- search&filter -->
    <section class="mb-2 flex w-full items-center justify-end gap-2">
      <label class="input input-ghost bg-base-200 custom-input grow">
        <span
          class="icon-[streamline--search-visual-solid] bg-primary size-5"
        ></span>
        <input type="search" placeholder="Tên nhân viên..." />
      </label>
      <div class="join px-5 gap-6">
        <label class="label join-item">Trạng thái: </label>
        <label class="label join-item">
          <input
            class="radio radio-primary radio-xs"
            type="radio"
            name="options"
            checked
          />Tất cả
        </label>
        <label class="label join-item">
          <input
            class="radio radio-primary radio-xs"
            type="radio"
            name="options"
          />Hoạt động
        </label>
        <label class="label join-item">
          <input
            class="radio radio-primary radio-xs"
            type="radio"
            name="options"
          />Ngưng hoạt động
        </label>
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
        Thêm khách hàng
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
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Linhhm</td>
              <td>Hoàng Mai Linh</td>
              <td>0123456789</td>
              <td>3 P. Trịnh Văn Bô, Hà Nội</td>
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
