<template>
  <el-container class="home_container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" style="height:60px" />
        <span>论坛后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObject[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + child.path"
              v-for="child in item.children"
              :key="child.id"
              @click="saveStatus('/' + child.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ child.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧区域 -->
      <el-main>
        <!-- home子路由路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { get } from "../api";

export default {
  name: "home",
  data() {
    return {
      menulist: [],
      iconObject: {
        "125": "el-icon-s-custom",
        "103": "el-icon-s-flag",
        "101": "el-icon-s-shop",
        "102": "el-icon-s-order",
        "145": "el-icon-s-data"
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ""
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.activePath;
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
      this.$message.info("退出成功！");
    },
    async getMenuList() {
      const { data: res } = await get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.data.msg);
      this.menulist = res.data;
      console.log(res.data);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveStatus(activePath) {
      window.sessionStorage.activePath = activePath;
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: white;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
