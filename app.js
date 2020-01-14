"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(express.json());

var fs = require("fs");
var contents = fs.readFileSync("Sample.json");
var jsonContent = JSON.parse(contents);

var speech = "";
var searchValue = 'Christin';
jsonContent.forEach(obj => {
    if (obj.AuthorName == searchValue)
    {
        speech = speech + obj.Title + "\n";
    }
    }
)
console.log("Author Name:", jsonContent[0].AuthorName);
console.log(speech);

//var bookFind = 1;
//console.log(JSON.stringify(bookauthor[bookFind]));