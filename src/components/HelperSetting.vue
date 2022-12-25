<script lang="ts" setup>
import { reactive } from "vue";

const form = reactive({
  resin_warning: false,
  warn_resin: 145,
  home_coin_warning: false,
  warn_home_coin: 1200,
  transformer_warning: false,
});

// TODO: Get form items from API


const onSubmit = async () => {
  console.log("submit!");
  // TODO: 保存到服务器
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px; display: flex">Helper设置</span>
      </div>
    </template>

    <el-form
      :model="form"
      label-width="auto"
      status-icon
    >
      <el-form-item label="树脂提醒">
        <el-switch
          v-model="form.resin_warning"
          active-text="开启"
          inactive-text="关闭"
        />
      </el-form-item>

      <el-form-item v-if="form.resin_warning" label="树脂提醒阈值">
        <el-select v-model="form.warn_resin" :placeholder="form.warn_resin">
          <el-option
            v-for="item in [120, 125, 130, 135, 140, 145, 150, 155]"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="洞天宝钱提醒">
        <el-switch
          v-model="form.home_coin_warning"
          active-text="开启"
          inactive-text="关闭"
        />
      </el-form-item>

      <el-form-item v-if="form.home_coin_warning" label="洞天宝钱提醒阈值">
        <el-select
          v-model="form.warn_home_coin"
          :placeholder="form.warn_home_coin"
        >
          <el-option
            v-for="item in [1200, 1500, 1800, 2000, 2100, 2200, 2300]"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="探索派遣提醒">
        <el-switch
          v-model="form.transformer_warning"
          active-text="开启"
          inactive-text="关闭"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          style="margin: auto"
          type="primary"
          @click="onSubmit()"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
