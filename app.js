//https://github.com/m10hit/newsletter-signup

// //need to send data about subscibers to api
// //in JSON form : see in format

// //key : to authentication :99174b295b502092d808293c517d3956-us17
// //list id/audience id : help api to identify the list : fe22ae57eb
// //api end point

const express= require("express")
const bodyParser=  require("body-parser");
const request = require("request")
const https= require("https");

const app=express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("public"));  

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    //api reference - create list - parameters and their properties 
    let data = { 
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: fname,
            LNAME: lname
          }
        }
      ] 
    }
    
    //request used to send data to api
    // in post http method we have option also : http documentation
    let jsonData = JSON.stringify(data)

    let options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/fe22ae57eb",
        method: "POST",
        headers: {
            "Authorization": "Aniket 99174b295b502092d808293c517d3956-us17"
        },
         body : jsonData 
    }

    request(options, function(error, response, body){
         if(error) {
            res.sendFile(__dirname +"/failure.html")
         } else { 
             if(response.statusCode === 200) {
            res.sendFile(__dirname +"/success.html")
         } else {
            res.sendFile(__dirname +"/failure.html")
         }

        }
    })
})

app.post("/failure", function(req, res){   //when /failure is requested .. redirected to home
        res.redirect("/")
    })
    

app.listen(process.env.PORT || 3000, function(){//To works on both deployment & locally
      console.log("server now running on port 3000")    
})
    