<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> Server Info设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="名字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addServerInfo">增加</el-button>
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
                <el-table-column prop="name" label="名字"></el-table-column>
                <el-table-column label="交易属性">
                    <template slot-scope="scope1">{{scope1.row.server_type.name}}</template>
                </el-table-column>
                <el-table-column label="交易类型">
                    <template slot-scope="scope2">{{scope2.row.server_attr.name}}</template>
                </el-table-column>

                <el-table-column prop="update_time" label="更新时间"></el-table-column>
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
                        :page-sizes="[5, 10, 20, 50]"
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="名字">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Broker ID">
                    <el-input v-model="form.brokerid"></el-input>
                </el-form-item>
                <el-form-item label="行情服务器IP">
                    <el-input v-model="form.md_ip"></el-input>
                </el-form-item>
                <el-form-item label="行情服务器端口">
                    <el-input v-model="form.md_port"></el-input>
                </el-form-item>
                <el-form-item label="交易服务器IP">
                    <el-input v-model="form.td_ip"></el-input>
                </el-form-item>
                <el-form-item label="交易服务器端口">
                    <el-input v-model="form.td_port"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="交易属性">
                    <el-select v-model="form.server_attr" value-key="nid">
                        <el-option
                            v-for="attr_item in ServerAttrList"
                            :key="attr_item.nid"
                            :label="attr_item.name"
                            :value="attr_item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易类型">
                    <el-select v-model="form.server_type" value-key="nid">
                        <el-option
                            v-for="type_item in ServerTypeList"
                            :key="type_item.nid"
                            :label="type_item.name"
                            :value="type_item"
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
            pageSize: 10,
            form: {},
            idx: -1,
            id: -1,
            ServerTypeList: [],
            ServerAttrList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            this.$http
                .getServerInfoList(this.pageIndex, this.pageSize)
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
                    this.$http.deleteServerInfo(row.nid);
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
            this.getTypeList();
            this.getAttrList();
            this.idx = index;
            this.form = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            const parse = {
                name: this.form.name,
                brokerid: this.form.brokerid,
                md_ip: this.form.md_ip,
                md_port: this.form.md_port,
                td_ip: this.form.td_ip,
                td_port: this.form.td_port,
                desc: this.form.desc,
                server_attr_id: this.form.server_attr.nid,
                server_type_id: this.form.server_type.nid
            };
            if (this.form.nid) {
                this.$http
                    .updateServerInfo(this.form.nid, parse)
                    .then(res => {
                        this.getData();
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    })
                    .catch(err => {});
            } else {
                this.$http
                    .addServerInfo(parse)
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
        // 增加
        addServerInfo() {
            //console.log("addExchange");
            this.getTypeList();
            this.getAttrList();
            this.editVisible = true;
            this.form = {};
        },
        // 索引相关
        indexMethod(index) {
            return index + 1 + (this.pageIndex - 1) * this.pageSize;
        },

        getTypeList() {
            this.$http
                .getServerTypeList(1, 10)
                .then(res => {
                    //console.log(res);
                    this.ServerTypeList = res.data.results;
                    //console.log(this.ExchangeOptions);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getAttrList() {
            this.$http
                .getServerAttrList(1, 100)
                .then(res => {
                    //console.log(res);
                    this.ServerAttrList = res.data.results;
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
