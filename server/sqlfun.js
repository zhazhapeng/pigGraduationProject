// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM user WHERE username = ?;',
        add: 'insert into user(username,email, password) values ( ?,?,?);',
        info: 'select * from stu_info order by id',
        update:'update student set name=?,age=?,sex=?,cid=?,address=? where id=?',
        add: 'insert into student(id,name,age,sex,address,cid) values (?,?,?,?,?,?);',
        supdate: ' set 语文=?,数学=?,英语=?,物理=?,化学=?,生物=? where id=?',
        upload: 'insert into images(name,value) values (?,?);'
    },
    student:{
        
    },
}

module.exports = sqlMap;
