<template>
  <div>
    <table class="table mt-4">
      <thead class="thead-dark">
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th class="text-right">應付金額</th>
          <th class="text-center">是否付款</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td class="align-middle">{{ item.create_at}}</td>
          <td class="align-middle">{{item.user.email}}</td>
          <!-- 再次使用v-for取得products內物件 -->
          <td class="align-middle">
            <div v-for="product in item.products" :key="product.id">{{product.product.title}} / {{product.qty}}位</div>
          </td>
          <td class="text-right align-middle">{{item.total}}</td>
          <td class="text-center align-middle">
            <span class=text-success v-if="item.is_paid">已付款</span>
            <span class=text-danger v-else>未付款</span>
          </td>
          <td class="text-center align-middle" style="font-size: 0px;">
            <button class="btn btn-outline-primary editBtn" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="my-3">訂單資料</h4>
            <div>
              <div class="form-group">
                <label for="create_date">建立日期</label>
                <input type="text" class="form-control" id="create_date" v-model="tempOrder.create_at" disabled>
              </div>
              <div>
                <span>應付金額</span>
                <span>{{tempOrder.total}}</span>
                <span>付款狀態</span>
                <span class="badge badge-success" v-if="tempOrder.is_paid">已付款</span>
                <span class="badge badge-danger" v-else>未付款</span>
              </div>
            </div>
            <hr>
            <h4 class="my-3">收件人資料</h4>
            <div class="row">
              <div class="form-group col-6">
                <label for="username">姓名</label>
                <input type="text" class="form-control" id="username" v-model="tempOrder.user.name">
              </div>
              <div class="form-group col-6">
                <label for="tel">連絡電話</label>
                <input type="text" class="form-control" id="tel" v-model="tempOrder.user.tel">
              </div>
              <div class="form-group col-12">
                <label for="email">電子信箱</label>
                <input type="text" class="form-control" id="email" v-model="tempOrder.user.email" disabled>
              </div>
              <div class="form-group col-12">
                <label for="address">地址</label>
                <input type="text" class="form-control" id="address" v-model="tempOrder.user.address">
              </div>
            </div>
            <hr>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editOrder(tempOrder.id)">確認變更</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default({

  data() {
    return {
      orders: [],
      tempOrder: {
        // 避免剛載入時tempOrder是empty報錯，在裡面加上user這個物件
        user:{},
      },
    }
  },

  methods: {
    getOrders(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=:page`;
      const vm = this;

      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.orders.forEach(function(item) {
          // timestamp 乘上1000轉換為現在時間
          const date = new Date(item.create_at * 1000);
          let yyyy = date.getFullYear();
          // 只要不足兩位數的日期都在前面補上0
          let mm = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
          let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
          let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
          let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

          item.create_at = `${yyyy}/${mm}/${dd} ${hour}:${minute}:${second}`;
        })
      })
    },

    openModal(item) {
      const vm = this;
      vm.tempOrder = Object.assign({}, item);;
      $('#editModal').modal('show');
    },

    editOrder(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${id}`;
      const vm = this;

      // 轉回timestamp
      let date = new Date(vm.tempOrder.create_at);
      let timeStamp = Math.floor(date.getTime() / 1000);
      vm.tempOrder.create_at = timeStamp;

      this.$http.put(api, {data: vm.tempOrder}).then((response) => {
        console.log(response.data);
        $('#editModal').modal('hide');
        vm.getOrders();
      })
    }
  },
  
  created() {
    this.getOrders();
  }

})
</script>