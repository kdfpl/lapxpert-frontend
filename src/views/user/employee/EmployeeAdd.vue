<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm Nhân Viên</legend>

        <label class="fieldset-label">Mã Nhân Viên</label>
        <input type="text" class="input w-full" placeholder="NV001" />

        <label class="fieldset-label">Họ và Tên</label>
        <input type="text" class="input w-full" placeholder="Trần Minh Quang" />

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Chức Vụ</label>
            <select class="select w-full">
              <option value="1">Quản lý</option>
              <option value="2">Nhân viên bán hàng</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Email</label>
            <input
              type="email"
              class="input w-full"
              placeholder="example@example.com"
            />
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Số Điện Thoại</label>
            <input type="tel" class="input w-full" placeholder="0901234567" />
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Mật Khẩu</label>
            <input
              type="password"
              class="input w-full"
              placeholder="Nhập mật khẩu"
            />
          </fieldset>
        </div>
        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
