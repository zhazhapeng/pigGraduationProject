<template>
  <div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="term" label="学期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="语文" label="语文" width="110"></el-table-column>
        <el-table-column prop="数学" label="数学" width="110"></el-table-column>
        <el-table-column prop="英语" label="英语" width="110"></el-table-column>
        <el-table-column prop="物理" label="物理" width="110"></el-table-column>
        <el-table-column prop="化学" label="化学" width="110"></el-table-column>
        <el-table-column prop="生物" label="生物" ></el-table-column>
      </el-table>
</template>
    
 <el-row style="margin-top:25px">

  <div id="main" style="height:600px;width:600px"></div>

 </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableData: [],
      tableData2:{
        语文:[],
        数学:[],
        英语:[],
        物理:[],
        化学:[],
        生物:[],
        总分:[]
      },
      user:localStorage.getItem("username"),
      fundNavChartDate:["第一学期","第二学期","第三学期","第四学期"],
    };
  },
  created(){
       //在页面加载时读取localStorage里的状态信息
      this.getData();
  },
  mounted(){
    // this.show();
  },
  methods: {
      getData(){
        var url = "/api/analysis";
      this.$axios.post(url, { name: this.user }).then(res => {
        //   console.log(res);
          for(var key in res.data){
            this.tableData.push(res.data[key][0]);
          }
          // console.log("this.tableData  "+this.tableData)
        this.manage(this.tableData);
        });
      },
    manage(val){
        // console.log(val);
        // var sum =0;
        for(var key in val){
          console.log(key);
          console.log(val[key]);
          this.tableData2.语文.push(val[key].语文);
          this.tableData2.数学.push(val[key].数学);
          this.tableData2.英语.push(val[key].英语);
          this.tableData2.化学.push(val[key].化学);
          this.tableData2.物理.push(val[key].物理);
          this.tableData2.生物.push(val[key].生物);
        }
        this.show();
    },
      show(){
        var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

// fuzhi
      myChart.setOption({
                   xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.fundNavChartDate
                },
                yAxis: {
                    type: "value"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                legend: {
                    data: ['语文','数学','英语','物理','化学','生物','总分']
                },
                series: [{
                    data: this.tableData2.语文,
                    name: "语文",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#e99400",
                            lineStyle: {
                                color: "#e99400"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#e99400" },
                                    { offset: 0.7, color: "#FFE2C6" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                            )
                        }
                    }
                },{
                    data: this.tableData2.数学,
                    name: "数学",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#409EFF",
                            lineStyle: {
                                color: "#409EFF"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#409EFF" },
                                    { offset: 0.1, color: "#409EFF" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                              
                            )
                        }
                    }
                },
                {
                    data: this.tableData2.英语,
                    name: "英语",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#ff4d4f",
                            lineStyle: {
                                color: "#ff4d4f"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#409EFF" },
                                    { offset: 0.1, color: "#409EFF" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                            )
                        }
                    }
                },{
                    data: this.tableData2.物理,
                    name: "物理",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#eb2f96",
                            lineStyle: {
                                color: "#eb2f96"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#409EFF" },
                                    { offset: 0.1, color: "#409EFF" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                            )
                        }
                    }
                },{
                    data: this.tableData2.生物,
                    name: "生物",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#52c41a",
                            lineStyle: {
                                color: "#52c41a"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#409EFF" },
                                    { offset: 0.1, color: "#409EFF" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                            )
                        }
                    }
                },{
                    data: this.tableData2.化学,
                    name: "化学",
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    lineStyle: { normal: { width: 2 } },
                    itemStyle: {
                        normal: {
                            color: "#722ed1",
                            lineStyle: {
                                color: "#722ed1"
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 0,
                                [
                                    { offset: 0, color: "#1890ff" },
                                    { offset: 0.1, color: "#1890ff" },
                                    { offset: 1, color: "#ffffff" }
                                ]
                            )
                        }
                    }
                }
                
                
                ]

                })

      }






      }
  }

</script>
<style scoped>


</style>