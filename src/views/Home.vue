<!--
 * @Descripttion: views Home
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 14:01:05
-->

<template>
  <div>
    <v-header></v-header>
    <div class="content-box">
      <v-sidebar></v-sidebar>
      <div class="container">
        <v-tags></v-tags>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'
import vTags from '../components/Tags'

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
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