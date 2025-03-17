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
      <RouterLink to="/saleoff/add" class="btn btn-primary btn-soft">
        <span class="icon-[icon-park-outline--add-four] size-5"></span>
        Thêm CPU
      </RouterLink>
    </section>
    <!-- table -->
    <section class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <table class="table-pin-rows table text-center">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã SKU</th>
              <th>Loại</th>
              <th>Tên</th>
              <th>VRAM</th>
              <th>Công nghệ</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>RTX4060Ti-8G-GAMING</td>
              <td>RTX 40 Series</td>
              <td>ASUS Dual GeForce RTX 4060 Ti 8GB</td>
              <td>8GB GDDR6</td>
              <td>DLSS 3, Ray Tracing</td>
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
