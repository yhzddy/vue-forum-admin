<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
      this.$message.info("退出成功！");
    }
  }
};
</script>
