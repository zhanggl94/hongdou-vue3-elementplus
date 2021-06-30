<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:23
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-30 18:03:13
-->

<template>
  <div>
    <el-menu
      class="sidebar-el-menu"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      :collapse="collapse"
      :default-active="onRoutes"
      router
    >
      <template v-for="item in sidebarData">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <span>{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      sidebarData: [
        {
          icon:'el-icon-truck',
          index:'carbill',
          title:'汽车账单',
          subs:[
            {
              index:'billtype',
              title:'账单类型',
            },
          ],
        },
        {
          icon: 'el-icon-warning-outline',
          index: 'error',
          title: '错误处理',
          subs: [
            {
              index: 'permission',
              title: '权限测试',
            },
            {
              index: '404',
              title: '404',
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState(['collapse']),
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
  },
}
</script>

<style>
.sidebar {
  display: block;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>