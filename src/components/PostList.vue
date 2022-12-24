<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
const data = ref();
data.value = [
  {
    authorName: "用户1",
    authorAvatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    time: "22小时前",
    title: "【有奖活动】「风行迷踪」晒截图活动开启！",
    text: "姆，旅行者们好~今天丘丘人约酱酱一起玩「风行迷踪」~酱酱和丘丘人扮演的是游侠，丘丘萨满扮演的是猎手......",
    url: "https://www.miyoushe.com/ys/article/33177809",
    isFan: false,
    watch: "75w+",
    commentCount: 6000,
    like: "25w+"
  },
  {
    authorName: "用户2",
    authorAvatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    time: "22小时前",
    title: "「影寂天下人」祈愿：「一心净土·雷电将军(雷)」概率UP！",
    text: "活动期间，旅行者可以在活动祈愿中获得更多角色与武器，组建强大的队伍！",
    url: "https://www.miyoushe.com/ys/article/33140573",
    isFan: false,
    watch: "200w+",
    commentCount: 24000,
    like: "30w+"
  },
  {
    authorName: "用户3",
    authorAvatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    time: "22小时前",
    title: "「苍流踏花」祈愿：「磐祭叶守·神里绫人(水)」概率UP！",
    text: "活动期间，旅行者可以在活动祈愿中获得更多角色与武器，组建强大的队伍！",
    url: "https://www.miyoushe.com/ys/article/33140575",
    isFan: false,
    watch: "100w+",
    commentCount: 6000,
    like: "15w+"
  },
];

const star = (index: number) => {
    if(data.value[index].isFan){
        ElMessage.success("取消关注成功。")
    }else{
        ElMessage.success("关注成功！")
    }
    data.value[index].isFan = !data.value[index].isFan
}

const navigateToPost = (url: any) => {
    window.open(url, "_blank")
}
</script>

<template>
  <el-card class="box_card" v-for="(item, index) in data" :key="index" shadow="hover">
    <template #header>
      <div class="card_header">
        <div class="postAuthor">
          <el-avatar :size="25" :src="item.authorAvatar" style="margin: 0 5px;" />
          <span style="font-weight: bold; margin: 0 5px">{{
            item.authorName
          }}</span>
          <span style="color: gray; margin: 0 5px; font-size: 12px;"> {{ item.time }}</span>
        </div>
        <div class="btn-star">
          <el-button :type="item.isFan? 'info' : 'primary' " round @click="star(index)">{{ item.isFan? "取消关注" : "关注" }}</el-button>
        </div>
      </div>
    </template>
    <div class="card_body" @click="navigateToPost(item.url)">
        <div class="title">{{ item.title }}</div>
        <div class="text">{{ item.text }}</div>
    </div>
    <div class="card_bottom">
        <div style="display: flex; flex-direction: row;justify-content: end;color: gray;">
            <div class="watch"><el-icon><View /></el-icon>{{ item.watch }}</div>
            <div class="commentCount"><el-icon><ChatDotRound /></el-icon>{{ item.commentCount }}</div>
            <div class="like"><el-icon><Star /></el-icon>{{ item.like }}</div>
        </div>
    </div>
  </el-card>
</template>

<style scoped>
.box_card{
    margin: 10px 0;
}

.card_header {
  display: flex;
  justify-content: space-between;
}

.postAuthor {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card_body{
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.card_body:hover .title{
    color: #00c3ff;
}

.title{
    display: flex;
    font-size: 20px;
    font-weight: lighter;
}

.text{
    display: flex;
}

.watch,.commentCount,.like{
    margin: 0 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
}
</style>
