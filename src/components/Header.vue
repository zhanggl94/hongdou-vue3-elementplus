<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-21 16:53:53
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-30 17:07:41
-->

<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="changeCollapse">
      <i v-if="collapse" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <div class="title">
      <span>账单</span>
    </div>
    <div class="user">
      <!-- 消息中心 -->
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
      <!-- 用户头像 -->
      <div class="avatar">
        <img src="../assets/img/img.jpg" />
      </div>
      <!-- 用户下拉菜单 -->
      <div class="user-col">
        <el-dropdown trigger="click" @command="handleUserCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="user-col github">
        <v-git-hub></v-git-hub>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import userMUTypes from '../store/modules/user/mutation-types'
import vGitHub from './GitHubRepository.vue'

export default {
  components: {
    vGitHub,
  },
  data() {
    return {
      // username: this.$store.state.user.username,
      username: localStorage.getItem('username'),
    }
  },
  computed: {
    ...mapState(['collapse']),
    ...mapGetters(['unReadMessageList']),
  },
  methods: {
    ...mapMutations(['changeCollapse']),
    handleUserCommand(command) {
      if (command === 'logout') {
        this.$store.commit(userMUTypes.CLEAR_USERINFO)
        this.$router.push('/signin')
      }
    },
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
.header .user .bell {
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
.header .user .avatar {
  color: #ffffff;
}
.header .user .avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header .user .user-name {
  margin-left: 20px;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
.header .user .github a {
  color: #ffffff;
  font-size: 30px;
}
</style>