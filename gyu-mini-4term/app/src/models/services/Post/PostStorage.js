"use strict";
const db = require("../../../apis/config/mariadb");

class postStorage {
  static async findAllByPosts() {
    try {
      const query = `
      select posts.no,posts.user_no, GROUP_CONCAT(images.image_url) AS images, posts.content, posts.created_date, users.nickname 
      from posts
      LEFT JOIN users
      on users.no = posts.user_no
        LEFT JOIN images
        ON images.post_no = posts.no
      GROUP BY posts.no;`;
      const posts = await db.query(query);

      return posts[n];
    } catch (err) {
      throw {
        msg: "게시글 전체조회 오류입니다. 서버개발자에게 문의해주세요.",
      };
    }
  }

  static async createPost(data) {
    try {
      const query = `insert into posts(user_no, content) values(?, ?)`;
      const response = await db.query(query, [data.user_no, data.content]);
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

  static async deletePost(postNo) {
    try {
      const query = `delete from posts where no = ? `;
      const response = await db.query(query, [postNo]);

      return response;
    } catch (err) {
      throw { msg: `${err} : 게시글 삭제 오류입니다, 서버 개발자에게 문의해주세요` };
    }
  }
}

module.exports = postStorage;
