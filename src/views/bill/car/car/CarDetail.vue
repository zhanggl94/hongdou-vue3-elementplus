<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-27 16:25:31
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-26 17:46:43
-->

<template>
  <div class="form-box">
    <el-dialog :title="formMode.text+'-汽车信息'" v-model="dialogVisible" width="40%">
      <el-form label-width="80px" label-position="right" :model="carInfo" ref="carForm" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input type="input" v-model="carInfo.name" class="small-input"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand.brand">
          <el-input type="input" :readonly=true placeholder="点击查找" @click="searchCarBrand" v-model="carInfo.brand.brand" class="small-input">
            <template #suffix>
              <i class="el-icon-search search-icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否默认" prop="isDefault">
          <el-checkbox v-model="carInfo.isDefault" :true-label=1 :false-label=0></el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" :rows="3" v-model="carInfo.note" class="large-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="saveCarInfo">确定</el-button>
          <el-button @click="closeDialog(0)">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <v-query-list v-if="dialogSearch.visible" ref="vQueryListRef" :target="dialogSearch.target" :title="dialogSearch.title"
      :width="dialogSearch.width" :queryData="dialogSearch.data" :columnMap="dialogSearch.columnMap" :pageSize="dialogSearch.pageSize"
      :pageIndex="dialogSearch.pageIndex" @clickOk="selectQuery" @handleCurrentChange="handleQueryListPageChange"
      @handleSizeChange="handleQueryListSizeChange" @handleRefreshTable="handleQueryListRefresh"></v-query-list>
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
  nextTick,
} from 'vue'
import { validateStrNull, getCarBrandColumnMap } from '../../../../utils/utils'
import store from '../../../../store' // 引入vuex的store
import carACTypes from '../../../../store/modules/bill/car/car/action-types'
import carBrandACTypes from '../../../../store/modules/bill/car/carbrand/action-types'
import constants from '../../../../utils/constants'
import vQueryList from '../../../../components/QueryList.vue'

export default defineComponent({
  components: { vQueryList },
  emits: ['closeDialog'],
  props: {
    carId: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const carForm = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与Form表单的ref一样)
    const vQueryListRef = ref(null)
    const state = reactive({
      carInfo: {
        id: props.carId,
        name: '',
        brand: { id: 2, brand: '', note: '' },
        isDefault: 0,
        note: '',
        userId: store.state.user.id,
      },
      rules: {
        name: [
          {
            required: true,
            validator: validateStrNull.bind(this, '请输入名称'),
            trigger: 'blur',
          },
        ],
        brand: {
          brand: [
            {
              required: true,
              validator: validateStrNull.bind(this, '请输入品牌'),
              trigger: 'blur',
            },
          ],
        },
      },
      dialogVisible: false,
      carBrandList: [],
      dialogSearch: {
        target: '',
        data: [],
        columnMap: {},
        title: '',
        visible: false,
        pageIndex: 1,
        pageSize: constants.pageSizeDefault,
      },
    })

    // 表单模式
    const formMode = computed(() => {
      const formMode = { type: constants.formMode.create, text: '新建' }
      if (props.carId > -1) {
        formMode.type = constants.formMode.edit
        formMode.text = '编辑'
      }
      return formMode
    })

    // 打开CarDetail的Dialog
    const openDialog = () => {
      state.dialogVisible = true
    }

    // 关闭CarDetail的Dialog并将关闭事件发送到父页面
    const closeDialog = (isRerefreshData) => {
      state.dialogVisible = false
      emit('closeDialog', isRerefreshData)
    }

    // 根据carId获取支付类型信息
    const getCarInfo = async () => {
      try {
        const result = await store.dispatch(carACTypes.CAR_SELECT, {
          id: props.carId,
          userId: store.state.user.id,
        })
        if (result.data.code) state.carInfo = result.data.data
        else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    // 保存
    const saveCarInfo = () => {
      carForm.value.validate(async (valid) => {
        if (valid) {
          try {
            // 判断接口类型
            const actionType =
              formMode.value.type === constants.formMode.create
                ? carACTypes.CAR_CREATE
                : carACTypes.CAR_EDIT
            // 执行接口
            const result = await store.dispatch(actionType, state.carInfo)
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

    // 获取汽车品牌的所有数据-给查询页面使用
    const searchCarBrand = async () => {
      state.dialogSearch.data = await getCarBrandList()
      state.dialogSearch.columnMap = getCarBrandColumnMap()
      state.dialogSearch.title = '汽车品牌'
      state.dialogSearch.visible = true
      state.dialogSearch.target = constants.queryListTarget.car
      nextTick(() => {
        vQueryListRef.value.openDialog()
      })
    }

    // 查询页面点击OK按钮事件的监听事件
    const selectQuery = (queryResult) => {
      switch (queryResult.target) {
        case constants.queryListTarget.car:
          state.carInfo.brand = queryResult.data
          // 单独校验汽车品牌字段
          carForm.value.validateField('brand.brand', (brandError) => {
            if (brandError) {
              return false
            }
          })
          break
      }
    }

    // 生命周期函数
    onMounted(async () => {
      if (formMode.value.type === constants.formMode.edit) {
        // 如果id存在，获取支付信息
        await getCarInfo()
      } else {
        state.carInfo.id = null
      }
    })

    // 当在查询界面点击前进后退时触发
    const handleQueryListPageChange = async (index) => {
      state.dialogSearch.pageIndex = index
      await refreshQueryList()
    }

    // 当在查询界面切换页面显示条数时触发
    const handleQueryListSizeChange = async (size) => {
      state.dialogSearch.pageSize = size
      await refreshQueryList()
    }

    // 当查询界面点击刷新按钮时触发
    const handleQueryListRefresh = async () => {
      await refreshQueryList()
    }

    // 获取汽车品牌信息
    const getCarBrandList = async () => {
      try {
        const result = await store.dispatch(carBrandACTypes.CARBRAND_SELECT, {
          pageIndex: state.dialogSearch.pageIndex,
          pageSize: state.dialogSearch.pageSize,
        })
        if (result?.data?.data) return result.data.data
        else return []
      } catch (error) {
        throw new Error(error)
      }
    }

    // 刷新查询页面列表
    const refreshQueryList = async () => {
      state.dialogSearch.data = await getCarBrandList()
      vQueryListRef.value.setQueryList(state.dialogSearch.data)
    }

    return {
      ...toRefs(state),
      carForm,
      openDialog,
      closeDialog,
      saveCarInfo,
      formMode,
      searchCarBrand,
      vQueryListRef,
      selectQuery,
      handleQueryListPageChange,
      handleQueryListSizeChange,
      handleQueryListRefresh,
    }
  },
})
</script>

<style scoped>
.search-icon {
  font-size: 20px;
}
</style>