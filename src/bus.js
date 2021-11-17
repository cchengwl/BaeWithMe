import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// 定義一個新的vue實例
// 將event bus直接掛載在原型下，可以直接呼叫event bus