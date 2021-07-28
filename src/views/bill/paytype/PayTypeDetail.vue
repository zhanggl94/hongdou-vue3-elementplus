<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-27 16:25:31
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 14:30:49
-->
<template>
  <div class="form-box">
    <el-dialog :title="formMode.text+'-支付类型'" v-model="dialogVisible" width="40%">
      <el-form label-width="70px" label-position="right" :model="payTypeInfo" ref="payTypeForm" :rules="rules">
        <el-form-item label="类型" prop="type" required>
          <el-input type="input" v-model="payTypeInfo.type" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="payTypeInfo.note" class="large-input"></el-input>
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
import { validateNull } from '../../../utils/utils'
import store from '../../../store' // 引入vuex的store
import payTypeACTypes from '../../../store/modules/paytype/action-types'
import constants from '../../../utils/constants'

export default defineComponent({
  emits: ['closeDialog'],
  props: {
    payTypeId: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const payTypeForm = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与Form表单的ref一样)
    const state = reactive({
      payTypeInfo: {
        id: props.payTypeId,
        type: '',
        sort: 0,
        note: '',
      },
      rules: {
        type: [
          { validator: validateNull.bind(this, '请输入类型'), trigger: 'blur' },
        ],
      },
      dialogVisible: false,
    })

    // 表单模式
    const formMode = computed(() => {
      const formMode = { type: constants.formMode.create, text: '新建' }
      if (props.payTypeId > -1) {
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

    // 根据payTypeId获取支付类型信息
    const getPayTypeInfo = async () => {
      try {
        const result = await store.dispatch(payTypeACTypes.PAYTYPE_SELECT, {
          id: props.payTypeId,
        })
        if (result.data.code) state.payTypeInfo = result.data.data
        else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    // 保存
    const saveTypeInfo = () => {
      payTypeForm.value.validate(async (valid) => {
        if (valid) {
          try {
            // 判断接口类型
            const actionType =
              formMode.value.type === constants.formMode.create
                ? payTypeACTypes.PAYTYPE_CREATE
                : payTypeACTypes.PAYTYPE_EDIT
            // 执行接口
            const result = await store.dispatch(actionType, state.payTypeInfo)
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
        // 如果id存在，获取支付信息
        await getPayTypeInfo()
      } else {
        state.payTypeInfo.id = null
      }
    })

    return {
      ...toRefs(state),
      payTypeForm,
      openDialog,
      closeDialog,
      saveTypeInfo,
      formMode,
    }
  },
})
</script>