<template>
  <div>
    <template>
      <el-row>
        <el-col :span="8">
          <h4>今日憨憨指数(～￣▽￣)～</h4>
        </el-col>
        <el-col :offset="2" :span="10">
          <el-rate v-model="value" show-text></el-rate>
        </el-col>
        <el-col :span="4">
          <el-select v-model="term" @change="cterm" placeholder="请选择学期">
            <el-option label="第一学期" value="first_s"></el-option>
            <el-option label="第二学期" value="second_s"></el-option>
            <el-option label="第三学期" value="third_s"></el-option>
            <el-option label="第四学期" value="fourth_s"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-table
        id="table"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        height="350"
        border
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'ascending'}"
      >
        <el-table-column prop="id" sortable label="学号" width="160"></el-table-column>
        <el-table-column prop="name" sortable label="姓名" width="160"></el-table-column>
        <el-table-column prop="语文" sortable label="语文" width="90"></el-table-column>
        <el-table-column prop="数学" sortable label="数学" width="90"></el-table-column>
        <el-table-column prop="英语" sortable label="英语" width="90"></el-table-column>
        <el-table-column prop="物理" sortable label="物理" width="90"></el-table-column>
        <el-table-column prop="化学" sortable label="化学" width="90"></el-table-column>
        <el-table-column prop="生物" sortable label="生物" width="90"></el-table-column>
        <el-table-column prop="sum" sortable label="总分" width="90"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>

        <el-table-column fixed="right" width="200">
          <template slot="header" >
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看该学生</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-row :gutter="50">
        <el-col :span="6" :offset="18">
          <el-button class="el-icon-share" @click="dao" type="success" round>导出excel表</el-button>
          <!-- <el-button class="el-icon-edit" @click="addstu" type="primary" round>添加学生</el-button> -->
        </el-col>
      </el-row>
    </template>

<!-- 数据展示 -->
<el-row style="margin-top:25px">
  <el-col :span='16'>
  <div id="main" style="height:400px;width:600px"></div>
  </el-col>
  <el-col :span='8'>
  <div>
  <el-button class="project" type="primary" default @click="chinese" round>语文成绩</el-button>
  <el-button class="project" type="primary" @click="math" round>数学成绩</el-button>
  <el-button class="project" type="primary" @click="english" round>英语成绩</el-button>
  <el-button class="project" type="primary" @click="wuli" round>物理成绩</el-button>
  <el-button class="project" type="primary" @click="huaxue" round>化学成绩</el-button>
  <el-button class="project" type="primary" @click="shengwu" round>生物成绩</el-button>
  <el-button class="project" type="primary" @click="sum" round>总和成绩</el-button>
  <!-- <el-button class="project" type="primary" round>数学成绩</el-button> -->
  </div>
  </el-col>
  </el-row>

  <!-- 饼状图展示 -->
 <el-row style="margin-top:25px">
  <el-col :span='16'>
  <div id="main2" style="height:400px;width:600px"></div>
  </el-col>
  <el-col :span='8'>
  <div>
  <!-- <el-button class="project" type="primary" default @click="bfour" round>大于430分</el-button>
  <el-button class="project" type="primary" @click="sfour" round>小于400分</el-button> -->
<el-switch
  style="display: block"
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="大于430分"
  @change="bfour"
  inactive-text="小于400分">
