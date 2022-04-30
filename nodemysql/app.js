const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./api');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false })
)

app.use(express.static("public/dist"));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

app.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next);
});

app.get('/getLatestArticle', (req, res, next) => {   //首页文章请求
  api.getLatestArticle(req, res, next);
});

app.get('/getHottestArticle', (req, res, next) => {   //首页文章请求
  api.getHottestArticle(req, res, next);
});

app.post('/doRegister', (req, res, next) => {
  api.doRegister(req, res, next);
})

app.post('/doLogin', (req, res, next) => {
  api.doLogin(req, res, next);
})
//has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
//在前端请求内容与后端路由表前半段不同时会出现
app.post('/getUserData', (req, res, next) => {
  api.getUserData(req, res, next);
})

app.get('/admin/updateTag', (req, res, next) => {
  api.updateTag(req, res, next);
})

app.post('/getArticleById', (req, res, next) => {  //文章页文章请求
  api.getArticleById(req, res, next);
})

app.post('/admin/getImg', (req, res, next) => {
  api.getImg(req, res, next);
})

app.post('/admin/uploadArticle', (req, res, next) => {
  api.uploadArticle(req, res, next);
})

app.post('/admin/updateArticle', (req, res, next) => {
  api.updateArticle(req, res, next);
})

app.post('/user/delArticle', (req, res, next) => {
  api.delArticle(req, res, next);
})

app.post('/admin/insertComments', (req, res, next) => {
  api.insertComments(req, res, next);
})

app.post('/updateViewCount', (req, res, next) => {
  api.updateViewCount(req, res, next);
})

app.post('/getComments', (req, res, next) => {
  api.getComments(req, res, next);
})

app.post('/getChangelog', (req, res, next) => {
  api.getChangelog(req, res, next);
})

app.post('/updateAgree', (req, res, next) => {
  api.updateAgree(req, res, next);
})

app.post('/getUserArticle', (req, res, next) => {
  api.getUserArticle(req, res, next);
})

app.post('/get5UserArticle', (req, res, next) => {
  api.get5UserArticle(req, res, next);
})

app.post('/updateUser', (req, res, next) => {
  api.updateUser(req, res, next);
})

app.post('/user/updateAvatar', (req, res, next) => {
  api.updateAvatar(req, res, next);
})

app.listen(3000);
console.log('success listen at localhost:3000......');

