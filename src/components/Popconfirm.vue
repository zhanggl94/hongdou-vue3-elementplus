<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-21 08:46:32
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-21 17:51:26
-->
<template>
  <el-popover class="pop-confirm" :width="250" :placement="placement" v-model:visible="visible">
    <div class='pop-title'>{{popInfo.title}}</div>
    <p class="pop-p"><i :class="popInfo.class"></i>{{message}}</p>
    <div class="pop-btn">
      <el-button size="mini" type="primary" @click="clickOk">确定</el-button>
      <el-button size="mini" @click="closePopconfirm">取消</el-button>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script>
import { reactive, toRefs, computed, defineComponent } from 'vue'
import constants from '../utils/constants'

export default defineComponent({
  emits: ['okHandle', 'cancleHandle'],
  props: {
    message: {
      // 提示消息
      type: String,
      required: true,
    },
    type: {
      // 提示类型: warning, info, success, error
      type: String,
      required: true,
    },
    placement: {
      // 提示框出现位置，默认top
      type: String,
      required: false,
      default: 'top',
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      message: props.message,
      type: props.type,
    })

    // 弹出层的属性
    const popInfo = computed(() => {
      const popInfo = {
        title: constants.confirmType.info.title,
        class: `${constants.confirmType.info.iconClass} info`,
      }
      switch (state.type) {
        case constants.confirmType.warning.type:
          popInfo.title = constants.confirmType.warning.title
          popInfo.class = `${constants.confirmType.warning.iconClass} warning`
          break
      }
      return popInfo
    })

    const clickOk = () => {
      closePopconfirm()
      emit('okHandle')
    }

    const closePopconfirm = () => {
      state.visible = false
      emit('cancleHandle')
    }

    return {
      ...toRefs(state),
      popInfo,
      clickOk,
      closePopconfirm,
    }
  },
})
</script>

<style scoped>
.pop-title {
  font-size: 14px;
}
.pop-p {
  margin: 5px;
}
.warning,
.info {
  margin-right: 10px;
  font-size: 20px;
}
.warning {
  color: #ff9900;
}
.info {
  color: #909399;
}
.pop-btn {
  text-align: right;
}
</style>