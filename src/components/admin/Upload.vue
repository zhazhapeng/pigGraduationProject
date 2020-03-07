<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>图片上传</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="content-title">支持拖拽</div>
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
export default {
  name: "upload",
  data: function() {
    return {};
  },
  components: {
    VueCropper
  },
  methods: {
    beforeUpload(file) {
    //   var code = store.state.shop_code;
      let fd = new FormData(); //通过form数据格式来传
      fd.append("picFile", file); //传文件
    //   fd.append("shop_code", code); //传其他参数
      var url = '/api/update';
      console.log(fd);
      this.$axios
        .post(url, {fd,headers:{ 'Content-Type': 'multipart/form-data' }})
        .then(res => {
          console.log(res.data);
          let data = res.data;
          if (data.code == 200) {
            this.$message({
              message: "上传成功",
              type: "success"
            });

            //再次请求数据，实现本地与服务器内容一致，解决图片删除失败的bug
            // var code = store.state.shop_code;
            this.getImgs(code); //封装好的请求后台图片的axios请求
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(error => {
          // console.log(error);
        });
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
</style>