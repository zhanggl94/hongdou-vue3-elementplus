<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-28 14:50:54
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-20 17:56:50
-->
<template>
  <div>
    <el-breadcrumb class="crumbs" separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-truck"></i> 汽车账单
      </el-breadcrumb-item>
      <el-breadcrumb-item>汽车信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="handler-box">
        <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteMultipleHandle"
          @cancleHandle="cancleDeleteHandle">
          <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        </v-popconfirm>
        <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="createCar">新建</el-button>
      </div>
      <el-table :data="carList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="name" width="200px" label="名称"></el-table-column>
        <el-table-column prop="brand.brand" width="200px" label="品牌"></el-table-column>
        <el-table-column prop="isDefault" width="200px" label="是否默认"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="操作" width="200">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.$index, scope.row)">编辑</el-button>
            <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteHandle(scope.$index, scope.row)"
              @cancleHandle="cancleDeleteHandle">
              <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
            </v-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <v-pagination :isHidden="pageInfo.total<1" :total="pageInfo.total" @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange" @handleRefreshTable="handleRefreshTable"></v-pagination>
    </div>
    <v-car-detail v-if="showDialog" ref="carDetailRef" :carId="carId" @closeDialog="closeDialog"></v-car-detail>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  nextTick,
} from 'vue'
import { ElMessage } from 'element-plus'
import vCarDetail from './CarDetail'
import vPopconfirm from '../../../../components/Popconfirm.vue'
import vPagination from '../../../../components/Pagination.vue'
import carACTypes from '../../../../store/modules/bill/car/car/action-types'
import store from '../../../../store' // 引入vuex的store

export default defineComponent({
  components: {
    vCarDetail,
    vPopconfirm,
    vPagination,
  },
  setup() {
    const carDetailRef = ref(null) // 在Componsition api下如果想访问 this.$refs，需要声明一个ref变量(变量名需要与子组件的ref一样)
    const state = reactive({
      carList: [],
      pageInfo: {
        index: 1,
        size: 10,
        total: 0,
      },
      multipleSelection: [],
      deletePop: {
        message: '确定要删除选中内容吗？',
        placement: 'top',
      },
      carId: -1,
      showDialog: false,
    })

    onMounted(async () => {
      await getCarList()
    })

    // 获取汽车信息列表
    const getCarList = async () => {
      try {
        const result = await store.dispatch(carACTypes.CAR_SELECT, {
          userId: store.state.user.id,
          pageIndex: state.pageInfo.index,
          pageSize: state.pageInfo.size,
        })
        if (result.data.code) {
          state.carList = result.data.data.list
          state.pageInfo.total = result.data.data.total
        } else {
          ElMessage.warning(result.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    // 新建
    const createCar = () => {
      state.showDialog = true
      state.carId = -1
      // 子页面打开
      nextTick(() => {
        carDetailRef.value.openDialog()
      })
    }
    // 编辑单条
    const editHandle = (index, row) => {
      state.showDialog = true
      state.carId = row.id
      nextTick(() => {
        carDetailRef.value.openDialog()
      })
      console.log('row', row)
    }
    // 删除单条-popconfirm组件点击确定后触发
    const deleteHandle = async (index, { id }) => {
      try {
        const result = await store.dispatch(carACTypes.CARBRAND_DELETE, {
          idList: [id],
        })
        if (result?.data?.code) {
          ElMessage.success('删除成功')
          await getCarList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }
    // 取消删除后的Message-popconfirm组件点击取消后触发
    const cancleDeleteHandle = () => {
      ElMessage.info('取消删除')
    }
    // 数据选中事件
    const selectionChangeHandle = (selection) => {
      state.multipleSelection = selection
    }
    // 批量删除-popconfirm组件点击确定后触发
    const deleteMultipleHandle = async () => {
      if (!state.multipleSelection.length) {
        ElMessage.warning('请选择要删除的数据')
        return
      }
      try {
        const idList = []
        let deleteType = ''
        for (let item of state.multipleSelection) {
          deleteType += item.brand + ' '
          idList.push(item.id)
        }
        const result = await store.dispatch(carACTypes.CARBRAND_DELETE, {
          idList,
        })
        if (result.data.code) {
          ElMessage.success(deleteType + '被删除成功')
          await getCarList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }
    // 当子页面关闭时，通过emit调用此方法
    const closeDialog = async (isRerefreshData) => {
      if (isRerefreshData) {
        await getCarList()
      }
      state.showDialog = false
    }
    // 前进后退时触发
    const handleCurrentChange = async (val) => {
      state.pageInfo.index = val
      await getCarList()
    }
    // 每页显示条数发生变化时触发
    const handleSizeChange = async (val) => {
      state.pageInfo.size = val
      await getCarList()
    }
    // 点击刷新按钮时触发
    const handleRefreshTable = async () => {
      await getCarList()
    }
    return {
      ...toRefs(state),
      carDetailRef,
      createCar,
      editHandle,
      deleteHandle,
      cancleDeleteHandle,
      selectionChangeHandle,
      deleteMultipleHandle,
      closeDialog,
      handleCurrentChange,
      handleSizeChange,
      handleRefreshTable,
    }
  },
})
</script>

<style scoped>
.handler-box {
  margin: 10px auto;
}
.red {
  color: #ff0000;
}
</style>