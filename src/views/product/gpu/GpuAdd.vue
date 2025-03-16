<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm GPU</legend>

        <div class="flex gap-4">
      
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Mã</label>
            <input type="text" class="input w-full" placeholder="SKU" />
          
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên</label>
            <input
              type="text"
              class="input w-full"
              placeholder="ASUS Dual GeForce RTX 4060 Ti 8GB"
            />
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Loại</label>
            <input type="text" class="input w-full" placeholder="RTX 40 Series" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">VRAM</label>
            <input type="text" class="input w-full" placeholder="32" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Công nghệ</label>
            <input type="text" class="input w-full" placeholder="DLSS 3, Ray Tracing" />
          </fieldset>
        </div>

        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
