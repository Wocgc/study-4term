"use strict";

const express = require("express");
const postCtrl = require("./post.Ctrl");

const router = express.Router();
router.get("/", postCtrl.output.home);

//게시글 생성
router.post("/create", postCtrl.process.createPost);

//게시글 수정
router.patch("/update/:no", postCtrl.process.updatePost);

module.exports = router;
