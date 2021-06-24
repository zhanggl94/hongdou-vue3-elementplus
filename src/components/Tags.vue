<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-24 17:57:26
-->

<template>
  <div class="tags" v-if="showTags">
    <ul class="tags-ul">
      <li
        class="tags-li"
        v-for="(item, index) in tagList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path">
          {{ item.title }}
        </router-link>
        <span class="tags-li-close">
          <i class="el-icon-close" @click="closeTag(index)"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tagMUTypes from '../store/modules/tags/mutation-types'

export default {
  computed: {
    ...mapState({
      tagList: (state) => state.tags.tagList,
    }),
    showTags() {
      return this.tagList.length > 0
    },
  },
  methods: {
    /**
     * @description: 根据路由添加tags
     * @param {*} route
     */
    setTag(route) {
      if (this.tagList.some((item) => item.path === route.fullPath)) {
        return
      } else {
        if (this.tagList.length > 8) {
          this.$store.commit(tagMUTypes.DELETE, { index: 0 })
        }
        this.$store.commit(tagMUTypes.SET, {
          name: route.name,
          title: route.meta.title,
          path: route.fullPath,
        })
      }
    },
    /**
     * @description: 关闭单个标签
     * @param {*} index 索引
     */
    closeTag(index) {
      const delTag = this.tagList[index]
      this.$store.commit(tagMUTypes.DELETE, { index })
      const newTag = this.tagList[index]
        ? this.tagList[index]
        : this.tagList[index - 1]
      if (newTag) {
        delTag.path === this.$route.fullPath && this.$router.push(newTag.path)
      } else {
        this.$router.push('/')
      }
    },
    /**
     * @description: 判断标签是否激活
     * @param {*} path 路由路径
     * @return {*} true:激活, false:未激活
     */
    isActive(path) {
      return path === this.$route.fullPath
    },
  },
  watch: {
    /**
     * @description: 监视路由，当路由发生变化时，更新tagList
     * @param {*} newRoute
     */
    $route(newRoute) {
      this.setTag(newRoute)
    },
  },
  created() {
    this.setTag(this.$route)
  },
}
</script>

<style scoped>
.tags-ul {
  width: 100%;
  height: 100%;
}
.tags-li {
  display: inline-block;
  text-decoration: none;
  border: 1px solid #e9eaec;
  border-radius: 3px;
  color: #666666;
  margin: 3px 5px 2px 3px;
  padding: 0 5px 0 12px;
  cursor: pointer;
  font-size: 12px;
  height: 23px;
  line-height: 23px;
}
.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #ffffff;
}
.tags-li a {
  text-decoration: none;
  /* color: #ffffff; */
}
.tags-li-close {
  margin-left: 3px;
}
</style>