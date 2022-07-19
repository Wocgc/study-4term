"use strict";

const { json } = require("express");
// const { mountpath } = require("../../../app");
const Post = require("../../models/services/Post/Post");
const Posts = require("../../models/services/Post/Post");
const { connectPost } = require("../../models/services/Post/PostStorage");
const logger = require("../config/logger");

const output = {
  home: (req, res) => {
    logger.info("GET / 200 홈 화면");
    res.render("post");
  },
};

const process = {
  createPost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.createPost(req);

      if (response.success) {
        logger.info(`POST /connect 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      } else {
        logger.error(`POST /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  createImage: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.createImage(req);

      if (response.success) {
        logger.info(`POST /connect 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      } else {
        logger.error(`POST /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.updatePost(req);

      if (response.success) {
        logger.info(`POST /connect 201 ${response.success} ${response.msg}`);
        return res.status(201).json(response);
      } else {
        logger.error(`POST /connect 400  ${response.success} ${response.msg}`);
        return res.status(400).json(response);
      }
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = { process, output };
