import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AuthPage from "../views/AuthPage.vue";
import UserPage from "../views/UserPage.vue";

import EditUserInfo from "../components/EditUserInfo.vue";
import ChangePwd from "../components/ChangePwd.vue";
import HelperSetting from "../components/HelperSetting.vue";
import DailyNote from "../components/DailyNote.vue";
import { ElMessage } from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "/user",
    name: "User",
    component: UserPage,
    children: [
      {
        path: "/user/edit",
        name: "EditUserInfo",
        component: EditUserInfo,
      },
      {
        path: "/user/changePwd",
        name: "ChangePwd",
        component: ChangePwd,
      },
      {
        path: "/user/setting",
        name: "HelperSetting",
        component: HelperSetting,
      },
      {
        path: "/user/dailyNote",
        name: "DailyNote",
        component: DailyNote,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  console.log(to.path);
  if (!(to.path == "/auth" || to.path == "/")) {
    if (!token) {
      ElMessage.error("请先登录。");
      await router.replace("/auth");
    }
  }
  next();
});

export default router;
