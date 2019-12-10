<template>
  <div class="login_contain">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginformref"
        :model="loginform"
        :rules="loginformrules"
        class="login_form"
      >
        <!-- 账号区域 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="bts">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { post } from "../api/login.js";

export default {
  name: "login",
  data() {
    return {
      //登录表单数据
      loginform: {
        username: "admin",
        password: "123456"
      },
      loginformrules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录
    login() {
      this.$refs.loginformref.validate(valid => {
        if (!valid) return;
        const res = post("login", this.loginform);
        // console.log(axios.baseUrl);
        // console.log(process.env.VUE_APP_URL);
        console.log(res);
      });
    },
    //重置表单
    resetForm() {
      this.$refs.loginformref.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login_contain {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); //左上移动自身宽度和高度的一半
  .avator_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 5px #dfdbdb;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.bts {
  display: flex;
  justify-content: flex-end;
}
</style>
