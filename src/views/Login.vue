<!--
 * @Descripttion: login
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-06-18 21:44:58
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-20 00:47:08
-->

<template>
  <div class="sign-container">
    <div class="sign-logo"></div>
    <div class="sign-form">
      <el-form ref="loginForm" :model="formInfo" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="formInfo.username" placeholder="username">
            <template #prepend>
              <el-tooltip effect="dark" content="用户名" placement="left">
                <el-button icon="el-icon-user"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formInfo.password">
            <template #prepend>
              <el-tooltip effect="dark" content="密码" placement="left">
                <el-button icon="el-icon-lock"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-from-item>
          <el-button type="primary" @click.prevent="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-from-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateUsername, validatePassword } from '../utils/utils'
import userMUTypes from '../store/modules/user/mutation-types'

export default {
  data() {
    return {
      formInfo: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit....')
          this.$store.commit(userMUTypes.SET_USERINFO, {
            username: this.formInfo.username,
          })
        } else {
          console.log('error submit!!')
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

<style scoped>
.sign-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sign-logo {
  height: 200px;
}
.sign-form {
  padding: 20px;
  margin: 20px;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
</style>
