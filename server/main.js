const userApi = require('./api');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); 
const express = require('express');
const app = express();

// bodyParser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})


// 后端api路由
app.use('/api', userApi);
// 监听端口
app.listen(8088);
console.log('success listen at port:8088......');



