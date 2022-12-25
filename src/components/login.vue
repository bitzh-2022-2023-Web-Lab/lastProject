<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";
import mitt from '../bus'

const API_BASE_URL = "http://api.genshinhelper.zjlblog.site";

const router = useRouter()

const loading = ref(false)

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  phone: "",
  pwd: "",
});

const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的手机号",
    },
  ],
  pwd: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      const params = {
        phone: '+86' + ruleForm.phone,
        pwd: ruleForm.pwd
      }
      axios.post(`${API_BASE_URL}/login`,params).then( (res) => {
        window.localStorage.setItem('token',res.data.token)
        loading.value = false
        ElMessage.success("登陆成功。")
        mitt.emit('changeAuthShow', false)
        router.push('/')
      }).catch( (err) => {
        console.log(err)
        loading.value = false
        ElMessage.error("登录失败。")
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

    v-loading="loading"
    element-loading-text="登陆中..."
  >
    <el-form-item label="账号" prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" />
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="ruleForm.pwd" type="password" placeholder="请输入您的密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
