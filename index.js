const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { randomUUID } = require("crypto");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



let Post =[{
    id : randomUUID(),
    name : "Kuwarji",
    caption : "Beautiful sunset",
    location : "Beach",
    likes : 0
}];


app.get("/", (req, res) => {
    res.render("login.ejs");
})

app.get("/home", (req, res) => {
    res.render("home.ejs", { 
        username: req.query.username,
        posts: Post
    });
})

app.get("/posts",(req, res) => {
    res.render("post.ejs");
})

app.post("/posts", (req, res) => {
    let { name, caption, location } = req.body;
    let id = randomUUID();
    Post.push({id, name, caption, location, likes:0 });
    // console.log(req.body);
    res.redirect("/home");
})

app.get("/posts/:id/edit",(req, res) => {
    let {id} = req.params;
    let foundpost = Post.find((p)=> p.id === id);
    res.render("update.ejs",{
        post : foundpost
    });
})



app.post("/posts/:id/like", (req, res) => {
    let { id } = req.params;
    let foundPost = Post.find(post => post.id === id);
    if (foundPost) {foundPost.likes++;
        console.log(foundPost);
    }
    res.redirect("/home");
});

app.post("/posts/:id/comment",(req,res)=>{
    let {id} = req.params;
    let foundPost = Post.find(post=> post.id ===id);
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let foundpost = Post.find(p => p.id === id);

    if (!foundpost) {
        return res.send("Post not found");
    }

    let {name,caption,location} = req.body;
    foundpost.name = name;
    foundpost.caption = caption;
    foundpost.location = location;
    res.redirect("/home");
})


app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;

    Post = Post.filter((post) => post.id !== id);

    res.redirect("/home");
});




















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

