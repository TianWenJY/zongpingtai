
<template>
  <div>
    <!-- <bread-crumb></bread-crumb> -->
    <el-row class="containt">
      <el-row>
        <el-form class="filterBlock" :inline="true" :gutter="20">
          <el-row class="filterContent">
            <!-- <el-form-item label="申请状态">
              <el-select v-model="parameter.Status" placeholder="申请状态" size="medium">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="待审核" :value="0"></el-option>
                <el-option label="待电话沟通" :value="1"></el-option>
                <el-option label="未通过" :value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="申请人姓名">
              <el-input v-model.trim="parameter.Name" size="medium" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="申请手机号">
              <el-input v-model.trim="parameter.Mobile" size="medium" clearable></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="省">
                    <select class="form-control" v-model="condition.ProvinceID" @change="provinceChange">
                        <option value="">全部</option>
                        <template v-for="(p, index) in province">
                            <option :value="p.ID" v-text="p.Name" :data-index="index"></option>
                        </template>
                    </select>
                </el-form-item>
                <el-form-item label="市">
                    <select class="form-control" v-model="condition.CityID" @change="cityChange">
                        <option value="">全部</option>
                        <template v-for="(c, index) in city">
                            <option :value="c.ID" v-text="c.Name" :data-index="index"></option>
                        </template>
                    </select>
                </el-form-item>
                <el-form-item label="区">
                    <select class="form-control" v-model="condition.CountyID">
                        <option value="">全部</option>
                        <template v-for="c in county">
                            <option :value="c.ID" v-text="c.Name"></option>
                        </template>
                    </select>
                </el-form-item> -->
            <!-- <el-form-item label="申请时间">
              <el-date-picker class="form-control" size="medium" type="daterange" range-separator="至" value-format="timestamp" arrow-control v-model="parameter.AddTime" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item>
              <el-button size="medium" type="primary" @click="filter">
                筛选
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="handleAdd">
                新增
              </el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!-- <el-tabs v-model="activeTag" type="card" @tab-click="handleClick"> -->
          <el-table ref="multipleTable" border :data="tableList" tooltip-effect="dark" stripe style="width: 100%" size="medium" @selection-change="handleSelectionChange">
            <el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.change">
            </el-table-column>
            <el-table-column label="操作" width="420">
              <template slot-scope="scope">
                <!-- <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row.ID)">详情</el-button> -->
                <el-button size="mini" type="danger" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.mer_id)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total='totalCount' style="margin-top:15px;">
          </el-pagination>
          <!-- </el-tab-pane> -->
          <!-- </el-tabs> -->
        </el-col>

        <!--新增编辑界面-->
        <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
          <el-form :model="dataForm" label-width="120px" :rules="dataFormRules" ref="dataForm" label-position="right">
            <el-form-item label="ID" prop="id" v-if="false">
              <el-input v-model="dataForm.mer_id" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="门店店长" prop="name" v-if="this.operation">
              <el-select placeholder="请选择店长" v-model="dataForm.mer_id">
                <el-option v-for="user in allUser" :key="user.mer_id" :label="user.name" :value="user.mer_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门店名称" prop="name">
              <el-input v-model="dataForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择省市县">
              <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="add_detail">
              <el-input v-model="dataForm.add_detail" auto-complete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label=" 法人姓名" prop="LegMobile">
              <el-input v-model="dataForm.creater" auto-complete="off"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label=" 法人手机" prop="LegMobile">
              <el-input v-model="dataForm.StoreName" auto-complete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="结算卡号" prop="CloCard">
              <el-input v-model="dataForm.debit_card" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label=" 结算卡开户行" prop="CloCardBand">
              <el-input v-model="dataForm.debit_bank" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label=" 联行号" prop="CloCardBand">
              <el-input v-model="dataForm.ss_bank_num" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商铺图片">
              <el-upload class="avatar-uploader" :auto-upload="false" action="http://192.168.0.201:8099/FS/"   list-type="picture-card">
                <img v-if="dataForm.cus_license" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="上传营业执照"> -->
               <el-button size="mini" type="danger">上传营业执照</el-button> -->
              <input type="file" style="background: #409EFF; width: 70px;height:36 px;">
              <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :auto-upload="false" :on-success="handleBusinessAvatarScucess" :before-upload="beforeAvatarUpload">
                <img v-if="dataForm.cus_license" :src="baseImgPath + dataForm.cus_license" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
           </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="submitForm">提交</el-button>
          </div>
        </el-dialog>

      </el-row>
    </el-row>
  </div>
</template>

