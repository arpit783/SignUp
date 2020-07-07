const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  var firstName = req.body.FNAME;
  var lastName = req.body.LNAME;
  var email = req.body.EMAIL;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  url = "https://us10.api.mailchimp.com/3.0/lists/29ab86669f";
  options = {
    auth: "arpitshri0:52677f172b31afcbf8e9a583a0056326-us10",
    method: "POST"
  };

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/successful.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen("3000", function(){
  console.log("server is running at port 3000.")
});
