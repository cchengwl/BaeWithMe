<template>
  <div>
    <front-navbar/>
      <div class="product_nav_margin">
      <article class="product_article">
        <div class="product_article_mask"></div>
        <div class="container">
          <h4>產品列表</h4>
          <p>
            為您嚴選高品質產品，所有商品皆經過SGS品質檢驗合格，讓您用的安心。
          </p>
        </div>
      </article>
    </div>
    <div class="product_content">
      <aside>
        <h6>分類</h6>
        <div class="product_content_flex">
          <div class="product_content_flex_item">
            <button @click="getCategory(null)">
              <div></div>
              <span>所有商品</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('backpack')">
              <div></div>
              <span>背包</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('shoes')">
              <div></div>
              <span>鞋類</span>              
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('headgear')">
              <div></div>
              <span>帽子</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('accessory')">
              <div></div>
              <span>配件</span>              
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('accessory')">
              <div></div>
              <span>配件</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('accessory')">
              <div></div>
              <span>配件</span>              
            </button>
          </div>                        
        </div>
      </aside>
      <main class="product_main">
        <router-view :products="products" :pagination="pagination" :filterProducts="filterProducts" @page="getProducts"/>
      </main>
    </div>
    <stars/>
    <front-footer/>
  </div>
</template>

<script>
import frontNavbar from "./front_Navbar.vue";
import frontFooter from "./front_Footer.vue";
import Stars from './Stars.vue';

export default {
  components: { frontNavbar, frontFooter, Stars },
  
  data() {
    return {
      allProducts: [],
      products: [],
      pagination: {},
    }
  },

  methods: {
    getAllProducts() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;
        vm.allProducts = vm.allProducts.filter((item) => {
          return item.is_enabled === 1;
        })
      })
    },

    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;

      this.$http.get(api).then((response) => {
        vm.products = response.data.products;

        vm.products = vm.products.filter((item) => {
          return item.is_enabled === 1;
        })

        vm.filterProducts = vm.products;
        vm.pagination = response.data.pagination;
      })
    },

    getCategory(item) {
      const vm = this;

      if(item === null) {
        this.$router.push({
          name: 'front_Products_all',
        }).catch(() => {}); 
      }else {
        this.$router.push({
          name: 'front_Products_all',
          query: {
            category: item
          }
        }).catch(() => {});
      }

      this.pagination.category = item;
    },
  },

  computed: {
    filterProducts: {
      get() {
        if(this.$route.query.category === undefined) {
          return this.products;
        }else {
          let filterProducts = this.allProducts.filter(item => {
            return item.category === this.$route.query.category;
          })

          return filterProducts
        }
      },

      set(value) {
        return value
      }
    }
  },

  created() {
    this.getProducts();
    this.getAllProducts();    
  },
};
</script>