/*
iWeb项目的后台动态Web服务器
功能:
	接收客户端提交的HTTP请求:
	读取请求中客户提交来的数据;
	向数据库服务器提交SQL命令以及操作底层数据;
	最后向客户端发送HTTP响应(response),说明执行成功还是失败
*/
const express = require('express')

//使用第三方模块建一个web服务器,类似于Tomcat/IIS
let app = express();
//
let port = 5050

app.listen(port,()=>{
	console.log('server Listening on Port:' ,port)
})
//导入第三放模块mysql
const mysql = require('mysql')
//使用第三方模块mysql创建数据库连接池
let pool = mysql.createPool({
	host:'127.0.0.1',     //数据库服务器的地址
	port:'3306',          //数据库服务器的端口号
	user:'root',          //数据库管理
	password:'',
	database:'iweb',
	connectionLimit:10,
})
/*
app.get('/index',(req,res)=>{
	res.send('Welcome to My Site Index!')
})
//让
app.get('/login',(req,res)=>{
	res.send('Welcome to My Login Page!')
})
*/

/*
向客户端输出"排名前12位的最新课程"
请求方法:GET
请求地址:/course/newest
请求参数:
响应数据:
[
	{
		cid:3,
		cname:'微信小程序开发'
		pic:'img/course/03.jpg',
		tname:'程涛',
		tid:5,
		price:599
	},
	{
		.....
	},
	.....
]
*/
app.get('/course/newest',(req,res)=>{
	// //向数据库服务器发送查询请求,获得必需法课程数据:前12条(即从第0行开始读取12行);且最新课程(即按课程编号由大到小排序);
	// 同时还要跨表查询(同时查询course和teacher两个表)
	let sql = 'SELECT cid,cname,iw_course.pic,price,tname,tid FROM iW_course,iW_teacher WHERE iw_course.teacher_id=iw_teacher.tid ORDER BY cid DESC LIMIT 0,12'
	pool.query(sql,(err, result)=>{
		if(err){
			console.log('数据库查询失败!')
			throw err
		}
		//数据库操作顺利完成,查询结果保存在result中
		console.log('数据库查询成功!')
		// console.log(result)
		res.send(result)
	})
	//将数据库返回的课程输出发送给客户端
	
})