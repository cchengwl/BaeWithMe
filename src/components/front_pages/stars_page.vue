<template>
  <div>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="star_main">
      <div class="star_main_table">
        <div class="star_main_table_head">
          <div class="star_table_body_item text-center"></div>
          <div class="star_table_body_item"><h6>商品名稱</h6></div>
          <div class="star_table_body_item text-center"><h6>商品介紹</h6></div>
          <div class="star_table_body_item text-center"><h6>價格</h6></div>
        </div>
        <div class="star_main_table_body">
          <div class="star_main_table_body_row" v-for="(item,index) in star" :key="item.id">
            <div class="star_table_body_item">
              <button @click.prevent="unstar(index)"><i class="fas fa-heart"></i></button>
            </div>
            <div class="star_table_body_item">
              <div class="star_main_table_body_row_img">
                <router-link :to="`/products/${item.id}`">
                  <img
                    :src="item.imageUrl"
                  />
                </router-link>
              </div>
              <router-link :to="`/products/${item.id}`" style="display: inline-block;"><h6>{{item.title}}</h6></router-link>
            </div>
            <div class="star_table_body_item text-left">{{item.description}}</div>
            <div class="star_table_body_item text-center"><span>單價 </span>NT${{item.price}}</div>
          </div>
        </div>
        <div class="star_main_table_foot">
          <button class="add_to_cart_button" @click.prevent="openModal">清空商品</button>
        </div>
      </div>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="clearStar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body cart_main_modal">
            確定要移除商品嗎？<br>刪除後將無法恢復
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">取消</button>
            <button type="button" class="btn" @click="clearItem">確定刪除</button>
          </div>
        </div>
      </div>
    </div>    
    <front-footer />
  </div>
</template>

<script>
import $ from 'jquery';
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";

export default {
  components: { frontNavbar, frontFooter },
  data() {
    return {
      star: [],
    }
  },
  methods: {
    getStar() {
      const vm = this;
      vm.star = JSON.parse(localStorage.getItem('star'));
    },

    unstar(index) {
      const vm = this;

      vm.star.splice(index, 1);

      var starJson = JSON.stringify(vm.star);
      localStorage.setItem('star', starJson);

      this.$bus.$emit('update:star');
    },

    openModal() {
      $('#clearStar').modal('show');
    },

    clearItem() {
      const vm = this;
      vm.star = [];
      var starJson = JSON.stringify(vm.star);
      localStorage.setItem('star', starJson);
      vm.getStar();
      $('#clearStar').modal('hide');
      this.$bus.$emit('update:star');
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
    this.getStar();
  }
}
</script>