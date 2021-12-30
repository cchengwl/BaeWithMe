<template>
  <div>
    <front-navbar/>
    <div class="product_nav_margin"></div>
      <div class="index_banner"></div>    
    <div class="container">
      <div class="index_category">
        <h3>茶葉類型</h3>
        <div class="index_category_flex">
          <div class="index_category_flex_item">
            <button @click="gotoProduct('backpack')">
              <div></div>
              <span>紅茶</span>
            </button>
          </div>
          <div class="index_category_flex_item">
            <button @click="gotoProduct('shoes')">
              <div></div>
              <span>綠茶</span>              
            </button>
          </div>
          <div class="index_category_flex_item">
            <button>
              <div></div>
              <span>白茶</span>
            </button>
          </div>
          <div class="index_category_flex_item">
            <button>
              <div></div>
              <span>烏龍</span>              
            </button>
          </div>
          <div class="index_category_flex_item">
            <button>
              <div></div>
              <span>普洱</span>
            </button>
          </div>
          <div class="index_category_flex_item">
            <button>
              <div></div>
              <span>花草茶</span>              
            </button>
          </div>                        
        </div>
      </div>
      <div class="index_latest">
        <h3>最新上市</h3>
        <div class="index_latest_flex">
          <carousel
          :autoplay="true"
          :autoplayHoverPause="true"
          :navigationEnabled="true"
          :navigationNextLabel="'>'"
          :navigationPrevLabel="'<'"
          :perPageCustom="[
            [360, 1],
            [480, 1],
            [768, 2],
            [960, 3],
            [1140, 4],
          ]">
            <slide v-for="item in products" :key="item.id">
              <div class="index_latest_item index_hover">
                <span class="badge badge-pill index_latest_item_badge">New</span>
                <button class="index_latest_item_btn" @click.prevent="starItem(item)"><i class="far fa-heart" v-if="starArray.indexOf(item.id) === -1"></i><i class="fas fa-heart" v-else></i></button>
                <div class="index_latest_item_img">
                  <img :src="item.imageUrl">
                </div>
                <h5>{{item.title}}</h5>
                <span class="index_latest_item_price">${{item.price}}</span><span class="index_latest_item_origin">${{item.origin_price}}</span>
                <button class="index_latest_item_more" @click="checkMore(item.id)">查看更多</button>
              </div>
            </slide>
          </carousel>
        </div>        
      </div>
      <div class="index_intro">
        <div class="index_intro_img"><img src="https://cdn.shopify.com/s/files/1/1234/1342/products/2021_Pantry_Sugarfina_Bento_Winter_Village_P0002_5000x.jpg?v=1635800568"></div>
        <div class="index_intro_text">
          <h1>好茶值得擁有</h1>
          <p>好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有好茶值得擁有</p>
        </div>
      </div>
    </div>
    <section id="index_album">
        <carousel
          :autoplay="true"
          :autoplayHoverPause="true"
          :perPageCustom="[
            [360, 10],
            [480, 10],
          ]"
          :paginationEnabled="false"
          :speed="1000"
          :loop="true"
        >
          <slide v-for="(item,index) in album" :key="index">
            <a href="#">
              <div width='10px;'>
                <img class="index_album_img"
                  :src="item.backgroundUrl"
                />
              </div>
            </a>
          </slide>
        </carousel>
    </section>
    <stars/>
    <front-footer/>
  </div>
</template>

<script>
import $ from "jquery";
import frontNavbar from '../front_Navbar.vue';
import frontFooter from '../front_Footer.vue';
import Stars from '../Stars.vue';

export default {
  components: {frontNavbar , frontFooter, Stars } ,
  data() {
    return {
      album:[
        {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
        {
          name: 'europe',
          backgroundUrl:'https://cdn.pixabay.com/photo/2021/08/03/11/48/canal-6519196_1280.jpg'
        },
        {
          name: 'korea',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg'
        },
        {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
        {
          name: 'europe',
          backgroundUrl:'https://cdn.pixabay.com/photo/2021/08/03/11/48/canal-6519196_1280.jpg'
        },
        {
          name: 'korea',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg'
        },

        {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
      ],
      windowWidth: 0,
      products: [],
      pagination: {},
      star: [],
    }
  },

  methods: {
    gotoProduct(item) {
      this.$bus.$emit('get:category',item);

      this.$router.push({
        name: 'front_Products_all',
        // query: {
        //   category: item
        // }
      }).catch(() => {});
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

    getStar() {
      const vm = this;
      vm.star = JSON.parse(localStorage.getItem('star'));
    },

    starItem(item) {
      const vm = this;

      if(vm.star === null) {
        vm.star = [];
        vm.star.push(item);

      }else {
        var result = vm.star.map(function(item) {
          return item.id
        }).indexOf(item.id);

        if(result === -1) {
          vm.star.push(item);
        }else {
          vm.star.splice(result, 1);
        }
      }

      var starJson = JSON.stringify(vm.star);
      localStorage.setItem('star', starJson);

      this.$bus.$emit('update:star');
    },

    checkMore(id) {
      this.$router.push({
        name: 'front_Products_single',
        params: { id: id }
      })
    }
  },

  computed: {
    starArray() {
      let newArray = this.star.map(item => {
        return item.id
      })

      return newArray;
    }
  },
  
  created() {
    this.getProducts();
    this.getStar();
  },

  mounted() {
    const vm = this;
    let hoverItem = $('.index_latest_item');
    vm.windowWidth = window.innerWidth;

    $(window).resize(function() {
      vm.windowWidth = window.innerWidth;

      if(vm.windowWidth > 720) {
        hoverItem.addClass('index_hover');
      }else {
        hoverItem.removeClass('index_hover');
      }
    })
  }
};
</script>