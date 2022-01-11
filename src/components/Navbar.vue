<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Bae-With-Me</a>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click="signout">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default{
    name: 'Navbar',
    methods: {
      signout() {
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;

        this.$http.post(api).then(response => {
          if(response.data.success){
            vm.$router.push('/login');
          }
        })
      }
    },
  }
</script>