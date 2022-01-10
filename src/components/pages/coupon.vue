<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">新增優惠券</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th class="text-center">到期日</th>
          <th class="text-center">優惠券名稱</th>
          <th class="text-center">優惠碼</th>
          <th class="text-center">折數</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-center align-middle">{{item.due_date}}</td>
          <td class="align-middle text-center">{{item.title}}</td>
          <td class="text-center align-middle">{{item.code}}</td>
          <td class="text-center align-middle">{{item.percent}}</td>
          <td class="text-center align-middle" style="font-size: 0px;">
            <button class="btn btn-outline-primary editBtn" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger delBtn" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponTitle">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Validation-observer v-slot="{ invalid }">
            <div class="modal-body">
              <Validation-provider name="優惠券名稱" rules="required" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="coupon-name">優惠券名稱</label>
                  <input type="text" class="form-control" :class="classes" id="coupon-name" v-model="tempCoupon.title">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </Validation-provider>
              <Validation-provider name="折扣數" rules="required|between:1,100" v-slot="{ errors,classes }">
                <div class="form-group">
                  <label for="percent">折扣數</label>
                  <input type="text" class="form-control" :class="classes" id="percent" v-model="tempCoupon.percent">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </Validation-provider>
              <div class="form-group" v-if="!isNew">
                <label for="due-date-currently">目前到期日</label>
                <input type="text" class="form-control" v-model="tempCoupon.due_date" disabled>
              </div>
              <div class="form-group">
                <label for="due-date">到期日</label>
                <input type="datetime-local" class="form-control" id="due-date" v-model="tempCoupon.due_date">
              </div>
              <Validation-provider name="優惠券碼" rules="required|alpha_num" v-slot="{ errors,classes }">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="couponCode">優惠券碼</span>
                  </div>
                  <input type="text" class="form-control" :class="classes" v-model="tempCoupon.code">
                  <span class="text-danger">{{ errors[0] }}</span>
                </div>
              </Validation-provider>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="updateCoupon" :disabled="invalid">確認送出</button>
            </div>
          </Validation-observer>
        </div>
      </div>
    </div>

    <!-- deleteModal -->
    <div class="modal fade" id="deleteCoupon" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
    }
  },

  methods: {
    getCoupon() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=:page`;
      const vm = this;

      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.coupons.forEach(function(item) {
          // timestamp 乘上1000轉換為現在時間
          const date = new Date(item.due_date * 1000);
          let yyyy = date.getFullYear();
          // 只要不足兩位數的日期都在前面補上0
          let mm = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
          let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
          let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
          let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

          item.due_date = `${yyyy}/${mm}/${dd} ${hour}:${minute}:${second}`;
        })
      })
    },

    openModal(isNew,item) {
      const vm = this;
      if(isNew) {
        $('#couponTitle').html('新增優惠券');
        vm.tempCoupon = {};
        vm.isNew = true;
      }else{
        $('#couponTitle').html('編輯優惠券');
        vm.tempCoupon = item;
        vm.isNew = false;
      }
      $('#couponModal').modal('show');
    },

    updateCoupon() {
      const vm = this;

      let time = $('#due-date').val();
      let timeStamp = new Date(time);
      timeStamp = Math.floor(timeStamp.getTime() / 1000);
      vm.tempCoupon.due_date = timeStamp;
      
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';

      if(!vm.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      
      this.$http[httpMethod](api, {data: vm.tempCoupon}).then((response) => {
        $('#couponModal').modal('hide');
        this.getCoupon();
      })
    },

    deleteModal(item) {
      $('#deleteCoupon').modal('show');
      this.tempCoupon = item;
    },

    confirmDelete() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;

      this.$http.delete(api).then((response) => {
        $('#deleteCoupon').modal('hide');
        vm.getCoupon();
      })
    }
    
  },

  created() {
    this.getCoupon();
  },
};
</script>

<style scoped>
  .editBtn{
    border-radius: .25rem 0 0 .25rem;
  }

  .delBtn{
    border-radius: 0 .25rem .25rem 0;
  }
</style>
