<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-08-17 16:58:43
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-17 17:02:36
-->
<template>
  <div>
    <el-table :data="carBrandList" tooltip-effect="dark" border style="width: 100%" ref="multipleTable" @selection-change="selectionChangeHandle">
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="brand" width="200px" label="品牌"></el-table-column>
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
    <v-pagination :isHidden="pageInfo.total<1" :total="pageInfo.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
      @handleRefreshTable="handleRefreshTable"></v-pagination>
  </div>
</template>