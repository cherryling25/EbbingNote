<template>
  <div id="home">
    <div class="icon">
      <el-dropdown trigger="click">
        <span style="font-size:14px; cursor: pointer;">
        <i class="el-icon-circle-plus-outline"></i>
        新建
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><el-button type="text" @click="dialogFormVisible = true">目录</el-button></el-dropdown-item>
          <el-dropdown-item divided><el-button type="text" @click="dialogFormVisible1 = true">笔记</el-button></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 弹出框1 -->
      <el-dialog title="目录" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmCategory">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 弹出框2 -->
      <el-dialog title="新建笔记" :visible.sync="dialogFormVisible1" top="10vh">
        <el-form :model="form1">
          <el-form-item label="目录" :label-width="formLabelWidth1">
            <el-select v-model="form1.categoryId" placeholder="请选择目录">
              <el-option :label="category.categoryName" :value="category.id" v-for="category in categories" :key="category.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth1">
            <el-input v-model="form1.noteName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth1">
            <el-input autocomplete="off" type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="form1.noteContent"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="confirmNote">确 定</el-button>
        </div>
      </el-dialog>

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
        <el-menu>
          <el-submenu v-for="category in categories" :key="category.id" v-bind:index="category.id.toString()">
            <template slot="title"><i class="el-icon-message"></i>{{category.categoryName}}</template>
            <el-menu-item-group>
                <el-menu-item v-for="note in category.notes" :key="note.id" @click="doSomething(note.id)">{{note.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="width: 650px; border: 1px solid #eee;">
        <el-main>
          {{content}}
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
      userAccountId : this.$route.params.id,
      categories :[],
      content: '',
      options:[],
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '70px',

      dialogFormVisible1: false,
      form1: {
        categoryId: '',
        noteName: '',
        noteContent:'',
      },
      formLabelWidth1: '70px'

    }
  },
  mounted:function(){
      this.listCategory();
  },
  methods: {
    listCategory() {
    var url = "http://192.168.43.221:8080/ebbingnote/category/list";
      let requestData = {data: this.userAccountId};
        Axios.post(url,requestData).then((response)=>{
                let serverResponse = response.data;
                if(serverResponse && serverResponse.data != null) {
                  let array = [];
                  let serverCategories = serverResponse.data;
                  for (var index = 0; index < serverCategories.length; index++) {
                    let documentArray = new Array();
                    let documentList = serverCategories[index].documentList;
                    if(documentList != null && documentList.length > 0) {
                        for(var j=0;j<documentList.length;j++) {
                            let note = {
                              id : documentList[j].id,
                              title : documentList[j].title,
                              status : documentList[j].status,
                              createdDate : documentList[j].createdDate
                            };
                            documentArray.push(note);
                        }
                    }
                    let category = {
                      id: serverCategories[index].id,
                      categoryName: serverCategories[index].categoryName,
                      notes : documentArray
                    };
                    array.push(category);
                  }
                  this.categories = array;
                }
            }).catch((error)=>{
                console.log(error);
            })  
    },
   confirmCategory(){
     var url = "http://192.168.43.221:8080/ebbingnote/category/add";
      let requestData = {userAccountId:this.userAccountId,categoryName:this.form.name,};
      console.log(requestData);
        Axios.post(url,requestData).then((response)=>{
          if(response.data) {
            alert('save success');// TODO
            this.listCategory();
            this.dialogFormVisible = false;
          }
        });
   },
   confirmNote(){
    var url = "http://192.168.43.221:8080/ebbingnote/document/add";
      let requestData = {
        categoryId:this.form1.categoryId,
        title:this.form1.noteName,
        content:this.form1.noteContent
      };
      console.log(requestData);
        Axios.post(url,requestData).then((response)=>{
          if(response.data) {
            alert('save success');// TODO
            this.listCategory();
            this.dialogFormVisible1 = false;
          }
        });
   },
    doSomething(noteId){
      var url = "http://192.168.43.221:8080/ebbingnote/document/detail";
      let requestData = {data: noteId};
        Axios.post(url,requestData).then((response)=>{
          console.log(response);
          this.content = response.data.data.content;
        });
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

