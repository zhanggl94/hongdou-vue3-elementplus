<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-06 15:55:10
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-19 16:08:16
-->
<template>
  <div class="form-box">
    <el-dialog :title="formMode.text+'-账单类型'" v-model="dialogVisible" width="40%">
      <el-form label-width="80px" label-position="right" :model="billTypeInfo" ref="billTypeForm" :rules="rules">
        <el-form-item label="类型" prop="type">
          <el-input type="input" v-model="billTypeInfo.type" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="billTypeInfo.note" class="large-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveTypeInfo">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  computed,
  toRefs,
} from 'vue'
import { validateStrNull } from '../../../utils/utils'
import store from '../../../store' // 引入vuex的store
import billTypeACTypes from '../../../store/modules/bill/billtype/action-types'
import constants from '../../../utils/constants'

export default defineComponent({
  emits: ['closeDialog'],
  props: {
    billTypeId: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const billTypeForm = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与Form表单的ref一样)
    const state = reactive({
      billTypeInfo: {
        id: props.billTypeId,
        type: '',
        sort: 0,
        note: '',
      },
      rules: {
        type: [
          {
            required: true,
            validator: validateStrNull.bind(this, '请输入类型'),
            trigger: 'blur',
          },
        ],
      },
      dialogVisible: false,
    })

    // 表单模式
    const formMode = computed(() => {
      const formMode = { type: constants.formMode.create, text: '新建' }
      if (props.billTypeId > -1) {
        formMode.type = constants.formMode.edit
        formMode.text = '编辑'
      }
      return formMode
    })

    const openDialog = () => {
      state.dialogVisible = true
    }
    const closeDialog = (isRerefreshData) => {
      state.dialogVisible = false
      emit('closeDialog', isRerefreshData)
    }

    // 根据billTypeId获取账单类型信息
    const getBillTypeInfo = async () => {
      try {
        const result = await store.dispatch(billTypeACTypes.BILLTYPE_SELECT, {
          id: props.billTypeId,
        })
        if (result.data.code) state.billTypeInfo = result.data.data
        else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    // 保存
    const saveTypeInfo = () => {
      billTypeForm.value.validate(async (valid) => {
        if (valid) {
          try {
            // 判断接口类型
            const actionType =
              formMode.value.type === constants.formMode.create
                ? billTypeACTypes.BILLTYPE_CREATE
                : billTypeACTypes.BILLTYPE_EDIT
            // 执行接口
            const result = await store.dispatch(actionType, state.billTypeInfo)
            if (result.data.code) {
              ElMessage.success('保存成功')
              closeDialog(1)
            } else ElMessage.warning(result.data.message)
          } catch (error) {
            console.error(error)
          }
        } else ElMessage.warning('验证失败')
      })
    }

    // 生命周期函数
    onMounted(async () => {
      if (formMode.value.type === constants.formMode.edit) {
        // 如果id存在，获取账单信息
        await getBillTypeInfo()
      } else {
        state.billTypeInfo.id = null
      }
    })

    return {
      ...toRefs(state),
      billTypeForm,
      openDialog,
      closeDialog,
      saveTypeInfo,
      formMode,
    }
  },
})
</script>