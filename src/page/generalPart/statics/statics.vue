<template>
    <div class="statics">
        <div class="searchContainer">
            <span class="date">日期</span>
            <div class="block">
                <el-date-picker
                v-model="value7"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <el-button class="search" type="primary">查询</el-button>
        </div>

        <el-row class="partStatic">
            <el-col :span="6">
                <el-col :span="20">
                    <el-card class="box-card" :span="18" >
                        <div slot="header" class="clearfix" >
                            <span>总车辆用户</span>
                        </div>
                        <div class="text">
                            17345
                            <span>人</span>
                        </div>
                    </el-card>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="20">
                    <el-card class="box-card" :span="18" >
                        <div slot="header" class="clearfix" >
                            <span>移车码车辆用户</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goCall()">查看详情</el-button>
                        </div>
                        <div class="text">
                            2325
                            <span>人</span>
                        </div>
                    </el-card>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="20">
                    <el-card class="box-card" :span="18" >
                        <div slot="header" class="clearfix" >
                            <span>停车场车辆用户</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div class="text">
                            12151
                            <span>人</span>
                        </div>
                    </el-card>
                </el-col>
            </el-col>

            <el-col :span="6">
                <el-col :span="20">
                    <el-card class="box-card" :span="18" >
                        <div slot="header" class="clearfix" >
                            <span>汽车服务车辆用户</span>
                            <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
                        </div>
                        <div class="text">
                            5732
                            <span>人</span>
                        </div>
                    </el-card>
                </el-col>
            </el-col>
        </el-row>

        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
            prop="part"
            label="板块">
            </el-table-column>
            <el-table-column
            prop="allCount"
            label="用户总数(人)">
            </el-table-column>
            <el-table-column
            prop="newCount"
            label="新增用户数(人)">
            </el-table-column>
            <el-table-column
            prop="activeCount"
            label="活跃用户数(人)">
            </el-table-column>
            <el-table-column
            label="操作"
            width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="scope.row.part != '总板块'"  @click="goCallDetail(scope.row.type)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: ["2018-09-26", "2018-10-26"],
                tableData: [{
                    part: '总板块',
                    allCount: '17345',
                    newCount: '2342',
                    activeCount:"15302",
                    type:1,
                    }, {
                    part: '移车码板块',
                    allCount: '2325',
                    newCount: '1321',
                    activeCount:"1864",
                    type:2,
                    }, {
                    part: '停车场板块',
                    allCount: '12151',
                    newCount: '568',
                    activeCount:"10873",
                    type:3,
                    }, {
                    part: '移车服务板块',
                    allCount: '5732',
                    newCount: '982',
                    activeCount:"1874",
                    type:4,
                }],
            };
        },
        methods:{
            goCall(){
                this.$router.push({
                    path:'/piccPart/statics',
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .statics{
        padding: 20px;
        box-sizing: border-box;
        .searchContainer{
            width: 100%;
            display: flex;
            align-items: center;
            background: #f2f2f2;
            border-radius: 7px;
            padding: 20px;
            box-sizing: border-box;
            .date{
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            .search{
                margin-left: 20px;
            }
        }
    }

    .partStatic{
        margin-top: 30px;
        margin-bottom: 30px;
        .text{
            text-align: center;
            font-size: 24px;
            span{
                font-size: 16px;
            }
        }
    }
</style>


