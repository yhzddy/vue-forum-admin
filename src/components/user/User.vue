<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
            @keyup.enter.native="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="email"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStatausChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 操作区域 -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 编辑用户 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="getUserById(scope.row.id)"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserInfo(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户dialog -->

    <el-dialog
      title="添加用户"
      :visible.sync="addVisible"
      width="30%"
      @close="resetAddForm"
    >
      <el-form
        :model="addForm"
        status-icon
        :rules="addFormRule"
        ref="addformRef"
        label-width="100px"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input
            type="text"
            v-model="addForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            type="text"
            v-model="addForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户区域 -->
    <el-dialog
      title="添加用户"
      :visible.sync="editVisible"
      width="30%"
      @close="resetEditForm"
    >
      <el-form
        :model="editForm"
        status-icon
        :rules="editFormRule"
        ref="editformRef"
        label-width="100px"
      >
        <el-form-item label="用户名称">
          <el-input
            type="text"
            v-model="editForm.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWithParams, put, post, get, putWithData, del } from "../../api";
import rules from "../../utils/rules";

//<template slot-scope="scope">{{scope.row}}</template> 作用域插槽 插在一列上用于取到改行的完整数据  slot-scope接受了当前作用域的数据
//作用域插槽与prop同时存在，作用域插槽会覆盖prop
export default {
  name: "users",
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前页码
        pagesize: 10
      },
      userList: [],
      total: 0,
      addVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRule: rules,
      editVisible: false,
      //查询和修改用户的对象
      editForm: {},
      editFormRule: {
        email: rules.email,
        mobile: rules.mobile
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表
    async getUserList() {
      const { data: res } = await getWithParams("/users", this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败!");
      }
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    //监听页尺寸的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听当前页码的变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听switch开关用户状态
    async userStatausChanged(userinfo) {
      console.log(userinfo);
      const { data: res } = await put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("用户状态更新失败!");
      }
      this.$message.success("用户状态更新成功!");
    },
    //监听用户添加对话框 重置添加dialog里的表单
    resetAddForm() {
      this.$refs.addformRef.resetFields();
    },
    resetEditForm() {
      this.$refs.editformRef.resetFields();
    },
    //添加用户信息
    addUserInfo() {
      this.$refs.addformRef.validate(async valid => {
        if (valid) {
          const { data: res } = await post("users", this.addForm);
          if (res.meta.status !== 201) {
            this.$message.error("添加用户失败");
          } else {
            this.$message.success("添加用户成功");
          }
          this.addVisible = false;
          this.getUserList();
        }
      });
    },
    // 根据id查询用户信息
    async getUserById(id) {
      const { data: res } = await get(`users/${id}`);
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("查询信息失败");
      } else {
        this.editForm = res.data;
      }
      this.editVisible = true;
    },
    //修改用户信息
    editUserInfo() {
      let editData = {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      };
      this.$refs.editformRef.validate(async valid => {
        if (valid) {
          const { data: res } = await putWithData(
            `users/${this.editForm.id}`,
            editData
          );
          console.log(this.editForm);
          console.log(this.editForm.id);

          console.log(res);
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg);
          } else {
            this.$message.error(res.meta.msg);
          }
          this.editVisible = false;
          this.getUserList();
        }
      });
    },
    //根据id删除用户
    async removeUserInfo(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      //如果confirmResult为confirm 则进行删除
      //如果confirmResult为cancel 则取消删除
      if (confirmResult === "confirm") {
        const { data: res } = await del(`users/${id}`);
        if (res.meta.status === 200) {
          this.$message.success("删除用户成功");
          this.getUserList();
        } else {
          this.$message.info("删除用户失败");
        }
      }
    }
  }
};
</script>

<style></style>
