<script lang="ts" setup>
import UserCard from "../components/UserCard.vue";
import UserSiderBar from "../components/UserSiderBar.vue";
</script>

<template>
  <br />
  <div style="display: flex; flex-direction: column">
    <div class="head"><UserCard></UserCard></div>
    <br />
    <div style="display: flex; flex-direction: row">
      <div class="siderBar" style="margin-right: 5px;"><UserSiderBar></UserSiderBar></div>
      <div style="flex: 1;margin-left: 5px;"><router-view /></div>
    </div>
  </div>
</template>
