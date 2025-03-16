<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm RAM</legend>

        <label class="fieldset-label">Mã</label>
        <input type="text" class="input w-full" placeholder="SKU" />

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Corsair Vengeance LPX 16GB (2x8GB) DDR4"
            />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hãng</label>
            <select class="select w-full">
              <option>Corsair</option>
              <option>G.Skill</option>
              <option>Kingston</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Bus (MHz)</label>
            <input
              type="text"
              class="input w-full"
              placeholder="3200,..."
            />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Điện áp (V)</label>
            <input type="text" class="input w-full" placeholder="1.35" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">XMP</label>
            <input type="text" class="input w-full" placeholder="32" />
          </fieldset>
        </div>

        <button @click="" class="btn btn-primary btn-soft mt-4">
          Thêm
        </button>
      </fieldset>
    </div>
  </section>
</template>
