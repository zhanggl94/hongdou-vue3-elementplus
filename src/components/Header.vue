<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-21 16:53:53
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-22 15:57:28
-->

<template>
  <div class="header">
    <div class="collapse-btn" @click="changeCollapse">
      <i v-if="collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="title">
      <span>账单</span>
    </div>
    <div class="user">
      <div class="user-col bell">
        <el-tooltip
          effect="dark"
          :content="
            unReadMessageList.length
              ? `有${unReadMessageList.length}条消息`
              : '消息中心'
          "
          placement="bottom"
        >
          <router-link class="bell-link" to="/message">
            <i class="el-icon-bell"></i>
          </router-link>
        </el-tooltip>
        <span class="badge" v-if="unReadMessageList.length"></span>
      </div>
      <div class="user-col avatar"></div>
      <div class="user-col github">
        <v-git-hub></v-git-hub>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import vGitHub from './GitHubRepository.vue'

export default {
  components: {
    vGitHub,
  },
  computed: {
    ...mapState(['collapse']),
    ...mapGetters(['unReadMessageList']),
  },
  methods: {
    ...mapMutations(['changeCollapse']),
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 22px;
  color: #ffffff;
}
.collapse-btn {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
}
.header .user {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.header .user .user-col {
  margin-right: 20px;
}
.header .user .bell{
  position: relative;
}
.header .user .bell .bell-link {
  color: #ffffff;
}
.header .user .badge {
  width: 8px;
  height: 8px;
  position: absolute;
  right: 0px;
  top: -3px;
  background-color: #f56c6c;
  border-radius: 4px;
}
.header .user .github a {
  color: #ffffff;
}
</style>