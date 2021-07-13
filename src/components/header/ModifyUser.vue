<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-13 10:39:55
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-13 18:02:16
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
          <el-button type="primary">确定</el-button>
          <el-button @click="closeUserInfo">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { validateNull, validateConfirmPassword } from '../../utils/utils'

export default {
  data() {
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
            validator: validateConfirmPassword.bind(this, this.userInfo.newPassword),
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
  },
}
</script>