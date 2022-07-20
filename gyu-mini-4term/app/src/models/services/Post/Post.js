"use strict";

const e = require("express");
const { param } = require("../../../apis/board");
const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async findAllByPosts() {
    try {
      const posts = await PostStorage.findAllByPosts();
      console.log(posts);
      posts[0].images = posts[0].images.split(",");
      // posts[0].images.foreach(()=>posts)

      return posts;
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
      // const params = this.params;
      const updatePost = await PostStorage.updatePost(body);
      if (!updatePost[0].affectedRows) {
        return { success: false, msg: "게시글 수정 오류" };
      }

      return { success: true, msg: "게시물이 수정되었습니다." };
    } catch (err) {
      throw err;
    }
  }

  async deletePost() {
    try {
      // const body = this.body;
      const params = this.params;
      const deletePost = await PostStorage.deletePost(params.postNo);
      if (!deletePost[0].affectedRows) {
        return { success: false, msg: "게시글 삭제 오류" };
      }

      return { success: true, msg: "게시물이 삭제되었습니다." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Post;
