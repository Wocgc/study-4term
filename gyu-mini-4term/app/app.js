"use strict";

const express = require("express");
const logger = require("./src/apis/config/logger");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
dotenv.config();

const board = require("./src/apis/board");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: logger.stream }));

app.use("/board", board);

module.exports = app;
