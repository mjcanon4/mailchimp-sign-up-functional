const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "53f31193b9f9a2d39a8cd4731cffb88c-us1";
const listId = "bd381fe6bf";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = `https://us1.api.mailchimp.com/3.0/lists/${listId}`;
  const options = {
    method: "POST",
    auth: `mjcanon:${apiKey}`,
  };

  const request = https.request(url, options, function (respnse) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(response.statusCode);
  if ((response.statusCode === 200)) {
      res.send("You did it")
    });
  }
});

app.listen(3000, function () {
  console.log("server is running");
});
