<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-21 17:52:37
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
        <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteAllHandle">批量删除</el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="createBillType">新建</el-button>
      </div>
      <el-table :data="billTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="type" width="100px" label="类型"></el-table-column>
        <el-table-column prop="order" width="100px" sortable label="排序"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="操作" width="200">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.$index, scope.row)">编辑</el-button>
            <v-popconfirm :message="deletePop.message" :type="deletePop.type" :placement="deletePop.placement" @okHandle="deleteHandle(scope.$index, scope.row)" @cancleHandle="cancleDeleteHandle">
              <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
            </v-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <v-bill-type-detail ref="billTypeDetail" @getBillTypeList="getBillTypeList"></v-bill-type-detail>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import vBillTypeDetail from './BillTypeDetail.vue'
import vPopconfirm from '../../../components/Popconfirm.vue'
import billTypeACTypes from '../../../store/modules/billtype/action-types'

export default {
  data() {
    return {
      billTypeList: [],
      multipleSelection: [],
      deletePop: {
        message: '确定要删除选中内容吗？',
        type: 'warning',
        placement: 'top',
      },
    }
  },
  components: {
    vBillTypeDetail,
    vPopconfirm,
  },
  async created() {
    await this.getBillTypeList()
  },
  methods: {
    async getBillTypeList() {
      try {
        const result = await this.$store.dispatch(billTypeACTypes.SELECT, {})
        if (result.data.isOk) {
          this.billTypeList = result.data.data
        } else {
          ElMessage.warning(result.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 新建
    createBillType() {
      // 子页面打开
      this.$refs.billTypeDetail.openDialog()
    },
    // 编辑单条
    editHandle(index, row) {
      this.$refs.billTypeDetail.openDialog()
      console.log('row', row)
    },
    // 删除单条
    deleteHandle(index, row) {
      this.billTypeList.splice(index, 1)
      this.$message.success('删除成功')
    },
    cancleDeleteHandle() {
      this.$message.info('取消删除')
    },
    // 数据选中事件
    selectionChangeHandle(selection) {
      this.multipleSelection = selection
    },
    // 批量删除
    deleteAllHandle() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择要删除的数据')
        return
      }
      this.$confirm('确定要删除选中内容吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let deleteType = ''
          for (let item of this.multipleSelection) {
            deleteType += item.type + ' '
            this.billTypeList.splice(
              this.billTypeList.findIndex((t) => t.id === item.id),
              1
            )
          }
          this.$message.success(deleteType + '被删除成功')
        })
        .catch((err) => {
          this.$message.info('取消删除')
          console.error(err)
        })
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