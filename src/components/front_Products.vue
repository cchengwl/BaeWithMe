<template>
  <div>
    <front-navbar/>
      <div class="product_nav_margin">
      <article class="product_article">
        <div class="product_article_mask"></div>
        <div class="container">
          <h4>Products</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </article>
    </div>
    <div class="product_content">
      <aside>
        <h6>CATEGORIES</h6>
        <ul>
          <li><router-link to="/products">Backpack</router-link></li>
          <li><router-link to="/products">Jacket</router-link></li>
          <li><router-link to="/products">Sun glasses</router-link></li>
          <li><router-link to="/products">Tools</router-link></li>
        </ul>
      </aside>
      <main class="product_main">
        <router-view/>
      </main>
    </div>
    <front-footer/>
  </div>
</template>

<script>
import frontNavbar from "./front_Navbar.vue";
import frontFooter from "./front_Footer.vue";

export default {
  components: { frontNavbar, frontFooter },
};
</script>