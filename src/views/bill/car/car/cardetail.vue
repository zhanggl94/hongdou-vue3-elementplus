<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-28 14:51:00
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-16 16:09:56
-->

<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-27 16:25:31
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 17:29:11
-->
<template>
  <div class="form-box">
    <el-dialog :title="formMode.text+'-汽车品牌'" v-model="dialogVisible" width="40%">
      <el-form label-width="70px" label-position="right" :model="carBrandInfo" ref="carBrandForm" :rules="rules">
        <el-form-item label="汽车品牌" prop="brand" required>
          <el-input type="input" v-model="carBrandInfo.brand" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="carBrandInfo.note" class="large-input"></el-input>
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
import { validateNull } from '../../../../utils/utils'
import store from '../../../../store' // 引入vuex的store
import carBrandACTypes from '../../../../store/modules/bill/car/carbrand/action-types'
import constants from '../../../../utils/constants'

export default defineComponent({
  emits: ['closeDialog'],
  props: {
    carBrandId: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const carBrandForm = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与Form表单的ref一样)
    const state = reactive({
      carBrandInfo: {
        id: props.carBrandId,
        brand: '',
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
      if (props.carBrandId > -1) {
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

    // 根据carBrandId获取支付类型信息
    const getCarBrandInfo = async () => {
      try {
        const result = await store.dispatch(carBrandACTypes.CARBRAND_SELECT, {
          id: props.carBrandId,
        })
        if (result.data.code) state.carBrandInfo = result.data.data
        else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    // 保存
    const saveTypeInfo = () => {
      carBrandForm.value.validate(async (valid) => {
        if (valid) {
          try {
            // 判断接口类型
            const actionType =
              formMode.value.type === constants.formMode.create
                ? carBrandACTypes.CARBRAND_CREATE
                : carBrandACTypes.CARBRAND_EDIT
            // 执行接口
            const result = await store.dispatch(actionType, state.carBrandInfo)
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
        await getCarBrandInfo()
      } else {
        state.carBrandInfo.id = null
      }
    })

    return {
      ...toRefs(state),
      carBrandForm,
      openDialog,
      closeDialog,
      saveTypeInfo,
      formMode,
    }
  },
})
</script>