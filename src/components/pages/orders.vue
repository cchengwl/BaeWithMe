<template>
  <div>
    <table class="table mt-4">
      <thead class="thead-dark">
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default({

  data() {
    return {
      orders: [],
    }
  },

  methods: {
    getOrders(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=:page`;
      const vm = this;

      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.orders = response.data;
      })
    },
  },
  
  created() {
    this.getOrders();
  }

})
</script>
