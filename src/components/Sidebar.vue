<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:23
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-25 17:57:31
-->

<template>
    <div>
        <el-menu default-active="1" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened>
            <template v-for="item in sidbarData">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                            <template v-for="subItem in item.subs">
                                <template v-if="subItem.subs">
                                    <el-submenu :index="subItem.index" :key="subItem.index">
                                        <template #title>{{ subItem.title }}</template>
                                        <el-menu-item v-for="(threeItem, i) in subItem.subs" :index="threeItem.index" :key="i">
                                            {{ threeItem.title }}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                                <template v-else>
                                    <el-submenu :index="subItem.index" :key="subItem.index">
                                        <span>{{ subItem.title }}</span>
                                    </el-submenu>
                                </template>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else> </template>
            </template>
            <!-- <el-submenu index="">
        <el-menu-item index=""></el-menu-item>
      </el-submenu>
      <el-menu-item index=""></el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidbarData: [
                {
                    icon: 'el-icon-warning-outline',
                    index: 'error',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: 'error-404',
                            title: '404'
                        }
                    ]
                },
                {}
            ]
        }
    }
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