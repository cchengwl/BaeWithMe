<template>
  <div>
    <div class="product_all">
      <div class="product_all_intro" v-for="item in filterProducts" :key="item.id">
        <button class="index_latest_item_btn" @click.prevent="starItem(item)"><i class="far fa-heart" v-if="starArray.indexOf(item.id) === -1"></i><i class="fas fa-heart" v-else></i></button>
        <div class="product_all_intro_img">
          <img :src="item.imageUrl">
        </div>
        <h5>{{item.title}}</h5>
        <span class="product_all_intro_price">${{item.price}}</span><span class="product_all_intro_origin">${{item.origin_price}}</span>
        <button class="product_all_intro_more" @click="checkMore(item.id)">查看更多</button>
      </div>      
    </div>

    <!-- 分頁標籤 -->
    <nav aria-label="Page navigation example" v-if="pagination.category === null">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled':!pagination.has_pre }">
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" :class="{ 'active':page === pagination.current_page }" v-for="page in pagination.total_pages" :key="page">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{ 'disabled':!pagination.has_next }">
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['products','pagination','filterProducts'],

  data() {
    return {
      star: [],
    }
  },

  methods: {
    getProducts(page = 1) {
      this.$emit('page', page);
    },

    addToCart(id , qty) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      let cart = {
        "product_id": id,
        "qty": qty
      }

      this.$http.post(api, { data : cart}).then((response) => {
        this.$bus.$emit('update:cart');
      })
    },

    starItem(item) {
      const vm = this;
      vm.star = JSON.parse(localStorage.getItem('star'));

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
  }, 
};
</script>
