
<template>
  <div class="indexPage">
    <div class="header">
      <span class="collapseBtn">
        <img src="@/assets/menu-open.png" v-if="!isCollapse" :label="false" @click="closeMenu">
        <img src="@/assets/menu-close.png" v-if="isCollapse" :label="true" @click="openMenu">
      </span>
      <img class="logo" src="@/assets/cheshililogo-white.png">
      <el-menu :default-active="activeIndex" router class="el-menu-nav" mode="horizontal" background-color="#252A2F" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/generalPart" v-if="myInfo.bin_id == 1">总板块</el-menu-item>
        <el-menu-item index="/piccPart" v-if="(myInfo.bin_id == 1) || (myInfo.bin_id == 3)">picc板块</el-menu-item>
        <el-menu-item @click="goCarServer" v-if="(myInfo.bin_id == 1) || (myInfo.bin_id == 2)">汽车服务板块</el-menu-item>
        <el-menu-item index="4" v-if="myInfo.bin_id == 1">停车场板块</el-menu-item>
      </el-menu>
      <img class="user" src="@/assets/user.png">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userMoblie">
          187****3333<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>查看用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="loginOut" @click="loginOut">
        退出
      </span>
    </div>
    <div id="nav">
      <el-col :md="24">
        <el-menu default-active="/generalPart/statics" class="el-menu-vertical" background-color="#545c64" @open="handleOpen" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" router>
          <el-submenu v-for="(data,$index) in tableTreeDdata" :key="$index" :index="menuIndex[$index]">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span>{{data.name}}</span>
            </template>
            <el-menu-item v-for="(item,index) in data.Children" :index="item.url" :key="index">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <div id="chlidPage" :class="isCollapse?'scale':''">
      <div class="tagList">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="chooseTab">
          <el-tab-pane v-for="item in acheCompents" :key="item.name" :label="item.tagName" :name="item.name" :path="item.path">
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-breadcrumb class="bread" v-model="bread" separator="/">
        <el-breadcrumb-item>{{bread.partName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{bread.fatherTag}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{bread.childTag}}</el-breadcrumb-item>
      </el-breadcrumb>
      <transition name="slide-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "generalPart",
  computed: {
    getIndex: function(data) {
      return "data";
    }
  },
  data() {
    return {
      acheCompents: [
        {
          path: "/generalPart/statics",
          name: "generalPart_statics",
          tagName: "总括"
        }
      ],
      menuIndex: [],
      myInfo: "",
      tableTreeDdata: [],
      includedComponents: "",
      editableTabsValue: "generalPart_statics",
      isCollapse: false,
      bread: {
        partName: "平台总板块",
        fatherTag: "汽车服务板块统计",
        childTag: "总括"
      },
      activeIndex: "/generalPart"
    };
  },
  created() {
    this.myInfo = this.getUserInfo();
    this.getMenu({ mer_id: this.myInfo.mer_id });
    this.$router.beforeEach((to, from, next) => {
      if (!this.hasSameVal(this.acheCompents, "name", to.name)) {
        this.acheCompents.push({
          tagName: to.meta.tagName,
          path: to.path,
          name: to.name
        });
        this.includedComponents = this.acheCompents.join(",");
      }
      this.editableTabsValue = to.name;
      this.bread = {
        partName: to.meta.partName,
        fatherTag: to.meta.fatherTag,
        childTag: to.meta.tagName
      };
      next();
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    hasSameVal: (arr, key, val) => {
      let isHad = false;
      arr.forEach((value, index) => {
        if (value[key] == val) {
          isHad = true;
        }
      });
      return isHad;
    },
    chooseTab(targetName) {
      this.$router.push({
        path: targetName.$attrs.path
      });
    },
    removeTab(targetName) {
      let tabs = this.acheCompents;
      let activeName = this.editableTabsValue;
      let activePath = "";
      if (tabs.length == 1) {
        this.$message("最后一个标签不能删除");
        return false;
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              activePath = nextTab.path;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.$router.push({
        path: activePath
      });
      this.acheCompents = tabs.filter(tab => tab.name !== targetName);
      this.includedComponents = this.acheCompents.join(",");
    },
    closeMenu() {
      this.isCollapse = true;
    },
    openMenu() {
      this.isCollapse = false;
    },
    loginOut() {
      this.$confirm("您确定退出登录", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$router.push({
            path: "/login"
          });
        })
        .catch(action => {});
    },
    goCarServer() {
      this.$router.push({
        name: "carServer_statics",
        params: {
          mer_id: this.getUserInfo().mer_id,
          isPub: 1
        }
      });
    },
    getMenu(params) {
      this.post("PubInterface/UserMenu/QueryUserMenu", params, res => {
        if (res.body.Status == 0) {
          this.tableTreeDdata = res.body.Data[1][0];
          for (var i = 0; i < this.tableTreeDdata.length; i++) {
            this.menuIndex.push("'" + i + "'");
          }
          this.loading = false;
        } else if (res.body.Status == -1) {
          this.$notify.error({
            title: "登录失效",
            message: "将进入登录页面",
            offset: 100
          });
          this.$router.push("/login");
        } else {
          this.$notify.error({
            title: "错误",
            message: "请求错误",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.indexPage {
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;
    height: calc(100vh - 80px- 62px);
  }
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    width: 100%;
    height: 80px;
    background: #252a2f;
    color: #ffffff;
    display: flex;
    align-items: center;
    font-size: 14px;
    .collapseBtn {
      width: 64px;
      height: 100%;
      text-align: center;
      border-right: 1px solid #434a50;
      line-height: 80px;
      img {
        width: 16px;
        height: 16px;
      }
    }
    .logo {
      margin-left: 21px;
      widows: 88px;
      margin-right: auto;
    }
    .el-menu-nav {
      margin-right: 30px;
      height: 100%;
    }
    .el-menu--horizontal > .el-menu-item {
      height: 80px;
      line-height: 80px;
    }
    .user {
      width: 16px;
      margin-right: 8px;
    }
    .userMoblie {
      color: #ffffff;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }

    .loginOut {
      width: 50px;
      height: 100%;
      line-height: 80px;
      text-align: center;
      margin: 0 50px;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .tagList {
    font-size: 14px;
  }
  #nav {
    height: calc(100vh - 80px);
    background: rgb(84, 92, 100);
    position: absolute;
    top: 80px;
    .userInfo {
      width: 100%;
      height: 62px;
      display: flex;
      color: #ffffff;
      padding: 0 20px 0 24px;
      align-items: center;
      font-size: 14px;
      background: #434a50;
      box-sizing: border-box;
      img {
        width: 18px;
        &.right_icon {
          width: 10px;
        }
      }
      span {
        margin-left: 10px;
        margin-right: auto;
      }
    }
    .el-menu {
      border-right: none;
    }
  }
  #chlidPage {
    margin-left: 300px;
    transition: 0.3s;
    height: calc(100vh - 80px);
    overflow-y: auto;
    .bread {
      padding-left: 20px;
      align-items: center;
      display: flex;
      height: 45px;
    }
    &.scale {
      margin-left: 64px;
      transition: 0.6s;
    }
  }
}
</style>

