<template>
  <div>
    <navbar/>
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <alert/>
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlertMessage';

export default{
  components: { Sidebar, Navbar, Alert },
  name: 'Admin',

  created() {
    let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  }
}
</script>
