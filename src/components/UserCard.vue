<script lang="ts" setup>
import { UserFilled } from "@element-plus/icons-vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const API_BASE_URL = "http://127.0.0.1:5233";

const userInfo = ref<{
  userName: String;
  avatar: String;
  phone: String;
  userID: String;
  sign: String;
  sex: number;
}>();

const loading = ref(false);
const getUserInfo = () => {
  loading.value = true
  axios
    .post(`${API_BASE_URL}/getUserInfo`, null, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
    .then((res) => {
      userInfo.value = res.data.data
      loading.value = false
    })
    .catch((err) => {
      console.log(err);
      loading.value = false
    });
};

onMounted( () => {
  getUserInfo()
})
</script>

<template>
  <el-card v-loading="loading" class="box-card">
    <div style="display: flex; flex-direction: row">
      <div class="avatar">
        <el-avatar :size="75" :icon="UserFilled" />
      </div>
      <div class="userInfoList">
        <div style="font-weight: bold; display: flex">
          {{ userInfo?.userName }}
        </div>
        <div style="color: gray; font-size: 12px; display: flex">
          用户ID：{{ userInfo?.userID }}
        </div>
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <div style="display: flex">
            <el-icon
              size="large"
              v-if="userInfo?.sex == 0"
              :style="{ color: 'blue' }"
              ><Male
            /></el-icon>
            <el-icon
              size="large"
              v-if="userInfo?.sex == 1"
              :style="{ color: 'pink' }"
              ><Female
            /></el-icon>
            <el-icon size="large" v-if="userInfo?.sex == 2"><Lock /></el-icon>
          </div>
          <span style="font-size: 16px">{{ userInfo?.sign }}</span>
        </div>
      </div>
      <div style="flex: 1"></div>
      <div>
        <el-button type="primary" @click="$router.push('/user/edit')">
          <el-icon><Edit /></el-icon>
          <span>编辑</span>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.avatar {
  margin: 10px;
}

.userInfoList {
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>
