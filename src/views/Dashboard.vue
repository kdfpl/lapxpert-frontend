<script setup lang="ts">

</script>

<template>
  <div id="" class="max-w-full">
    <div class="flex">
      <div class="flex h-screen w-80 flex-col justify-between border-e border-gray-100 bg-white shadow-lg">
        <div class="px-4 py-6">
          <a class="grid h-16 w-full place-content-center rounded-lg" href="/dashboard" data-discover="true">
            <img src="../assets/brand-logo/lapxpert-logo.png" alt="">
          </a>

          <ul class="mt-6 space-y-1">
            <li>
              <a href="/dashboard"
                 class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:text-secondary text-primary">
                <font-awesome-icon icon="fa-solid fa-house" class="size-5"/>
                Bảng điều khiển
              </a>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                    class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                  <a href="/product" class="text-sm font-medium">
                    <font-awesome-icon icon="fa-solid fa-users" class="size-5"/>
                    Người dùng
                  </a>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
                </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <a href="/employee"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-user" class="size-5"/>
                      Nhân viên
                    </a>
                  </li>

                  <li>
                    <a href="/customer"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-user-group" class="size-5"/>
                      Khách hàng
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a href="/order"
                 class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                <font-awesome-icon icon="fa-solid fa-truck" class="size-5"/>
                Đơn hàng
              </a>
            </li>

            <li>
              <a href="/invoice"
                 class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                <font-awesome-icon icon="fa-solid fa-file-invoice" class="size-5"/>
                Hóa đơn
              </a>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                    class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                  <a href="/product" class="text-sm font-medium">
                    <font-awesome-icon icon="fa-solid fa-laptop" class="size-5"/>
                    Sản phẩm
                  </a>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
                </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <a href="/product/cpu"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-microchip" class="size-5"/>
                      CPU
                    </a>
                  </li>

                  <li>
                    <a href="/product/ram"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-memory" class="size-5"/>
                      RAM
                    </a>
                  </li>

                  <li>
                    <a href="/product/gpu"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-microchip" class="size-5"/>
                      GPU
                    </a>
                  </li>

                  <li>
                    <a href="/product/disk"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-hard-drive" class="size-5"/>
                      Ổ cứng
                    </a>
                  </li>

                  <li>
                    <a href="/product/display"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-display" class="size-5"/>
                      Màn hình
                    </a>
                  </li>

                  <li>
                    <a href="/product/color"
                       class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-secondary text-primary">
                      <font-awesome-icon icon="fa-solid fa-palette" class="size-5"/>
                      Màu sắc
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img alt=""
                 src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                 class="size-10 rounded-full object-cover"/>
            <div>
              <p class="text-xs">
                <strong class="block font-medium">I am racist</strong>
                <span> nigga@white.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

