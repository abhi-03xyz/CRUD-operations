const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4:uuidv4}=require("uuid");

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   id:uuidv4(),
        username:"ME",
        content:"I love coding",
    },
    {   id:uuidv4(),
        username:"Pikachu",
        content:"Pika pi pika chuuuuuu",
    },
    {   id:uuidv4(),
        username:"Ranchod das chachad",
        content:"Success ke piche nehi excilence ke piche bhago.",
    },
    {   id:uuidv4(),
        username:"Virus",
        content:"Life is a race u damm fool",
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
    //res.send("working!!");
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    //console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
   res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
   let post=posts.find((p)=> id===p.id);
  // console.log(post);
  // res.send("request working");
  res.render("show.ejs",{post});
});
app.get("/",(req,res)=>{
    res.send("server working well !!");
});
app.listen(port,()=>{
    console.log("listining on port: 8080");
});