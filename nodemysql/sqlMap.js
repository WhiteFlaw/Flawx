const { updateAvatar } = require("./api");

var sqlMap = {
  article: {
    deleteArticleById: 'DELETE FROM article WHERE article_id = ?',
    updateContentById: 'UPDATE article SET article_title= ?, article_content= ?, article_posttime= ? WHERE article_id= ?',  //检查update语句是否正确,因为不知道不改的项不空出来会不会出事
    updateArticleTitleById: 'UPDATE article SET article_title=? WHERE article_id = ?',
    queryHottestArticle: 'SELECT article_content, article_id, article_title FROM article order by viewCount desc limit 10',  //前10篇最火文章, 记得添加viewCount项
    queryLatestArticle: 'SELECT article_content, article_id, article_title FROM article order by article_id desc limit 10',  //前10篇最新文章
    queryArticleByViewCount: 'select * from article order by viewCount desc LIMIT 25',
    queryArticleById: 'SELECT * from article WHERE article_id=?',
    updateViewCount: 'UPDATE article SET viewCount=? WHERE article_id=?',
    insert: 'INSERT INTO article(article_title, article_content, article_id, article_authorname, article_posttime) VALUES (?,?,?,?,?)',
    queryByTitle: 'SELECT * FROM article WHERE article_title=?',
    getChangelog: "SELECT article_id, article_title FROM article WHERE article_authorname = 'YaBai' order by article_id desc limit 1",
    updateArticleAgree: 'UPDATE article SET article_agree=? WHERE article_id=?',
    queryArticleByAuthorname: "SELECT article_title, article_id FROM article WHERE article_authorname = ?",
    query5ArticleByAuthorname:'SELECT article_title, article_id FROM article WHERE article_authorname = ? ORDER BY viewCount DESC LIMIT 5'
  },
  /*   tag: {  //
      queryById: 'SELECT * FROM articles WHERE id=?',
      queryByName: 'SELECT * FROM tags WHERE name=?',
      queryAll: 'SELECT * FROM tags',
      insert: 'INSERT INTO tags(name) VALUES (?)',
      delById: 'DELETE FROM tags WHERE name = ?',
      updateById: 'UPDATE tags SET name = ? WHERE id = ?'
    }, */
  comment: {  //"comment"施工完毕
    insertComment: 'INSERT INTO comment(comment_name, comment_time, comment_content, article_id, comment_avatar) VALUES (?,?,?,?,?)',
    deleteComment: 'DELETE FROM `comment` WHERE comment_name=?, comment_time=?, comment_id=?',//这个还没用上,记得用
    queryAll: 'SELECT * FROM comment',
    queryByArticleId: 'SELECT * FROM comment WHERE article_id = ?',
    updateByCommentName: 'UPDATE comment SET avatar=? WHERE comment_username=?'
  },
  user: {  //"user"施工完毕
    queryUsername: 'SELECT * FROM user WHERE username = ?',
    updateUsername: 'UPDATE user SET username = ? WHERE username = ?', //不知道这句会不会有问题
    queryUserData: 'SELECT tag1, tag2, tag3, tag4, register_time, motto, agree, totalView, avatar FROM user WHERE username = ?',
    insert: 'INSERT INTO user(username, password, register_time) VALUES (?,?,?)',
    queryLogin: 'SELECT username, password, avatar FROM user WHERE username = ?',
    updateAgree: 'UPDATE user SET agree=? WHERE username=?',
    updateTotalView: 'UPDATE user SET totalView = ? WHERE username = ?',
    updateUserData: 'UPDATE user SET username=?, password=?, motto=?, tag1=?, tag2=?, tag3=?, tag4=? WHERE username=?',
    updateAvatar: 'UPDATE user SET avatar=? WHERE username=?'
  },
}

module.exports = sqlMap;
