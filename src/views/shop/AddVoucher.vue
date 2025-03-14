<template>
  <div class="flex h-full w-full flex-col">
    <!-- div-form -->
    <div class="flex h-[650px] w-full items-center mb-4">
      <!-- form -->
      <div class="rounded-box bg-base-200 border-base-300 flex-1 border px-4 pb-4">
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">Thêm phiếu giảm giá</legend>

          <label class="fieldset-label">Mã</label>
          <input type="text" class="input w-full" placeholder="KM100..." />

          <label class="fieldset-label">Giá trị giảm</label>
          <input
            type="text"
            class="input w-full"
            placeholder="100.000VND, 20%,..."
          />

          <label class="fieldset-label">Giá trị đơn hàng tối thiểu</label>
          <input
            type="text"
            class="input w-full"
            placeholder="100.000VND,..."
          />

          <label class="fieldset-label">Loại</label>
          <input type="text" class="input w-full" placeholder="Name" />

          <label class="fieldset-label">Số lượng</label>
          <input type="number" class="input w-full" placeholder="" />

          <label class="fieldset-label">Mô tả</label>
          <textarea class="textarea w-full" placeholder="..."></textarea>

          <div class="flex gap-4">
            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày bắt đầu</label>
              <input type="datetime-local" class="input w-full" />
            </fieldset>

            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày kết thúc</label>
              <input type="datetime-local" class="input w-full" />
            </fieldset>
          </div>

          <button class="btn btn-primary btn-soft mt-4">Thêm</button>
        </fieldset>
      </div>

      <div class="divider divider-primary divider-horizontal"></div>

      <!-- div-table -->
      <div
        class="rounded-box bg-base-200 border-base-300 flex h-full flex-1 flex-col border p-4"
      >
        <!-- table -->
        <div class="max-h-[600px] w-full overflow-auto mb-2">
          <table class="table-pin-rows table w-full text-center">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Giá trị</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Phieu1</td>
                <td>100.000 đ</td>
                <td>1/1/2025 - 1/1/2026</td>
                <td>
                  <div class="badge badge-soft badge-success">Đang diễn ra</div>
                </td>
                <td>
                  <div class="join">
                    <button
                      class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                    >
                      <span
                        class="icon-[heroicons-outline--pencil-alt] size-4 group-hover:hidden"
                      ></span>
                      <span
                        class="icon-[heroicons-solid--pencil-alt] hidden size-4 group-hover:inline"
                      ></span>
                    </button>
                    <button
                      class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                    >
                      <span
                        class="icon-[mdi--bin-outline] size-4 group-hover:hidden"
                      ></span>
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
    </div>

    <span class="text-base-content text-2xl font-bold mb-2">Chi tiết sản phẩm</span>

    <!-- div-table-detail -->
    <div
        class="rounded-box bg-base-200 border-base-300 flex min-h-[650px] flex-1 flex-col border p-4"
      >
        <!-- table -->
        <div class="max-h-[600px] w-full overflow-auto">
          <table class="table-pin-rows table w-full text-center">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Giá trị</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Phieu1</td>
                <td>100.000 đ</td>
                <td>1/1/2025 - 1/1/2026</td>
                <td>
                  <div class="badge badge-soft badge-success">Đang diễn ra</div>
                </td>
                <td>
                  <div class="join">
                    <button
                      class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                    >
                      <span
                        class="icon-[heroicons-outline--pencil-alt] size-4 group-hover:hidden"
                      ></span>
                      <span
                        class="icon-[heroicons-solid--pencil-alt] hidden size-4 group-hover:inline"
                      ></span>
                    </button>
                    <button
                      class="join-item btn btn-soft btn-sm group hover:bg-primary border-none bg-transparent hover:text-white"
                    >
                      <span
                        class="icon-[mdi--bin-outline] size-4 group-hover:hidden"
                      ></span>
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
  </div>
</template>
