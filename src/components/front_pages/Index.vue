<template>
  <div>
    <front-navbar/>
    <div class="index_header">
      <header>
        <div class="container">
          <h1>Where to we go next?</h1>
        </div>
      </header>   
    </div>
    <section id="index_about">
      <div class="container">
        <h2>世界這麼大，下一站，你想去哪？</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </section>       
    <main class="index_main">
      <h3 class="index_main_title">商品推薦</h3>
      <carousel
        :autoplay="true"
        :autoplayHoverPause="true"
        :perPageCustom="[
          [480, 1],
          [768, 3],
          [1024, 4],
        ]"
      >
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
        <slide>
          <a href="#">
            <img
              src="https://cdn.shopify.com/s/files/1/1234/1342/products/Gifts_HT_Snowstorm_Survival_Guide_2020_80425_5000x.jpg?v=1606497109"
              alt="彩繪枕頭"
              style="width: 200px; height: 200px"
            />
          </a>
        </slide>
      </carousel>
      <hr>
      <h3 class="index_main_title">產品類別</h3>
      <div class="index_main_category">
        <a href="#"><div class="biggest_up"><h4>背包</h4></div></a>
        <a href="#"><div class="small_down"><h4>配件</h4></div></a>
        <a href="#"><div class="small_down"><h4>配件</h4></div></a>
        <a href="#"><div class="small_down"><h4>配件</h4></div></a>
      </div>
    </main>
    <section id="index_album">
        <carousel
          :autoplay="true"
          :autoplayHoverPause="true"
          :perPageCustom="[
            [480, 1],
            [768, 3],
            [1024, 5],
          ]"
          :paginationEnabled="false"
          :speed="100000"
          :loop="true"
        >
          <slide v-for="(item,index) in album" :key="index">
            <a href="#">
              <div width='10px;'>
                <img
                  :src="item.backgroundUrl"
                 width="100%;"
                />
              </div>
            </a>
          </slide>
        </carousel>
    </section>
    <front-footer/>
  </div>
</template>

<script>
import $ from "jquery";
import frontNavbar from '../front_Navbar.vue';
import frontFooter from '../front_Footer.vue';

export default {
  components: {frontNavbar , frontFooter } ,
  data() {
    return {
      album:[
        {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
        {
          name: 'loveIsland',
          backgroundUrl:'https://cdn.pixabay.com/photo/2018/07/16/16/08/island-3542290_1280.jpg'
        },
        {
          name: 'europe',
          backgroundUrl:'https://cdn.pixabay.com/photo/2021/08/03/11/48/canal-6519196_1280.jpg'
        },
        {
          name: 'korea',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg'
        },
        {
          name: 'india',
          backgroundUrl:'https://cdn.pixabay.com/photo/2019/03/12/20/19/india-4051753_1280.jpg'
        },
                {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
        {
          name: 'loveIsland',
          backgroundUrl:'https://cdn.pixabay.com/photo/2018/07/16/16/08/island-3542290_1280.jpg'
        },
        {
          name: 'europe',
          backgroundUrl:'https://cdn.pixabay.com/photo/2021/08/03/11/48/canal-6519196_1280.jpg'
        },
        {
          name: 'korea',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg'
        },
        {
          name: 'india',
          backgroundUrl:'https://cdn.pixabay.com/photo/2019/03/12/20/19/india-4051753_1280.jpg'
        },
                {
          name: 'girlOcean',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/03/16/06/36/wait-for-a-call-4935894_1280.jpg'
        },
        {
          name: 'manBack',
          backgroundUrl:'https://cdn.pixabay.com/photo/2020/05/30/12/58/iran-5238845_1280.jpg'
        },
        {
          name: 'loveIsland',
          backgroundUrl:'https://cdn.pixabay.com/photo/2018/07/16/16/08/island-3542290_1280.jpg'
        },
      ],
    }
  },

  mounted() {
    var header = $("header");
    var range = 143.993;

    $(window).on("scroll", function () {
      var scrollTop = $(this).scrollTop(),
        height = header.outerHeight(),
        offset = height / 2,
        calc = 1 - (scrollTop - offset + range) / range;

      header.css({ opacity: calc });

      if (calc > "1") {
        header.css({ opacity: 1 });
      } else if (calc < "0") {
        header.css({ opacity: 0 });
      }
    });
  },
};
</script>