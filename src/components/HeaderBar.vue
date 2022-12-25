<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { ElNotification, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import mitt from "../bus";

const router = useRouter();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const logout = () => {
  ElMessageBox.confirm("确认要退出登录吗？", "退出登录", {
    confirmButtonText: "退出登录",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then((action) => {
      if (action == "confirm") {
        console.log("ok");
        window.localStorage.removeItem("token");
        changeShowAuth();
        ElNotification({
          title: "退出登录",
          message: "您已退出登录",
          type: "success",
        });
        router.replace("/");
      }
    })
    .catch((action) => {
      if (action == "cancel") {
        ElNotification({
          title: "退出登录",
          message: "您已取消退出登录",
          type: "info",
        });
      }
    });
};

const toGithub = (url: any) => {
  window.open(url, "_blank");
};

const showAuth = ref();
const changeShowAuth = () => {
  const token = window.localStorage.getItem("token");
  token ? (showAuth.value = false) : (showAuth.value = true);
  console.log(showAuth);
};
changeShowAuth();

onMounted(() => {
  mitt.on("changeAuthShow", (e: any) => {
    showAuth.value = !showAuth.value;
  });
});
</script>

<template>
  <el-menu
    :default-active="$route.name"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">GenshinHelper</el-menu-item>
    <el-menu-item index="Home" @click="$router.push('/')">主页</el-menu-item>
    <el-menu-item index="DailyNote" @click="$router.push('/user/dailyNote')"
      >实时便笺</el-menu-item
    >
    <div class="flex-grow"></div>

    <!-- 未登录 -->
    <el-menu-item v-if="showAuth" index="Auth" @click="$router.push('/auth')"
      >登录/注册</el-menu-item
    >
    <!-- 已登录 -->
    <el-sub-menu v-else index="User">
      <template #title>
        <div style="display: flex">
          <el-avatar
            :size="24"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </div>
      </template>
      <el-menu-item index="User" @click="$router.push('/user')"
        >个人中心</el-menu-item
      >
      <el-divider :style="{ margin: 0 }" />
      <el-menu-item index="2-4-2">
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
    </el-sub-menu>
    <el-menu-item index="3" @click="toggleDark()">
      <div>
        <el-icon size="24" v-if="!isDark"><Sunny /></el-icon>
        <el-icon size="24" v-else><Moon /></el-icon>
      </div>
    </el-menu-item>
    <el-menu-item
      index="4"
      @click="
        toGithub('https://github.com/bitzh-2022-2023-Web-Lab/lastProject')
      "
    >
      <div>
        <i class="el-icon" style="font-size: 24px"
          ><svg
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
          >
            <path
              fill="currentColor"
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
            ></path>
          </svg>
        </i>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

::v-deep(i.el-icon.el-sub-menu__icon-arrow) {
  display: none;
}
</style>
