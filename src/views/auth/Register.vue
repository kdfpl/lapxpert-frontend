<script setup lang="ts">

</script>

<template>
  <div id="root" class="flex-grow flex items-center justify-center w-screen h-screen">
    <div class="w-full max-w-2xl p-4 md:p-8 bg-base-200 rounded-box shadow-lg">
      <h1 class="text-3xl font-bold text-center">Đăng ký</h1>

      <div class="text-center mt-2">
        <h3 class="text-base-content/80 text-sm">
          Đã có tài khoản?
          <a class="text-primary ms-1 hover:underline" href="">Đăng nhập</a>
        </h3>
      </div>

      <div class="mt-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Email</legend>
          <label class="input w-full focus:outline-0">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
            <input type="email" class="grow focus:outline-0" placeholder="Email"/>
          </label>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Mật khẩu</legend>
          <label class="input w-full focus:outline-0">
            <font-awesome-icon icon="fa-solid fa-key"/>
            <input type="password" class="grow focus:outline-0" placeholder="Mật khẩu"/>
            <button class="btn btn-xs btn-ghost btn-circle">
              <font-awesome-icon icon="fa-solid fa-eye"/>
            </button>
          </label>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Nhập lại mật khẩu</legend>
          <label class="input w-full focus:outline-0">
            <font-awesome-icon icon="fa-solid fa-key"/>
            <input type="password" class="grow focus:outline-0" placeholder="Nhập lại mật khẩu"/>
            <button class="btn btn-xs btn-ghost btn-circle">
              <font-awesome-icon icon="fa-solid fa-eye"/>
            </button>
          </label>
        </fieldset>

        <a class="btn btn-primary btn-wide max-w-full mt-4 md:mt-6">
          Đăng ký
        </a>
      </div>

      <div class="divider">Hoặc</div>

      <button class="btn btn-neutral btn-wide max-w-full flex items-center justify-center gap-2">
        <img class="size-6" alt="" src="../../assets/brand-logo/google-color.svg">
        Tiếp tục với Google
      </button>

      <button class="btn btn-neutral btn-wide max-w-full flex items-center justify-center gap-2 mt-2">
        <img class="size-6" alt="" src="../../assets/brand-logo/facebook-color.svg">
        Tiếp tục với Facebook
      </button>
    </div>
  </div>
</template>