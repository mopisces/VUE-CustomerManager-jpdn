<template>
    <!-- <hot-table :data="data" rowHeaders="true" colHeaders="true" licenseKey="non-commercial-and-evaluation"></hot-table> -->
    <div  class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="width:100%">
            <div class="handle-box">
                <el-button type="primary" @click="newCol('Country')">Country</el-button>
                <el-button type="primary" @click="newCol('Code')">Code</el-button>
                <el-button type="primary" @click="newCol('Currency')">Currency</el-button>
                <button type="button" @click="show('Click Me!')">Click Me!</button>
            </div>
            <hot-table :data="dataArray" :settings="hotSettings" licenseKey="non-commercial-and-evaluation" ref="testHot" :root="root"></hot-table>
            <el-button type="success" @click="exportCsv">导出文件（CSV格式）</el-button>
            <el-table :data="elTabSettings.data" border class="table" ref="multipleTable" max-height="250" v-if="elTabSettings.show">
                <el-table-column v-for="(item,index) in elTabSettings.items" :prop="item.prop" :label="item.label" :key="`col_${index}`"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import { HotTable } from '@handsontable/vue';
    import 'handsontable/languages/zh-CN';
    import Handsontable from 'handsontable';
    export default {
        data() {
            return {
                root: 'test-hot',
                elTabSettings:{
                    show:false,
                    data:[],
                    items:[
                        {
                            prop:'id',
                            label:'ID',
                        },
                        {
                            prop:'flag',
                            label:'ID',
                        },
                        {
                            prop:'id',
                            label:'ID',
                        },
                    ]
                },
                data:[
                        {
                            id: 0,
                            flag: 'EUR',
                            currencyCode: 'EUR',
                            currency: 'Euro',
                            level: 0.9033,
                            units: 'EUR / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0026,
                            data:'07/11/2019',
                            stars:5,
                            range:6,
                            phone:'huawei'
                        },
                        {
                            id: 2,
                            flag: 'JPY',
                            currencyCode: 'JPY',
                            currency: 'Japanese Yen',
                            level: 124.3870,
                            units: 'JPY / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0001,
                            data:'07/11/2019',
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 3,
                            flag: 'GBP',
                            currencyCode: 'GBP',
                            currency: 'Pound Sterling',
                            level: 0.6396,
                            units: 'GBP / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.00,
                            stars:2,
                            range:2,
                            phone:'mi'
                        },
                        {
                            id: 4,
                            flag: 'CHF',
                            currencyCode: 'CHF',
                            currency: 'Swiss Franc',
                            level: 0.9775,
                            units: 'CHF / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0008,
                            stars:2,
                            range:2,
                            phone:'mi'
                        },
                        {
                            id: 5,
                            flag: 'CAD',
                            currencyCode: 'CAD',
                            currency: 'Canadian Dollar',
                            level: 1.3097,
                            units: 'CAD / USD',
                            asOf: '08/19/2019',
                            onedChng: -0.0005,
                            stars:2,
                            range:2,
                            phone:'mi'
                        },
                        {
                            id: 6,
                            flag: 'AUD',
                            currencyCode: 'AUD',
                            currency: 'Australian Dollar',
                            level: 1.3589,
                            units: 'AUD / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0020,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 7,
                            flag: 'NZD',
                            currencyCode: 'NZD',
                            currency: 'New Zealand Dollar',
                            level: 1.5218,
                            units: 'NZD / USD',
                            asOf: '08/19/2019',
                            onedChng: -0.0036,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 8,
                            flag: 'SEK',
                            currencyCode: 'SEK',
                            currency: 'Swedish Krona',
                            level: 8.5280,
                            units: 'SEK / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0016,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 9,
                            flag: 'NOK',
                            currencyCode: 'NOK',
                            currency: 'Norwegian Krone',
                            level: 8.2433,
                            units: 'NOK / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0008,
                            stars:8,
                            range:16,
                            phone:'all'
                        },
                        {
                            id: 10,
                            flag: 'BRL',
                            currencyCode: 'BRL',
                            currency: 'Brazilian Real',
                            level: 3.4806,
                            units: 'BRL / USD',
                            asOf: '08/19/2019',
                            onedChng: -0.0009,
                            stars:8,
                            range:16,
                            phone:'all'
                        },
                        {
                            id: 11,
                            flag: 'CNY',
                            currencyCode: 'CNY',
                            currency: 'Chinese Yuan',
                            level: 6.3961,
                            units: 'CNY / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0004,
                            stars:8,
                            range:16,
                            phone:'all'
                        },
                        {
                            id: 12,
                            flag: 'RUB',
                            currencyCode: 'RUB',
                            currency: 'Russian Rouble',
                            level: 65.5980,
                            units: 'RUB / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0059,
                            stars:5,
                            range:6,
                            phone:'huawei'
                        },
                        {
                            id: 13,
                            flag: 'INR',
                            currencyCode: 'INR',
                            currency: 'Indian Rupee',
                            level: 65.3724,
                            units: 'INR / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0026,
                            stars:5,
                            range:6,
                            phone:'huawei'
                        },
                        {
                            id: 14,
                            flag: 'TRY',
                            currencyCode: 'TRY',
                            currency: 'New Turkish Lira',
                            level: 2.8689,
                            units: 'TRY / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0092,
                            onedChng: 0.0016,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 15,
                            flag: 'THB',
                            currencyCode: 'THB',
                            currency: 'Thai Baht',
                            level: 35.5029,
                            units: 'THB / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0044,
                            stars:2,
                            range:2,
                            phone:'mi'

                        },
                        {
                            id: 16,
                            flag: 'IDR',
                            currencyCode: 'IDR',
                            currency: 'Indonesian Rupiah',
                            level: 13.83,
                            units: 'IDR / USD',
                            asOf: '08/19/2019',
                            onedChng: -0.0009,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 17,
                            flag: 'MYR',
                            currencyCode: 'MYR',
                            currency: 'Malaysian Ringgit',
                            level: 4.0949,
                            units: 'MYR / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0010,
                            stars:2,
                            range:2,
                            phone:'mi'

                        },
                        {
                            id: 18,
                            flag: 'MXN',
                            currencyCode: 'MXN',
                            currency: 'Mexican New Peso',
                            level: 16.4309,
                            units: 'MXN / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0017,
                            stars:8,
                            range:16,
                            phone:'all'
                        },
                        {
                            id: 19,
                            flag: 'ARS',
                            currencyCode: 'ARS',
                            currency: 'Argentinian Peso',
                            level: 9.2534,
                            units: 'ARS / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0011,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 20,
                            flag: 'DKK',
                            currencyCode: 'DKK',
                            currency: 'Danish Krone',
                            level: 6.7417,
                            units: 'DKK / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0025,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },
                        {
                            id: 21,
                            flag: 'ILS',
                            currencyCode: 'ILS',
                            currency: 'Israeli New Sheqel',
                            level: 3.8262,
                            units: 'ILS / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0084,
                            stars:8,
                            range:16,
                            phone:'all'
                        },
                        {
                            id: 22,
                            flag: 'PHP',
                            currencyCode: 'PHP',
                            currency: 'Philippine Peso',
                            level: 46.3108,
                            units: 'PHP / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0012,
                            stars:2,
                            range:6,
                            phone:'iphone'
                        },{}
                    ],
                /*dataArray:[
                    [22,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.00121, 0.0012,'PHP','PHP','Philippine Peso'],
                    [21,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso'],
                    [20,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso'],
                    [23,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso'],
                    [24,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso']
                ],*/
                dataArray:[[24,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso',1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8]],
                hotSettings :{
                    //data: Handsontable.helper.createSpreadsheetData(10, 4),
                    /*columns:[
                                {
                                    data: 'id',
                                    type: 'numeric',
                                    validator:'idValidator',
                                    conditions: [
                                        {name: 'begins_with', args: [[2]]}
                                    ],
                                    operation: 'conjunction',
                                    width:200,
                                    editor: 'select',//编辑方式
                                    selectOptions: ['Kia', 'Nissan', 'Toyota', 'Honda']//可选值
                                },
                                {
                                    data: 'flag',
                                    renderer:'my.flagRenderer'  //自定渲染
                                },
                                {
                                    data: 'currencyCode',
                                    type: 'dropdown',           //下拉选项
                                    source: ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white']//可选值
                                },
                                {
                                    data: 'currency',
                                    type: 'autocomplete',       //下拉和text的结合
                                    source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
                                    allowInvalid: true,         //是否允许非法值,默认允许
                                    strict: true
                                },
                                {
                                    data: 'level',
                                    type: 'numeric',
                                    numericFormat: {
                                        pattern: '0,0.0000$',//格式
                                        culture: 'zh-CN'    //钱的标识
                                    },
                                    allowEmpty: false
                                },
                                {
                                    data: 'units',
                                    type: 'handsontable',//嵌套handsontable
                                    handsontable: {
                                        colHeaders: ['Marque', 'Country', 'Parent company'],
                                        autoColumnSize: true,
                                        data:[
                                            {name: 'BMW', country: 'Germany', owner: 'Bayerische Motoren Werke AG'},
                                            {name: 'Chrysler', country: 'USA', owner: 'Chrysler Group LLC'},
                                            {name: 'Nissan', country: 'Japan', owner: 'Nissan Motor Company Ltd'},
                                            {name: 'Suzuki', country: 'Japan', owner: 'Suzuki Motor Corporation'},
                                            {name: 'Toyota', country: 'Japan', owner: 'Toyota Motor Corporation'},
                                            {name: 'Volvo', country: 'Sweden', owner: 'Zhejiang Geely Holding Group'}
                                        ],
                                        getValue:function(){//显示选择的值
                                            var selection = this.getSelectedLast();
                                            return this.getSourceDataAtRow(selection[0]).name;
                                        }
                                    }
                                },
                                {
                                    data: 'asOf',
                                    type: 'date',
                                    dateFormat: 'MM/DD/YYYY'
                                },
                                {
                                    data: 'onedChng',
                                    type: 'numeric',
                                    numericFormat: {
                                        pattern: '0.00%'
                                    }
                                },
                                {
                                    data: 'available',
                                    type: 'checkbox',
                                    checkedTemplate:'good',
                                    uncheckedTemplate:'bad',
                                    label:{
                                        position: 'before',
                                        property: 'available'
                                    }
                                }
                            ],*///列的定义*/
                    //headerTooltips:true,
                    //fixedColumnsLeft: 1,
                    //width:1000,
                    rowHeaders: true,//行头部
                    colWidths: 150,//列宽
                    width: 900,//表格宽度
                    height: 520,//表高度 有高度和宽度滚轮才显示
                    rowHeights: 23,//行高度
                    manualColumnResize: true,//列宽设置
                    //customBorders:true,//设置边框
                    customBorders:[
                                        //自定义边框
                        {
                            range:{     //定义连续的边框 
                                from:{row: 1,col: 1},
                                to:{row: 3,col:4}
                            },
                            top:{
                                width:2,
                                color:'#5292F7'
                            },
                            left:{
                                width: 2,
                                color: 'orange'
                            },
                            bottom:{
                                width: 2,
                                color:'red'
                            },
                            right:{
                                width: 2,
                                color: 'magenta'
                            }
                        },
                        {       //定义单独cell的边框
                            row: 2,
                            col: 2,
                            left:{
                                width: 2,
                                color: 'red'
                            },
                            right:{
                                width: 1,
                                color: 'green'
                            }
                        }
                    ],
                    selectionMode: 'multiple',
                    manualColumnFreeze: true,//是否多列固定
                    //fixedRowsTop:2,//固定头部2行
                    //fixedColumnsLeft:2,//固定左侧2列
                    //fixedRowsBottom:2,//固定底部2行
                    /*hiddenColumns: {
                        columns:[0,1,2],//隐藏的列index (0是第一列)
                        indicators:false//是否显示隐藏标志
                    },*/
                    /*hiddenRows:{
                        rows: [3, 5, 9],//隐藏的行index (0是第一行)
                        indicators:true//是否显示隐藏标志
                    },//隐藏行*/
                    hiddenColumns: {
                        columns:[],//隐藏的列index (0是第一列)
                        indicators:false//是否显示隐藏标志
                    },//隐藏列
                    /*//trimRows: [0,1,2,3,4,5,6],//功能未测试
                    bindRowsWithHeaders:'strict',//绑定行的头部（移动行时头部不变）
                    nestedHeaders:[
                        ['A', {label: 'B', colspan: 8}, 'C'],
                        ['D', {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
                        ['H', {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {label: 'L', colspan: 2}, 'M'],
                        ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
                    ],//头部多列合并
                    collapsibleColumns: [
                        {row: -4, col: 1, collapsible: true},
                        {row: -3, col: 1, collapsible: true},
                        {row: -2, col: 1, collapsible: true},
                        {row: -2, col: 3, collapsible: true}
                    ],//使用nestedHeaders时，有按钮显示或者隐藏子头部（必须定义hiddenColumns）*/
                    dropdownMenu: true,//头部下拉菜单(使用默认菜单)
                    /*dropdownMenu:[
                        'remove_col',
                        '---------',
                        'make_read_only',
                        '---------',
                        'alignment'
                    ],//自定义头部下拉菜单*/
                    /*columnSorting: {
                        indicator: true
                    },*///排序
                    multiColumnSorting:true,
                    observeChanges:false,
                    language: "zh-CN",//语言
                    stretchH:'all',//垂直方向的滚轮
                    autoWrapRow: true,
                    //maxRows: 22,//最大行数
                    manualRowResize: true,//设置行高
                    //rowHeaders: true,//使用插件行头
                    //colHeaders:true,//使用插件列头
                    colHeaders:[
                        'ID',
                        'Country',
                        'Code',
                        'Currency',
                        'Level',
                        'Units',
                        'Date',
                        'Change',
                        'Phone',
                        'Drinks',
                        'JPDN',
                        'Pepsi',
                        'DyDo',
                        'Available',
                        'col1',
                        'col2',
                        'col3',
                        'col4',
                        'col5',
                        'col6',
                        'col7',
                        'col8',
                        'col9',
                        'col10',
                        'col11',
                        'col12',
                        'col13',
                        'col14',
                        'col15',
                        'col16',
                        'col17',
                        'col18',
                        'col19',
                        'col20',
                        'col21',
                        'col22',
                        'col23',
                        'col24',
                        'col25',
                        'col26',
                        'col27',
                        'col29',
                        'col30',
                        'col31',
                        'col32',
                        'col33',
                        'col34',
                        'col35',
                        'col36',
                        'col37',
                    ],//列头部*/
                    manualRowMove: true,//行移动
                    manualColumnMove: true,//列移动
                    contextMenu: true,//右键菜单
                    filters: true,//下拉菜单中的过滤
                    headerTooltips:{
                        rows: true,
                        columns: true,
                        onlyTrimmed: false
                    },//鼠标防止在头部时的提示信息
                    /*autoColumnSize: {
                        samplingRatio: 23
                    },*/
                    //allowInsertColumn:true,
                    search: true,
                    //readOnly:true,
                    /*search:{
                        searchResultClass:'customClass',//结果cell添加的class
                        queryMethod:function(queryStr, value) {
                            //console.dir(value)
                        },
                        callback: function(instance, row, column, value, result) {
                            console.dir(row)
                        }
                    },*/
                    autoWrapCol:true,//按tab键可以从最后一列跳转至第一列
                    autoWrapRow:true,//按tab键可以从最后一行跳转至第一行
                    bindRowsWithHeaders:true,//行移动时，行头保持不变
                    currentRowClassName: 'currentRow',//当前行的classname
                    //observeChanges: true,
                    //dragToScroll:true,
                    /*copyPaste: {
                        columnsLimit: 25,//一次允许复制的最大列数
                        rowsLimit: 50,//一次允许复制的最大行数
                        pasteMode: 'shift_down',//复制的类型
                    },*/
                    copyPaste:true,
                    activeHeaderClassName: 'ht__active_highlight',
                    undo:true,
                    redo:true,
                    trimRows: [1, 2, 5],
                    persistentState:true,
                    beforeInit:()=>{
                        
                    },
                    afterInit:()=>{
                        let timestamp = (new Date()).getTime();
                        console.dir(timestamp)
                    },
                    unmodifyRow:(row)=>{
                        //console.dir(row);
                    },
                    persistentStateSave:(key,value)=>{
                        //console.dir(key);
                        //console.dir(value)
                    },
                    hiddenColumn:(column)=>{
                        //console.dir(column);
                    },
                    afterCellMetaReset:()=>{
                        //console.dir('afterCellMetaReset')
                    },
                    afterColumnMove:(column,target)=>{
                        //console.dir(column);
                        //console.dir(target);
                    },
                    afterColumnResize:(currentColumn,newSize)=>{
                        //console.dir(currentColumn);
                        //console.dir(newSize);
                    },
                    afterColumnResize:(currentSortConfig,destinationSortConfigs)=>{
                        //console.dir(currentSortConfig);
                        //console.dir(destinationSortConfigs);
                    },
                    afterContextMenuDefaultOptions:(predefinedItems)=>{
                        //console.dir(predefinedItems)
                    },
                    afterContextMenuHide:(context)=>{
                        //console.dir(context)
                    },
                    afterCopy:(data,coords)=>{
                        //console.dir(data);
                        //console.dir(coords);
                    },
                    afterDeselect:()=>{
                        //console.dir('afterDeselect');
                    },
                    afterDocumentKeyDown:(event)=>{
                        //console.dir(event);
                    },
                    afterDrawSelection:(currentRow,currentColumn,cornersOfSelection,layerLevel)=>{
                        //console.dir(currentRow);
                        //console.dir(currentColumn);
                        //console.dir(cornersOfSelection);
                        //console.dir(layerLevel);
                    },
                    afterDropdownMenuDefaultOptions:(predefinedItems)=>{
                        //console.dir(predefinedItems);
                    },
                    afterFilter:(conditionsStack)=>{
                        //console.dir(conditionsStack)
                    },
                    afterGetCellMeta:(row,column,cellProperties)=>{
                        //console.dir(row);
                        //console.dir(column);
                        //console.dir(cellProperties);
                    },
                    afterGetColHeader:(column,TH)=>{
                        //console.dir(TH)
                    },
                    afterModifyTransformEnd:(coords,rowTransformDir,colTransformDir)=>{
                        //console.dir(coords);
                        //console.dir(rowTransformDir);
                        //console.dir(colTransformDir);
                    },
                    afterRefreshDimensions:(previousDimensions,currentDimensions,stateChanged)=>{
                        /*console.dir(previousDimensions);
                        console.dir(currentDimensions);
                        console.dir(stateChanged);*/
                    },
                    afterRedo:()=>{
                        //console.dir('afterredo');
                    },
                    afterUndo:(action)=>{
                        //console.dir(action);
                    },
                    afterRemoveCellMeta:(row,column,key,value)=>{
                        /*console.dir(row);
                        console.dir(column);
                        console.dir(key);
                        console.dir(value);*/
                    },
                    afterRender:(isForced)=>{
                        //console.dir(isForced);
                    },
                    outsideClickDeselects: (event)=>{
                        //console.dir(1)
                        this.elTabSettings.show = false;
                        this.elTabSettings.data = [];
                        this.elTabSettings.items = [];
                        return false;
                    },//取消选定
                    beforeRowMove:(rows,target)=>{
                        //console.dir(rows)
                        //console.dir(rows)
                    },
                    afterRowMove:(rows,target)=>{
                        /*console.dir('afterRowMove')
                        console.dir(rows)
                        console.dir('target')
                        console.dir(target)*/
                    },
                    afterGetColHeader:(col, TH)=>{
                        if (col >= 0 && TH.childElementCount < 2) {
                            TH.appendChild(this.getInitializedElements(col));
                        }
                    },
                    afterGetRowHeader:(row,TH)=>{
                        //console.dir(row)
                    },
                    beforeOnCellMouseDown: function(event, coords){
                        if (coords.row === -1 && event.realTarget.nodeName === 'INPUT') {
                            event.stopImmediatePropagation();
                            this.deselectCell();
                        }
                    },
                    beforeCreateCol:(index,amount,source)=>{
                        //this.hotSettings.colHeaders.splice(index,0,'kkkkk');
                    },
                    afterCreateCol:(index,amount,source)=>{
                        //console.dir(this)
                        //this.hotSettings.colHeaders.pop();
                        //this.hotSettings.colHeaders.push('newCol');
                        //console.dir(index);
                        //console.dir(amount);
                        //console.dir(source);
                        //console.dir(index)
                        //console.dir(amount)
                        //this.hotSettings.colHeaders[index];
                        //console.dir(this.hotSettings.colHeaders[9]);
                    },
                    modifyRowData:(row)=>{
                        //console.dir(row);
                    },
                    modifyData:(row,column,valueHolder,ioMode)=>{
                        //console.dir(valueHolder);
                    },
                    modifyRow:(row)=>{
                        //console.dir(row)
                    },
                    modifyColHeader:(column)=>{
                        //console.dir(column)
                    },
                    modifyColumnHeaderHeight:()=>{
                        //console.dir('modifyColumnHeaderHeight');
                    },
                    modifyColWidth:(width,column)=>{
                        /*console.dir(width);
                        console.dir(column);*/
                    },
                    modifyCopyableRange:(copyableRanges)=>{
                        //console.dir(copyableRanges);
                    },
                    modifyTransformEnd:(delta)=>{
                        console.dir(delta);
                    },
                    afterUpdateSettings:(newSettings)=>{
                        //newSettings.colHeaders[10] = 'sssss'
                    },
                    afterHideColumns:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{
                        //console.dir(actionPossible)
                    },
                    afterSelection:(row, column, row2, column2, preventScrolling, selectionLayerLevel)=>{
                        //console.dir('afterSelection')
                        /*preventScrolling.value = true;
                        console.dir(row)
                        console.dir(column)
                        console.dir(row2)
                        console.dir(column2)
                        console.dir(preventScrolling)
                        console.dir(selectionLayerLevel)*/
                        //preventScrolling.value = true;
                    },
                    afterSelectionEnd:(row,column,row2,column2,selectionLayerLevel)=>{
                        //console.dir(row);
                        //console.dir(row2);
                        //console.dir(column);
                        //console.dir(column2);
                        //console.dir(this.$refs.testHot.hotInstance.getColHeader(column2));
                        this.getStepData(row,row2,column,column2);
                        //console.dir(this.$refs.testHot.hotInstance.getDataAtRow(row))
                    },
                    afterSelectionEndByProp:(row,prop,row2,prop2,selectionLayerLevel)=>{
                        /*console.dir(row);
                        console.dir(prop);
                        console.dir(row2);
                        console.dir(prop2);
                        console.dir(selectionLayerLevel);*/
                    },
                    afterSetCellMeta:(row,column,key,value)=>{
                        /*console.dir('---------');
                        console.dir(row);
                        console.dir(column);
                        console.dir(key);
                        console.dir(value);
                        console.dir('---------');*/
                    },
                    afterSetDataAtCell:(changes,source)=>{
                        /*console.dir(changes);
                        console.dir(source);*/
                    },
                    afterTrimRow:(currentTrimConfig,destinationTrimConfig,actionPossible,stateChanged)=>{
                        //console.dir(currentTrimConfig);
                        //console.dir(destinationTrimConfig);
                    },
                    afterUnhideColumns:(currentHideConfig,destinationHideConfig,actionPossible,stateChanged)=>{
                        /*console.dir(currentHideConfig);
                        console.dir(destinationHideConfig);
                        console.dir(actionPossible);
                        console.dir(stateChanged);*/
                    },
                    afterSetDataAtRowProp:(changes,source)=>{
                        /*console.dir(changes);
                        console.dir(source);*/
                    },
                    afterMomentumScroll:()=>{
                        //console.dir('afterMomentumScroll')
                    },
                    afterOnCellContextMenu:(event,coords,TD)=>{
                        //console.dir(event);
                        //console.dir(coords);
                        //console.dir(TD);
                    },
                    afterOnCellCornerDblClick:(event)=>{
                        //console.dir(event);
                    },
                    afterOnCellCornerMouseDown:(event)=>{
                        //console.dir(event);
                    },
                    afterOnCellMouseDown:(event,coords,TD)=>{
                        //console.dir(event);
                        //console.dir(coords);
                        //console.dir(TD);
                    },
                    afterOnCellMouseOver:(event,coords,TD)=>{
                        //console.dir(event);
                        //console.dir(coords);
                        //console.dir(TD);
                    },
                    afterPaste:(data,coords)=>{
                        /*console.dir(data);
                        console.dir(coords);*/
                    },
                    afterChange:(changes,source)=>{
                        if(changes == null){
                            return false;
                        }
                        //console.dir(changes);
                        //console.dir(source);
                        return ;
                        changes.forEach(([row, prop, oldValue, newValue]) => {
                            let value = this.$refs.testHot.hotInstance.getDataAtRow(row);
                            //console.dir(value)
                        })
                    },
                    /*modifyColHeader:(column)=>{
                        console.dir('column');
                    }*///绑定的钩子函数
                    columnSummary:[
                        {
                            sourceColumn:17,
                            destinationRow:0,
                            destinationColumn:0,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:18,
                            destinationRow:0,
                            destinationColumn:1,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:19,
                            destinationRow:0,
                            destinationColumn:2,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:20,
                            destinationRow:0,
                            destinationColumn:3,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:21,
                            destinationRow:0,
                            destinationColumn:4,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:22,
                            destinationRow:0,
                            destinationColumn:5,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:23,
                            destinationRow:0,
                            destinationColumn:6,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:24,
                            destinationRow:0,
                            destinationColumn:7,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:25,
                            destinationRow:0,
                            destinationColumn:8,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:26,
                            destinationRow:0,
                            destinationColumn:9,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                        {
                            sourceColumn:27,
                            destinationRow:0,
                            destinationColumn:10,
                            reversedRowCoords: true,
                            type: 'sum',
                            forceNumeric: true
                        },
                    ],
                    /*columnSummary:[
                        {
                            ranges: [
                                [0],[10],[11,12]//设置需要计算的行
                            ],
                            sourceColumn: 2,
                            destinationRow: 0,//显示结果的行索引
                            destinationColumn: 0,//显示结果的列索引
                            reversedRowCoords: true,//行坐标反转，用来统计底部
                            type: 'sum',//统计方式
                            forceNumeric: true//严格的数字模式
                        }
                    ]//统计*/
                    /*comments: true,//注释开启
                    cell: [
                        {row: 1, col: 1, comment: {value: 'Some comment'}},
                        {row: 2, col: 2, comment: {value: 'More comments'}}
                    ]//设置特定的cell的注释*/
                }
            }
        },
        methods:{
            
            exportCsv(){
                //this.$refs.testHot.hotInstance.addHook('afterBeginEditing',this.myCallback);//
                //let num = this.$refs.testHot.hotInstance.countEmptyCols(true);
                //console.dir(Handsontable)
                /*this.$refs.testHot.hotInstance.updateSettings({
                    autoWrapRow:false
                });*/
                var downLoad = this.$refs.testHot.hotInstance.getPlugin('exportFile');
                downLoad.downloadFile('csv', {
                    bom: false,//编码方式
                    columnDelimiter: ',',//列的分隔符
                    columnHeaders: true,//是否导出列头
                    exportHiddenColumns: true,//是否导出隐藏的列
                    exportHiddenRows: true,//是否导出隐藏的行
                    fileExtension: 'csv',//设置文件的后缀名
                    filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',//设置文件的名称
                    mimeType: 'text/csv',//设置描述消息内容类型的因特网标准
                    rowDelimiter: '\r\n',//设置行分隔符
                    rowHeaders: true//是否导出行头
                });
            },
            /*myCallback(row,column){
                console.dir(row);
            },*/
            show(param){
                console.dir(param)
            },
            newCol(param){
                /*this.data.push({
                            id: 0,
                            flag: 'EUR',
                            currencyCode: 'EUR',
                            currency: 'Euro',
                            level: 0.9033,
                            units: 'EUR / USD',
                            asOf: '08/19/2019',
                            onedChng: 0.0026,
                            data:'07/11/2019',
                            stars:5,
                            range:6,
                            phone:'huawei'
                        });*/
                //this.hotSettings.hiddenColumns.columns=[0,1]
                //console.dir(param)
                /*let len = this.hotSettings.colHeaders.length;
                this.$refs.testHot.hotInstance.alter('insert_col',len + 1,1);
                var headers = this.hotSettings.colHeaders;
                headers[len] = param;
                for (var i = this.dataArray.length - 1; i >= 0; i--) {
                    this.dataArray[i].hello = i
                }
                this.$refs.testHot.hotInstance.updateSettings({
                    colHeaders:headers
                });//data是Array时，创建新列*/
                //console.dir(this.$refs.testHot.hotInstance.getColHeader());
                console.dir(this.$refs.testHot.hotInstance)
                var search = this.$refs.testHot.hotInstance.getPlugin('hiddenColumns');
                var hiddenColumns = this.hotSettings.hiddenColumns.columns

                let headers = this.$refs.testHot.hotInstance.getColHeader();
                for (var i = headers.length - 1; i >= 0; i--) {
                    if(headers[i] == param){
                        let index = this.hotSettings.hiddenColumns.columns.indexOf(i)
                        if(  index > -1 ){
                            hiddenColumns.splice(index,1)
                        }else{
                            hiddenColumns.push(i)
                        }
                    }
                }
                this.$refs.testHot.hotInstance.updateSettings({
                    hiddenColumns: {
                        columns:hiddenColumns,//隐藏的列index (0是第一列)
                        indicators:false//是否显示隐藏标志
                    }
                });
                //console.dir()
                //console.dir(this.$refs.testHot.hotInstance)
                //this.$refs.testHot.hotInstance.scrollViewportTo(18,1);//滚动到指定位置
                //console.dir(this.$refs.testHot.hotInstance.scrollViewportTo(18,1))
                /*var search = this.$refs.testHot.hotInstance.getPlugin('search');
                var queryResult = search.query('iphone');
                console.log(queryResult);
                this.$refs.testHot.hotInstance.render();//搜索*/
                //console.dir(this.$refs.testHot)
                /*var downLoad = this.$refs.testHot.hotInstance.getPlugin('exportFile');
                downLoad.downloadFile('csv', {
                    bom: false,//编码方式
                    columnDelimiter: ',',//列的分隔符
                    columnHeaders: true,//是否导出列头
                    exportHiddenColumns: true,//是否导出隐藏的列
                    exportHiddenRows: true,//是否导出隐藏的行
                    fileExtension: 'csv',//设置文件的后缀名
                    filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',//设置文件的名称
                    mimeType: 'text/csv',//设置描述消息内容类型的因特网标准
                    rowDelimiter: '\r\n',//设置行分隔符
                    rowHeaders: true//是否导出行头
                })//导出Excel文件*/

            },
            getInitializedElements(colIndex){
                var div = document.createElement('div');
                var input = document.createElement('input');
                div.className = 'filterHeader';
                this.addEventListeners(input, colIndex);
                div.appendChild(input);
                return div;
            },
            addEventListeners (input, colIndex){
                var self = this
                input.addEventListener('keydown', function(event) {
                    self.searchInput(colIndex, event);
                });
            },
            searchInput(colIndex, event){
                var filtersPlugin  = this.$refs.testHot.hotInstance.getPlugin('filters');
                filtersPlugin.removeConditions(colIndex);
                filtersPlugin.addCondition(colIndex, 'begins_with', [event.target.value]);
                filtersPlugin.filter();
            },
            getStepData(startRow,endRow,startCol,endCol){
                //console.dir(startRow);
                //console.dir(startCol);
                //let value = this.$refs.testHot.hotInstance.getDataAtCell(startRow,startCol);
                //console.dir(value);
                if(startRow > endRow || startCol > endCol){
                    return false;
                }
                this.elTabSettings.items = [];
                for (startCol; (endCol - startCol) >= 0; startCol++) {
                    let itemName = this.$refs.testHot.hotInstance.getColHeader(startCol);
                    this.elTabSettings.items.push({prop:itemName,label:itemName});
                }
                for ( startRow ; (endRow - startRow) >= 0; startRow++) {
                    let arr = this.$refs.testHot.hotInstance.getDataAtRow(startRow);
                    let obj = {};
                    for (var i = arr.length - 1; i >= 0; i--) {
                        let key = this.$refs.testHot.hotInstance.getColHeader(i);
                        obj[key] = arr[i];
                    }
                    //console.dir(obj)
                    this.elTabSettings.data.push(obj);
                }
                //console.dir(this.elTabSettings.data);
                this.elTabSettings.show = true
            },
            customValidator(query, callback){
                callback(true);
            }
        },
        created(){
            for (var i = 1 ; i < 2001; i++) {
                this.dataArray.push(
                    [24,'PHP','PHP','Philippine Peso',46.3108,'PHP / USD','08/19/2019', 0.0012, 0.0012, 0.0012,'PHP','PHP','Philippine Peso',1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7]
                    );
            }
            (function(Handsontable){
                function customValidator(query, callback) {
                    // ...your custom logic of the validator
                    if(query > 10){
                        callback(false/* Pass `true` or `false` based on your logic */);
                    }else{
                        callback(true/* Pass `true` or `false` based on your logic */);
                    }
                };
                function flagRenderer(instance, td, row, col, prop, value, cellProperties){
                    Handsontable.renderers.BaseRenderer.apply(this, arguments);
                    var currencyCodes = ['EUR', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'NZD', 'SEK', 'NOK', 'BRL', 'CNY', 'RUB', 'INR', 'TRY', 'THB', 'IDR', 'MYR', 'MXN', 'ARS', 'DKK', 'ILS', 'PHP'];
                    var currencyCode = value;
                    while (td.firstChild) {
                        td.removeChild(td.firstChild);
                    }
                    if (currencyCodes.indexOf(currencyCode) > -1) {
                        var flagElement = document.createElement('DIV');
                        flagElement.className = 'flag ' + currencyCode.toLowerCase();
                        td.appendChild(flagElement);
                    }else{
                        var textNode = document.createTextNode(value === null ? '' : value);
                        td.appendChild(textNode);
                    }
                    
                }
                Handsontable.validators.registerValidator('idValidator', customValidator);
                Handsontable.renderers.registerRenderer('my.flagRenderer', flagRenderer);
            })(Handsontable)
            let timestamp = (new Date()).getTime();
            console.dir(timestamp)
            console.dir(1563241476847 - 1563241477952)
        },
        components:{
            HotTable
        }
    }

</script>
<style>
    @import "../../../node_modules/handsontable/dist/handsontable.full.css";
    
  .handsontable.ht_clone_top tr{
    line-height: 0;
 
  }
  .handsontable.ht_clone_top th{
    vertical-align: middle;
    font-size: 0;
    line-height: 0;
  }
  .handsontable.ht_clone_top th .relative{
    vertical-align: middle;
    line-height: .9;
    font-size:14px;
  }

</style>
1563181069558
1563181070328