<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm CPU</legend>

        <label class="fieldset-label">Mã</label>
        <input type="text" class="input w-full" placeholder="SKU" />

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Core i9-13900K"
            />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hãng</label>
            <select class="select w-full">
              <option>Intel</option>
              <option>AMD</option>
              <option>Qualcomm</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Thế hệ</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Zen 4, Zen 5, 13th,..."
            />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Số nhân</label>
            <input type="text" class="input w-full" placeholder="16" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Số luồng</label>
            <input type="text" class="input w-full" placeholder="32" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Xung nhịp</label>
            <input type="text" class="input w-full" placeholder="2.4" />
          </fieldset>
        </div>

        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
