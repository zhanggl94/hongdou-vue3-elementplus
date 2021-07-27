<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-23 09:53:02
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-27 15:49:22
-->
<template>
  <div class="pagination" :class="{hidden:isHidden}">
    <span class="refresh_icon el-icon-refresh" title="刷新" @click="handleRefreshTable"></span>
    <el-pagination :background="background" :current-page="page" :page-sizes="pageSizes" :page-size="limit" :layout="layout" :total="total"
      :pager-count="pagerCount" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isHidden: {
      // 控制 分页是否出现，这里一般设置total小于等于0的时候，将分页组件隐藏。
      type: Boolean,
      default: false,
    },
    total: {
      // 数据总条数
      required: true,
      type: Number,
    },
    page: {
      //当前页
      type: Number,
      default: 1,
    },
    limit: {
      //每页显示条目个数， 限制 每页多少条数据
      type: Number,
      default: 10,
    },
    pageSizes: {
      // 每页显示个数选择器的选项设置,下拉选择框的选项值
      type: Array,
      default() {
        return [10, 20, 30, 50, 100]
      },
    },
    layout: {
      // 组件布局
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      // 是否为分页按钮添加背景色，默认有背景，数字在蓝色的小框内的样式
      type: Boolean,
      default: true,
    },
    pagerCount: {
      //页码按钮的数量， 默认显示7个数，当总页数超过该值时会折叠,注意这里：它必须是 大于等于 5 且小于等于 21 的奇数
      type: Number,
      default: 7,
    },
  },
  setup(props, { emit }) {

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

    return {
      handleSizeChange,
      handleCurrentChange,
      handleRefreshTable,
    }
  },
})
</script>

<style>
.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.pagination .refresh_icon {
  width: 32px;
  color: #409eff;
  margin: 8px 0 0 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
}
.hidden {
  display: none;
}
</style>