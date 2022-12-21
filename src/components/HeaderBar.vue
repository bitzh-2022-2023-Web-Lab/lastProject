<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <el-switch
    v-model="isDark"
    inactive-icon="Sunny"
    active-icon="Moon"
  />
</template>