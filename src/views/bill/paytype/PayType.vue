<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-27 16:25:31
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-28 11:31:43
-->
<template>
  <div>
    <el-breadcrumb class="crumbs" separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-truck"></i> 汽车支付
      </el-breadcrumb-item>
      <el-breadcrumb-item>支付类型</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="handler-box">
        <v-popconfirm :message="deletePop.message" :placement="deletePop.placement" @okHandle="deleteMultipleHandle"
          @cancleHandle="cancleDeleteHandle">
          <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        </v-popconfirm>
        <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="createPayType">新建</el-button>
      </div>
      <el-table :data="payTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
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
    <v-pay-type-detail v-if="showDialog" ref="payTypeDetail" :payTypeId="payTypeId" @closeDialog="closeDialog"></v-pay-type-detail>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import vPayTypeDetail from './PayTypeDetail.vue'
import vPopconfirm from '../../../components/Popconfirm.vue'
import vPagination from '../../../components/Pagination.vue'
import payTypeACTypes from '../../../store/modules/bill/paytype/action-types'

export default {
  components: {
    vPayTypeDetail,
    vPopconfirm,
    vPagination,
  },
  data() {
    return {
      payTypeList: [],
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
      payTypeId: -1,
      showDialog: false,
    }
  },
  async created() {
    await this.getPayTypeList()
  },
  methods: {
    // 获取支付类型列表
    async getPayTypeList() {
      try {
        const result = await this.$store.dispatch(
          payTypeACTypes.PAYTYPE_SELECT,
          { pageIndex: this.pageInfo.index, pageSize: this.pageInfo.size }
        )
        if (result.data.code) {
          this.payTypeList = result.data.data.list
          this.pageInfo.total = result.data.data.total
        } else {
          ElMessage.warning(result.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 新建
    createPayType() {
      this.showDialog = true
      this.payTypeId = -1
      // 子页面打开
      this.$nextTick(() => {
        this.$refs.payTypeDetail.openDialog()
      })
    },
    // 编辑单条
    editHandle(index, row) {
      this.showDialog = true
      this.payTypeId = row.id
      this.$nextTick(() => {
        this.$refs.payTypeDetail.openDialog()
      })
      console.log('row', row)
    },
    // 删除单条-popconfirm组件点击确定后触发
    async deleteHandle(index, { id }) {
      try {
        const result = await this.$store.dispatch(
          payTypeACTypes.PAYTYPE_DELETE,
          { idList: [id] }
        )
        if (result?.data?.code) {
          ElMessage.success('删除成功')
          await this.getPayTypeList()
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
          payTypeACTypes.PAYTYPE_DELETE,
          { idList }
        )
        if (result.data.code) {
          ElMessage.success(deleteType + '被删除成功')
          await this.getPayTypeList()
        } else ElMessage.warning(result.data.message)
      } catch (error) {
        console.error(error)
      }
    },
    // 当子页面关闭时，通过emit调用此方法
    async closeDialog(isRerefreshData) {
      if (isRerefreshData) {
        await this.getPayTypeList()
      }
      this.showDialog = false
    },
    // 前进后退时触发
    async handleCurrentChange(val) {
      this.pageInfo.index = val
      await this.getPayTypeList()
    },
    // 每页显示条数发生变化时触发
    async handleSizeChange(val) {
      this.pageInfo.size = val
      await this.getPayTypeList()
    },
    // 点击刷新按钮时触发
    async handleRefreshTable() {
      await this.getPayTypeList()
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