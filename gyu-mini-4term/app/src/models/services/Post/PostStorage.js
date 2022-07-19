"use strict";
const db = require("../../../apis/config/mariadb");

class postStorage {
  static async findAllByPosts() {
    try {
      const query = `
        select users.no AS userNo, boards.no AS boardNo, boards.title, boards.description, DATE_FORMAT(boards.in_date,'%m/%d %H:%i') AS inDate, DATE_FORMAT(boards.modify_date,'%m/%d %H:%i') AS modifyDate, (SELECT count(*) FROM comments where comments.board_no = boards.no) AS comments_length, boards.hit, users.nickname, users.id
        from boards
        left join users
        on boards.user_no = users.no;`;
      return await db.query(query);
    } catch (err) {
      throw {
        msg: "게시글 전체조회 오류입니다. 서버개발자에게 문의해주세요.",
      };
    }
  }

  static async createPost({ user_no, content }) {
    try {
      const query = `insert into posts(user_no, content) values(?, ?)`;
      const response = await db.query(query, [user_no, content]);
      return response;
    } catch (err) {
      throw { msg: `${err} : 게시글 생성 오류입니다, 서버 개발자에게 문의해주세요` };
    }
  }
  static async createImage(post_no, image_url, order_no) {
    try {
      const query = `insert into images(post_no, image_url, order_no) values(?, ?, ?);`;
      const response = await db.query(query, [post_no, image_url, order_no]);
      return response;
    } catch (err) {
      throw { msg: `${err} : 이미지 생성 오류입니다, 서버 개발자에게 문의해주세요` };
    }
  }
  static async updatePost(no, { content }) {
    try {
      const query = `update posts set content = ? where no = ?`;
      const response = await db.query(query, [no, content]);
      return response;
    } catch (err) {
      throw { msg: `${err} : 게시글 수정 오류입니다, 서버 개발자에게 문의해주세요` };
    }
  }
}

module.exports = postStorage;
