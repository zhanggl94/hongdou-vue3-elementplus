<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-07-06 15:55:10
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-08 11:03:47
-->
<template>
  <div class="form-box">
    <el-form label-width="70px" label-position="right">
      <el-form-item label="类型">
        <el-input type="input" v-model="form.type" class="small-input"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input type="number" v-model="form.order" class="small-input"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" v-model="form.note" class="large-input"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // props: {
  //   billTypeInfo
  // },
  data() {
    return {
      form: {
        type: '',
        order: 0,
        note: '',
      },
      right: 'right',
    }
  },
}
</script>