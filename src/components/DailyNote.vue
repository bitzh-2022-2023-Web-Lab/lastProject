<script lang="ts" setup>
import { ref } from "vue";

interface DailyNoteData {
  // 原粹树脂 数量
  current_resin: number;
  // 原粹树脂 最大值
  max_resin: number;
  // 原粹树脂 回复时间
  resin_recovery_time: string;
  // 每日委托 已完成数量
  finished_task_num: number;
  // 每日委托 总数量
  total_task_num: number;
  //每日委托奖励是否领取？ 奖励已领取：今日完成委托数量不足
  is_extra_task_reward_received: boolean;
  //值得铭记的强敌-剩余消耗减半次数
  remain_resin_discount_num: number;
  //值得铭记的强敌-总共消耗减半次数
  resin_discount_num_limit: number;
  //探索派遣-数量
  current_expedition_num: number;
  //探索派遣-最大数量
  max_expedition_num: number;
  //探索派遣-详情
  expeditions: any;
  //   [
  //     {
  //       //探索派遣-角色头像
  //       avatar_side_icon: string;
  //       //探索派遣-角色名称
  //       status: string;
  //       //探索派遣-剩余时间
  //       remained_time: string;
  //     }
  //   ];
  //洞天财瓮-洞天宝钱：当前数量
  current_home_coin: number;
  //洞天财瓮-洞天宝钱：最大数量
  max_home_coin: number;
  //洞天财瓮-洞天宝钱：恢复时间
  home_coin_recovery_time: String;
  calendar_url: String;
  //参量质变仪
  transformer: {
    //参量质变仪-是否已解锁？
    obtained: boolean;
    //参量质变仪-回复时间： 天，小时，分钟，秒，是否可使用
    recovery_time: {
      Day: number;
      Hour: number;
      Minute: number;
      Second: number;
      reached: boolean;
    };
    wiki: String;
  };
}
const dailyNoteData = ref<DailyNoteData>({
  current_resin: 140,
  max_resin: 160,
  resin_recovery_time: "50000",
  finished_task_num: 1,
  total_task_num: 4,
  is_extra_task_reward_received: false,
  remain_resin_discount_num: 3,
  resin_discount_num_limit: 3,
  current_expedition_num: 5,
  max_expedition_num: 5,
  expeditions: [
    {
      avatar_side_icon:
        "https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Chongyun.png",
      status: "Ongoing",
      remained_time: "46919",
    },
    {
      avatar_side_icon:
        "https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Fischl.png",
      status: "Ongoing",
      remained_time: "46919",
    },
    {
      avatar_side_icon:
        "https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Bennett.png",
      status: "Ongoing",
      remained_time: "46919",
    },
    {
      avatar_side_icon:
        "https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Sara.png",
      status: "Ongoing",
      remained_time: "46919",
    },
    {
      avatar_side_icon:
        "https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Keqing.png",
      status: "Ongoing",
      remained_time: "46919",
    },
  ],
  current_home_coin: 1800,
  max_home_coin: 2400,
  home_coin_recovery_time: "69885",
  calendar_url: "",
  transformer: {
    obtained: true,
    recovery_time: { Day: 2, Hour: 3, Minute: 1, Second: 0, reached: false },
    wiki: "https://bbs.mihoyo.com/ys/obc/content/1562/detail?bbs_presentation_style=no_header",
  },
});

// TODO: Get dailyNote from API

const countTime = (time: any) => {
  const nowDate = new Date();
  const now = Math.floor(nowDate.getTime() / 1000);
  const thatTime = now + Number(time);
  const thatDate = new Date(thatTime * 1000);
  const res =
    `${thatDate.getFullYear()} 年 ` +
    `${
      thatDate.getMonth() + 1 < 10
        ? "0" + (thatDate.getMonth() + 1)
        : thatDate.getMonth() + 1
    } 月 ` +
    `${
      thatDate.getDay() < 10 ? "0" + thatDate.getDay() : thatDate.getDay()
    } 日 ` +
    `${
      thatDate.getHours() < 10 ? "0" + thatDate.getHours() : thatDate.getHours()
    }:` +
    `${
      thatDate.getMinutes() < 10
        ? "0" + thatDate.getMinutes()
        : thatDate.getMinutes()
    }`;
  return res;
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px; display: flex">实时便笺</span>
      </div>
    </template>
    <div class="flex" style="flex-direction: column">
      <div class="flex">
        <span>原粹树脂：</span>
        <span>{{
          dailyNoteData.current_resin + " / " + dailyNoteData.max_resin
        }}</span>
      </div>
      <div class="flex">
        <span
          >将在
          {{ countTime(dailyNoteData.resin_recovery_time) }} 完全恢复</span
        >
      </div>
    </div>
    <br />
    <div class="flex">
      <span>每日委托：</span>
      <span>{{
        dailyNoteData.finished_task_num + " / " + dailyNoteData.total_task_num
      }}</span>
    </div>
    <br />
    <div class="flex">
      <span>值得铭记的强敌：</span>
      <span>{{
        dailyNoteData.remain_resin_discount_num +
        " / " +
        dailyNoteData.resin_discount_num_limit
      }}</span>
    </div>
    <br />
    <div class="flex" style="flex-direction: column; justify-content: start">
      <div class="flex">
        <span>洞天宝钱：</span>
        <span>{{
          dailyNoteData.current_home_coin + " / " + dailyNoteData.max_home_coin
        }}</span>
      </div>
      <div class="flex">
        <span
          >将在
          {{ countTime(dailyNoteData.home_coin_recovery_time) }} 完全恢复</span
        >
      </div>
    </div>
    <br />
    <div class="flex">
      <span>值得铭记的强敌：</span>
      <span>{{
        dailyNoteData.remain_resin_discount_num +
        " / " +
        dailyNoteData.resin_discount_num_limit
      }}</span>
    </div>
    <br />
    <div class="flex" style="flex-direction: column">
      <div class="flex">
        <span>探索派遣：</span>
        <span>{{
          dailyNoteData.current_expedition_num +
          "/" +
          dailyNoteData.max_expedition_num
        }}</span>
      </div>
      <div class="flex" style="flex-direction: column">
        <div
          class="flex"
          v-for="item in dailyNoteData.expeditions"
          style="align-items: center"
        >
          <el-image
            style="height: 50px; width: 50px"
            :src="item.avatar_side_icon"
            fit="fill"
          />
          <span style="padding-top: 15px"
            >将在 {{ countTime(item.remained_time) }} 完成探索</span
          >
        </div>
      </div>
    </div>
    <br />
    <div class="flex">
      <span>参量质变仪：</span>
      <span>{{
        dailyNoteData.transformer.obtained
          ? `${
              dailyNoteData.transformer.recovery_time.reached
                ? `可使用`
                : `${dailyNoteData.transformer.recovery_time.Day} 天 ` +
                  `${dailyNoteData.transformer.recovery_time.Hour} 小时 ` +
                  `${dailyNoteData.transformer.recovery_time.Minute} 分钟后可用`
            }`
          : `未解锁`
      }}</span>
    </div>
  </el-card>
</template>

<style scoped>
.flex {
  display: flex;
}
</style>
