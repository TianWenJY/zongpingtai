export default {
  install(Vue, VueResource) {
    Vue.prototype.url = 'http://192.168.0.201:8099/';
    Vue.prototype.getToken = function () {
      var token = sessionStorage.getItem('__TOKEN__');
          if(token) {
            return token;
          } else {
              // this.$alert('对不起，您没有登录', '去登陆系统', {
              //   confirmButtonText: '确定',
              //   showClose:false,
              //   callback: action => {
              //     this.$router.push('/');
              //   }
              // })
          }
    },
      Vue.prototype.setToken = function (token) {
        sessionStorage.setItem('__TOKEN__', token)
      },
      Vue.prototype.post = function (url, params,func) {
        // let token = this.getToken();
        if (typeof String.prototype.startsWith != 'function') {
          String.prototype.startsWith = function (prefix){
              return this.slice(0, prefix.length) === prefix;
          };
       }
      //  if(token) {
        // if (!url.startsWith(this.url)) {
        //   url = this.url + url;
        //  }
        //  if(!params.token) {
        //   params = Object.assign(params,{WToken:token})
        // }
      //  }
      return new Promise((resolve, reject) => {
        this.$http.post(
          url,
          params,
          {emulateJSON: true}
        )
          .then(func)
          .catch((err) => {
            reject(err);
          });
      });
    },     
     Vue.prototype.tpost = function (url, params,func) {
    return new Promise((resolve, reject) => {
      this.$http.post(
        url,
        params,
        {emulateJSON: true}
      )
        .then(func)
        .catch((err) => {
          reject(err);
        });
    });
  },
    Vue.prototype.get10Time = function (time) {
      if(time == '') {
        return  ''
    }
    var date = time ? new Date(time) : new Date();
    return Math.round(date.getTime() / 1000);
    },
            // 10位时间戳转时间
    Vue.prototype.timeToStr = function(time, fmt) {
      if(time == null || time == '') {
        return '————'
      }else {
        return new Date(time * 1000).pattern(fmt || 'yyyy-MM-dd');
      }
    },
    Vue.prototype.loginTimeOut = function(status) {
      if(status == -1) {
        layer
      }
    },
    // 获取用户信息
    Vue.prototype.getUserInfo = function () {
      let uInfoStr = sessionStorage.getItem('__UINFO__');
      if(!uInfoStr) {
        return false;
      }
      return this.analyzeToken(uInfoStr);
    },
    Vue.prototype.analyzeToken = function(token) {
      var uInfo = Base64.decode(unescape(token)),
          uObj = JSON.parse(uInfo);
      return uObj;
    }
  }
}
function Delete (url,param,func) { //删除
    MessageBox.confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.post(
          url,
          param,
          res => {
            if (res.body.Status == 0) {
              this.$message({ message: "删除成功", type: "success" });
              func();
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
          }
        );
      });
 }
 export { Delete }