<template>
  <div>
    <front-navbar/>
    <router-view/>
    <front-footer/>
  </div>
</template>

<script>
import frontNavbar from './front_Navbar.vue';
import frontFooter from './front_Footer.vue';

export default({
  components: {frontNavbar , frontFooter } ,
})
</script>
