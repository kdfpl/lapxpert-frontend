<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0"
         style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-base-100 rounded-box shadow-2xl">
        <div class="flex items-center justify-between w-full px-10 mt-10 gap-50">
          <div class="join grow">
            <input class="input focus:border-0 join-item w-full bg-base-300" placeholder="Màn hình...">
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
          <button class="btn btn-primary btn-soft">Thêm Màn hình</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table table-pin-rows">
            <thead>
            <tr>
              <th>STT</th>
              <th>Mã SKU</th>
              <th>Kích thước</th>
              <th>Tần số quét</th>
              <th>Tấm nền</th>
              <th>Độ sáng (nits)</th>
              <th>Chuẩn màu</th>
              <th>Độ phân giải</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>LCD-FHD-144HZ-15</td>
              <td>15.6"</td>
              <td>144Hz</td>
              <td>IPS</td>
              <td>300</td>
              <td>sRGB 100%</td>
              <td>1920x1080</td>
              <td>2025-03-08</td>
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
              <td>LCD-OLED-3K-14</td>
              <td>14"</td>
              <td>120Hz</td>
              <td>OLED</td>
              <td>400</td>
              <td>DCI-P3 100%</td>
              <td>2880x1800</td>
              <td>2025-03-08</td>
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
              <td>LCD-4K-60HZ-16</td>
              <td>16"</td>
              <td>60Hz</td>
              <td>IPS</td>
              <td>500</td>
              <td>AdobeRGB 100%</td>
              <td>3840x2160</td>
              <td>2025-03-08</td>
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