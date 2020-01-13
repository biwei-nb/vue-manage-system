<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> Share 设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="名字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addShare">增加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column
                    type="index"
                    label="ID"
                    width="55"
                    align="center"
                    :index="indexMethod"
                ></el-table-column>
                <el-table-column prop="name" label="股票名字" align="center"></el-table-column>
                <el-table-column prop="exchange_number" label="股票代码" align="center"></el-table-column>
                <el-table-column label="监控标志" align="center">
                    <template slot-scope="scope1">
                        <el-checkbox v-model="scope1.row.monitor_flag" label="行情监控" border></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="交易所" align="center">
                    <template slot-scope="scope2">{{scope2.row.exchange.name}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>-->
                <div class="pagination">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="pageIndex"
                        :page-sizes="[50, 100, 200, 500]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="pageTotal"
                    ></el-pagination>
                </div>

                <!-- <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="pageIndex"
                        :page-size="pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>-->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="股票名字">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="股票代码">
                    <el-input v-model="form.exchange_number"></el-input>
                </el-form-item>
                <el-form-item label="监控标志">
                    <el-checkbox v-model="form.monitor_flag" label="行情监控" border></el-checkbox>
                </el-form-item>
                <el-form-item label="交易所">
                    <el-select v-model="form.exchange" value-key="nid">
                        <el-option
                            v-for="item in ExchangeOptions"
                            :key="item.nid"
                            :label="item.name"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                name: ''
            },

            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 50,
            form: {},
            idx: -1,
            id: -1,
            ExchangeOptions: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.$http
                .getShareList(this.pageIndex, this.pageSize)
                .then(res => {
                    //console.log(res);
                    this.tableData = res.data.results;
                    this.pageTotal = res.data.count;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            //this.$set(this.query, 'pageIndex', 1);
            //this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$http.deleteShare(row.nid);
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.getExchangeToOptions();
            this.idx = index;
            this.form = JSON.parse(JSON.stringify(row));
            //this.form.exchange_id = this.form.exchange.nid;

            //console.log(this.form.exchange);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            //console.log(this.form);
            this.editVisible = false;
            if (this.form.nid) {
                console.log('xiugai');
                const parse = {
                    "name":this.form.name,
                    "exchange_number":this.form.exchange_number,
                    "monitor_flag":this.form.monitor_flag,
                    "exchange_id":this.form.exchange.nid,
                }
                
                this.$http
                    .updateShare(this.form.nid, parse)
                    .then(res => {
                        
                        this.getData();
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    })
                    .catch(err => {});
            } else {
                //console.log('chuangjian');
                const parse = {
                    "name":this.form.name,
                    "exchange_number":this.form.exchange_number,
                    "monitor_flag":this.form.monitor_flag,
                    "exchange_id":this.form.exchange.nid,
                }
                console.log(parse)
                this.$http
                    .addShare(parse)
                    .then(res => {
                        this.getData();
                        this.$message.success('创建成功');
                    })
                    .catch(err => {});
            }
        },
        // 分页导航
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData();
        },
        // 增加操作
        addShare() {
            //console.log("addExchange");
            this.getExchangeToOptions();
            this.editVisible = true;
            this.form = {};
        },
        // 索引处理
        indexMethod(index) {
            return index + 1 + (this.pageIndex - 1) * this.pageSize;
        },
        // 获取交易所信息
        getExchangeToOptions() {
            this.$http
                .getExchangeList(1, 100)
                .then(res => {
                    //console.log(res);
                    this.ExchangeOptions = res.data.results;
                    //console.log(this.ExchangeOptions);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
