<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 如果has.pre:false代表沒有前一頁，禁用此按鈕 -->
      <li class="page-item" :class="{'disabled': !pagination.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click="getPages(pagination.current_page -1)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': pagination.current_page === page}">
        <a class="page-link" href="#" @click="getPages(page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pagination.has_next}">
        <a class="page-link" href="#" aria-label="Next" @click="getPages(pagination.current_page +1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default({
  props: ['pagination'],
  data() {
    return {
    }
  },
  methods: {
    getPages(page = 1) {
      this.$bus.$emit('getProducts', page);
    }
  }
})
</script>
