<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 11:35:52
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
        <el-button size="small" type="primary" icon="el-icon-circle-plus">新建</el-button>
      </div>
      <el-table :data="billTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="type" width="100px" label="类型"></el-table-column>
        <el-table-column prop="order" width="100px" sortable label="排序"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column header-align="center" align="center" prop="prop" label="操作" width="200">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="deleteHandle(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-box">
      <el-dialog title="账单类型详情" v-model="dialogVisible" width="40%">
        <v-bill-type-detail></v-bill-type-detail>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="openDialog">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import vBillTypeDetail from './BillTypeDetail.vue'

export default {
  data() {
    return {
      billTypeList: [],
      multipleSelection: [],
      dialogVisible: false,
    }
  },
  components: {
    vBillTypeDetail,
  },
  created() {
    this.billTypeList = this.getBillTypeList()
  },
  methods: {
    getBillTypeList() {
      return [
        { id: '0', order: 0, type: '加油', note: '加油note' },
        { id: '1', order: 1, type: '洗车', note: '洗车note' },
        { id: '2', order: 2, type: '保险', note: '保险note' },
        { id: '3', order: 3, type: '罚款', note: '罚款note' },
        { id: '4', order: 4, type: '停车费', note: '停车费note' },
      ]
    },
    // 编辑单条
    editHandle(index, row) {
      this.openDialog()
      console.log('row', row)
    },
    // 删除单条
    deleteHandle(index, row) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log('row', row)
          this.billTypeList.splice(index, 1)
          this.$message.success('删除成功')
        })
        .catch((err) => {
          this.$message.info('取消删除')
          console.error(err)
        })
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
          console.log('item', this.multipleSelection)
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
    closeDialog() {
      this.dialogVisible = false
    },
    openDialog() {
      this.closeDialog()
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