<template>
  <div id="home">
    <div class="icon" style="display: flex;" >
      <el-aside width="260px">
        <span @click="dialogFormVisible = true" style="margin-left:11px;">
          <i class="el-icon-circle-plus-outline"></i>
          <el-button type="text">目录</el-button>
        </span>
        <span @click="dialogFormVisible1 = true" style="margin-left:11px;">
          <i class="el-icon-circle-plus-outline"></i>
          <el-button type="text">笔记</el-button>
        </span>
      </el-aside>

      <el-header style="text-align: right;font-size: 12px;flex-grow: 1;">
        <h2>EbbingNote</h2>
        <el-dropdown trigger="click">
          <i class="el-icon-setting" style="margin-right: 15px;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="font-size:18px;">{{userAccountName}}</span>
      </el-header>
    </div>

    <!-- 弹出框1 -->
    <el-dialog title="新建目录" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="categoryForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="categoryForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCategory">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出框2 -->
    <el-dialog title="新建笔记" :visible.sync="dialogFormVisible1" top="10vh">
      <el-form :model="noteForm">
        <el-form-item label="目录" :label-width="formLabelWidth">
          <el-select v-model="noteForm.categoryId" placeholder="请选择目录">
            <template v-for="category in categories">
              <el-option :label="category.categoryName" v-if="category.id != -1" :value="category.id"
                :key="category.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="noteForm.noteName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input autocomplete="off" type="textarea" :rows="10" placeholder="请输入内容" v-model="noteForm.noteContent">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirmNote">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改笔记" :visible.sync="dialogFormVisible2" top="10vh">
      <el-form :model="modifyNoteForm">
        <el-form-item label="目录" :label-width="formLabelWidth">
          <el-select v-model="modifyNoteForm.categoryId" placeholder="请选择目录">
            <template v-for="category in categories">
              <el-option :label="category.categoryName" v-if="category.id != -1" :value="category.id"
                :key="category.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="modifyNoteForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input autocomplete="off" type="textarea" :rows="10" placeholder="请输入内容" v-model="modifyNoteForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmModifyNote">确 定</el-button>
      </div>
    </el-dialog>

    <el-container class="container">
      <el-aside width="260px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu @contextmenu.prevent.native="deleteCategory(category)" v-for="category in categories"
            :key="category.id" v-bind:index="category.id.toString()">
            <template slot="title"><i class="el-icon-folder"></i>{{category.categoryName}}
            </template>
            <el-menu-item-group>
              <el-menu-item   @contextmenu.prevent.native="deleteNote(note.id)" v-for="note in category.notes"
                :key="note.id" @click.native="detail(note)">
                <template slot="title" style="position: relative;"><i :class="note.icon"></i>
                <span class="noteTitle">{{note.title}}</span>
                <span class="noteTime">{{note.createdDate}}</span>
                 </template>
              </el-menu-item>
           
              
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container @dblclick.native="modifyNote()" style="width: 650px; border: 1px solid #eee;">
        <el-main style="white-space: pre">
          {{currentNote == null ? '' : currentNote.content}}
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
      userAccountName: '',
      userAccountId: this.$route.params.id,
      categories: [],
      currentNote: {},
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: '70px',
      categoryForm: {
        name: ''
      },
      noteForm: {
        categoryId: '',
        noteName: '',
        noteContent: '',
      },
      modifyNoteForm: {
        id: '',
        categoryId: '',
        title: '',
        content: '',
      },
    }
  },
  mounted: function () {
    var url = "useraccount/getCurrentUser";
    let requestData = {
      data: this.userAccountId
    };
    Axios.post(url, requestData).then((response) => {
      if (response && response.data && response.data.data) {
        this.userAccountName = response.data.data.userName;
      }
    });
    this.listCategory();
  },
  methods: {
    listCategory() {
      var url = "category/list";
      let requestData = {
        data: this.userAccountId
      };

      Axios.post(url, requestData).then((response) => {
        let serverResponse = response.data;
        if (serverResponse && serverResponse.data != null) {
          let array = [];
          let serverCategories = serverResponse.data;
          for (var index = 0; index < serverCategories.length; index++) {
            let documentArray = new Array();
            let documentList = serverCategories[index].documentList;
            if (documentList != null && documentList.length > 0) {
              for (var j = 0; j < documentList.length; j++) {
                let note = {
                  id: documentList[j].id,
                  title: documentList[j].title,
                  status: documentList[j].status,
                  icon: 'el-icon-document',
                  createdDate: new Date(documentList[j].createdDate).toLocaleDateString(),
                };
                // if(getLength(note.title) > 20) {
                //     note.title = note.title.substr(0,10) + ' . . .';
                // }
                documentArray.push(note);
              }
            }
            let category = {
              id: serverCategories[index].id,
              categoryName: serverCategories[index].categoryName,
              notes: documentArray
            };
            array.push(category);
          }
          this.categories = array;
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    confirmCategory() {
      var url = "category/add";
      let requestData = {
        userAccountId: this.userAccountId,
        categoryName: this.categoryForm.name,
      };
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '创建成功',
            type: 'success'
          });
          this.listCategory();
          this.dialogFormVisible = false;
        } else {
          this.$notify.error({
            message: '创建失败'
          });
        }
      });
    },
    confirmNote() {
      var url = "document/add";
      let requestData = {
        categoryId: this.noteForm.categoryId,
        title: this.noteForm.noteName,
        content: this.noteForm.noteContent
      };
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '创建成功',
            type: 'success'
          });
          this.listCategory();
          this.detail(response.data.data);
          this.dialogFormVisible1 = false;
        } else {
          this.$notify.error({
            message: '创建失败'
          });
        }
      });
    },
    detail(note) {
      for (var i = 0; i < this.categories.length; i++) {
        for(var j=0; j < this.categories[i].notes.length;j++) {
            if(this.categories[i].notes[j].icon != 'el-icon-document'){
              this.categories[i].notes[j].icon = 'el-icon-document';
            }
        }
      }
      var url = "document/detail";
      let requestData = {
        data: note.id
      };
      Axios.post(url, requestData).then((response) => {
        this.currentNote = response.data.data;
        note.icon = 'el-icon-edit';
      });
    },
    deleteCategory(category) {
      if (category.notes && category.notes.length > 0) {
        //this.$notify.error({message: '只能删除空目录',});
        return;
      }
      var url = "category/delete";
      let requestData = {
        id: category.id
      };
      this.$confirm('确认删除吗?', '提示', {}).then(() => {
        Axios.post(url, requestData).then((response) => {
          if (response && response.data && response.data.data) {
            this.listCategory();
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      });
    },
    deleteNote(noteId) {
      var url = "document/delete";
      let requestData = {
        id: noteId
      };
      this.$confirm('确认删除吗?', '提示', {}).then(() => {
        Axios.post(url, requestData).then((response) => {
          if (response && response.data && response.data.data) {
            if (this.currentNote.id === noteId) {
              this.content = null;
            };
            this.listCategory();
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
          }
        });
      });
    },
    modifyNote() {
      if (this.currentNote && this.currentNote.id) {
        this.modifyNoteForm = this.currentNote;
        this.dialogFormVisible2 = true;
      }
    },
    confirmModifyNote() {
      var url = "document/modify";
      Axios.post(url, this.modifyNoteForm).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '修改成功',
            type: 'success'
          });
          this.listCategory();
          this.detail(response.data.data);
          this.dialogFormVisible2 = false;
        } else {
          this.$notify.error({
            message: '修改失败'
          });
        }
      });
    },
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        sessionStorage.removeItem('user');
        _this.$router.push('/');
      }).catch(() => {

      });
    }
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
    font-family: 'Courier New', Courier, monospace;
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

  .el-icon-circle-plus-outline{
    font-size: 20px;
    color: rgb(33, 177, 221);
    margin: 19px 10px 20px 20px;
  }
  .el-submenu .el-menu-item {
    height: 55px;
    line-height: 35px;
}
  .el-submenu{
    line-height: 35px;
  }
  .el-submenu__title{
    line-height: 45px;
    height: 45px;
  }
  .noteTime{
    position: absolute;
    top: 25px;
    right:20px;
    font-size: 12px;
    color: #008080;
  }
  .noteTitle{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
    width:160px; 
    display:inline-block;
  }
  .el-menu-item-group__title {
    padding:0; 
    line-height: normal;
  }
  .container{
    border: 1px solid #eee;
    min-height: 700px;
  }
  
</style>

