<template>
  <div id="home">
    <div class="icon">
      <el-dropdown trigger="click" @command="handleCommand">
        <span style="font-size:14px; cursor: pointer;">
        <i class="el-icon-circle-plus-outline"></i>
        新建
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">目录</el-dropdown-item>
          <el-dropdown-item divided command="b">笔记</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-header style="text-align: right; font-size: 12px; width:86%;float: right;">
        <h2>EbbingNote</h2>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Cherry</span>
      </el-header>
    </div>

    <el-container style="height: 650px; border: 1px solid #eee; clear:both">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu v-for="category in categories" :key="category.id" v-bind:index="category.id.toString()">
            <template slot="title"><i class="el-icon-message"></i>{{category.categoryName}}</template>
            <el-menu-item-group>
              <router-link :to="'/home/note/'+note.id" @click.native="flushCom" class="r1"
                v-for="note in category.notes" :key="note.id">
                <el-menu-item>{{note.name}}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="width: 650px; border: 1px solid #eee;">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      categories :[]
    }
  },
  mounted:function(){
      var url = "http://192.168.43.221:8080/ebbingnote/category/list";
        Axios.post(url).then((response)=>{
                let serverResponse = response.data;
                console.log(response);
                if(serverResponse && serverResponse.data != null) {
                  let array = new Array();
                  let serverCategories = serverResponse.data;
                  for (var index = 0; index < serverCategories.length; index++) {
                   let category = {
                     id : serverCategories[index].id,
                     categoryName: serverCategories[index].categoryName
                      };
                      array.push(category);
                  }
                  this.categories = array;
                }
            }).catch((error)=>{
                console.log(error);
            })  
    },
  methods: {
    handleCommand(command) {
        this.$message('click on item ' + command);
      },
      //退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/');
				}).catch(() => {

				});
      },
      flushCom:function(){this.$router.go(0);}
    }
}; 
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
  h2{
    margin: 0 40%;
    border:0px solid red;
  }
  
  .el-header {
    background-color: rgb(238, 241, 246);
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .el-header h2{
    float: left;
  }

  .r1{
    text-decoration: none;
  }
  .el-icon-circle-plus-outline{
    font-size: 20px;
    color: rgb(33, 177, 221);
    margin: 19px 10px 20px 20px;
  }

</style>

