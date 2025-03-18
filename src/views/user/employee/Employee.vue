<template>
  <section class="bg-base-100 flex h-full w-full flex-col rounded-2xl p-5">
    <div
      role="tablist"
      class="tabs tabs-box mb-2 flex w-full justify-start gap-2"
    >
      <RouterLink to="/employee" role="tab" class="tab text-primary" :class="{ 'tab-active': $route.path === '/employee' }">Danh sách nhân viên</RouterLink>
      <RouterLink to="/employee/crud" role="tab" class="tab text-primary" :class="{ 'tab-active': $route.path === '/employee/crud' }">Thêm mới</RouterLink>
    </div>
    <div class="relative flex-1">
      <div class="absolute inset-0 overflow-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </section>
</template>
