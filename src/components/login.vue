<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  phone: "",
  pwd: "",
});

const rules = reactive<FormRules>({
    phone: [{
        required: true,
        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: "请输入正确的手机号"
    }],
    pwd: [{
        required: true,
        message: "请输入密码"
    }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
        // TODO：登录方法
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    :size="formSize"
    status-icon
  >
    <el-form-item label="账号" prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" />
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd" placeholder="请输入您的密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
