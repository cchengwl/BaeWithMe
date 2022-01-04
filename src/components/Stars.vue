<template>
  <div>
    <router-link class="global_stars" :to="{'name':'front_Star'}">
      <i class="far fa-heart"></i>
      <div>{{stars.length}}</div>
    </router-link>
  </div>
</template>

<script>
export default({
  data() {
    return {
      stars: [],
    }
  },
  
  methods: {
    getStar() {
      const vm = this;
      vm.stars = JSON.parse(localStorage.getItem('star'));
    },
  },

  mounted() {
    this.getStar();

    this.$bus.$on('update:star', () => {
      this.getStar();
    })
  }
})
</script>