<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 17:52:07
-->

<template>
  <div class="tags">
    <ul class="tags-ul">
      <li class="tags-li" v-for="(item, index) in tagList" :key="index">
        {{ item.title }}
        <i class="el-icon-close"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tagList: (state) => state.tags.tagList,
    }),
  },
}
</script>

<style scoped>
.tags-ul {
  width: 100%;
  height: 100%;
}
.tags-li {
  display: inline;
  text-decoration: none;
  border: 1px solid #e9eaec;
  border-radius: 3px;
  color: #696969;
  margin: 3px 5px 2px 3px;
  padding: 0 5px 0 12px;
  cursor: pointer;
}
</style>