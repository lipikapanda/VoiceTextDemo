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

var fs = require("fs");
var contents = fs.readFileSync("Sample.json");
var jsonContent = JSON.parse(contents);

restService.post("/search", function(req, res) {
  var searchValue = req.body.queryResult.parameters.country;
  var speech = "";
  var count = Number(0);
  jsonContent.forEach(obj => {
        if (obj.Country == searchValue)
        {
          count = count + 1;
          speech = speech + count + ". " + obj.Title + "\n  \n";

        }
      }
  )
  if (count == 0)
  {
    speech = speech + "No articles found for country " + searchValue + " !!!"
  }
  else
  {
    speech = "Here are the titles of articles found for country  " + searchValue + ". \n  \n" + speech
  }
  //speech =
   //   req.body.queryResult &&
   //   req.body.queryResult.parameters &&
   //   req.body.queryResult.parameters.country
   //       ? speech
   //       : "Seems like some problem. Speak again please...";

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
