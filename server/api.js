var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

console.log("链接成功。");


// 学生信息获取接口
router.post('/table', (req, res) => {
    var sql = $sql.user.info;
    // var params = req.body;
    console.log(sql);
    // console.log(params);

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result);
            res.json(result);
        }
    })
})

// 学生信息审核接口
router.post('/check', (req, res) => {
    var sql = $sql.user.check;
    // var params = req.body;
    console.log(sql);
    // console.log(params);

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result);
            res.json(result);
        }
    })
})



// 学生成绩获取接口
router.post('/edit', (req, res) => {
    var params = req.body;
    // console.log(params.name);
    conn.query('select * from ' + params.name, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {

            res.json(result);
        }
    })
})

// 学生端学生成绩获取
router.post('/analysis', (req, res) => {
    var params = req.body;
    var user = params.name;
    console.log(params);
    var sql = {
        sql1: 'select * from first_s where id = ' + user,
        sql2: 'select * from second_s where id = ' + user,
        sql3: 'select * from third_s where id = ' + user,
        sql4: 'select * from fourth_s where id = ' + user,
    };
    // console.log(params.name);
    var list = {1:[],2:[],3:[],4:[]};
    var a=0;
    for(var key in sql){
        conn.query(sql[key], function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log(result);
                list[++a]=result;
                if(a==4){
                    res.json(list);
                }
            }
        })
    }
   
    
   
})


// 学生素质申报
router.post('/declare', (req, res) => {
    var sql = $sql.student.update;
    var params = req.body;
    console.log(sql);
    console.log(params);

    conn.query(sql, [params.xname, params.date, params.state, params.xscore, params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: '修改成功'
            });
        }
    })
})

// 学生申报信息获取
router.post('/declare/get', (req, res) => {
    var sql = $sql.student.get;
    var params = req.body;
    console.log(sql);
    console.log(params);

    conn.query(sql, [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json(result);
        }
    })
})


// 学生信息更改
router.post('/table/update', (req, res) => {
    var sql = $sql.user.update;
    var params = req.body;
    console.log(sql);
    console.log(params);

    conn.query(sql, [params.name, params.age, params.sex, params.class, params.address, params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: '修改成功'
            });
        }
    })
})



// 学生审核状态更改
router.post('/check/update', (req, res) => {
    var sql = $sql.user.cupdate;
    var params = req.body;
    console.log(sql);
    console.log(params);
    // 审核完成修改分数表
    if(params.状态=="已审核"){
        console.log("修改分数");
        var sqlf="update score1 set 生物=? where id=?";
        conn.query(sqlf, [params.分数, params.id], function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log("修改完成");
                // res.json({
                //     code: '1',
                //     msg: '修改成功'
                // });
            }
        })
    }

    conn.query(sql, [params.状态, params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: '修改成功'
            });
        }
    })
})
// 学生成绩更改
router.post('/edit/update', (req, res) => {
    var sql = $sql.user.supdate;
    var params = req.body.form;
    var table = req.body.table;
    console.log(table);
    console.log(params);

    conn.query("update " + table + sql, [params.语文, params.数学, params.英语, params.物理, params.化学, params.生物, params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: '修改成功'
            });
        }
    })
})
// 添加学生接口
router.post('/table/add', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;

    conn.query(sql, [params.id, params.name, params.age, params.sex, params.address, params.class], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: "添加成功"
            });
        }
    })
})
// 上传接口
router.post('/upload', (req, res) => {
    var sql = $sql.user.upload;
    var params = req.body;
    var name = 'admin';
    console.log("upload" + params);
    console.log(sql);
    conn.query(sql, [name, params], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            res.json({
                code: '1',
                msg: "添加成功"
            });
        }
    })
})

// 登录用户接口
router.post('/login', (req, res) => {
    var sql = $sql.user.login;
    var params = req.body;
    console.log("sql", sql);
    console.log("params", params);
    conn.query(sql, [params.username], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            if (result.length > 0) {
                if (result[0].password == params.password) {
                    res.json({
                        code: '1',
                        msg: '操作成功'
                    });
                } else {
                    res.json({
                        code: '2',
                        msg: '密码不对'
                    });
                }
            } else {
                res.json({
                    code: '0',
                    msg: '该用户未注册'
                });
            }
            res.end('is over');
        }
    })
});
// 增加用户接口
router.post('/register', (req, res) => {

    // 首先查看该账号是否注册过
    var sql = $sql.user.login;
    var params = req.body;
    console.log("sql", sql);
    console.log("params", params);
    conn.query(sql, [params.username], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
            if (result.length > 0) {
                //    用户注册过
                res.json({
                    code: '0',
                    msg: '账号已注册'
                });
            } else {
                sql = $sql.user.adduser;
                conn.query(sql, [params.username, params.email, params.password], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        console.log("这是返回结果的位置");
                        if (result.affectedRows > 0) {
                            res.json({ code: '1', msg: "添加成功" })
                        } else {
                            res.json({ msg: "添加失败" })
                        }
                    }
                    res.end('is over');
                })
            }
        }
    });
});



module.exports = router;
