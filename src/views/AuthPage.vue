<script lang="ts" setup>
import Login from "../components/login.vue";
import Register from "../components/register.vue";

import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs dark"  @tab-click="handleClick">
    <el-tab-pane label="登录" name="first">
        <Login></Login>
    </el-tab-pane>
    <el-tab-pane label="注册" name="second">
        <Register></Register>
    </el-tab-pane>
  </el-tabs>
</template>
