<template>
  <section class="flex h-full w-full flex-col">
    <div>
      <fieldset class="fieldset rounded-box bg-base-200 w-full p-4">
        <legend class="fieldset-legend">Thêm Sản Phẩm</legend>

        <!-- Thông tin chung -->
        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Mã Sản Phẩm</label>
            <input type="text" class="input w-full" placeholder="SP001" />
          </fieldset>
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Tên Sản Phẩm</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Dell Inspiron 15"
            />
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Loại</label>
            <select class="select w-full">
              <option value="1">Laptop</option>
              <option value="2">PC</option>
              <option value="3">MacBook</option>
              <option value="4">Gaming</option>
              <option value="5">Ultrabook</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Hệ Điều Hành</label>
            <select class="select w-full">
              <option value="2">Windows</option>
              <option value="3">macOS</option>
              <option value="4">Linux</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Thương Hiệu</label>
            <select class="select w-full">
              <option value="1">Dell</option>
              <option value="2">HP</option>
              <option value="3">Asus</option>
              <option value="4">Apple</option>
              <option value="5">Lenovo</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Bảo Hành (Tháng)</label>
            <input type="number" class="input w-full" placeholder="24" />
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Trạng Thái</label>
            <select class="select w-full">
              <option value="true">Còn hàng</option>
              <option value="false">Hết hàng</option>
            </select>
          </fieldset>
        </div>

        <label class="fieldset-label">Hình Ảnh</label>
        <input
          type="text"
          class="input w-full"
          placeholder="dell_inspiron_15.jpg"
        />

        <label class="fieldset-label">Mô Tả</label>
        <textarea
          class="textarea w-full"
          placeholder="Mô tả sản phẩm..."
        ></textarea>

        <!-- Chi tiết sản phẩm -->
        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">RAM</label>
            <select class="select w-full">
              <option value="1">8GB</option>
              <option value="2">16GB</option>
              <option value="3">32GB</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Màn Hình</label>
            <select class="select w-full">
              <option value="1">14 inch</option>
              <option value="2">15.6 inch</option>
              <option value="3">16 inch</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Pin</label>
            <input type="number" class="input w-full" placeholder="5000 mAh" />
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Màu Sắc</label>
            <select class="select w-full">
              <option value="1">Đen</option>
              <option value="2">Trắng</option>
              <option value="3">Xám</option>
            </select>
          </fieldset>
        </div>

        <div class="flex gap-4">
          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">GPU</label>
            <select class="select w-full">
              <option value="1">Intel Iris Xe</option>
              <option value="2">NVIDIA RTX 3060</option>
              <option value="3">AMD Radeon 6600M</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">CPU</label>
            <select class="select w-full">
              <option value="1">Intel Core i7</option>
              <option value="2">AMD Ryzen 7</option>
              <option value="3">Apple M2</option>
            </select>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <label class="fieldset-label">Ổ Cứng</label>
            <select class="select w-full">
              <option value="1">256GB SSD</option>
              <option value="2">512GB SSD</option>
              <option value="3">1TB SSD</option>
            </select>
          </fieldset>
        </div>

        <label class="fieldset-label">Giá Bán (VNĐ)</label>
        <input type="number" class="input w-full" placeholder="25000000" />

        <button @click="" class="btn btn-primary btn-soft mt-4">Thêm</button>
      </fieldset>
    </div>
  </section>
</template>
