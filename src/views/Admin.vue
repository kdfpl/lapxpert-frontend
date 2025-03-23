<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
</script>
<template>
  <div class="grid h-screen grid-cols-[256px_1fr] grid-rows-[70px_1fr] -z-10">
    <!-- sidebar -->
    <aside
      class="sidebar bg-base-100 sticky top-0 col-span-1 row-span-2 flex h-screen flex-col self-start"
    >
      <!-- Logo -->
      <div class="p-3">
        <a
          class="grid h-16 place-content-center rounded-lg"
          href="/dashboard"
          data-discover="true"
        >
          <DotLottieVue
            src="/src/assets/lapxpert/lapxpert.json"
            autoplay
            speed=1
          />
        </a>
      </div>

      <!-- Menu -->
      <div class="bg-base-100 h-full overflow-auto">
        <ul class="menu w-full">
          <li>
            <RouterLink to="/monitor">
              <span
                :class="
                  $route.path.startsWith('/monitor')
                    ? 'icon-[line-md--speed-twotone-loop] size-5'
                    : 'icon-[line-md--speed-loop] size-5'
                "
              ></span>
              <span class="text-sm font-medium"> Thống kê </span>
            </RouterLink>
          </li>

          <!-- Ban hang -->
          <li>
            <details open>
              <summary>
                <span class="icon-[stash--shop] size-5"></span>
                <span class="text-sm font-medium"> Bán hàng </span>
              </summary>

              <ul>
                <li>
                  <RouterLink to="/order">
                    <span
                      class="icon-[hugeicons--delivery-truck-02] size-5"
                    ></span>
                    Đơn hàng
                  </RouterLink>
                </li>

                <li>
                  <RouterLink to="/invoice">
                    <span class="icon-[hugeicons--invoice-02] size-5"></span>
                    Hóa đơn
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>

          <!-- San pham -->
          <li>
            <details open>
              <summary>
                <span class="icon-[ph--laptop-light] size-5"></span>
                <span class="text-sm font-medium"> Quản lý sản phẩm </span>
              </summary>
              <ul>
                <li>
                  <RouterLink to="/product">
                    <span class="icon-[solar--list-line-duotone] size-5"></span>
                    Danh sách sản phẩm
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/cpu">
                    <span class="icon-[ep--cpu] size-5"></span>
                    CPU
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/ram">
                    <span class="icon-[ph--memory-light] size-5"></span>
                    RAM
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/gpu">
                    <span class="icon-[ph--graphics-card-thin] size-5"></span>
                    GPU
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/disk">
                    <span class="icon-[clarity--hard-disk-line] size-5"></span>
                    Ổ cứng
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/display">
                    <span class="icon-[solar--display-broken] size-5"></span>
                    Màn hình
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/battery">
                    <span :class="
                  $route.path.startsWith('/battery')
                    ? 'icon-[ph--battery-charging-fill] size-5'
                    : 'icon-[ph--battery-charging] size-5'
                "></span>
                    Pin
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/color">
                    <span
                      :class="
                        $route.path === '/color'
                          ? 'icon-[heroicons-solid--color-swatch] size-5'
                          : 'icon-[heroicons-outline--color-swatch] size-5'
                      "
                    ></span>
                    Màu sắc
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>

          <!-- Giam gia -->
          <li>
            <details open>
              <summary>
                <span class="icon-[iconoir--home-sale] size-5"></span>
                <span class="text-sm font-medium"> Giảm giá </span>
              </summary>

              <ul>
                <li>
                  <RouterLink to="/voucher">
                    <span
                      :class="
                        $route.path.startsWith('/voucher')
                          ? 'icon-[solar--ticket-sale-bold] size-5'
                          : 'icon-[solar--ticket-sale-broken] size-5'
                      "
                    ></span>
                    Phiếu giảm giá
                  </RouterLink>
                </li>

                <li>
                  <RouterLink to="/saleoff">
                    <span
                      :class="
                        $route.path.startsWith('/saleoff')
                          ? 'icon-[solar--sale-square-bold] size-5'
                          : 'icon-[solar--sale-square-broken] size-5'
                      "
                    ></span>
                    Đợt giảm giá
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>

          <!-- Nguoi dung -->
          <li>
            <details open>
              <summary>
                <span
                  class="icon-[material-symbols--group-outline] size-5"
                ></span>
                <span class="text-sm font-medium"> Người dùng </span>
              </summary>

              <ul>
                <li>
                  <RouterLink to="/employee">
                    <span class="icon-[solar--user-id-linear] size-5"></span>
                    Nhân viên
                  </RouterLink>
                </li>

                <li>
                  <RouterLink to="/customer">
                    <span class="icon-[hugeicons--ai-user] size-5"></span>
                    Khách hàng
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <!-- Profile -->
      <div class="shadow-2xl">
        <RouterLink
          to="/profile"
          class="hover:bg-base-200 flex items-center gap-2 p-4"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="size-10 rounded-full object-cover"
          />
          <div>
            <p class="text-xs">
              <strong class="block font-medium">I am racist</strong>
              <span> nigga@white.com </span>
            </p>
          </div>
        </RouterLink>
      </div>
    </aside>

    <!-- navbar -->
    <nav
      class="bg-base-100 sticky top-0 col-span-1 flex items-center justify-end px-3"
    >
      <div
        class="rounded-box hover:bg-primary mr-auto flex items-center border-0 p-1 hover:text-white"
      >
        <span
          class="icon-[tabler--layout-sidebar-left-collapse-filled] size-8"
        ></span>
      </div>

      <label class="input input-ghost custom-input mx-10 w-150">
        <span class="icon-[streamline--search-visual-solid] size-5"></span>
        <input type="search" class="grow" placeholder="Tìm kiếm..." />
      </label>

      <div class="join gap-2">
        <button
          class="join-item btn btn-circle bg-base-100 hover:bg-primary border-0 hover:text-white"
        >
          <span class="icon-[bx--notification] size-5"></span>
        </button>
        <label
          class="join-item btn btn-circle bg-base-100 swap swap-rotate hover:bg-primary border-0 hover:text-white"
        >
          <input type="checkbox" class="theme-controller" value="dracula" />
          <span
            class="icon-[line-md--sunny-outline-to-moon-alt-loop-transition] swap-off size-6 fill-current"
          ></span>
          <span
            class="icon-[line-md--moon-alt-to-sunny-outline-loop-transition] swap-on fill-curren size-6"
          ></span>
        </label>
      </div>
    </nav>

    <!-- mainview -->
    <main
      class="bg-base-300 col-span-1 px-5 py-3 shadow-[inset_1px_1px_25px_rgba(0,0,0,0.5)]"
    >
      <div class="flex h-full w-full flex-col">
        <!-- breadcrumbs -->
        <div class="mb-2 flex items-center justify-between px-2.5">
          <h3 class="text-base-content text-3xl font-bold">Thống kê</h3>
          <div class="breadcrumbs text-sm">
            <ul>
              <li><a href="#" class="hover:text-primary">Thống kê</a></li>
            </ul>
          </div>
        </div>

        <!-- content -->
        <div class="h-full">
          <RouterView></RouterView>
        </div>
      </div>
    </main>
  </div>
</template>
