<template>
  <el-aside width="240px" class="aside">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" router @close="handleClose" background-color="#2c3f4d" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>通联支付</span>
        </template>
        <el-menu-item index="areacode">地区码列表</el-menu-item>
        <el-menu-item index="firstInfo">用户银行卡</el-menu-item>
        <el-menu-item index="firstInfo">商户卡列表</el-menu-item>
        <el-menu-item index="firstInfo">订单号列表</el-menu-item>
        <el-menu-item index="firstInfo">交易记录</el-menu-item>
        <el-menu-item index="tluser">商户列表</el-menu-item>
      </el-submenu>
      </el-menu-item>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>实名管理</span>
        </template>
        <el-menu-item index="certification">实名认证</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>团队</span>
        </template>
        <el-menu-item index="firstInfo">代理商列表</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="role">角色设置</el-menu-item>
        <!-- <el-menu-item index="menu">菜单管理</el-menu-item> -->
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Nav"
};
</script>
<style lang="less">
</style>
