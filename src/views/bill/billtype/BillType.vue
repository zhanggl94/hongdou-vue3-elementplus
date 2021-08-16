<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-16 14:58:30
-->
<template>
  <div>
    <el-breadcrumb class="crumbs" separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-truck"></i> 汽车账单
      </el-breadcrumb-item>
      <el-breadcrumb-item>账单类型</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="handler-box">
        <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteMultipleHandle"
          @cancleHandle="cancleDeleteHandle">
          <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        </v-popconfirm>
        <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="createBillType">新建</el-button>
      </div>
      <el-table :data="billTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="type" width="200px" label="类型"></el-table-column>
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
    <v-bill-type-detail v-if="showDialog" ref="billTypeDetailRef" :billTypeId="billTypeId" @closeDialog="closeDialog"></v-bill-type-detail>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import vBillTypeDetail from './BillTypeDetail.vue'
import vPopconfirm from '../../../components/Popconfirm.vue'
import vPagination from '../../../components/Pagination.vue'
import billTypeACTypes from '../../../store/modules/bill/billtype/action-types'
import store from '../../../store'

export default defineComponent({
  components: {
    vBillTypeDetail,
    vPopconfirm,
    vPagination,
  },
  setup() {
    const billTypeDetailRef = ref(null)
    const state = reactive({
      billTypeList: [],
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
      billTypeId: -1,
      showDialog: false,
    })

    onMounted(async () => {
      await getBillTypeList()
    })

    // 获取账单列表
    const getBillTypeList = async () => {
      try {
        const result = await store.dispatch(billTypeACTypes.BILLTYPE_SELECT, {
          pageIndex: state.pageInfo.index,
          pageSize: state.pageInfo.size,
        })
        if (result.data.code) {
          state.billTypeList = result.data.data.list
          state.pageInfo.total = result.data.data.total
        } else {
          ElMessage.warning(result.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
    // 新建
    const createBillType = () => {
      state.showDialog = true
      state.billTypeId = -1
      // 子页面打开
      nextTick(() => {
        billTypeDetailRef.value.openDialog()
      })
    }
    // 编辑单条
    const editHandle = (index, row) => {
      state.showDialog = true
      state.billTypeId = row.id
      nextTick(() => {
        billTypeDetailRef.value.openDialog()
      })
    }
    // 删除单条-popconfirm组件点击确定后触发
    const deleteHandle = async (index, { id }) => {
      try {
        const result = await store.dispatch(
          billTypeACTypes.BILLTYPE_DELETE,
          { idList: [id] }
        )
        if (result?.data?.code) {
          ElMessage.success('删除成功')
          await getBillTypeList()
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
          deleteType += item.type + ' '
          idList.push(item.id)
        }
        const result = await store.dispatch(
          billTypeACTypes.BILLTYPE_DELETE,
          { idList }
        )
        if (result.data.code) {
          ElMessage.success(deleteType + '被删除成功')
          await getBillTypeList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    }
    // 当子页面关闭时，通过emit调用此方法
    const closeDialog = async (isRerefreshData) => {
      if (isRerefreshData) {
        await getBillTypeList()
      }
      state.showDialog = false
    }
    // 前进后退时触发
    const handleCurrentChange = async (val) => {
      state.pageInfo.index = val
      await getBillTypeList()
    }
    // 每页显示条数发生变化时触发
    const handleSizeChange = async (val) => {
      state.pageInfo.size = val
      await getBillTypeList()
    }
    // 点击刷新按钮时触发
    const handleRefreshTable = async () => {
      await getBillTypeList()
    }

    return {
      billTypeDetailRef,
      ...toRefs(state),
      createBillType,
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