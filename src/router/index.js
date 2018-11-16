import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/generalPart',
            name: 'generalPart',
            component: resolve => require(['@/page/generalPart/index/index'], resolve),
            redirect: "/generalPart/statics",
            children: [
                {
                    path: '/generalPart/statics',
                    name: 'generalPart_statics',
                    component: resolve => require(['@/page/generalPart/statics/statics'], resolve),
                    meta: {
                        tagName: "总括",
                        partName: "平台总板块",
                        fatherTag: "监控",
                    }
                },
                {
                    path: '/generalPart/generalCallPart',
                    name: 'generalPart_generalCallPart',
                    component:resolve =>  require(['@/page/generalPart/callPart/callPart'], resolve),
                    meta: {
                        tagName: "移车码监控",
                        partName: "平台总板块",
                        fatherTag: "监控",
                    }
                },
                {
                    path: '/generalPart/callStatics',
                    name: 'generalPart_callStatics',
                    component:resolve =>  require(['@/page/generalPart/callStatics/callStatics'], resolve),
                    meta: {
                        tagName: "移车码总括详情",
                        partName: "平台总板块",
                        fatherTag: "移车码监控",
                    }
                },
                {
                    path: '/generalPart/generalParkPart',
                    name: 'generalPart_generalParkPart',
                    component:resolve =>  require(['@/page/generalPart/parkPart/parkPart'], resolve),
                    meta: {
                        tagName: "停车场监控",
                        partName: "平台总板块",
                        fatherTag: "监控",
                    }
                },
                {
                    path: '/generalPart/generalStorePart',
                    name: 'generalPart_generalStorePart',
                    component: resolve => require(['@/page/generalPart/storePart/storePart'], resolve),
                    meta: {
                        tagName: "汽车服务监控",
                        partName: "平台总板块",
                        fatherTag: "监控",
                    }
                },
                {
                    path: '/generalPart/staff',
                    name: 'generalPart_staff',
                    component: resolve => require(['@/page/generalPart/staff'], resolve),
                    meta: {
                        tagName: "用户管理",
                        partName: "平台总板块",
                        fatherTag: "员工管理",
                    }
                },
                {
                    path: '/generalPart/menu',
                    // name: 'generalPart_menu',
                    component: resolve => require(['@/page/generalPart/Menu'], resolve),
                    meta: {
                        tagName: "菜单管理",
                        partName: "平台总板块",
                        fatherTag: "系统管理",
                    }
                },
                {
                    path: '/generalPart/rolePersimion',
                    // name: 'generalPart_menu',
                    component: resolve => require(['@/page/generalPart/rolePersimion'], resolve),
                    meta: {
                        tagName: "角色管理",
                        partName: "平台总板块",
                        fatherTag: "系统管理",
                    }
                }
            ]
        },
        {
            path: '/piccPart',
            name: 'piccPart',
            component: resolve => require(['@/page/piccPart/index/index'], resolve),
            redirect: "/piccPart",
            children: [
                {
                    path: '/piccPart',
                    name: 'piccPart_statics',
                    component: resolve => require(['@/page/piccPart/statics/statics'], resolve),
                    meta: {
                        tagName: "监控",
                        partName: "挪车码板块",
                        fatherTag: "监控",
                    }
                },
                    {
                        path: '/piccPart/menu',
                        name: 'piccPart_menu',
                        component:resolve =>  require(['@/page/piccPart/Menu'], resolve),
                        meta: {
                            tagName: "菜单管理",
                            partName: "挪车码板块",
                            fatherTag: "系统管理",
                        }
                    },
                    {
                        path: '/piccPart/menuPersimion',
                        name: 'piccPart_menuPersimion',
                        component:resolve =>  require(['@/page/piccPart/menuPersimion'], resolve),
                        meta: {
                            tagName: "菜单权限",
                            partName: "挪车码板块",
                            fatherTag: "系统管理",
                        }
                    },
                    {
                        path: '/piccPart/rolepersimion',
                        name: 'piccPart_rolepersimion',
                        component:resolve =>  require(['@/page/piccPart/rolePersimion'], resolve),
                        meta: {
                            tagName: "角色权限",
                            partName: "挪车码板块",
                            fatherTag: "系统管理",
                        }
                    },
                    {
                        path: '/piccPart/allScanned',
                        name: 'piccPart_allScanned',
                        component:resolve =>  require(['@/page/piccPart/allScanned'], resolve),
                        meta: {
                            tagName: "移车码列表",
                            partName: "挪车码板块",
                            fatherTag: "移车码管理",
                        }
                    },
                    {
                        path: '/piccPart/comsumeDetail',
                        name: 'piccPart_comsumeDetail',
                        component:resolve =>  require(['@/page/piccPart/comsumeDetail'], resolve),
                        meta: {
                            tagName: "费用明细",
                            partName: "挪车码板块",
                            fatherTag: "财务管理",
                        }
                    }
            ]
        },
        {
            path: '/carServer',
            name: 'carServer',
            component: resolve => require(['@/page/carServer/index'], resolve),
            redirect: "/carServer",
            children: [
                {
                    path: '/carServer',
                    name: 'carServer_statics',
                    component: resolve => require(['@/page/carServer/statics/statics'], resolve),
                    meta: {
                        tagName: "监控",
                        partName: "汽车服务",
                        fatherTag: "监控",
                    }
                },
                {
                    path: '/carServer/menu',
                    name: 'carServer_menu',
                    component:resolve =>  require(['@/page/carServer/Menu'], resolve),
                    meta: {
                        tagName: "菜单管理",
                        partName: "汽车服务",
                        fatherTag: "系统管理",
                    }
                },
                {
                    path: '/carServer/menuPersimion',
                    name: 'carServer_menuPersimion',
                    component:resolve =>  require(['@/page/carServer/menuPersimion'], resolve),
                    meta: {
                        tagName: "菜单权限",
                        partName: "汽车服务",
                        fatherTag: "系统管理",
                    }
                },
                {
                    path: '/carServer/rolepersimion',
                    name: 'carServer_rolepersimion',
                    component:resolve =>  require(['@/page/carServer/rolePersimion'], resolve),
                    meta: {
                        tagName: "角色权限",
                        partName: "汽车服务",
                        fatherTag: "系统管理",
                    }
                },
                {
                    path: '/carServer/addPersimion',
                    name: 'carServer_addPersimion',
                    component:resolve =>  require(['@/page/carServer/addPersimion'], resolve),
                    meta: {
                        tagName: "权限列表",
                        partName: "汽车服务",
                        fatherTag: "系统管理",
                    }
                },
                {
                    path: '/carServer/shopkeeper',
                    name: 'carServer_shopkeeper',
                    component:resolve =>  require(['@/page/carServer/shopkeeper'], resolve),
                    meta: {
                        tagName: "店长一览",
                        partName: "汽车服务",
                        fatherTag: "门店管理",
                    }
                },
                {
                    path: '/carServer/staff',
                    name: 'carServer_staff',
                    component:resolve =>  require(['@/page/carServer/staff'], resolve),
                    meta: {
                        tagName: "员工一览",
                        partName: "汽车服务",
                        fatherTag: "门店管理",
                    }
                },
                {
                    path: '/carServer/applystore',
                    name: 'carServer_applystore',
                    component:resolve =>  require(['@/page/carServer/applyStore'], resolve),
                    meta: {
                        tagName: "申请门店",
                        partName: "汽车服务",
                        fatherTag: "门店管理",
                    }
                },
                {
                    path: '/carServer/shopList',
                    name: 'carServer_shopList',
                    component:resolve =>  require(['@/page/carServer/shopList'], resolve),
                    meta: {
                        tagName: "门店一览",
                        partName: "汽车服务",
                        fatherTag: "门店管理",
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/page/login/login'], resolve),
        },
        {
            redirect: '/login',
            path: "*"
        }

    ]
})
