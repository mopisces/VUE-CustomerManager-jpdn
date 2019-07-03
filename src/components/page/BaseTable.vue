<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleFiled(1)">个性化1</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleFiled(2)">个性化2</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleFiled(3)">个性化3</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleFiled(4)">个性化4</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handlePersonal()">保存</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable"  style="width:100%;" max-height="250" :highlight-current-row="status.highlight" @row-dblclick="dblclick"  id="container" row-key="id" :summary-method="getSummaries" show-summary>
                <!-- <el-table-column  width="55" align="center"></el-table-column> -->
                <el-table-column :prop="dropCol[index].prop" :label="item.label" width="235" v-for="(item,index) in items" :key="`col_${index}`" :resizable="false">
                </el-table-column>
               <!--  <el-table-column label="操作" width="180" align="center">
                   <template slot-scope="scope">
                       <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                       <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   </template>
               </el-table-column> -->
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
        </div>
        <div class="container" v-if="status.showSubTable">
            <el-table :data="subTableData" border class="table" style="width:100%;" max-height="250" row-key="subID">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column :prop="dropCol[index].prop" :label="dropCol[index].label" width="235" v-for="(item,index) in items" :key="`subCol_${index}`">
                </el-table-column>
                <!-- <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column> -->
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
        
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    import Sortable from 'sortablejs';
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                subTableData:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                status:{
                    stripe:true,
                    highlight:true,
                    showSubTable:false
                },
                width:150,
                items:[
                    {
                        prop:'date',
                        label:'日期'
                    },
                    {
                        prop:'name',
                        label:'姓名'
                    },
                    {
                        prop:'address',
                        label:'地址'
                    }
                ],
                dropCol:[
                    {
                        prop:'date',
                        label:'日期'
                    },
                    {
                        prop:'name',
                        label:'姓名'
                    },
                    {
                        prop:'address',
                        label:'地址'
                    }
                ]
            }
        },
        created() {
            this.getData();
        },
        mounted(){
            this.rowDrop();
            this.columnDrop();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index)=>{
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                      }
                       const values = data.map(item => Number(item[column.property]));
                          if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                              const value = Number(curr);
                              if (!isNaN(value)) {
                                return prev + curr;
                              } else {
                                return prev;
                              }
                            }, 0);
                            sums[index] += ' 元';
                          } else {
                            sums[index] = 'N/A';
                          }
                })
               return [];
            },
            handlePersonal(){
                console.dir(this.dropCol);
            },
            columnDrop(){
                const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
                this.sortable = Sortable.create(wrapperTr,{
                    animation: 180,
                    delay: 0,
                    onEnd:evt =>{
                        const oldItem = this.dropCol[evt.oldIndex];
                        this.dropCol.splice(evt.oldIndex, 1);
                        this.dropCol.splice(evt.newIndex, 0, oldItem);
                    }
                })
            },
            rowDrop(){
                const tbody = document.querySelector('.el-table__body-wrapper tbody');
                const _this = this;
                Sortable.create(tbody,{
                    onEnd({ newIndex, oldIndex }) {
                        const currRow = _this.tableData.splice(oldIndex, 1)[0];
                        _this.tableData.splice(newIndex, 0, currRow);
                    }
                })
            },
            handleFiled(value){
                for (var i = this.items.length - 1; i >= 0; i--) {
                    if(this.items[i].prop == 'personal' + value){
                        this.items.splice(i,1);
                        this.dropCol.splice(i,1);
                        this.width = document.getElementById('container').clientWidth/this.items.length;
                        return;
                    }

                }
                this.items.push({
                    prop:'personal' + value,
                    label:'personal' + value
                });
                this.dropCol.push({
                   prop:'personal' + value,
                   label:'personal' + value 
                })
                this.width = document.getElementById('container').clientWidth/this.items.length;
            },
            dblclick(row, column, event){
                console.dir(row);
                this.status.showSubTable = true;
                this.subTableData = [row];
                console.dir(this.subTableData);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = './static/vuetable.json';
                };
                
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .el-table .warning-row {
        background: oldlace;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>