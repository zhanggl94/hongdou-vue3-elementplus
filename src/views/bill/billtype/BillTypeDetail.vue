<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-06 15:55:10
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-18 07:23:11
-->
<template>
  <div class="form-box">
    <el-dialog title="账单类型详情" v-model="dialogVisible" width="40%">
      <el-form label-width="70px" label-position="right">
        <el-form-item label="类型">
          <el-input type="input" v-model="form.type" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="form.note" class="large-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="openDialog">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  props: {
    billTypeInfo: {
      type: Object,
      required: false
    }
  },
  setup(props, context) {
    const state = reactive({
      billTpeInfo: ref(props.billTypeInfo),
      dialogVisible: false
    })
    const openDialog = () => {
      this.state.dialogVisible = true
    }
  }
})
</script>