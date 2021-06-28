<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:23
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-28 17:57:19
-->

<template>
  <div>
    <el-menu
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
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
export default {
  data() {
    return {
      sidebarData: [
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
              index: 'error-404',
              title: '404',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style>
.sidebar {
  display: block;
  /* position: absolute; */
  left: 0;
  /* top: 70px; */
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
}
.sidebar > ul {
  height: 100%;
}
</style>