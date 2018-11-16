<template>
    <div class="main">
        <section>
            <img src="@/assets/login/logo.png">
            <div class="form">
                <div class="input uname">
                    <input type="text" name="uname" placeholder="用户名/手机号">
                </div>
                <div class="input pwd">
                    <input type="password" name="pwd" placeholder="请输入密码">
                    <!-- <span class="forget">找回密码</span> -->
                    <span class="showCreator" style="float:right;margin: 10px 0 0 10px;"><a style="color:#ea5514;" href="#">手机验证登陆</a></span>
                </div>
                <div class="input creator">
                    <input type="text" name="mobile"  class="getMobile" placeholder="请输入手机号">
                </div>
                <div class="input input-small creator">
                    <input type="text" name="vc" class="myMsg" placeholder="请输入验证码">
                    <a href="javascript:void(0)" class="getForget">获取验证码</a>
                    <!-- <span class="forget"><a href="../forget/forget.html" target="_blank">找回密码</a></span> -->
                    <span class="showUser" style="float:right;margin: 10px 0 0 10px;"><a style="color:#ea5514;" href="#">账户登陆</a></span>
                </div>
                <button class="userLogin">登录</button>
                <button class="mesLogin">登录</button>
            </div>
            <footer>版权所有 © 2017 车势力 cheshili.cn 鲁ICP备11022834号-6</footer>
        </section>
    </div>
</template>

