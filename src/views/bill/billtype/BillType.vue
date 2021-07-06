<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-06 18:04:55
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
      <el-table :data="billTypeList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      billTypeList: [],
    }
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
    editHandle(index, row) {
      console.log('row', row)
    },
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
    deleteAllHandle() {
      this.$confirm('确定要删除选中内容吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.billTypeList.length = 0
          this.$message.success('删除成功')
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