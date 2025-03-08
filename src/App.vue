<template>
  <div id="app">
    <nav>
      <router-link to="/">Trang chủ</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/nhanvien">Nhân viên</router-link>
      <router-link to="/khachhang">Khách Hàng</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
