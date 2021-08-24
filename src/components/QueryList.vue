<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-08-17 16:58:43
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-24 19:10:52
-->
<template>
  <el-dialog v-model="dialogVisible" :width="dialogWidth">
    <template #title>
      <span class="dialog-title">查询-{{dialogTitle}}</span>
    </template>
    <el-table :data="dataList" tooltip-effect="dark" border style="width: 100%" highlight-current-row @current-change="selectRow">
      <template v-for="item in columnMap" :key="item[0]">
        <el-table-column v-if="item[1].isShow" :prop="item[0]" :label="item[1].title" :width="item[1].width">
        </el-table-column>
      </template>
    </el-table>
    <v-pagination :isHidden="dataTotal<1" :total="dataTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
      @handleRefreshTable="handleRefreshTable"></v-pagination>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="saveSelectValue">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import vPagination from '../components/Pagination.vue'

export default defineComponent({
  components: { vPagination },
  props: {
    queryData: {
      types: Object,
      require: true,
      default: {},
    },
    columnMap: {
      types: Array,
      require: true,
      default: [],
    },
    title: {
      types: String,
      require: false,
      default: '',
    },
    width: {
      type: String,
      require: false,
      default: '40%',
    },
  },
  setup(props) {
    const state = reactive({
      dataList: props.queryData.list,
      columnMap: props.columnMap,
      dataTotal: props.queryData.total,
      dialogWidth: props.width,
      dialogTitle: props.title,
      dialogVisible: false,
    })

    const openDialog = () => {
      state.dialogVisible = true
    }

    const closeDialog = () => {
      state.dialogVisible = false
    }

    const selectRow = (val) => {
      console.log('val: ', val)
    }

    const saveSelectValue = () => {}

    return {
      ...toRefs(state),
      openDialog,
      closeDialog,
      selectRow,
      saveSelectValue,
    }
  },
})
</script>

<style scoped>
.dialog-title {
  font-weight: bolder;
}
</style>