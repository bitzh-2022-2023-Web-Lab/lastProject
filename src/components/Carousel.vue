<script lang="ts" setup>
import { ref } from "vue";
import pho1 from "../assets/Carousel/1.jpg";
import pho2 from "../assets/Carousel/2.jpg";
import pho3 from "../assets/Carousel/3.jpg";
import pho4 from "../assets/Carousel/4.jpg";
import pho5 from "../assets/Carousel/5.jpg";
const data = ref();
data.value = [
  {
    msg: "风行迷踪",
    url: "https://www.miyoushe.com/ys/article/33177809",
    image: pho1,
  },
  {
    msg: "影寂天下人",
    url: "https://www.miyoushe.com/ys/article/33140573",
    image: pho2,
  },
  {
    msg: "苍流踏花",
    url: "https://www.miyoushe.com/ys/article/33140575",
    image: pho3,
  },
  {
    msg: "六入尽明，诸相皆无",
    url: "https://www.miyoushe.com/ys/article/33140934",
    image: pho4,
  },
  {
    msg: "百鬼戏话",
    url: "https://webstatic.mihoyo.com/ys/event/e20221221novel-mf6wnm/index.html",
    image: pho5,
  },
];

const openWeb = (url: any) => {
    window.open(url, "_blank")
};
</script>

<template>
  <el-carousel :interval="4000" type="card" arrow="always" :pause-on-hover="false" >
    <el-carousel-item v-for="(item, index) in data" :key="index" @click="openWeb(item.url)">
      <el-image :src="item.image" fit="fill" />
    </el-carousel-item>
  </el-carousel>
</template>
