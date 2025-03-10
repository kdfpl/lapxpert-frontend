<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0"
         style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-base-100 rounded-box shadow-2xl">
        <div class="flex items-center justify-between w-full px-10 mt-10 gap-50">
          <div class="join grow">
            <input class="input focus:border-0 join-item w-full bg-base-300" placeholder="Cpu...">
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
          <button class="btn btn-primary btn-soft">Thêm CPU</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table table-pin-rows">
            <thead>
            <tr>
              <th>STT</th>
              <th>Mã (SKU)</th>
              <th>Hãng</th>
              <th>Tên</th>
              <th>Thế hệ</th>
              <th>Nhân</th>
              <th>Luồng</th>
              <th>Xung nhịp (GHz)</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>BX8071513900K</td>
              <td>Intel</td>
              <td>Core i9-13900K</td>
              <td>13</td>
              <td>24</td>
              <td>32</td>
              <td>3.0 - 5.8</td>
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
              <td>100-100000514WOF</td>
              <td>AMD</td>
              <td>Ryzen 9 7950X</td>
              <td>7000</td>
              <td>16</td>
              <td>32</td>
              <td>4.5 - 5.7</td>
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
              <td>BX8071513700K</td>
              <td>Intel</td>
              <td>Core i7-13700K</td>
              <td>13</td>
              <td>16</td>
              <td>24</td>
              <td>3.4 - 5.4</td>
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