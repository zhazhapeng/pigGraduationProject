<template>
  <div>
    <template>
      <el-table
        id="table"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        height="350"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="学号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="班级" label="班级" width="180"></el-table-column>
        <el-table-column prop="address" label="家庭地址"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
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
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-row :gutter="50">
        <el-col :span="6" :offset="18">
          <el-button class="el-icon-share" @click="dao" type="success" round>导出excel表</el-button>
          <el-button class="el-icon-edit" @click="addstu" type="primary" round>添加学生</el-button>
        </el-col>
      </el-row>
    </template>

    <!-- 修改某个学生 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="form.class" placeholder="请选择活动区域">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
            <el-option label="三班" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="config">确认修改</el-button>
      </div>
    </el-dialog>

    <!-- 添加学生信息表 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-col :span="8">
            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
            <span>{{this.lastid+1}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form2.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-select v-model="form2.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-input v-model="form2.age" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="form2.class" placeholder="请选择班级">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
            <el-option label="三班" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭地址" :label-width="formLabelWidth">
          <el-input v-model="form2.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="config2">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "basetable",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      id: "",
      lastid: "",
      currentPage: 1,
      pagesize: 5,
      total: 0,
      form: {
        name: "",
        age: "",
        sex: "",
        class: "",
        address: "",
        id: ""
      },
      form2: {
        name: "",
        age: "",
        sex: "",
        class: "",
        address: "",
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
        //   if(key=="班级"){
        // 	  this.form.class = row[key];
        //   }else{
        this.form[key] = row[key];
        //   }
      }
      this.id = row.id;
    },
    getdata() {
      var url = "/api/table";
      this.$axios.post(url).then(res => {
        this.tableData = res.data;
        this.total = this.tableData.length;
        //   console.log("lalalala : "+res.data[this.total-1].id);
        this.lastid = res.data[this.total - 1].id;
      });
    },
    addstu() {
      this.dialogFormVisible2 = true;
    },
    config() {
      this.dialogFormVisible = false;
      var url = "/api/table/update";
      this.$axios.post(url, this.form).then(res => {
        console.log(res);
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.getdata();
    },
    config2() {
      console.log("lastid:" + this.lastid + 1);
      // console.log(this.form);
      this.lastid+=1;
      this.form2.id=this.lastid;
      var url = "/api/table/add";
      this.$axios.post(url, this.form2).then(res => {
        if (res.body.code == 1) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      });
       this.dialogFormVisible2 = false;
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