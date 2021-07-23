<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-23 10:10:00
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
        <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteMultipleHandle" @cancleHandle="cancleDeleteHandle">
          <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        </v-popconfirm>
        <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="createBillType">新建</el-button>
      </div>
      <el-table :data="billTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="type" width="100px" label="类型"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="操作" width="200">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.$index, scope.row)">编辑</el-button>
            <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteHandle(scope.$index, scope.row)" @cancleHandle="cancleDeleteHandle">
              <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
            </v-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next, total" :total="pageInfo.total" :page-size="pageInfo.size" :page-index="pageInfo.index">
        </el-pagination>
      </div>
    </div>
    <v-bill-type-detail v-if="showDialog" ref="billTypeDetail" :billTypeId="billTypeId" @closeDialog="closeDialog"></v-bill-type-detail>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import vBillTypeDetail from './BillTypeDetail.vue'
import vPopconfirm from '../../../components/Popconfirm.vue'
import billTypeACTypes from '../../../store/modules/billtype/action-types'

export default {
  components: {
    vBillTypeDetail,
    vPopconfirm,
  },
  data() {
    return {
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
    }
  },
  async created() {
    await this.getBillTypeList()
  },
  methods: {
    // 获取账单类型列表
    async getBillTypeList() {
      try {
        const result = await this.$store.dispatch(
          billTypeACTypes.BILLTYPE_SELECT,
          {}
        )
        if (result.data.isOk) {
          this.billTypeList = this.$store.state.billType.list
          this.pageInfo.total = this.billTypeList.length
        } else {
          ElMessage.warning(result.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 新建
    createBillType() {
      this.showDialog = true
      this.billTypeId = -1
      // 子页面打开
      this.$nextTick(() => {
        this.$refs.billTypeDetail.openDialog()
      })
    },
    // 编辑单条
    editHandle(index, row) {
      this.showDialog = true
      this.billTypeId = row.id
      this.$nextTick(() => {
        this.$refs.billTypeDetail.openDialog()
      })
      console.log('row', row)
    },
    // 删除单条-popconfirm组件点击确定后触发
    async deleteHandle(index, { id }) {
      try {
        const result = await this.$store.dispatch(
          billTypeACTypes.BILLTYPE_DELETE,
          { idList: [id] }
        )
        if (result?.data?.isOk) {
          ElMessage.success('删除成功')
          await this.getBillTypeList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    },
    // 取消删除后的Message-popconfirm组件点击取消后触发
    cancleDeleteHandle() {
      ElMessage.info('取消删除')
    },
    // 数据选中事件
    selectionChangeHandle(selection) {
      this.multipleSelection = selection
    },
    // 批量删除-popconfirm组件点击确定后触发
    async deleteMultipleHandle() {
      if (!this.multipleSelection.length) {
        ElMessage.warning('请选择要删除的数据')
        return
      }
      try {
        const idList = []
        let deleteType = ''
        for (let item of this.multipleSelection) {
          deleteType += item.type + ' '
          idList.push(item.id)
        }
        const result = await this.$store.dispatch(
          billTypeACTypes.BILLTYPE_DELETE,
          {idList}
        )
        if (result.data.isOk) {
          ElMessage.success(deleteType + '被删除成功')
          await this.getBillTypeList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    },
    // 当子页面关闭时，通过emit调用此方法
    async closeDialog(isRerefreshData) {
      if (isRerefreshData) {
        await this.getBillTypeList()
      }
      this.showDialog = false
    },
  },
}
</script>

<style scoped>
.handler-box {
  margin: 10px auto;
}
.red {
  color: #ff0000;
}
</style>