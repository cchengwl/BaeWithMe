<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  mounted() {
    const json = localStorage.getItem('star');
    if(json === null) {
      let nullStar = [];
      let starJson = JSON.stringify(nullStar);
      localStorage.setItem('star',starJson)
    }
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
