<template>
  <div>
    <navbar/>
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default{
  components: { Sidebar, Navbar },
  name: 'Admin'
}
</script>
