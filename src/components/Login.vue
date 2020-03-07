<template>
   <div class="login">
    <div class="bgimage">
      <div class="login_box">
        <div class="login_box_input">
          <div class="loginBoxInput_container">
            <h4 class="title">
              登录
            </h4>
            <div class="login_input_box">
              <div class="login_input_detali">
                <div class="login_user">
                  <el-input
                    size="large"
                    placeholder="用户名"
                    prefix-icon="el-icon-user"
                    v-model="name">
                  </el-input>
                  </div>
                <div class="login_password">
                  <el-input
                    type="password"
                    size="large"
                    placeholder="密码"
                    prefix-icon="el-icon-lock"
                    v-model="password">
                  </el-input>
                </div>
                <div class="login_remember">
                  <el-radio v-model="radio" label="1">记住账号</el-radio>
                </div>
              </div>
              <div class="login_button">
                <el-button type="primary" class="login_btn" @click="login">登录</el-button>
                <p class="tipText">
                  <span>管理员登录：admin/admin</span> 
                  <!-- <span>用户登录：user/user</span> -->
                </p>
              </div>
              <div class="register">
                <router-link to='/register' class="registerBtn">立即注册</router-link>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import bus from './common/bus'
export default {
  name: 'peng',
  data () {
    return {
      msg: 'dapeng',
      password:'',
      name:'',
      radio:'',
    }
  },
  methods:{
    login(){
        console.log("login method")
        var url="/api/login";
        this.$axios.post(url,{
          username:this.name,
          password:this.password
        }).then(res=>{
          // console.log(res);
          var content = res.data;
          console.log(content);
          if(content.code == 1){
            if(this.name=='admin'){
              this.$router.push('/Main');
              bus.$emit('user',this.name);
              this.$store.commit("admin");
            }else{
              this.$router.push('/sMain');  
              bus.$emit('user',this.name);
              this.$store.commit("student",this.name);
            }
            this.$message({
              message:"登录成功",
              type:"success"
            })
          }else if(content.code == 0){
              this.$message({
              message:"用户未注册",
              type:"warning"
            })
          }else{
              this.$message({
              message:"密码错误",
              type:"error"
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    height: 100%;
    width: 100%;
  }
  .bgimage{
    position: relative;
    background-image: url('../../static/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    min-height: 600px;
  }
  .login_box{
    height: 100%;
    /* padding-top: 100px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_box_input{
    position: absolute;
    width: 600px;
    background: #ffffff;
    border-radius: 5px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
  .loginBoxInput_container{
    display: flex;
    margin: 0 auto;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
  }
  .title{
    margin: 0;
    padding: 40px 0;
    color: rgba(0,0,0, .8);
    text-align: center;
    font-size: 40px;
    font-weight: 500;
  }
  .login_password{
    margin-top: 30px;
  }
  .login_remember{
    margin-top: 20px;
  }
  .login_button{
    margin-top: 20px;
  }
  .login_btn{
    width: 100%;
  }
  .tipText{
    color: #999;
    font-style: 13px;
    text-decoration: none;
  }
  .tipText span{
    margin-right: 20px;
  }
  .register{
    text-align: center;
  }
  .registerBtn{
    text-decoration: none;
    color: #5584ff;
  }
</style>