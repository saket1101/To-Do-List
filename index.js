const express = require("express")
const bodyParser = require("body-parser")
const app = express()
let items = ["Book Item","Food Item"];
let workItems = [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let day = today.toLocaleString("en-us",options)
   res.render("list",{listTitle:day, newListItems:items})

})

app.post("/",function(req,res){
    let item = req.body.newItem
    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
       
    }
   else{
    items.push(item)
    res.redirect("/")
   }
    
})
app.get("/work", function(req,res){
    res.render("list",{listTitle:"Work List", newListItems:workItems})

})


app.listen(3000, function (req, res) {
    console.log("Server is running on 3000 port");
})