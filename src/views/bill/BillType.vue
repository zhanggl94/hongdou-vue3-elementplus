<!--
 * @Descripttion: 
 * @Version: 
 * @Author: zhanggl
 * @Date: 2021-07-02 22:17:44
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-07-02 23:56:03
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
      <template>
        <el-form :modle="form">
          <el-form-item label="类型">
            <el-input type="input" v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="备注">
              <el-input type="textarea" :rows="3" v-model="form.note"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </div>
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