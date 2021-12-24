<template>
  <div>
    <button class="global_stars" @click.prevent>
      <i class="far fa-heart"></i>
      <div>{{stars.length}}</div>
    </button>
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
    }
  },

  mounted() {
    this.getStar();

    this.$bus.$on('update:star', () => {
      this.getStar();
    })
  }
})
</script>