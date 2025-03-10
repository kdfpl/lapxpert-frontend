<script setup lang="ts">

</script>

<template>
  <div id="root">
    <div class="w-full min-h-[760px] flex flex-col justify-start rounded-box z-0 overflow-auto">
      <div class="grid gap-5 grid-cols-4">
        <div class="card bg-base-100 shadow">
          <div class="card-body gap-2">
            <div class="flex items-start justify-between gap-2 text-sm">
              <div>
                <p class="text-base-content/80 font-medium">Doanh thu</p>
                <div class="mt-3 flex items-center gap-2">
                  <p class="text-2xl font-semibold">1.435.533.222</p>
                  <div class="badge badge-soft badge-success badge-sm gap-0.5 px-1 font-medium">
                    <font-awesome-icon icon="fa-solid fa-angles-up"/>
                    10.8%
                  </div>
                </div>
              </div>
              <div class="bg-base-200 rounded-box flex items-center p-2">
                <span class="icon-[fa6-solid--dong-sign]"></span>
              </div>
            </div>
            <p class="text-base-content/60 text-sm">
              VND
            </p>
          </div>
        </div>
        <div class="card bg-base-100 shadow">
          <div class="card-body gap-2">
            <div class="flex items-start justify-between gap-2 text-sm">
              <div>
                <p class="text-base-content/80 font-medium">Đơn hàng</p>
                <div class="mt-3 flex items-center gap-2">
                  <p class="text-2xl font-semibold">43.868</p>
                  <div class="badge badge-soft badge-success badge-sm gap-0.5 px-1 font-medium">
                    <font-awesome-icon icon="fa-solid fa-angles-up"/>
                    30.8%
                  </div>
                </div>
              </div>
              <div class="bg-base-200 rounded-box flex items-center p-2">
                <span class="icon-[carbon--delivery-parcel]"></span>
              </div>
            </div>
            <p class="text-base-content/60 text-sm">
              Đơn
            </p>
          </div>
        </div>
        <div class="card bg-base-100 shadow">
          <div class="card-body gap-2">
            <div class="flex items-start justify-between gap-2 text-sm">
              <div>
                <p class="text-base-content/80 font-medium">Sản phẩm</p>
                <div class="mt-3 flex items-center gap-2">
                  <p class="text-2xl font-semibold">5.310</p>
                  <div class="badge badge-soft badge-success badge-sm gap-0.5 px-1 font-medium">
                    <font-awesome-icon icon="fa-solid fa-angles-up"/>
                    10.8%
                  </div>
                </div>
              </div>
              <div class="bg-base-200 rounded-box flex items-center p-2">
                <span class="icon-[hugeicons--laptop-performance]"></span>
              </div>
            </div>
            <p class="text-base-content/60 text-sm">
              Sản phẩm các loại
            </p>
          </div>
        </div>
        <div class="card bg-base-100 shadow">
          <div class="card-body gap-2">
            <div class="flex items-start justify-between gap-2 text-sm">
              <div>
                <p class="text-base-content/80 font-medium">Khách hàng</p>
                <div class="mt-3 flex items-center gap-2">
                  <p class="text-2xl font-semibold">40.392</p>
                  <div class="badge badge-soft badge-success badge-sm gap-0.5 px-1 font-medium">
                    <font-awesome-icon icon="fa-solid fa-angles-up"/>
                    30.8%
                  </div>
                </div>
              </div>
              <div class="bg-base-200 rounded-box flex items-center p-2">
                <span class="icon-[garden--customer-lists-fill-26]"></span>
              </div>
            </div>
            <p class="text-base-content/60 text-sm">
              Người
            </p>
          </div>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-7">
          <div class="card bg-base-100 shadow">
            <div class="card-body px-0 pb-0">
              <div class="px-6">
                <div class="flex items-start justify-between">
                  <span class="font-medium">Revenue Statistics</span>
                  <div class="tabs tabs-box tabs-xs hidden sm:block">
                    <div class="tab px-3 false">Day</div>
                    <div class="tab px-3 false">Month</div>
                    <div class="tab px-3 tab-active">Year</div>
                  </div>
                </div>
                <div class="mt-3">
                  <div class="flex items-center gap-3">
                    <span class="text-4xl font-semibold">$184.78K</span>
                    <span class="text-success font-medium">+3.24%</span>
                  </div>
                  <span class="text-base-content/60 text-sm">Total income in this year</span>
                </div>
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