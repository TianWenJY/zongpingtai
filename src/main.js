// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import "@/common/common.css";
import commonJs from '../static/common/common.js';
import Base from 'js-base64';


Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(commonJs);
Vue.use(Base);

/* eslint-disable no-new */
const myapp = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

export {myapp};


 
