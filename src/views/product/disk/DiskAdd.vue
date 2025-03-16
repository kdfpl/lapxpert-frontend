<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm Ổ cứng</legend>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Mã</label>
            <input type="text" class="input w-full" placeholder="SKU" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Loại ổ</label>
            <select class="select w-full">
              <option>SSD</option>
              <option>HDD</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Dung lượng</label>
            <input type="text" class="input w-full" placeholder="1TB" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Chuẩn kết nối</label>
            <select class="select w-full">
              <option>SATA</option>
              <option>NVMe</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tốc độ đọc (MB/s)</label>
            <input type="text" class="input w-full" placeholder="3500" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tốc độ ghi (MB/s)</label>
            <input type="text" class="input w-full" placeholder="3300" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hỗ trợ nâng cấp</label>
            <input type="text" class="input w-full" placeholder="Có" />
          </fieldset>
        </div>

        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
