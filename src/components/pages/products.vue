<template>
  <div>
    <loading :active.sync="isLoading"/>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">新增商品</button>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <td style="width: 200px;">類別</td>
          <td>產品名稱</td>
          <td class="text-right" style="width: 100px;">原價</td>
          <td class="text-right" style="width: 100px;">售價</td>
          <td class="text-center" style="width: 100px;">狀態</td>
          <td class="text-center" style="width: 150px;">編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="align-middle">{{item.category}}</td>
          <td class="align-middle">{{item.title}}</td>
          <td class="text-right align-middle">{{item.origin_price | currency}}</td>
          <td class="text-right align-middle">{{item.price | currency}}</td>
          <td class="text-center align-middle">
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center align-middle" style="font-size: 0px;">
            <button class="btn btn-outline-primary editBtn" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger delBtn" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <!-- font-awesome icon v-if為true時呈現 -->
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img :src="tempProduct.imageUrl"
                  class="img-fluid" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <select class="custom-select" id="category" v-model="tempProduct.category">
                      <option value="backpack">背包</option>
                      <option value="shoes">鞋子</option>
                      <option value="headgear">帽子</option>
                      <option value="accessory">配件</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateModal">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteModal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <pagination :pagination="pagination"/>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data () {
    return{
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false, // 整個畫面loading icon
      status: {         // 局部loading icon方式
        fileUploading: false,
      },
      pagination: {},
    }
  },
  
  methods: {
    // ES6參數預設值 page = 1
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then((response) => { 
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      })
    },

    openModal(isNew, item) {
      const vm = this;
      if(isNew) {
        this.tempProduct = {};
        vm.isNew = true;
      }else {
        this.tempProduct = Object.assign({},item)
        vm.isNew = false;
      }
      $('#productModal').modal("show");
    },

    updateModal() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;

      if(!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api,{data: vm.tempProduct}).then((response) => { 
      if(response.data.success) {
        $('#productModal').modal("hide");
        vm.getProducts();
      }else{
        $('#productModal').modal("hide");
        vm.getProducts();
      }
      })
    },

    deleteModal(item) {
      const vm = this;
      vm.tempProduct = item;
      $('#delProductModal').modal('show');
    },

    confirmDelete() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;

      this.$http.delete(api).then((response) => {
        if(response.data.success) {
          vm.getProducts();
          $('#delProductModal').modal('hide');
        }else {
          vm.getProducts();
          $('#delProductModal').modal('hide');
        }
      })
    },

    uploadFile() {
      const file = this.$refs.files.files[0];
      const vm = this; 
      const formData = new FormData();
      formData.append('file-to-upload',file);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true; // 上傳時轉成true呈現出來
      
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        if(response.data.success) {
          vm.status.fileUploading = false; // 上傳完畢就隱藏
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        }else {
          // 如果上傳失敗
          // $emit message:push事件，帶入message跟status
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    }
  },

  created() {
    this.getProducts();

    this.$bus.$on('getProducts', page =>{
      this.getProducts(page);
    })
  }
}
</script>

<style scoped>
  .editBtn{
    border-radius: .25rem 0 0 .25rem;
  }

  .delBtn{
    border-radius: 0 .25rem .25rem 0;
  }
</style>