<script>
// import breadCrumb from "@/components/breadCrumb";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  name: "carServer_shopList",
  components: {
    // breadCrumb
  },
  data() {
    return {
      dialogImageUrl: "",
      baseImgPath:'http://192.168.0.201:8099/FS/',
      dialogVisible: false,
      options: regionDataPlus,
      selectedOptions: [],
      value: "",
      activeTag: "first",
      token: this.getToken(),
      Count: "",
      WToken: this.token,
      dialogFormVisible: false,
      tableList: [],
      totalCount: 20,
      currentPage: 1,
      dialogTableVisible: false,
      dialogVisible: false, // 新增编辑界面是否显示
      dialogFormVisible: false,
      operation: false, // true:新增, false:编辑
      parameter: {
        WToken: this.getToken(),
        ID: "",
        Status: -1,
        Name: "",
        Mobile: "",
        PCC: "",
        StoreName: "",
        Address: "",
        AddTime: "",
        N: "",
        Rows: ""
      },
      imageUrl: "",
      pageSize: 10,
      pageNum: "",
      allUser: "",
      nowList: "",
      dataFormRules: {
        Status: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ]
      },
      dataForm: {
        WToken: this.getToken(),
        mer_id: "",
        name: "",
        province: "",
        city: "",
        county: "",
        add_detail: "",
        // creater: "",
        cus_license: "",
        debit_bank: "",
        debit_card: "",
        ss_bank_num: ""
      },
      columns: [
        { prop: "mer_id", label: "门店ID", minWidth: 60 },
        { prop: "name", label: "门店名称", minWidth: 60 },
        { prop: "province", label: "所在省", minWidth: 80 },
        { prop: "city", label: "所在市", minWidth: 80 },
        { prop: "county", label: "所在县(区)", minWidth: 80 },
        { prop: "add_detail", label: "门店地址", minWidth: 120 },
        {
          prop: "addtime",
          label: "创建日期",
          minWidth: 100
        }
      ]
    };
  },
  mounted() {
    var _this = this;
    _this.parameter.Rows = _this.pageSize;
    _this.getPlate();
    _this.parameter.WToken = _this.token;
    _this.GetList(_this.parameter);
    this.selectedOptions[0] = TextToCode["北京市"].code;
    console.log(TextToCode["北京市"].code);
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(tab, event) {
      //分页
      console.log(tab, event);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetList({
        WToken: this.token,
        N: this.pageNum,
        Rows: this.pageSize
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.GetList({
        WToken: this.token,
        N: this.pageNum,
        Rows: this.pageSize
      });
    },
    GetList(parameter) {
      var _this = this;
      // if (this.addtime !== "" && this.addtime !== null) {
      //   this.parameter.addtime =
      //     "'" + this.addtime[0] + "'_'" + this.addtime[1] + "'";
      // } else {
      //   this.parameter.addtime = "";
      // }
      this.post("CarServer/Store/QueryStoreList", parameter, res => {
        if (res.body.Status == 0) {
          this.tableList = res.body.Data.Rows;
          this.totalCount = parseInt(res.body.Data.Count);
        } else if (res.body.Status == -1) {
          _this.$notify.error({
            title: "登录失效",
            message: "将进入登录页面",
            offset: 100
          });
          this.$router.push("/login");
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogVisible = true;
      this.operation = true;
      this.dataForm = {
        mer_id: "",
        name: "",
        province: "",
        city: "",
        county: "",
        add_detail: "",
        // creater: "",
        cus_license: "",
        debit_bank: "",
        debit_card: "",
        ss_bank_num: ""
      };
    },
    // 表单提交
    submitForm() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let api;
            if (this.operation) {
              api = "CarServer/Store/AddStore";
            } else {
              api = "CarServer/Store/UpdateStore";
            }
            console.log(this.selectedOptions);
            this.dataForm.province = CodeToText[this.selectedOptions[0]];
            this.dataForm.city = CodeToText[this.selectedOptions[1]];
            this.dataForm.county = CodeToText[this.selectedOptions[0]];
            this.dataForm.cus_license = this.$refs.upload;
            console.log(CodeToText[this.selectedOptions[0]]);
            let params = Object.assign({}, this.dataForm);

            this.post(api, params, res => {
              if (res.body.Status == 0) {
                this.$message({ message: "操作成功", type: "success" });
                this.dialogVisible = false;
                this.$refs["dataForm"].resetFields();
                (this.parameter = {
                  // WToken: "",
                  bin_id: 1,
                  role_id: 1,
                  name: "",
                  mobile: "",
                  addtime: "",
                  N: 1,
                  Rows: 8
                }),
                  this.GetList(this.parameter);
              } else if (res.body.Status == -1) {
                this.$notify.error({
                  title: "登录失效",
                  message: "将进入登录页面",
                  offset: 100
                });
                this.$router.push("/login");
              } else {
                this.$message({
                  message: "操作失败, " + res.body.Data,
                  type: "error"
                });
              }
            });
          });
        }
      });
    },
    handleEdit: function(params) {
      this.dialogVisible = true;
      this.operation = false;
      this.isAdd = false;
      console.log(params);
      this.dataForm = {
        mer_id: params.mer_id,
        name: params.name,
        province: params.province,
        city: params.city,
        county: params.county,
        add_detail: params.add_detail,
        // creater: params.creater,
        cus_license: params.cus_license,
        debit_bank: params.debit_bank,
        debit_card: params.debit_card,
        ss_bank_num: params.ss_bank_num
      };
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.post("CarServer/Store/DelStore", { mer_id: row }, res => {
          if (res.body.Status == 0) {
            this.$message({ message: "删除成功", type: "success" });
            this.parameter.N = 1;
            this.GetList(this.parameter);
          } else if (res.body.Status == -1) {
            this.$notify.error({
              title: "登录失效",
              message: "将进入登录页面",
              offset: 100
            });
            this.$router.push("/login");
          } else {
            this.$message({
              message: "操作失败, " + res.body.Data,
              type: "error"
            });
          }
        });
      });
    },
    filter() {
      var _this = this;
      _this.GetList(_this.parameter);
    },
    resetting() {
      this.parameter = {};
      this.parameter.Rows = this.pageSize;
      this.parameter.WToken = this.token;
      this.GetList(this.parameter);
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(
      //   "http://192.168.0.201:8099/FS/CarServer/CusLicense/C-FkaJNCrkRtMvEB.png"
      // );
    },
    handleBusinessAvatarScucess(res, file) {
      if (res.status == 1) {
        this.formData.business_license_image = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    getPlate() {
      this.post("PubInterface/User/QueryUserSelect", {}, res => {
        if (res.body.Status == 0) {
          this.allUser = res.body.Data;
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
  // font-size: 20px;
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
.el-pagination {
  float: right;
}
.el-dialog__header {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>