<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm màn hình</legend>

        <label class="fieldset-label">Mã</label>
        <input type="text" class="input w-full" placeholder="SKU" />

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Kích thước</label>
            <label class="input w-full">
              <input type="text" placeholder="15.6" />
              <span class="label">inch</span>
            </label>
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tần số quét (Hz)</label>
            <label class="input w-full">
              <input type="text" placeholder="144" />
              <span class="label">Hz</span>
            </label>
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tấm nền</label>
            <input type="text" class="input w-full" placeholder="IPS" />
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Độ sáng (nits)</label>
            <input type="text" class="input w-full" placeholder="300" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Chuẩn màu</label>
            <input type="text" class="input w-full" placeholder="sRGB 100%" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Độ phân giải</label>
            <input type="text" class="input w-full" placeholder="1920x1080" />
          </fieldset>
        </div>

        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
