<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0"
         style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-base-100 rounded-box shadow-2xl">
        <div class="flex items-center justify-between w-full px-10 mt-10 gap-50">
          <div class="join grow">
            <input class="input focus:border-0 join-item w-full bg-base-300" placeholder="Sản phẩm...">
            <button class="btn btn-primary btn-soft join-item">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
              Tìm kiếm
            </button>
          </div>
          <div class="grow items-center">
            <label class="select w-full bg-base-200">
              <span class="label">Trạng thái</span>
              <select>
                <option disabled selected>Trạng thái</option>
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
              </select>
            </label>
          </div>
          <button class="btn btn-primary btn-soft">Thêm Sản phẩm</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table table-xs table-pin-rows">
            <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Loại</th>
              <th>Hệ điều hành</th>
              <th>Thương hiệu</th>
              <th>Mã SKU</th>
              <th>Tên laptop</th>
              <th>Ngày tạo</th>
              <th>Mô tả</th>
              <th>Thời gian bảo hành</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-10 w-10">
                      <img src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="" />
                    </div>
                  </div>
                </div>
              </td>
              <td>Gaming</td>
              <td>Windows 11</td>
              <td>ASUS</td>
              <td>ASUS-G15-RTX4060</td>
              <td>ASUS ROG Strix G15</td>
              <td>2025-03-08</td>
              <td>Laptop gaming hiệu suất cao</td>
              <td>24 tháng</td>
              <td>
                <div class="badge badge-soft badge-success">Hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-10 w-10">
                      <img src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                           alt="" />
                    </div>
                  </div>
                </div>
              </td>
              <td>Ultrabook</td>
              <td>Windows 11</td>
              <td>Dell</td>
              <td>DELL-XPS13-12GEN</td>
              <td>Dell XPS 13 (12th Gen)</td>
              <td>2025-03-08</td>
              <td>Thiết kế siêu mỏng, màn OLED</td>
              <td>12 tháng</td>
              <td>
                <div class="badge badge-soft badge-success">Hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-10 w-10">
                      <img src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                           alt="" />
                    </div>
                  </div>
                </div>
              </td>
              <td>Ultrabook</td>
              <td>macOS</td>
              <td>Apple</td>
              <td>MACBOOK-M3-PRO</td>
              <td>MacBook Pro M3</td>
              <td>2025-03-08</td>
              <td>Chip M3 Pro mạnh mẽ, màn hình Liquid Retina XDR.</td>
              <td>12 tháng</td>
              <td>
                <div class="badge badge-soft badge-success">Hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-none items-center justify-between w-full px-10 mb-5 mt-5">
          <div class="flex items-center">
            <label class="label">
              <span>Xem</span>
              <span class="badge badge-soft">
                <select>
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </span>
              <span>dòng 1 trang</span>
            </label>
          </div>
          <div class="join gap-2">
            <button class="join-item btn btn-circle btn-sm btn-soft">
              <font-awesome-icon icon="fa-solid fa-angle-left"/>
            </button>
            <button class="join-item btn btn-circle btn-sm btn-soft">1</button>
            <button class="join-item btn btn-circle btn-sm btn-soft">2</button>
            <button class="join-item btn btn-circle btn-sm btn-soft">3</button>
            <button class="join-item btn btn-circle btn-sm btn-soft">4</button>
            <button class="join-item btn btn-circle btn-sm btn-soft">
              <font-awesome-icon icon="fa-solid fa-angle-right"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>