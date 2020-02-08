<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">

        <el-menu-item index="1">
        <i class="el-icon-s-flag"></i>
        <span slot="title">今日复习</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">文档</span>
      </el-menu-item>

    </el-menu>
  </el-aside>
  
  
</el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'home'
    };
  }
}; 
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  
</style>