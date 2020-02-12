<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autocomplete="on" :model="loginForm" ref="loginForm" label-position="left">
        <!-- <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div> -->
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
            <!-- <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span> -->
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
 
<script>
import Axios from 'axios';
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      pwdType: "password",
    };
  },

  methods: {
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
          alert('username or password is incorrect');
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
