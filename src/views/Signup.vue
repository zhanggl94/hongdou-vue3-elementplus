<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-12 14:59:12
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-14 11:00:37
-->
<template>
  <div class="sign-container">
    <div class="sign-header">
      <div>
        已有账号？去<router-link to="/signin">登录</router-link>
      </div>
      <div class="sign-github">
        <v-git-hub></v-git-hub>
      </div>
    </div>
    <div class="sign-form">
      <el-form ref="signupForm" :model="formInfo" :rules="rules" label-width="100px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formInfo.username" placeholder="username" @keydown.enter="submitForm('signupForm')">
            <!-- <template #prepend>
              <el-tooltip effect="dark" content="用户名" placement="left">
                <el-button icon="el-icon-user"></el-button>
              </el-tooltip>
            </template> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="formInfo.password" @keydown.enter="submitForm('signupForm')">
            <!-- <template #prepend>
              <el-tooltip effect="dark" content="密码" placement="left">
                <el-button icon="el-icon-lock"></el-button>
              </el-tooltip>
            </template> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input type="password" v-model="formInfo.confirmPassword" @keydown.enter="submitForm('signupForm')">
            <!-- <template #prepend>
              <el-tooltip effect="dark" content="再次输入密码" placement="left">
                <el-button icon="el-icon-lock"></el-button>
              </el-tooltip>
            </template> -->
          </el-input>
        </el-form-item>
        <el-from-item>
          <div class="sign-submit">
            <el-button type="primary" @click="submitForm('signupForm')">注册</el-button>
            <el-button @click="resetForm('signupForm')">重置</el-button>
          </div>
        </el-from-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userACTypes from '../store/modules/user/action-types'
import vGitHub from '../components/GitHubRepository.vue'
import { ElMessage } from 'element-plus'
import { validateNull } from '../utils/utils'

export default {
  components: {
    vGitHub,
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value.trim() === '') callback(new Error('请再次输入新密码'))
      else if (value !== this.formInfo.password)
        callback(new Error('两次输入密码不一致'))
      callback()
    }
    
    return {
      formInfo: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        username: [
          {
            validator: validateNull.bind(this, '请输入用户名'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: validateNull.bind(this, '请输入密码'),
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            validator: validateConfirmPassword,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const result = await this.$store.dispatch(
              userACTypes.SIGNUP,
              this.formInfo
            )
            if (result.data.isOk) {
              ElMessage.success('欢迎登录 ' + this.$store.state.user.username)
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect)
              } else {
                this.$router.push('/')
              }
            } else ElMessage.warning(result.data.message)
          } catch (err) {
            console.error(err)
          }
        } else {
          console.log('验证失败')
        }
      })
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
.sign-container .sign-header {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.sign-container .sign-header .sign-github {
  margin: 30px;
}
.sign-github a {
  font-size: 30px;
  color: #000000;
}
.sign-logo {
  height: 200px;
}
.sign-form {
  width: 350px;
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
</style>