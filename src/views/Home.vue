<!--
 * @Descripttion: views Home
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-30 18:02:38
-->

<template>
  <div class="home">
    <v-header></v-header>
    <div class="middle">
      <div class="sidebar" :class="{ 'sidebar-collapse': collapse }">
        <v-sidebar></v-sidebar>
      </div>
      <div class="content-box flex-weight1">
        <v-tags></v-tags>
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagList">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vHeader from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'
import vTags from '../components/Tags'

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  computed: {
    ...mapState({
      tagList: (state) => state.tags.tagList.map((item) => item.name),
      collapse: (state) => state.collapse,
    }),
  },
}
</script>


<style scoped>
.home {
  height: 100%;
}
.middle {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
}
.sidebar {
  width: 250px;
}
.sidebar-collapse {
  width: 65px;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
.flex-weight1 {
  flex-grow: 1;
}
</style>