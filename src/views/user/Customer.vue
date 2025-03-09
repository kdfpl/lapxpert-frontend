<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col items-center justify-end rounded-box shadow-lg z-0" style="background-image: url('https://picsum.photos/1920/1080?grayscale')">
      <div class="w-full h-[620px] flex flex-col items-center justify-center bg-white rounded-box shadow-2xl">
        <div class="flex flex-none items-center justify-between w-full px-10 mt-10 gap-30">
          <div class="join flex-1">
            <input class="input join-item w-full" placeholder="">
            <button class="btn btn-neutral join-item">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
              Tìm kiếm
            </button>
          </div>
          <div class="join flex-1 outline-1 rounded-box p-1.5">
            <label class="label join-item w-full">Trạng thái: </label>
            <label class="label join-item w-full">
              <input class="radio radio-primary" type="radio" name="options" checked/>Tất cả
            </label>
            <label class="label join-item w-full">
              <input class="radio radio-primary" type="radio" name="options">Hoạt động
            </label>
            <label class="label join-item w-full">
              <input class="radio radio-primary" type="radio" name="options"/>Nghỉ việc
            </label>
          </div>
        </div>
        <div class="flex flex-none items-center justify-end w-full px-10 mt-8 gap-20">
          <div class="flex gap-5">
            <input type="file" class="file-input file-input-neutral"/>
            <button class="btn btn-neutral">Nhập Excel</button>
          </div>
          <button class="btn btn-neutral">Thêm khách hàng</button>
        </div>
        <div class="flex grow items-start justify-center w-full px-10 overflow-x-auto mt-5">
          <table class="table">
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
                <div class="badge badge-outline badge-success">Hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>KH003</td>
              <td>Hoàng Mai Linh</td>
              <td>0123456789</td>
              <td>Đà Nẵng</td>
              <td>
                <div class="badge badge-outline badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>KH005</td>
              <td>Hoàng Mai Linh</td>
              <td>0123456789</td>
              <td>Hải Phòng</td>
              <td>
                <div class="badge badge-outline badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>KH007</td>
              <td>Hoàng Mai Linh</td>
              <td>0123456789</td>
              <td>Nha Trang</td>
              <td>
                <div class="badge badge-outline badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle">
                  <font-awesome-icon icon="fa-solid fa-pencil"/>
                </button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>KH009</td>
              <td>Hoàng Mai Linh</td>
              <td>0123456789</td>
              <td>Vinh</td>
              <td>
                <div class="badge badge-outline badge-error">Không hoạt động</div>
              </td>
              <td>
                <button class="btn btn-circle">
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
              <span class="badge">
            <select>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </span>
              <span>khách hàng</span>
            </label>
          </div>
          <div class="join gap-2">
            <button class="join-item btn btn-circle btn-sm">
              <font-awesome-icon icon="fa-solid fa-angle-left"/>
            </button>
            <button class="join-item btn btn-circle btn-sm">1</button>
            <button class="join-item btn btn-circle btn-sm">2</button>
            <button class="join-item btn btn-circle btn-sm">3</button>
            <button class="join-item btn btn-circle btn-sm">4</button>
            <button class="join-item btn btn-circle btn-sm">
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