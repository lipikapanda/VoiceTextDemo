"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(express.json());

restService.use(
    bodyParser.urlencoded({
      extended: true
    })
);

restService.use(bodyParser.json());

const bookauthor = [
  { book: 'Harry Potter', author: 'Abc'},
  { book: 'Alchemist', author: 'Xyz'},
  { book: 'You Can Win', author: 'Pqr'}
]

restService.post("/echo", function(req, res) {
  var bookFind = req.body.queryResult.parameters.echoText;
  var speech =
      req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.echoText
          ? bookauthor[bookFind]
          : "Seems like some problem. Speak again please...";

  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