</el-switch>
  </div>
  </el-col>
  </el-row>

  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "analysis",
  data() {
    return {
      tableData: [],
      id: "",
      currentPage: 1,
      pagesize: 5,
      total: 0,
      search: "",
      name: "first_s",
      value2:true,
      term: "",
      value: null,
      str:"bfnum",
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' },
      formLabelWidth: "60px",
      subject:'语文',
      esubject:"chinese",
      table: {
        first_s: "score1",
        second_s: "score2",
        third_s: "score3",
        fourth_s: "score4"
      },
      form: {
        name: "",
        语文: "",
        数学: "",
        英语: "",
        物理: "",
        化学: "",
        生物: "",
        class: "",
        id: ""
      },
      // 成绩表格中的数据
      socreForm:{
        class1:{
          chinese:0,
          math:0,
          english:0,
          wuli:0,
          huaxue:0,
          shengwu:0,
          avgsum:0,
          number:0,
          bfnum:0,
          sfnum:0,
        },
        class2:{
           chinese:0,
          math:0,
          english:0,
          wuli:0,
          huaxue:0,
          shengwu:0,
          avgsum:0,
          number:0,
           bfnum:0,
          sfnum:0,
        },
        class3:{
          chinese:0,
          math:0,
          english:0,
          wuli:0,
          huaxue:0,
          shengwu:0,
          avgsum:0,
          number:0,
           bfnum:0,
          sfnum:0,
        }
      }
    };
  },
 
  created() {
    this.getdata();
  },
  mounted(){
    // this.show2();
  },
  methods: {

     show: function(val) {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      var xList = ["一班","二班","三班"];
      // 处理平均分
      var score1 = this.socreForm.class1[this.esubject]/this.socreForm.class1.number;
      var score2 = this.socreForm.class2[this.esubject]/this.socreForm.class2.number;
      var score3 = this.socreForm.class3[this.esubject]/this.socreForm.class3.number;
      var yList = [score1,score2,score3];
      // 标示名字
     var tit=this.subject+'平均分数';
      console.log("var: "+xList);
      myChart.setOption({
        title: { text: "各班平均成绩" },
        tooltip: {},
         legend: {
         data:[tit],
        },
        xAxis: {
          data: xList,
          name:"班级"
        },
        yAxis: {},
        series: [
          {
            name: tit,
            type: "bar",
            data: yList,
             itemStyle: {    // 图形的形状
            // color: 'lightblue',
            // barBorderRadius: [18, 18, 0 ,0]
          },
          barWidth: 35,  // 柱形的宽度
          barCategoryGap: '15%',  // 柱形的间距
          }
        ]
      });
    },
    show2(){
         var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main2"));

      var num1 = this.socreForm.class1[this.str];
      var num2 = this.socreForm.class2[this.str];
      var num3 = this.socreForm.class3[this.str];
      // console.log(num1);
      // console.log(num2);
      // console.log(num3);
      myChart.setOption({
     legend: {
         data:['人数'],
        backgroundColor:'#fff',
        },
    series : [
         {
            name: '人数',
            type: 'pie',
            radius: '55%',
            data:[
                {value:num1, name:'一班'},
                {value:num2, name:'二班'},
                {value:num3, name:'三班'},
                // {value:335, name:'直接访问'},
                // {value:400, name:'搜索引擎'}
            ]
        }
        
    ]
});
    },
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      for (let key in row) {
        this.form[key] = row[key];
      }
      this.id = row.id;
    },
    cterm() {
      this.name = this.term;
      console.log(this.term);
      this.getdata();
    },
    getdata() {
      var url = "/api/edit";
      this.$axios.post(url, { name: this.name }).then(res => {
        this.tableData = this.manage(res.data);
        this.total = this.tableData.length;
        this.lastid = res.data[this.total - 1].id;
        this.show(this.tableData);
      });
    },
    // 处理数据
    manage(value){
      // var sum=0;
      // 首先得出每个班级的人数，然后得出每个人的总成绩加到属性中
      for(var key in value){
       // 每个人的总成绩
        value[key].sum=value[key].语文+value[key].数学+value[key].英语+value[key].物理+value[key].化学+value[key].生物;
        // 每个班级人数
        if(value[key].class==1){
          this.socreForm.class1.number++;
          this.socreForm.class1.chinese+=value[key].语文;
          this.socreForm.class1.math+=value[key].数学;
          this.socreForm.class1.english+=value[key].英语;
          this.socreForm.class1.wuli+=value[key].物理;
          this.socreForm.class1.huaxue+=value[key].化学;
          this.socreForm.class1.shengwu+=value[key].生物;
          this.socreForm.class1.avgsum+=value[key].sum;
          this.socreForm.class1.bfnum += value[key].sum>430?1:0;
          this.socreForm.class1.sfnum += value[key].sum<400?1:0;
        }else if(value[key].class==2){
          this.socreForm.class2.number++;
          this.socreForm.class2.chinese+=value[key].语文;
          this.socreForm.class2.math+=value[key].数学;
          this.socreForm.class2.english+=value[key].英语;
          this.socreForm.class2.wuli+=value[key].物理;
          this.socreForm.class2.huaxue+=value[key].化学;
          this.socreForm.class2.shengwu+=value[key].生物;
          this.socreForm.class2.avgsum+=value[key].sum;
          this.socreForm.class2.bfnum += value[key].sum>430?1:0;
          this.socreForm.class2.sfnum += value[key].sum<400?1:0;
        }else{
          this.socreForm.class3.number++;
          this.socreForm.class3.chinese+=value[key].语文;
          this.socreForm.class3.math+=value[key].数学;
          this.socreForm.class3.english+=value[key].英语;
          this.socreForm.class3.wuli+=value[key].物理;
          this.socreForm.class3.huaxue+=value[key].化学;
          this.socreForm.class3.shengwu+=value[key].生物;
          this.socreForm.class3.avgsum+=value[key].sum;
          this.socreForm.class3.bfnum += value[key].sum>430?1:0;
          this.socreForm.class3.sfnum += value[key].sum<400?1:0;
        }
      }
      console.log(this.socreForm);
      this.show2();
      return value;
    },
    dao() {
      // 导出excel表
      let workbook = XLSX.utils.table_to_book(document.getElementById("table"));
      try {
        XLSX.writeFile(workbook, "text.xlsx");
      } catch (e) {
        console.log(e, workbook);
      }
    },
    // 处理分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 切换科目查看平均成绩
    chinese(){
      this.subject='语文';
      this.esubject='chinese';
      this.show();
    },
     math(){
      this.subject='数学';
      this.esubject='math';
      this.show();
    },
     english(){
      this.subject='英语';
      this.esubject='english';
      this.show();
    },
     wuli(){
      this.subject='物理';
      this.esubject='wuli';
      this.show();
    },
     huaxue(){
      this.subject='化学';
      this.esubject='huaxue';
      this.show();
    },
     shengwu(){
      this.subject='生物';
      this.esubject='shengwu';
      this.show();
    },
      sum(){
      this.subject='总和';
      this.esubject='avgsum';
      this.show();
    },
    bfour(){
      this.str=this.value2 ?"bfnum":"sfnum";
      this.show2();
    },
    // sfour(){
    //   this.str="sfnum";
    //   this.show2();
    // }
  }
};
</script>

<style scoped>
.project{
  margin-left: 35px;
  margin-top: 35px;
}
</style>