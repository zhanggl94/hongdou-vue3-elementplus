<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-08-17 16:58:43
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-08-26 17:52:59
-->
<template>
  <el-dialog v-model="dialogVisible" :width="dialogWidth">
    <template #title>
      <span class="dialog-title">查询-{{dialogTitle}}</span>
    </template>
    <div class="query-content">
      <el-table :data="dataList" tooltip-effect="dark" border style="width: 100%" highlight-current-row @current-change="changeCurrentRow">
        <template v-for="item in columnMap" :key="item[0]">
          <el-table-column v-if="item[1].isShow" :prop="item[0]" :label="item[1].title" :width="item[1].width">
          </el-table-column>
        </template>
      </el-table>
    </div>
    <v-pagination :isHidden="dataTotal<1" :total="dataTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
      @handleRefreshTable="handleRefreshTable"></v-pagination>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="clickOk">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import vPagination from '../components/Pagination.vue'

export default defineComponent({
  emits: [
    'clickOk',
    'handleCurrentChange',
    'handleSizeChange',
    'handleRefreshTable',
  ],
  components: { vPagination },
  props: {
    target: {
      types: String,
      required: true,
      default: '',
    },
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
  setup(props, { emit }) {
    const state = reactive({
      dataList: props.queryData.list,
      columnMap: props.columnMap,
      dataTotal: props.queryData.total,
      dialogWidth: props.width,
      dialogTitle: props.title,
      dialogVisible: false,
      currentRow: {},
    })

    //打开事件
    const openDialog = () => {
      state.dialogVisible = true
    }

    // 关闭事件
    const closeDialog = () => {
      state.dialogVisible = false
    }

    // 当选择的数据发生变化
    const changeCurrentRow = (val) => {
      state.currentRow = val
    }

    // 点击OK
    const clickOk = () => {
      if (state.currentRow?.id) {
        closeDialog()
        emit('clickOk', { target: props.target, data: state.currentRow })
      } else ElMessage.warning('请选择一条数据')
    }

    // 页面总条数发生变化-改变每页多少条
    const handleSizeChange = (val) => {
      emit('handleSizeChange', val)
    }

    // 当前页发生变化-换页
    const handleCurrentChange = (val) => {
      emit('handleCurrentChange', val)
    }

    // 刷新
    const handleRefreshTable = () => {
      emit('handleRefreshTable')
    }

    // 父级页面修改数据后调用此函数修改查询页面数据
    const setQueryList = (data) => {
      state.dataList = data.list
      state.dataTotal = data.total
    }

    return {
      ...toRefs(state),
      openDialog,
      closeDialog,
      changeCurrentRow,
      clickOk,
      handleSizeChange,
      handleCurrentChange,
      handleRefreshTable,
      setQueryList,
    }
  },
})
</script>

<style scoped>
.dialog-title {
  font-weight: bolder;
}
.query-content {
  overflow: auto;
  margin: 0 10px;
}
</style>