"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(express.json());

const bookauthor = [
    { book: 1, author: 'Abc'},
    { book: 2, author: 'Xyz'},
    { book: 3, author: 'Pqr'}
]
var bookFind = 1;
console.log(JSON.stringify(bookauthor[bookFind]));