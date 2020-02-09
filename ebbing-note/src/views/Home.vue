<template>
  <div>
      <el-container style="height: 709px; border: 1px solid #eee">
          <el-aside width="200px">
              <el-menu default-active="2" sclass="el-menu-vertical-demo">
                <router-link to='/home/aside'>
                      <el-menu-item index="1-1">
                          <i class="el-icon-s-flag"></i>
                          <span slot="title">今日复习</span>
                      </el-menu-item>
                  </router-link>
                  <router-link to='/home/doc'>
                      <el-menu-item index="1-2">
                          <i class="el-icon-notebook-1"></i>
                          <span slot="title">目录</span>
                      </el-menu-item>
                  </router-link>
              </el-menu>
          </el-aside>

          
          <el-aside width="200px">
            <router-view></router-view>
          </el-aside>

          <el-main>
              main
          </el-main>
               
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
    text-align: center;
    
  }
  .el-aside {
    background-color: #fff;
    color: #333;
    border-right:1px solid #D3DCE6; 
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-menu-item{
    border-bottom: 1px solid #eee;
  }
  a{
      text-decoration: none;
  }
</style>