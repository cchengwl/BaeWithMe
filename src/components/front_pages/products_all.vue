<template>
  <div>
    <div class="main_filter">
      <label>Sort By:</label><select name="filter_select" id="main_filter_select">
        <option value="Price">Price(Low to High)</option></select>
    </div>
    <div class="main_products">         
      <div class="main_products_intro">
        <router-link :to="{ name:'front_Products_single' }">
          <div class="main_products_intro_img">
            <img src="https://cdn.pixabay.com/photo/2016/05/13/19/30/girl-with-a-cloth-1390693_1280.jpg" alt="產品">
          </div>
          <p>Product Name</p>
          <span>NT$200</span>
          <button class="add_to_cart_button">ADD TO CART</button>
        </router-link>
      </div>
      <div class="main_products_intro">
        <a href="#">
          <div class="main_products_intro_img">
            <img src="https://cdn.pixabay.com/photo/2014/04/03/09/57/zebra-309425_1280.png" alt="產品">
          </div>
          <p>Product Name</p>
          <span>NT$200</span>
          <button class="add_to_cart_button">ADD TO CART</button>
        </a>
      </div>
      <div class="main_products_intro">
        <a href="#">
          <div class="main_products_intro_img">
            <img src="https://cdn.pixabay.com/photo/2016/05/13/19/30/girl-with-a-cloth-1390693_1280.jpg" alt="產品">
          </div>
          <p>Product Name</p>
          <span>NT$200</span>
          <button class="add_to_cart_button">ADD TO CART</button>
        </a>
      </div>
      <div class="main_products_intro">
        <a href="#">
          <div class="main_products_intro_img">
            <img src="https://cdn.pixabay.com/photo/2014/04/03/09/57/zebra-309425_1280.png" alt="產品">
          </div>
          <p>Product Name</p>
          <span>NT$200</span>
          <button class="add_to_cart_button">ADD TO CART</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>
