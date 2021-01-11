//jshint esversion:6
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/",function(req,res){
  console.log(__dirname);
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){

console.log("Form Received");
const query=req.body.cityName;
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=556fae40c28653a64c609f1182ea8e34&units="+unit+"#";

https.get(url,function(response){
  console.log(response.statusCode);

if(response.statusCode===200){
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";

    res.write("<p> The weather is currently "+weatherDescription+" in "+query+"<p>");
    res.write("<h1>The temperature in "+ query+" is " +temp+" degree Celsius.</h1>");
    res.write("<img src="+imageUrl+" alt=Weather-icon"+">");

  });
}
  else
  res.send("<h1>Awww Snap! Something went wrong!!");
});
});

app.listen(3000,function()
{
console.log("The Server Has Started on Port 3000");

});
