<script lang="ts" setup>
import { UserFilled } from "@element-plus/icons-vue";
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5233";

const form = reactive<{
  userName: String;
  sex: number;
  sign: String;
}>({
  userName: "",
  sex: 3,
  sign: "",
});

const loading = ref(false);
const getUserInfo = () => {
  loading.value = true;
  axios
    .post(`${API_BASE_URL}/getUserInfo`, null, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
    .then((res) => {
      form.userName = res.data.data.userName;
      form.sign = res.data.data.sign;
      form.sex = res.data.data.sex;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};

onMounted(() => {
  getUserInfo()
})

const onSubmit = () => {
  console.log("submit!");
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px; display: flex">编辑资料</span>
      </div>
    </template>
    <div>
      <el-avatar :size="75" :icon="UserFilled" />
      <br />
      <br />
      <el-tooltip
        class="box-item"
        content="暂时不能修改头像"
        placement="bottom"
      >
        <el-button>修改头像</el-button>
      </el-tooltip>
    </div>
    <br /><br />
    <el-form :model="form" label-width="120px">
      <el-form-item label="昵称">
        <el-input v-model="form.userName" maxlength="20" show-word-limit />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input
          v-model="form.sign"
          type="textarea"
          maxlength="50"
          show-word-limit
          placeholder="系统原装签名，送给每一位小可爱~"
        />
      </el-form-item>
      <el-form-item>
        <el-button style="margin: auto" type="primary" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
