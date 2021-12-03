<template>
  <main class="form-signin">
    <form @submit.prevent="signin">
      <h1 class="h3 mb-3 fw-normal">請先登入</h1>

      <div class="form-floating">
        <input type="text" class="form-control" v-model="user.username" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating form2">
        <input type="password" class="form-control" v-model="user.password" id="floatingPassword" placeholder="Password">
        <span v-if="eye" class="eye"><i class="fas fa-eye-slash" @click="openEye"></i></span>
        <span v-else class="eye"><i class="far fa-eye" @click="openEye"></i></span>
        <label for="floatingPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      eye: true,
    }
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;

      this.$http.post(api, vm.user).then((response) => {
        
        if(response.data.success){
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token}; expires=(${new Date(expired)})`;
          vm.$router.push('/admin/products');
        }else{
          console.log('登入失敗')
        }
      })
    },

    openEye() {
      if( $('#floatingPassword').attr('type') === 'text'){
        $('#floatingPassword').attr('type','password');
        this.eye = true;
      }else{
        $('#floatingPassword').attr('type','text');
        this.eye = false;
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form2{
  position: relative;
}

.form-control{
  margin-bottom: 5px;
}

#floatingPassword{
  margin-bottom: 5px;
  border-radius: .25rem;
}

.eye{
  position: absolute;
  top: 9px;
  right: 9px;
}
</style>
