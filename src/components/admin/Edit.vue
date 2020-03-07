<template>
  <div>
    <template>
      <el-row>
        <el-col :span="8">
          <h4>健康生活，快乐工作，今日快乐指数(～￣▽￣)～</h4>
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
        height="460"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="学号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="语文" label="语文" width="90"></el-table-column>
        <el-table-column prop="数学" label="数学" width="90"></el-table-column>
        <el-table-column prop="英语" label="英语" width="90"></el-table-column>
        <el-table-column prop="物理" label="物理" width="90"></el-table-column>
        <el-table-column prop="化学" label="化学" width="90"></el-table-column>
        <el-table-column prop="生物" label="生物" width="90"></el-table-column>
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

    <!-- 修改某个学生 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-col :span="8">
            <span>{{form.name}}</span>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="语文" :label-width="formLabelWidth">
              <el-input v-model="form.语文" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="6" :span="6">
            <el-form-item label="数学" :label-width="formLabelWidth">
              <el-input v-model="form.数学" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="英语" :label-width="formLabelWidth">
              <el-input v-model="form.英语" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="6" :span="6">
            <el-form-item label="物理" :label-width="formLabelWidth">
              <el-input v-model="form.物理" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="化学" :label-width="formLabelWidth">
              <el-input v-model="form.化学" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="6" :span="6">
            <el-form-item label="生物" :label-width="formLabelWidth">
              <el-input v-model="form.生物" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :offset="8" :span="8">
          <el-form-item label="班级" :label-width="formLabelWidth">
            <span>{{this.form.class+"班"}}</span>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="config">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "edit",
  data() {
    return {
      tableData: [],
      id: "",
      currentPage: 1,
      pagesize: 7,
      total: 0,
      search: "",
      name: "first_s",
      term: "",
      value: null,
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' },
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
        this.tableData = res.data;
        this.total = this.tableData.length;
        console.log(res.data);
        this.lastid = res.data[this.total - 1].id;
      });
    },
    config() {
      this.dialogFormVisible = false;
      var url = "/api/edit/update";
      this.$axios
        .post(url, { form: this.form, table: this.table[this.name] })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              message: "录入成功",
              type: "success"
            });
          }
        });

      this.getdata();
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
</style>