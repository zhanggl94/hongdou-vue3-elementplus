<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-13 10:39:55
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-15 17:50:26
-->
<template>
  <div>
    <el-dialog title="修改用户信息" v-model="dialogVisible" width="40%">
      <div class="form-box">
        <el-form ref="userInfoForm" :model="userInfo" label-width="100px" :rules="rules">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="userInfo.oldPassword" class="small-input"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="userInfo.newPassword" class="small-input"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmNewPassword">
            <el-input type="password" v-model="userInfo.confirmNewPassword" class="small-input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('userInfoForm')">确定</el-button>
          <el-button @click="closeUserInfo">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { validateNull } from '../../utils/utils'
import userACTypes from '../../store/modules/user/action-types'
import userMUTypes from '../../store/modules/user/mutation-types'

export default {
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value.trim() === '') callback(new Error('请再次输入新密码'))
      else if (value !== this.userInfo.newPassword)
        callback(new Error('两次输入密码不一致'))
      callback()
    }
    return {
      dialogVisible: false,
      userInfo: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      rules: {
        oldPassword: [
          {
            validator: validateNull.bind(this, '请输入旧密码'),
            trigger: 'blur',
          },
        ],
        newPassword: [
          {
            validator: validateNull.bind(this, '请输入新密码'),
            trigger: 'blur',
          },
        ],
        confirmNewPassword: [
          {
            validator: validateConfirmPassword,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    openUserInfo() {
      this.dialogVisible = true
    },
    closeUserInfo() {
      this.dialogVisible = false
    },
    submitForm(userInfoForm) {
      this.$refs[userInfoForm].validate(async (valid) => {
        if (valid) {
          try {
            const result = await this.$store.dispatch(userACTypes.EDIT, {
              ...this.userInfo,
              id: this.$store.state.user.id,
              username: this.$store.state.user.username,
            })
            if (result.data.isOk) {
              ElMessage.success('密码修改成功，请重新登录')
              this.$store.commit(userMUTypes.CLEAR_USERINFO)
              this.$router.push('/signin')
            } else {
              ElMessage.warning(result.data.message)
            }
          } catch (err) {
            console.error(err)
          }
        } else {
          ElMessage.warning('验证失败')
        }
      })
    },
    clearForm() {
      
    },
  },
  created() {
    this.$refs['userInfoForm'].resetFields()
    // this.clearForm()
  },
}
</script>