<!--
 * @Descripttion: views Home
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-22 15:25:49
-->

<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <div></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import vHeader from '../components/Header.vue'
export default {
  components: {
    vHeader,
  },
}
</script>


<style scoped>
.home {
  background-color: #f6f6f6;
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; */
}
</style>