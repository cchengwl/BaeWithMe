<template>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link :to="{name: 'products'}" class="nav-link" href="#">
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'orders'}" class="nav-link" href="#">
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'coupon'}" class="nav-link" href="#">
            優惠券
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link :to="{name: 'customerOrder'}" class="nav-link" href="#">
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default{
    name: 'Sidebar',
  }
</script>

<style scoped>
  .router-link-exact-active{
    color: #007bff;
  }
</style>
