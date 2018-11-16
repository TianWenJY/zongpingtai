<template>
  <div>
    <!-- <bread-crumb></bread-crumb> -->
    <el-row class="containt">
      <el-row>
        <el-form class="filterBlock" :inline="true" :gutter="20">
          <el-row class="filterContent">
            <el-form-item label="查询关键字">
              <el-input v-model="parameter.keys"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="parameter.Mobile"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn btn-info filterFirst  fr" @click="filter">
                <span class="glyphicon glyphicon-filter">筛选</span>
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="btn btn-info  fr" @click="resetting">
                <span class="glyphicon glyphicon-filter">重置</span>
              </el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- <el-tabs v-model="activeTag" type="card" @tab-click="handleClick"> -->
          <el-table ref="multipleTable" 
                    border 
                    :data="deviceList" 
                    tooltip-effect="dark" 
                    style="width: 100%" 
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="Name" label="角色名称">
            </el-table-column>
            <el-table-column prop="AddTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="AddTime" label="修改时间">
            </el-table-column>
            <el-table-column prop="AddTime" label="创建人">
            </el-table-column>
            <el-table-column prop="AddTime" label="修改人">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.ID)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total='totalCount' style="margin-top:15px;">
          </el-pagination>
          <!-- </el-tab-pane> -->
          <!-- </el-tabs> -->
        </el-col>

        <!--新增编辑界面-->
        <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
          <el-form :model="nowList" label-width="80px">
            <!-- :size="size" -->
            <el-form-item label="ID" prop="id" v-if="false">
              <el-input v-model="nowList.ID" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名" prop="name">
              <el-input v-model="nowList.Name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注 " prop="remark">
              <el-input v-model="nowList.Descri" auto-complete="off" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="submitForm">提交</el-button>
          </div>
        </el-dialog>

      </el-row>
    </el-row>
  </div>
</template>

