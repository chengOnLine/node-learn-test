const  app = require("./app");

var express = require("express");
// 导入bodyParser 用于对post请求体进行解析
var bodyParser = require("body-parser");

var path = require("path");

// 导入 router(小型的express)

var router = express.Router();
var templateRouter = require("./router/template");
var permissionRouter = require("./router/permission");

// 链接mongoose数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:mongodb123456@cluster0.j1xml.mongodb.net/testDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(res=>{
    console.log("connect successed!");
}).catch(e=>{
    console.log("connect failed!",e);
})

mongoose.connection.on('error', function callback () {
  console.log("connection error");
});

mongoose.connection.once('open', function callback () {
    console.log("mongodb working!");
});

var testSchema = mongoose.Schema({
    name: String,
    age:Number,
});

testSchema.methods.speak = function(){
    var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
}
  
var TestModel = mongoose.model('demo', testSchema);

var testDemo = new TestModel({
    name : 'i am demo',
});
testDemo.speak();

TestModel.find( (err , res) => {
    console.log("res", res);
})

router.route('/api') //      /route/api
	.post(function(req, res) {

	})
	.get(function(req, res) {
		res.send("api");
	});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/test" , (req , res)=>{
    console.log("req" , req.url , req.params , req.body , req.query);
    res.send("??");
})

app.use("/" , router);
app.use("/mockLogin" , permissionRouter);
app.use("/template" , templateRouter);

try{
    app.listen(app.get("port"));   
    console.log("服务已启动");
}catch(e){
    console.log("服务启动失败：",e);
}