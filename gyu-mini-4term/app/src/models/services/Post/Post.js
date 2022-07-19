"use strict";

const PostStorage = require("./PostStorage");
// const Blank = require("../../utils/blankConfirm");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async postAll() {
    try {
      return await PostStorage.findAllByPosts();
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async createPost() {
    try {
      const body = this.body;
      const createPost = await PostStorage.createPost(body);
      const createPostInfo = createPost[0];
      const image = body.image_url;

      if (!createPostInfo.affectedRows) {
        return { success: false, msg: "게시글 생성 오류" };
      }

      for (let i = 0; i < image.length; i++) {
        await PostStorage.createImage(createPostInfo.insertId, image[i], i);
      }

      return { success: true, msg: "게시글 생성" };
    } catch (err) {
      throw err;
    }
  }

  async updatePost() {
    try {
      const body = this.body;
      const params = this.params;
      const updatePost = await PostStorage.updatePost(params, body);
      if (!updatePost[0].affectedRows) {
        return { success: false, msg: "게시글 수정 오류" };
      }
      // const updatePost1 = await PostStorage.createImage(body);

      return { success: true, msg: "게시물이 수정되었습니다." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Post;
