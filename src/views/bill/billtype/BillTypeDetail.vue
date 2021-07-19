<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-06 15:55:10
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-19 17:10:22
-->
<template>
  <div class="form-box">
    <el-dialog title="账单类型详情" v-model="state.dialogVisible" width="40%">
      <el-form label-width="70px" label-position="right" :model="state.billTypeForm" ref="billTypeForm" :rules="state.rules">
        <el-form-item label="类型" prop="type" required>
          <el-input type="input" v-model="state.billTypeForm.type" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="state.billTypeForm.note" class="large-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitTypeInfo">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { validateNull } from '../../../utils/utils'
import store from '../../../store' // 引入vuex的store
import billTypeACTypes from '../../../store/modules/billtype/action-types'

export default defineComponent({
  props: {
    pBillTypeForm: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const billTypeForm = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与Form表单的ref一样)
    const state = reactive({
      billTypeForm: {
        type: '',
        sort: '',
      },
      rules: {
        type: [
          { validator: validateNull.bind(this, '请输入类型'), trigger: 'blur' },
        ],
      },
      billTypeInfo: props.pBillTypeForm,
      dialogVisible: false,
    })

    const openDialog = () => {
      state.dialogVisible = true
    }
    const closeDialog = () => {
      state.dialogVisible = false
    }

    const submitTypeInfo = () => {
      billTypeForm.value.validate(async (valid) => {
        if (valid) {
          try {
            const result = await store.dispatch(
              billTypeACTypes.CREATE,
              state.billTypeForm
            )
            if (result.data.isOk) {
              ElMessage.success('保存成功')
              closeDialog()
            } else ElMessage.warning(result.data.message)
          } catch (error) {
            console.error(error)
          }
        } else ElMessage.warning('验证失败')
      })
    }

    return {
      state,
      billTypeForm,
      openDialog,
      closeDialog,
      submitTypeInfo,
    }
  },
})
</script>