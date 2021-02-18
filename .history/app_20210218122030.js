const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const first = require("ee-first");

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
  var data = {
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
  console.log(firstName, lastName, email);
});

app.listen(3000, function () {
  console.log("server is running");
});
