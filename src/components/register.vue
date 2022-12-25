<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import axios from "axios";

const API_BASE_URL = "http://api.genshinhelper.zjlblog.site";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  userName: "",
  phone: "",
  birthYear: "",
  pwd: "",
  second_pwd: "",
});

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请选择您的出生年份"));
    return;
  }
  const birthYear = new Date(value).getFullYear();
  const thisYeaer = new Date().getFullYear();
  if (birthYear > thisYeaer) {
    callback(new Error("请选择正确的日期"));
  } else if (thisYeaer - birthYear < 12) {
    callback(new Error("注册需要年满12周岁,请您停止注册。"));
  } else {
    callback();
  }
};

const checkPwd = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("密码不能为空"));
    return;
  }
  const LITTER = /^(?=.*[A-Z])[A-Za-z0-9]{8,16}$/;
  const litter = /^(?=.*[a-z])[A-Za-z0-9]{8,16}$/;
  const number = /^(?=.*[0-9])[A-Za-z0-9]{8,16}$/;
  const chinese = /(?=.*[\u4e00-\u9fa5])/;
  if (value.length < 8 || value.length > 16) {
    callback(new Error("密码需为8~16位"));
  } else if (chinese.test(value)) {
    callback(new Error("密码不能包含中文"));
  } else {
    if (!LITTER.test(value)) {
      callback(new Error("密码至少包含一个大写字母"));
    } else if (!litter.test(value)) {
      callback(new Error("密码至少包含一个小写字母"));
    } else if (!number.test(value)) {
      callback(new Error("密码至少包含一个数字"));
    } else {
      callback();
    }
  }
};

const checkPwdAgain = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请再次输入密码"));
    return;
  }
  if (value != ruleForm.pwd) {
    callback(new Error("两次密码输入不一致"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  userName: [
    {
      required: true,
      message: "用户名不能为空哦~",
    },
    {
      min: 2,
      max: 10,
      message: "用户名的长度只能在2~10之内哦~",
    },
  ],
  phone: [
    {
      required: true,
      message: "手机号不能为空哦~",
    },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的手机号",
    },
  ],
  birthYear: [
    {
      validator: checkAge,
      trigger: "blur",
    },
  ],
  pwd: [
    {
      validator: checkPwd,
      trigger: "blur",
    },
  ],
  second_pwd: [
    {
      validator: checkPwdAgain,
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const params = {
        phone: '+86' + ruleForm.phone,
        userName: ruleForm.userName,
        birthday: ruleForm.birthYear,
        pwd: ruleForm.pwd
      }
      axios.post(`${API_BASE_URL}/register`, params).then(() => {
        ElNotification.success("注册成功！，可以前往登录了。")
        ruleFormRef.value?.resetFields()
      }).catch( (err) => {
        ElNotification.error("注册失败，请稍后再试。")
      })
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
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="ruleForm.userName" placeholder="取一个昵称吧" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号码" />
    </el-form-item>
    <el-form-item label="出生年份" prop="birthYear" required>
      <el-date-picker
        v-model="ruleForm.birthYear"
        type="year"
        placeholder="请选择您的出生年份"
      />
    </el-form-item>
    <el-form-item label="密码" prop="pwd" required>
      <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入您的密码"></el-input>
    </el-form-item>
    <el-form-item label="再次输入密码" prop="second_pwd" required>
      <el-input
        v-model="ruleForm.second_pwd"
        type="password"
        placeholder="请确认您的密码"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        注册
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
.el-input__validateIcon {
  color: green;
}
</style>
