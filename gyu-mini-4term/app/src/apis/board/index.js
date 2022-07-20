"use strict";

const express = require("express");
const postCtrl = require("./post.Ctrl");

const router = express.Router();
// router.get("/", postCtrl.output.home);

//게시글 생성
router.post("/create", postCtrl.process.createPost);

//게시글 수정
router.patch("/update", postCtrl.process.updatePost);

//게시글 삭제
router.delete("/delete/:postNo", postCtrl.process.deletePost);

//게시글 전체 불러오기
router.get("/", postCtrl.process.findAllByPosts);

module.exports = router;
