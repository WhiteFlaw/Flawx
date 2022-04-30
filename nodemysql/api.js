const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
const jwt = require('jsonwebtoken');  //生成token
let sd = require('silly-datetime');
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');


const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getValue(req, res, next) {
    var id = req.query.id;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [id], (err, result) => {
        res.json(result);
        connection.release();
      })
    })
  },

  setValue(req, res, next) {
    var id = req.body.id, name = req.body.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [name, id], (err, result) => {
        res.json(result);
        connection.release();//归还资源 
      })
    })
  },

  // 注册(检查完毕, 存在问题,Field 'avatar','register_time' doesn't have a default value",  "Column count doesn't match value count at row 1")
  doRegister(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      let content = { name: req.body.username }; //要生成token的主题信息
      let secretOrPrivateKey = "jwt";
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1  // 1小时过期
      });
      let username = postData.username;
      connection.query(sqlMap.user.queryUsername, [username], (err, result) => {
        if (result.length !== 0) {
          res.json({
            status: false,
            msg: '已经有人在用这个名字啦, 换一个吧.'
          });
          connection.release();
          return;
        } else {
          let username = postData.username, password = postData.password;
          connection.query(sqlMap.user.insert, [username, password, time], (err, result) => {
            if (err) {
              res.json({
                status: false,
                msg: 'の...看起来没能成功:' + err,
              })
            } else {
              res.json({
                status: true,
                msg: "注册成功.",
                token: token,
                userData: result[0]
              });
            }
            connection.release();
            return;
          })
        }
      })
    })
  },

  // 登陆(检查完毕, 排除问题:Cannot read property 'password' of undefined接收格式错误,请求链接重建)
  doLogin(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      let content = { name: req.body.username }; //要生成token的主题信息
      let secretOrPrivateKey = "jwt";
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1  // 1小时过期
      });
      connection.query(sqlMap.user.queryLogin, [postData.username], (err, result) => {
        if (result.length === 0) {
          res.json({
            status: false,
            msg: '用户,但是不存在.'
          });
        } else if (result[0].password !== postData.password) {
          res.json({
            status: false,
            msg: "用户名,但是密码.",
          });
        } else {
          res.json({
            status: true,
            token: token,
            msg: "但是,但是没有但是",
            userData: result[0]
          });
        }
        connection.release()
        return;
      })
    })
  },

  getUserData(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.user.queryUserData, [postData.username], (err, result) => {
        res.json(result);
      })
      connection.release();
      return;
    })
  },

  //更新标签(检查完毕, 无异常)
  updateUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.user.queryUsername, [postData.username], (err, result) => {
        if (result.length !== 0 && postData.username !== postData.lastUsername) {
          res.json({
            status: false,
            msg: '已经有人在用这个名字啦, 换一个吧.'
          });
        } else {
          connection.query(sqlMap.user.updateUserData, [postData.username, postData.password, postData.motto, postData.tag1, postData.tag2, postData.tag3, postData.tag4, postData.lastUsername], (err, result) => {
            if (err !== null) {
              res.json({
                status: false,
                msg: '用户信息更新失败:' + err
              });
            } else {
              res.json({
                status: true,
                msg: "成功,你需要重新登陆(3s后跳转)."
              });
            }
            connection.release();
            return;
          })
        }
        connection.release();
        return;
      })
    })
  },

  //请求文章(检查完毕, 已排除问题:将connection.relaease错放到getConnection内)
  getArticleById(req, res, next) {
    let postData = req.body;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.queryArticleById, [postData.article_id], (err, result) => {
        res.json(result);
      })
      connection.release();
      return;
    })
  },

  // 新增文章(检查完毕, 无异常)
  uploadArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body,
        title = postData.article_title;
      authorname = postData.article_authorname
      content = postData.article_content
      connection.query(sqlMap.article.queryByTitle, [title], (err, result) => {
        if (result.length > 0) {
          res.json({
            status: false,
            msg: '这个标题已经有人用啦，换一个:(',
          });
          connection.release();
        } else {
          connection.query(sqlMap.article.insert, [title, content, , authorname, time], (err, result) => {
            if (err !== null) {
              res.json({
                status: false,
                msg: '数据库Error:' + err,
              });
            } else {
              res.json({
                status: true,
                msg: '上传成功.',
              });
            }
            connection.release();
            return;
          })
        }
      })
    })
  },

  //请求最新文章(检查完毕,已排除问题)
  getLatestArticle(req, res, next) {
    pool.getConnection((err, connection) => {  //connection is undedined:由于未连接数据库,所以connection为undefined,参考https://blog.csdn.net/litaolixiaotao/article/details/79406112
      connection.query(sqlMap.article.queryLatestArticle, (err, result) => {
        if (err !== null) {
          res.json("最新文章请求错误:" + err);
        } else {
          res.json(result);
        }
      }),
        connection.release();
      return;
    })
  },

  //请求热门文章
  getHottestArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.queryHottestArticle, (err, result) => {
        if (err !== null) {
          res.json("热门文章请求错误:" + err);
        } else {
          res.json(result);
        }
      }),
        connection.release();
      return;
    })
  },

  // 阅读量 +1
  updateViewCount(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.user.updateTotalView, [postData.totalView, postData.username])
      connection.query(sqlMap.article.updateViewCount, [postData.viewCount, postData.article_id], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: "addView Failed:" + err,
          });
        } else {
          res.json({
            status: true,
            msg: "View + 1!"
          });
        }
      })
      connection.release()
      return
    })
  },

  updateAgree(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.updateArticleAgree, [postData.article_agree, postData.article_id])
      connection.query(sqlMap.user.updateAgree, [postData.agree, postData.username], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: "addArticleAgree Failed" + err,
          });
        } else {
          res.json({
            status: true,
            msg: "你表示了赞同."
          });
        }
      })
      connection.release()
      return
    })
  },
  //对一次请求响应多次就会出现Cannot set headers after they are sent to the client,常见的没有return/connection.release()或者send()/json()了一次以上

  //更新文章(检查完毕,已排除问题)
  updateArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.updateContentById, [postData.article_title, postData.article_content, time, postData.article_id], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: '更新文章失败:' + err + 'postData:' + postData,
          });
        } else {
          res.json({
            status: true,
            msg: '更新文章成功',
          });
        }
      })
      connection.release();
      return;
    })
  },

  //删除文章(检查完毕, 已排除问题)
  delArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.deleteArticleById, [postData.article_id], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: '删除文章失败:' + err,
          });
        } else {
          res.json({
            status: true,
            msg: '删除文章成功',
          });
        }
      })
      connection.release();
      return;
    })
  },

  //添加评论(检查完毕,已排除问题)
  insertComments(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.comment.insertComment, [postData.comment_name, time, postData.comment_content, postData.article_id, postData.comment_avatar], (err, result) => {
        if (err) {
          res.json({
            status: false,
            msg: '添加评论失败:' + err
          });
        } else {
          res.json({
            status: true,
            msg: '添加评论成功'
          });
        }
      })
      connection.release();
      return;
    })
  },

  //请求评论列表
  getComments(req, res, next) {
    pool.getConnection((err, connection) => {  //connection is undedined:由于未连接数据库,所以connection为undefined,参考https://blog.csdn.net/litaolixiaotao/article/details/79406112
      let postData = req.body;
      connection.query(sqlMap.comment.queryByArticleId, [postData.article_id], (err, result) => {
        if (err !== null) {
          res.json("评论请求失败:" + err);
        } else {
          res.json(result);
        }
      }),
        connection.release();
      return;
    })
  },

  updateAvatar(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.comment.updateByCommentName, [postData.avatar, postData.username]);
      connection.query(sqlMap.user.updateAvatar, [postData.avatar, postData.username], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: "因为太丑没有得到服务器宠幸:" + err
          });
        } else {
          res.json({
            status: true,
            msg: "头像已更新,或许刷新一下才能看到?",
          });
        }
      })
      connection.release();
      return;
    })
  },

  //请求更新日志
  getChangelog(req, res, next) {
    pool.getConnection((err, connection) => {  //connection is undedined:由于未连接数据库,所以connection为undefined,参考https://blog.csdn.net/litaolixiaotao/article/details/79406112
      connection.query(sqlMap.article.getChangelog, (err, result) => {
        if (err !== null) {
          res.json("更新日志请求错误:" + err);
        } else {
          res.json(result);
        }
      }),
        connection.release();
      return;
    })
  },

  getUserArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.queryArticleByAuthorname, [postData.username], (err, result) => {
        res.json(result);
      })
      connection.release();
      return;
    })
  },

  get5UserArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.query5ArticleByAuthorname, [postData.username], (err, result) => {
        res.json(result);
      })
      connection.release();
      return;
    })
  },

}