<script>
import $ from "jquery";
import $$ from "@/fifter/fifter.js";
import layer from '@/fifter/layer.js';
import comm from '../../../static/common/common.js';
export default {
  data() {
    return {
    };
  },
  created(){
  },
  methods:{
    
  },
  mounted() {
    var _this = this;
    var superAdmin = "creator",
      serverAddr = $$.config.serverAddr,
      getForget = $(".getForget"),
      countdown = 60;
    $(".mesLogin").hide();
    $("form .showCreator").on("click", function() {
      $("div.uname").hide();
      $("div.pwd").hide();
      $("div.creator").css("display", "block");
      $(".userLogin").hide();
      $(".mesLogin").show();
    });
    $("form .showUser").on("click", function() {
      $("div.creator").css("display", "none");
      $("div.uname").show();
      $("div.pwd").show();
      $(".userLogin").show();
      $(".mesLogin").hide();
    });
    $(".getForget").click(function() {
      if (countdown == 60) {
        mobileIsRG();
      } else {
        event.preventDefault();
      }
    });
    // 检测手机号是否注册
    function mobileIsRG() {
      $.ajax({
        url: $$.config.serverAddr + "PubInterface/Login/MobileIsRG",
        type: "POST",
        data: {
          Mobile: $(".getMobile").val()
        },
        dataType: "json",
        success: function(res) {
          if (res.Status == 0) {
            sendCode();
          } else if (res.Status == 81) {
            layer.msg("手机号未注册");
            return false;
          } else if (res.Status == 85) {
            layer.msg("未注册商家端");
            return false;
          } else if (res.Status == -4) {
            layer.msg("手机号不能为空");
            return false;
          }
        },
        error: function() {
          layer.msg("登录失败，请稍候再试！");
        }
      });
    }
    function sendCode() {
      $.ajax({
        url: $$.config.serverAddr + "PubInterface/Login/SendCode",
        type: "POST",
        data: {
          Mobile: $(".getMobile").val(),
          Type: 7
        },
        dataType: "json",
        success: function(res) {
          if (res.Status == 0) {
            layer.msg("验证码发送成功！");
            setTime();
          }
        },
        error: function() {
          layer.msg("验证码发送失败，请稍候再试！");
        }
      });
    }
    $(".form input[name=uname]").blur(function() {
      if ($(this).val() == superAdmin) {
        $("div.main").addClass("creator");
      } else {
        $("div.main").removeClass("creator");
      }
    });
    $(".userLogin").click(function() {
      var uItem = $(".form input[name=uname]"),
        pItem = $(".form input[name=pwd]"),
        uname = $.trim(uItem.val()),
        pwd = $.trim(pItem.val());
      if (!uname) {
        layer.msg("请输入用户名！");
        uItem.focus();
        return false;
      }
      if (!pwd) {
        layer.msg("请输入密码！");
        pItem.focus();
        return false;
      }
      $.ajax({
        url: $$.config.serverAddr + "PubInterface/Login/LG",
        type: "POST",
        data: {
          mobile: uname,
          pwd: pwd,
          Platform: 99,
          Mobile: 1
        },
        dataType: "json",
        success: function(res) {
          if (res.Status == 0 && res.Data) {
            $$.setToken(res.Data.WToken);
            sessionStorage.setItem("__TOKEN__", res.Data.WToken);
            var token = sessionStorage.setItem("__UINFO__", res.Data.Info);
            sessionStorage.setItem("uname", $("input[name=uname]").val());
            var uInfo = Base64.decode(unescape(res.Data.Info)),
            uObj = JSON.parse(uInfo);
            console.log(uObj)
            layer.msg("登录成功！");
           if (uObj.bin_id == 1) {
              _this.$router.push({
                path: "/generalPart"
              });
            } else if (uObj.bin_id == 2) {
              _this.$router.push({
                name: "carServer_statics",
                params: {
                  mer_id: uObj.mer_id
                }
              });
            } else if (uObj.bin_id == 3) {
              _this.$router.push({
                path: "/piccPart"
              });
            }
          } else if (res.Status == 20) {
            layer.msg("用户未授权此应用");
            return false;
          } else if (res.Status == 99) {
            layer.msg("账户或密码错误");
            return false;
          } else if (res.Status == -2) {
            layer.msg("应用没有权限");
            return false;
          } else if (res.Status == -3) {
            layer.msg("验证码错误");
            return false;
          } else if (res.Status == -4) {
            layer.msg("数据验证错误");
            return false;
          } else if (res.Status == -5) {
            layer.msg("文件类型错误");
            return false;
          } else if (res.Status == -6) {
            layer.msg("文件扩展类型错误");
            return false;
          } else if (res.Status == -7) {
            layer.msg("文件大小错过限制");
            return false;
          } else if (res.Status == -8) {
            layer.msg("文件上传失败");
            return false;
          } else if (res.Status == -9) {
            layer.msg("图片文件尺寸错误");
            return false;
          } else if (res.Status == -10) {
            layer.msg("枚举类型错误");
            return false;
          } else if (res.Status == -11) {
            layer.msg("验证码不可用");
            return false;
          } else if (res.Status == -12) {
            layer.msg("表达式验证不通过");
            return false;
          } else if (res.Status == -100) {
            layer.msg("用户已冻结");
            return false;
          } else if (res.Status == 5) {
            layer.msg("没有此用户");
            return false;
          } else if (res.Status == 4) {
            layer.msg("密码错误");
            return false;
          } else {
            layer.msg("未知错误");
            return false;
          }
        },
        error: function() {
          layer.msg("登录失败，请稍候再试！");
        }
      });
    });
    $(".mesLogin").click(function(e) {
      var getMobile = $(".getMobile").val(),
        myMsg = $(".myMsg").val(),
        getMobile = $.trim(getMobile);
      if (!getMobile) {
        layer.msg("请输入手机号！");
        $(".getMobile").focus();
        return false;
      }
      if (!myMsg) {
        layer.msg("请输入动态密码！");
        $(".myMsg").focus();
        return false;
      }
      VerifyCode();
      e.stopPropagation();
      e.preventDefault();
    });
    function VerifyCode() {
      $.ajax({
        url: $$.config.serverAddr + "Login/VerifyCode",
        type: "POST",
        data: {
          Mobile: $(".getMobile").val(),
          Code: $(".myMsg").val()
        },
        dataType: "json",
        success: function(res) {
          if (res.Status == 0) {
            $.ajax({
              url: $$.config.serverAddr + "Login/ShortMesLG",
              type: "POST",
              data: {
                BigPlatform: 21,
                Mobile: $(".getMobile").val()
              },
              dataType: "json",
              success: function(res) {
                if (res.Status == 0) {
                  $$.setToken(res.Data.WToken);
                  sessionStorage.setItem("__UINFO__", res.Data.Info);
                  sessionStorage.setItem("uname", $("input[name=uname]").val());
                  layer.msg("登录成功！");
                } else if (res.Status == 20) {
                  layer.msg("用户未授权此应用");
                  return false;
                } else if (res.Status == 99) {
                  layer.msg("未知错误");
                  return false;
                } else if (res.Status == -2) {
                  layer.msg("应用没有权限");
                  return false;
                } else if (res.Status == -3) {
                  layer.msg("验证码错误");
                  return false;
                } else if (res.Status == -4) {
                  layer.msg("数据验证错误");
                  return false;
                } else if (res.Status == -5) {
                  layer.msg("文件类型错误");
                  return false;
                } else if (res.Status == -6) {
                  layer.msg("文件扩展类型错误");
                  return false;
                } else if (res.Status == -7) {
                  layer.msg("文件大小错过限制");
                  return false;
                } else if (res.Status == -8) {
                  layer.msg("文件上传失败");
                  return false;
                } else if (res.Status == -9) {
                  layer.msg("图片文件尺寸错误");
                  return false;
                } else if (res.Status == -10) {
                  layer.msg("枚举类型错误");
                  return false;
                } else if (res.Status == -11) {
                  layer.msg("验证码不可用");
                  return false;
                } else if (res.Status == -12) {
                  layer.msg("表达式验证不通过");
                  return false;
                } else if (res.Status == -100) {
                  layer.msg("用户已冻结");
                  return false;
                } else if (res.Status == 5) {
                  layer.msg("没有此用户");
                  return false;
                } else if (res.Status == 4) {
                  layer.msg("密码错误");
                  return false;
                } else if (res.Status == 80) {
                  layer.msg("短信错误");
                  return false;
                } else {
                  layer.msg("未知错误");
                  return false;
                }
              },
              error: function() {
                layer.msg("登录失败，请稍候再试！");
              }
            });
          } else if (res.Status == -4) {
            layer.msg("验证码不正确！");
          }
        },
        error: function() {
          layer.msg("验证码发送失败，请稍候再试！");
        }
      });
    }
    // 倒计时
    function setTime() {
      if (countdown == 0) {
        $(".getForget").attr("disabled", "");
        // $('.getForget').css("background","#EA5514");
        $(".getForget").html("获取验证码");
        countdown = 60;
        return;
      } else {
        $(".getForget").attr("disabled", "true");
        $(".getForget").html("重新发送(" + countdown + ")");
        countdown--;
      }
      setTimeout(function() {
        setTime();
      }, 1000);
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@duration: 0.4s;
div.main {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  > section {
    height: 240px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 30%;
    text-align: center;
    transition: height @duration, top @duration;
    > img {
      width: 338px;
      height: 70px;
      margin-top: 75px;
      margin-left: -30%;
      transition: margin-top @duration, left @duration, top @duration,
        right @duration;
    }
    > .form {
      height: 240px;
      width: 220px;
      position: absolute;
      top: 0;
      right: 20%;
      padding-top: 40px;
      transition: height @duration, width @duration, padding-top @duration;
      > .input {
        margin-bottom: 20px;
        background-color: #fff;
        height: 34px;
        border-radius: 4px;
        transition: margin-bottom @duration;
        &::before {
          content: "";
          display: block;
          width: 24px;
          height: 24px;
          margin: 5px 0 0 10px;
          background-repeat: no-repeat;
          background-size: contain;
          float: left;
        }
        &:nth-child(1)::before {
          background-image: url("../../assets/login/user.png");
        }
        &:nth-child(2)::before {
          background-image: url("../../assets/login/pwd.png");
        }
        &:nth-child(3)::before {
          background-image: url("../../assets/login/phone.png");
          width: 26px;
          height: 26px;
        }
        &:nth-child(4)::before {
          background-image: url("../../assets/login/safe.png");
          width: 26px;
          height: 26px;
        }
        > input {
          box-sizing: border-box;
          height: 34px;
          width: 174px;
          border: 0;
          outline: 0;
          font-size: 14px;
        }
        &.input-small {
          width: 140px;
          position: relative;
          > input {
            width: 84px;
          }
          > a {
            position: absolute;
            top: -1px;
            right: -100px;
            width: 90px;
            height: 36px;
            line-height: 36px;
            color: #fff;
            display: block;
            background-color: #ea5514;
            border-radius: 6px;
            font-size: 14px;
          }
        }
        &.creator {
          display: none;
          transition: display @duration;
        }
      }
      > button {
        height: 40px;
        width: 100%;
        border-radius: 6px;
        background-color: #ea5514;
        margin-top: 12px;
        border: 0;
        outline: 0;
        color: #fff;
        font-size: 16px;
        line-height: 39px;
        &:hover {
          background-color: #d44d12;
        }
      }
    }
    > footer {
      color: #fff;
      width: 100%;
      position: absolute;
      bottom: -50%;
    }
  }
  &.creator {
    > section {
      height: 280px;
      top: 25%;
      > img {
        margin-top: 95px;
      }
      > form {
        height: 280px;
        width: 240px;
        padding-top: 30px;
        > .input {
          margin-bottom: 10px;
          > input {
            width: 184px;
          }
          &.input-small {
            > input {
              width: 84px;
            }
          }
          &.creator {
            display: block;
          }
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  div.main {
    > section {
      height: 360px;
      top: 20%;
      > img {
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 10%;
      }
      > form {
        margin: 0 auto;
        right: 0;
        left: 0;
        top: 30%;
      }
    }
    &.creator {
      > section {
        height: 360px;
        top: 20%;
        > img {
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 6%;
        }
        > form {
          margin: 0 auto;
          right: 0;
          left: 0;
          top: 22%;
          height: 280px;
          width: 240px;
          > .input {
            margin-bottom: 10px;
            &.creator {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>