<script>
// import breadCrumb from "@/components/breadCrumb";
export default {
  name: "firstInfo",
  components: {
    breadCrumb
  },
  data() {
    return {
      activeTag: "first",
      token: this.getToken(),
      Count: "",
      WToken: this.token,
      value3: "",
      selectTable: {},
      dialogFormVisible: false,
      deviceList: [],
      formLabelWidth: "120px",
      totalCount: 20,
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      operation: false, // true:新增, false:编辑
      parameter: {
        WToken: "",
        Keys: "",
        Date: "",
        Sort: "",
        Mobile: "",
        N: "",
        Rows: ""
      },
      pageSize: 10,
      pageNum: "",
      nowList: ""
    };
  },
  mounted() {
    var _this = this;
    _this.parameter.Rows = _this.pageSize;
    _this.parameter.WToken = _this.token;
    _this.GetDevice(_this.parameter);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      //分页
      console.log(tab, event);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetDevice({
        WToken: this.token,
        N: this.pageNum,
        Rows: this.pageSize
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.GetDevice({
        WToken: this.token,
        N: this.pageNum,
        Rows: this.pageSize
      });
    },
    GetDevice(parameter) {
      var _this = this;
      //  _this.post('Administrator/QueryRoleList',parameter,
      _this.tpost("roleList", {}, res => {
        if (res.body.Status == 0) {
          _this.totalCount = parseInt(res.body.Data.Count);
          _this.deviceList = res.body.Data.Rows;
        } else if (res.body.Status == -1) {
          _this.$notify.error({
            title: "登录失效",
            message: "将进入登录页面",
            offset: 100
          });
          _this.$router.push("/login");
        } else {
          _this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.operation = true;
      this.dialogFormVisible = true;
      console.log(index);
      console.log(row);
      this.nowList = row;
    },
    upDateEngine(id) {
      this.$http
        .post(
          this.url + "AdminQrMobileMng/QueryFirstDispenseInfoList",
          {
            WToken: this.token,
            N: 1,
            Rows: 10,
            Keys: "",
            Date: "",
            Mobile: ""
          },
          { emulateJSON: true }
        )
        .then(
          function(result) {
            if (result.body.Status == 0) {
              this.$message({
                type: "success",
                message: "更新当前设备成功"
              });
              this.GetDevice();
            } else if (result.body.Status == -1) {
              this.$notify.error({
                title: "登录失效",
                message: "将进入登录页面",
                offset: 100
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "更新失败",
                offset: 100
              });
              return false;
            }
          },
          function(result) {
            alert(result);
          }
        );
    },
    handleDelete(id) {
      //删除
      console.log(id);
      // _this.post('Administrator/DelRole',parameter,
      //     (res)=>{
      //       if(res.body.Status == 0) {
      //     _this.totalCount = parseInt(res.body.Data.Count);
      //     _this.deviceList = res.body.Data.Rows;
      //   }else if(res.body.Status == -1){
      //     _this.$notify.error({
      //       title: '登录失效',
      //       message: '将进入登录页面',
      //       offset: 100
      //     });
      //     _this.$router.push('/login');
      //   }else {
      //     _this.$notify.error({
      //       title: '错误',
      //       message: '请输入正确的用户名密码',
      //       offset: 100
      //     });
      //     return false;
      //   }
      // }
      //  );
    },
    addDateEngine() {
      this.$router.push({ path: "addEngine" });
    },
    filter() {
      var _this = this;
      _this.GetDevice(_this.parameter);
    },
    resetting() {
      this.parameter = {};
      this.parameter.Rows = this.pageSize;
      this.parameter.WToken = this.token;
      this.GetDevice(this.parameter);
    },
    // 获取数据
    findTreeData: function() {
      this.menuLoading = true;
      this.$api.menu.findMenuTree().then(res => {
        this.menuData = res.data;
        this.menuLoading = false;
      });
    },
    // 角色选择改变监听
    handleRoleSelectChange(val) {
      if (val == null || val.val == null) {
        return;
      }
      this.selectRole = val.val;
      this.$api.role.findRoleMenus({ roleId: val.val.id }).then(res => {
        this.currentRoleMenus = res.data;
        this.$refs.menuTree.setCheckedNodes(res.data);
      });
    },
    // 树节点选择监听
    handleMenuCheckChange(data, check, subCheck) {
      if (check) {
        // 节点选中时同步选中父节点
        let parentId = data.parentId;
        this.$refs.menuTree.setChecked(parentId, true, false);
      } else {
        // 节点取消选中时同步取消选中子节点
        if (data.children != null) {
          data.children.forEach(element => {
            this.$refs.menuTree.setChecked(element.id, false, false);
          });
        }
      }
    },
    // 重置选择
    resetSelection() {
      this.checkAll = false;
      this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus);
    },
    // 全选操作
    handleCheckAll() {
      if (this.checkAll) {
        let allMenus = [];
        this.checkAllMenu(this.menuData, allMenus);
        this.$refs.menuTree.setCheckedNodes(allMenus);
      } else {
        this.$refs.menuTree.setCheckedNodes([]);
      }
    },
    // 递归全选
    checkAllMenu(menuData, allMenus) {
      menuData.forEach(menu => {
        allMenus.push(menu);
        if (menu.children) {
          this.checkAllMenu(menu.children, allMenus);
        }
      });
    },
    // 角色菜单授权提交
    submitAuthForm() {
      let roleId = this.selectRole.id;
      if ("admin" == this.selectRole.name) {
        this.$message({
          message: "超级管理员拥有所有菜单权限，不允许修改！",
          type: "error"
        });
        return;
      }
      this.authLoading = true;
      let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true);
      let roleMenus = [];
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        let roleMenu = { roleId: roleId, menuId: checkedNodes[i].id };
        roleMenus.push(roleMenu);
      }
      this.$api.role.saveRoleMenus(roleMenus).then(res => {
        if (res.code == 200) {
          this.$message({ message: "操作成功", type: "success" });
        } else {
          this.$message({ message: "操作失败, " + res.msg, type: "error" });
        }
        this.authLoading = false;
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="column-container">
          <span style="text-algin:center;margin-right:80px;">{data.name}</span>
          <span style="text-algin:center;margin-right:80px;">
            <el-tag
              type={data.type === 0 ? "" : data.type === 1 ? "success" : "info"}
              size="small"
            >
              {data.type === 0 ? "目录" : data.type === 1 ? "菜单" : "按钮"}
            </el-tag>
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {" "}
            <i class={data.icon} />
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {data.parentName ? data.parentName : "顶级菜单"}
          </span>
          <span style="text-algin:center;margin-right:80px;">
            {data.url ? data.url : "\t"}
          </span>
        </div>
      );
    }
  }
};
</script>
<style lang="less">
.containt {
  padding: 20px;
  padding-top: 0;
}
.filterBlock {
  margin-bottom: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  .filterHeader {
    background-color: #fcfcfc;
    padding: 0 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ebebeb;
    font-size: 16px;
  }
  .filterContent {
    padding: 25px 16px 16px 16px;
    background-color: #f2f2f2;
    .filterInput {
      //box-shadow: 0 0 1.5px #eee;
      .filterText {
        margin-bottom: 6px;
      }
    }
    .filterFirst {
      margin-right: 15px;
    }
  }
}
.breadStyle {
  height: 50px;
}
.tableTop {
  height: 40px;
  line-height: 40px;
  font-size: 0;
  :last-child {
    border-right: 2px solid #eee;
  }
}
.table {
  padding: 32px;
  border: 2px solid #eee;
  border-top: 0;
  box-shadow: 0 0 1.5px #eee;
  .el-table__header-wrapper {
    /*border-top: 1px solid #ebeef5;*/
  }
}
.el-tabs__header {
  margin: 0;
}
.el-tabs__item {
  width: 150px;
  text-align: center;
  font-size: 20px;
}
.el-tabs__item.is-active {
  border-top: 2px solid #2d4fa7;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 0 1.5px #eee;
}
.el-table th {
  background: #fafafa;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-dialog__title {
  font-weight: 700;
}
</style>
