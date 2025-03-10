<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div id="root">
    <div class="size-full">
      <div class="flex">
        <!--sidebar-->
        <div class="flex h-screen w-80 flex-col justify-between border-e border-base-100 bg-base-100 shadow-2xl sidebar">
          <div class="px-4 py-6">
            <a class="grid h-16 w-full place-content-center rounded-lg" href="/dashboard" data-discover="true">
              <img src="../assets/brand-logo/lapxpert-logo.png" alt="">
            </a>

            <ul class="menu rounded-box mt-6 w-full">
              <li>
                <RouterLink to="/monitor">
                  <font-awesome-icon icon="fa-solid fa-house" class="size-5"/>
                  Bảng điều khiển
                </RouterLink>
              </li>

              <li>
                <details open>
                  <summary>
                    <span class="text-sm font-medium">
                      <font-awesome-icon icon="fa-solid fa-users" class="size-5"/>
                      Người dùng
                    </span>
                  </summary>

                  <ul>
                    <li>
                      <RouterLink to="/user">
                        <font-awesome-icon icon="fa-solid fa-user" class="size-5"/>
                        Nhân viên
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/customer">
                        <font-awesome-icon icon="fa-solid fa-user-group" class="size-5"/>
                        Khách hàng
                      </RouterLink>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details open>
                  <summary>
                    <span class="text-sm font-medium">
                      <font-awesome-icon icon="fa-solid fa-cash-register" class="size-5"/>
                      Bán hàng
                    </span>
                  </summary>

                  <ul>
                    <li>
                      <RouterLink to="/order">
                        <font-awesome-icon icon="fa-solid fa-truck" class="size-5"/>
                        Đơn hàng
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/invoice">
                        <font-awesome-icon icon="fa-solid fa-file-invoice" class="size-5"/>
                        Hóa đơn
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/saleoff">
                        <font-awesome-icon icon="fa-solid fa-ticket" class="size-5"/>
                        Đợt giảm giá
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/voucher">
                        <font-awesome-icon icon="fa-solid fa-ticket" class="size-5"/>
                        Giảm giá
                      </RouterLink>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details open>
                  <summary>
                    <span class="text-sm font-medium">
                      <font-awesome-icon icon="fa-solid fa-box" class="size-5"/>
                      Kho hàng
                    </span>
                  </summary>

                  <ul>
                    <li>
                      <details open>
                        <summary>
                          <font-awesome-icon icon="fa-solid fa-laptop" class="size-5"/>
                          Sản phẩm
                        </summary>
                        <ul>
                          <li>
                            <RouterLink to="/product">
                              <font-awesome-icon icon="fa-solid fa-list" class="size-5"/>
                              Danh sách sản phẩm
                            </RouterLink>
                          </li>
                          <li>
                            <RouterLink to="/add-product">
                              <font-awesome-icon icon="fa-solid fa-plus" class="size-5"/>
                              Thêm sản phẩm
                            </RouterLink>
                          </li>
                        </ul>
                      </details>

                    </li>

                    <li>
                      <RouterLink to="/cpu">
                        <font-awesome-icon icon="fa-solid fa-microchip" class="size-5"/>
                        CPU
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/ram">
                        <font-awesome-icon icon="fa-solid fa-memory" class="size-5"/>
                        RAM
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/gpu">
                        <font-awesome-icon icon="fa-solid fa-microchip" class="size-5"/>
                        GPU
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/disk">
                        <font-awesome-icon icon="fa-solid fa-hard-drive" class="size-5"/>
                        Ổ cứng
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/display">
                        <font-awesome-icon icon="fa-solid fa-display" class="size-5"/>
                        Màn hình
                      </RouterLink>
                    </li>

                    <li>
                      <RouterLink to="/color">
                        <font-awesome-icon icon="fa-solid fa-palette" class="size-5"/>
                        Màu sắc
                      </RouterLink>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div class="sticky inset-x-0 bottom-0 bg-base-100">
            <RouterLink to="/profile" class="flex items-center gap-2 p-4 hover:bg-base-200">
              <img alt=""
                   src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                   class="size-10 rounded-full object-cover"/>
              <div>
                <p class="text-xs">
                  <strong class="block font-medium">I am racist</strong>
                  <span> nigga@white.com </span>
                </p>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="flex h-screen min-w-0 grow flex-col overflow-auto">
          <!--topbar-->
          <div class="flex items-center justify-between px-6 min-h-16 max-h-16 bg-base-100 shadow-lg sticky top-0">
            <div class="inline-flex items-center gap-3">
              <span
                  class="btn btn-ghost border-base-300 text-base-content/70 h-9 w-50 justify-start gap-2 !text-sm md:flex">
                <font-awesome-icon icon="fa-solid fa-search"/>
                <input type="text" class="focus:outline-0" placeholder="Tìm kiếm"/>
              </span>
            </div>
            <div class="inline-flex items-center gap-1.5">
              <div class="dropdown dropdown-center">
                <div class="btn btn-sm btn-circle btn-ghost" tabindex="0">
                <span>
                  <font-awesome-icon icon="fa-solid fa-sun" class="size-5"/>
                </span>
                </div>
                <ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-36 space-y-0.5 p-1 shadow-sm mt-2"
                    tabindex="0">
                  <li>
                    <div class="group-data-[theme=light]/html:bg-base-200 flex gap-2">
                      <font-awesome-icon icon="fa-solid fa-moon" class="size-5"/>
                      <span class="font-medium">Dark</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--mainview-->
          <div class="flex-grow py-6 px-6 bg-base-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">Bảng điều khiển</h3>
              <div class="breadcrumbs hidden text-sm sm:inline">
                <ul>
                  <li>
                    <a href="#" class="hover:text-primary">LapXpert</a>
                  </li>
                  <li>
                    <a href="#" class="hover:text-primary">Bảng điều khiển</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full">
                <RouterView></RouterView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

