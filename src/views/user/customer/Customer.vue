<template>
  <section class="bg-base-100 flex h-full w-full flex-col rounded-2xl p-5">
    <div
      role="tablist"
      class="tabs tabs-box mb-2 flex w-full justify-start gap-2"
    >
      <RouterLink to="/customer" role="tab" class="tab text-primary" :class="{ 'tab-active': $route.path === '/customer' }">Danh sách khách hàng</RouterLink>
      <RouterLink to="/customer/add" role="tab" class="tab text-primary" :class="{ 'tab-active': $route.path === '/customer/add' }">Thêm mới</RouterLink>
    </div>
    <div class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </section>
</template>
