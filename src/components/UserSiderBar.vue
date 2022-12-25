<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue";
import { ElMessageBox, ElNotification } from "element-plus";

const logout = () => {
  ElMessageBox.confirm("确认要退出登录吗？", "退出登录", {
    confirmButtonText: "退出登录",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // TODO: Logout
    })
    .catch(() => {
      ElNotification({
        title: "退出登录",
        message: "您已取消退出登录",
        type: "info",
      });
    });
};
</script>

<template>
  <el-card class="box-card">
    <div style="width: 180px">
      <div style="font-size: 20px; font-weight: bold; height: 35px">
        个人中心
      </div>
      <el-divider :style="{ margin: '5px 0' }" />
    </div>
    <div>
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="$router.push('/user/dailyNote')">
          <el-icon><Star /></el-icon>
          <span>实时便笺</span>
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/user/setting')">
          <el-icon><Setting /></el-icon>
          <span>Helper设置</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('/user/changePwd')">
          <el-icon><EditPen /></el-icon>
          <span>更改密码</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push('/user/edit')">
          <el-icon><User /></el-icon>
          <span>编辑资料</span>
        </el-menu-item>

        <el-divider :style="{ margin: '5px 0' }" />
        <el-menu-item index="5">
          <div style="display: flex; flex-direction: row" @click="logout()">
            <div style="width: 16px; display: flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
              >
                <path
                  d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M384 176l80 80l-80 80"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M191 256h273"
                ></path>
              </svg>
            </div>
            <div>退出登录</div>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </el-card>
</template>

<style scoped>
.el-menu {
  border: none;
}

.siderBar {
  border: solid 1px var(--el-menu-border-color);
}
</style>
