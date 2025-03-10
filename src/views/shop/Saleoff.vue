<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0" style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-base-100 rounded-box shadow-2xl">
        <div class="flex items-center justify-between w-full px-10 mt-10 gap-50">
          <div class="join flex-1">
            <input class="input join-item w-full bg-base-200" placeholder="">
            <button class="btn btn-primary btn-soft join-item">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
              Tìm kiếm
            </button>
          </div>
          <div class="flex flex-1 gap-4 min-w-0">
            <label class="input w-1/2 bg-base-200">
              <span class="label">Ngày bắt đầu</span>
              <input type="date" class="w-full min-w-0">
            </label>

            <label class="input w-1/2 bg-base-200">
              <span class="label">Ngày kết thúc</span>
              <input type="date" class="w-full min-w-0">
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between w-full px-10 mt-8 gap-50">
          <div class="flex-1 items-center">
            <label class="select w-full bg-base-200">
              <span class="label">Trạng thái</span>
              <select>
                <option disabled selected>Trạng thái</option>
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
              </select>
            </label>
          </div>

          <div class="flex-1 items-center">
            <label class="select w-full bg-base-200">
              <span class="label">Sắp xếp</span>
              <select>
                <option disabled selected>Sắp xếp</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
            </label>
          </div>
        </div>
        <div class="flex justify-end w-full px-10 mt-8">
          <button class="btn btn-primary btn-soft">Thêm voucher</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table table-pin-rows">
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
              <td>Phieu2</td>
              <td>200.000 đ</td>
              <td>1/1/2025 - 1/1/2026</td>
              <td>
                <div class="badge badge-soft badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Phieu2</td>
              <td>200.000 đ</td>
              <td>1/1/2025 - 1/1/2026</td>
              <td>
                <div class="badge badge-soft badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Phieu2</td>
              <td>200.000 đ</td>
              <td>1/1/2025 - 1/1/2026</td>
              <td>
                <div class="badge badge-soft badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Phieu2</td>
              <td>200.000 đ</td>
              <td>1/1/2025 - 1/1/2026</td>
              <td>
                <div class="badge badge-soft badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle btn-soft">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Phieu2</td>
              <td>200.000 đ</td>
              <td>1/1/2025 - 1/1/2026</td>
              <td>
                <div class="badge badge-soft badge-error">Không hoạt động</div>
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
        <div class="flex items-center justify-between w-full px-10 mb-5 mt-5">
          <div class="flex items-center">
            <label class="label">
              <span>Xem</span>
                <select class="badge badge-soft">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              <span>phiếu giảm giá</span>
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
              <font-awesome-icon icon="fa-solid fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>