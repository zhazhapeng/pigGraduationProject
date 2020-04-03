<template>
  <div class="wrapper">
      <el-row>
        <el-col :span="8">
          <h4>权重指标设置</h4>
        </el-col>
      </el-row>
     <el-row style="margin-top:20px">
        <el-col :offset="1" :span="13">
          <h5>第二课堂=道德评价与表现*
          <input style="width:30px" v-model="daode" :span="1" size="mini">
          +卫生管理*
          <input style="width:30px" v-model="weisheng" size="mini">
          +体育*
          <input style="width:30px" v-model="tiyu" size="mini">
           +素质拓展*
          <input style="width:30px" v-model="suzhi" size="mini">
          </h5>
        </el-col>
        <el-col :span="8">
          <h5>综合成绩=学习成绩*
          <input style="width:30px" v-model="xuexi" :span="1" size="mini">
          +第二课堂*
          <input style="width:30px" v-model="dier" size="mini">
          </h5>
        </el-col>
      </el-row>
      <el-row style="margin-top:25px">
        <el-col :offset="10">
           <el-button @click="run" type="primary" round>生成成绩</el-button>
        </el-col>
      </el-row>


  <!-- 成绩汇总表 -->
<template>
  <el-row> 
        <el-col :offset="20" :span="4">
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
        height="460"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="学号" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="语文" label="必修" width="90"></el-table-column>
        <el-table-column prop="数学" label="选修" width="90"></el-table-column>
        <el-table-column prop="英语" label="道德" width="90"></el-table-column>
        <el-table-column prop="物理" label="卫生" width="90"></el-table-column>
        <el-table-column prop="化学" label="体育" width="90"></el-table-column>
        <el-table-column prop="生物" label="素质拓展" width="90"></el-table-column>
        <el-table-column prop="dier" label="第二课堂" width="90"></el-table-column>
        <el-table-column prop="zonghe" label="综合成绩" width="90"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>

        <el-table-column fixed="right" width="200">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[7, 14, 20]"
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



  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  inject:['reload'], //刷新时注入reload方法
  name:'compute',
  data() {
    return {
        daode:'',
        weisheng:'',
        xuexi:'',
        suzhi:'',
        tiyu:'',
        dier:'',

      tableData: [],
      id: "",
      // result:[],
      currentPage: 1,
      pagesize: 7,
      total: 0,
      search: "",
      name: "first_s",
      term: "",
      value: null,
      formLabelWidth: "60px",
      dialogFormVisible: false,
      // view:'',
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
      }
    };
  },

   created() {
    this.getdata();
  },

  methods: {
    handleClick(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      for (let key in row) {
        this.form[key] = row[key];
      }
      this.id = row.id;
    },
    cterm() {
      this.name = this.term;
      // console.log(this.term);
      this.getdata();
    },
    getdata() {
      var url = "/api/edit";
      // var result = [];
      this.$axios.post(url, { name: this.name }).then(res => {
         var result = res.data;
        this.total = result.length;
        // console.log(res.data);
        this.lastid = res.data[this.total - 1].id;
        this.show(result);
      });
      
    },
    show(res){
    
      this.tableData = res;
    },
    config() {
      this.dialogFormVisible = false;
      var url = "/api/edit/update";
      this.$axios
        .post(url, { form: this.form, table: this.table[this.name] })
        .then(res => {
          // console.log(res);
          if (res.data.code == 1) {
            this.$message({
              message: "录入成功",
              type: "success"
            });
          }
        });

      this.getdata();
    },

    run(){
      // 配置完成后生成分数
      // console.log(this.tableData);
      var newdata=this.tableData;
      for(var key in newdata){
        var dier=newdata[key].英语*this.daode+newdata[key].物理*this.weisheng+newdata[key].生物*this.suzhi+newdata[key].化学*this.tiyu;
        var zonghe=(newdata[key].语文*0.6+newdata[key].数学*0.4)*this.xuexi+dier*this.dier;
        newdata[key].dier=dier.toFixed(2);
        newdata[key].zonghe=zonghe.toFixed(2);
      }
      // this.reload();
      this.show(newdata);
      this.handleSizeChange(8);

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
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>
<style scoped>
.wrapper{
  height: 150%;
}
</style>