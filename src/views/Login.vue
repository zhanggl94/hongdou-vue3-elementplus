<template>
  <div class="sign-container">
    <div class="sign-logo"></div>
    <div class="sign-form">
      <el-form ref="loginForm" :model="formInfo">
        <el-form-item prop="username">
          <el-input v-model="formInfo.userName" placeholder="username">
            <template #prepend>
              <el-tooltip effect="dark" content="用户名" placement="left">
                <el-button icon="el-icon-user"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="formInfo.password">
            <template #prepend>
              <el-tooltip effect="dark" content="密码" placement="left">
                <el-button icon="el-icon-lock"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-from-item>
          <el-button type="primary">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-from-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInfo: {
        userName: '',
        password: '',
      },
    }
  },
  methods: {
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