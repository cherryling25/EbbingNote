<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autocomplete="on" :model="loginForm" ref="loginForm" label-position="left">
        <div style="text-align: center">
          <i class="el-icon-magic-stick" style="font-size:28px; color: #409EFF"></i>
        </div>
        <h2 class="login-title color-main">EbbingNote</h2>
        <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autocomplete="on" placeholder="请输入用户名">
            <span slot="prefix">
              <i class="el-icon-user" style="width: 16px; color: #409EFF"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
            autocomplete="on" placeholder="请输入密码" @click="showPwd">
            <span slot="prefix">
              <i class="el-icon-view" style="width: 16px; color: #409EFF"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 30px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" :loading="loading" @click="dialogFormVisible = true">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 注册弹出框 -->
    <el-dialog title="注册" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="registerForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="registerForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registerForm.confirmPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import Axios from 'axios';
export default {
  name: "login",
    data() {
      return {
        dialogFormVisible: false,
        registerForm: {
          userName: '',
          password: '',
          confirmPwd: ''
        },
        formLabelWidth: '70px',
        loginForm: {
          username: "",
          password: ""
        },
        loading: false,
        pwdType: "password",
      };
    },
  methods: {
    register() {
      console.log(this.registerForm.userName);
      if(!this.registerForm.userName){
        this.$notify.error({
          message: '用户名不能为空'
        });
        return;
      }
      if(this.registerForm.password != this.registerForm.confirmPwd){
        this.$notify.error({
          message: '两次输入的密码不一致'
        });
        return;
      }
      var url = "useraccount/register";
      let requestData = {
        userName: this.registerForm.userName,
        password: this.registerForm.password,
        confirmPwd: this.registerForm.confirmPwd
      };
      
      console.log(requestData);
      Axios.post(url, requestData).then((response) => {
        if (response.data.data) {
          this.$notify({
            message: '注册成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
        } else {
          this.$notify.error({
            message: '注册失败'
          });
        }
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      var url = "useraccount/login";
      let requestData = {
        userName: this.loginForm.username,
        password: this.loginForm.password
      };
      Axios.post(url, requestData).then((response) => {
        let serverResponse = response.data;
        if (serverResponse && serverResponse.data != null) {
          this.$router.push({
            path: "/home/" + serverResponse.data.id
          });
        } else {
          this.$notify.error({
            message: '用户名或密码错误'
          });
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>
 
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
