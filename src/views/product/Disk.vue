<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0"
         style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-base-100 rounded-box shadow-2xl">
        <div class="flex items-center justify-between w-full px-10 mt-10 gap-50">
          <div class="join grow">
            <input class="input focus:border-0 join-item w-full bg-base-300" placeholder="Ổ cứng...">
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
          <button class="btn btn-primary btn-soft">Thêm Ổ cứng</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table table-pin-rows">
            <thead>
            <tr>
              <th>STT</th>
              <th>Mã SKU</th>
              <th>Loại ổ</th>
              <th>Dung lượng</th>
              <th>Chuẩn kết nối</th>
              <th>Tốc độ đọc (MB/s)</th>
              <th>Tốc độ ghi (MB/s)</th>
              <th>Hỗ trợ nâng cấp</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>SSD-970EVO-1TB</td>
              <td>SSD NVMe</td>
              <td>1TB</td>
              <td>PCIe 3.0 x4</td>
              <td>3500</td>
              <td>3300</td>
              <td>Có</td>
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
              <td>HDD-BARRACUDA-2TB</td>
              <td>HDD 3.5"</td>
              <td>2TB</td>
              <td>SATA III</td>
              <td>210</td>
              <td>190</td>
              <td>Không</td>
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
              <td>SSD-SN850X-2TB</td>
              <td>SSD NVMe</td>
              <td>2TB</td>
              <td>PCIe 4.0 x4</td>
              <td>7300</td>
              <td>6300</td>
              <td>Có</td>
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