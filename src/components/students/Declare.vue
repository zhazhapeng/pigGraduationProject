/* <template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>-->
        <el-breadcrumb-item>素质成绩申报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="content-title">
        <!-- 输入组件 -->
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 表单
            </el-breadcrumb-item>
            <el-breadcrumb-item>编辑器</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container">
          <div class="plugins-tips">
            <!-- Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>-->
            <el-steps :active="buzhou">
              <el-step title="填写" icon="el-icon-edit"></el-step>
              <el-step title="上传" icon="el-icon-upload"></el-step>
              <el-step title="审批" icon="el-icon-picture"></el-step>
            </el-steps>
          </div>
  <!-- 日期选择器 -->
          <template>
            <el-row>

        <el-col :span="8">
        <div class="block">
          <span class="demonstration">项目名称</span>
          <el-input v-model="xname" style="width:180px" placeholder="请输入项目名称"></el-input>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="block">
          <span class="demonstration">申报分数</span>
          <el-input v-model="xscore" style="width:180px" placeholder="请输入申报分数"></el-input>
        </div>
        </el-col>
        <el-col :span="8">
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        </el-col>
        </el-row>
      </template>


          <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
          <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
      </div>
      <div class="plugins-tips">
        Element UI自带上传组件。
        <!-- 访问地址：<a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a> -->
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :before-upload="beforeUpload"
        :limit="1"
        ref="upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "declare",
  data: function() {
    return {
        buzhou:1,
         date: '',
         xname:'',
         xscore:'',
         name: localStorage.getItem('username'),
      content: "",
      editorOption: {
        placeholder: "点击此处进行编辑"
      }
    };
  },
  components: {
    VueCropper,
    quillEditor
  },

  created(){
    this.getData();
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },

    getData(){
        var url="/api/declare/get";
        this.$axios.post(url,{id:this.name}).then(res=>{
          var data = res.data;
          console.log("data: "+data);
          this.xname=data[0].项目名称;
          this.date=data[0].提交时间;
          this.xscore=data[0].分数;
          if(data[0].状态=="已审核"){
            this.buzhou=3;
          }

        })
    },


    submit() {
      var cdate=this.getTime(this.date);
      console.log("date: "+cdate);
      var url = "/api/declare";
      this.$axios.post(url, {id:this.name,xname:this.xname,xscore:this.xscore,state:"未审核",date:cdate}).then(res => {
        // console.log(res);
      });


      // console.log(this.content);
      this.buzhou=2;
      this.$message.success("提交成功！");
    },
    getTime(val){
    if (val&val instanceof Date){
      var d = val;
    }else{
      var d = new Date();
    };
    var year = d.getFullYear();
    var mouth = (d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
    var day = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
    // var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    // var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    // var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    var curTime = year + '-' + mouth + '-' + day;
    return curTime
  }


  }
};
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style> */