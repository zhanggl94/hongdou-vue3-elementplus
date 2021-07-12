<!--
 * @Descripttion: signin
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-12 17:19:48
-->

<template>
  <div class="sign-container">
    <div class="sign-header">
      <div class="sign-github">
        <v-git-hub></v-git-hub>
      </div>
    </div>
    <div class="sign-form">
      <el-form ref="signinForm" :model="formInfo" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="formInfo.username" placeholder="username" @keydown.enter="submitForm('signinForm')">
            <template #prepend>
              <el-tooltip effect="dark" content="用户名" placement="left">
                <el-button icon="el-icon-user"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formInfo.password" @keydown.enter="submitForm('signinForm')">
            <template #prepend>
              <el-tooltip effect="dark" content="密码" placement="left">
                <el-button icon="el-icon-lock"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-from-item>
          <div class="sign-submit">
            <el-button type="primary" @click="submitForm('signinForm')">登录</el-button>
            <el-button @click="resetForm('signinForm')">重置</el-button>
          </div>
        </el-from-item>
      </el-form>
    </div>
    <div class='signup'>
      <div>
        没有账号？<router-link to='/signup'>注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import userACTypes from '../store/modules/user/action-types'
import vGitHub from '../components/GitHubRepository.vue'
import { ElMessage } from 'element-plus'

export default {
  components: {
    vGitHub,
  },
  data() {
    return {
      formInfo: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const result = await this.$store.dispatch(userACTypes.SIGNIN, {
              username: this.formInfo.username,
              password: this.formInfo.password,
            }) // 登录
            if (result?.data?.isOk) {
              ElMessage.success('欢迎登录 ' + this.$store.state.user.username)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
            } else {
              ElMessage.warning(result.data.message)
            }
          } catch (err) {
            console.error(err)
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style>
.sign-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sign-container .sign-header {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.sign-container .sign-header .sign-github {
  margin: 30px;
}
.sign-github svg {
  font-size: 30px;
  color: #000000;
}
.sign-logo {
  height: 200px;
}
.sign-form {
  width: 295px;
  padding: 20px;
  margin: 20px;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.sign-submit {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.signup {
  border: 1px solid #d1d5da;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  width: 295px;
  display: flex;
  justify-content: center;
}
</style>
