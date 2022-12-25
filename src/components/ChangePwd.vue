<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const ruleFormRef = ref<FormInstance>();

const form = reactive({
  old: "",
  new: "",
  confirm: "",
});

const checkPwd = (rule: any, value: any, callback: any) => {
  if (!value) {
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
    return;
  }
  if (value != form.new) {
    callback(new Error("两次密码输入不一致"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  old: [
    {
      required: true,
      message: "请输入原密码",
    },
  ],
  new: [
    {
      required: true,
      message: "新密码不能为空",
    },
    {
      validator: checkPwd,
      trigger: "blur",
    },
  ],
  confirm: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      validator: checkPwdAgain,
      trigger: "blur",
    },
  ],
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      // TODO: 验证并修改密码
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="font-size: 20px; display: flex">修改密码</span>
      </div>
    </template>

    <el-form
      :model="form"
      :rules="rules"
      ref="ruleFormRef"
      label-width="120px"
      status-icon
    >
      <el-form-item label="原密码" prop="old">
        <el-input v-model="form.old" />
      </el-form-item>

      <el-form-item label="新密码" prop="new" required>
        <el-input v-model="form.new" />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirm" required>
        <el-input v-model="form.confirm" />
      </el-form-item>

      <el-form-item>
        <el-button
          style="margin: auto"
          type="primary"
          @click="onSubmit(ruleFormRef)"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
