<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-06 15:55:10
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-06 15:55:11
-->
<template>
  <div>
    <el-form>
      <el-form-item label="类型">
        <el-input type="input" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" v-model="form.note"></el-input>
      </el-form-item>
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: '',
        note: '',
      },
    }
  },
}
</script>