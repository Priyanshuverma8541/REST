const express = require('express');
const app = express();
const port = 8000;
const path = require("path");
const {v4 : uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// Corrected: use app.use to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let posts = [
    {
        id:uuidv4(),
        username: "Priyanshu",
        details: "I love coding!"
    },
    {
        id:uuidv4(),
        username: "Priya",
        details: "I do coding!"
    },
    {
        id:uuidv4(),
        username: "Priyansh",
        details: "I love code!"
    }
];

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});

// Corrected: passing posts to the index view
app.get('/posts', (req, res) => {
    res.render("index", { posts: posts });
});
app.get('/posts/new', (req, res) => {
    res.render("new", { posts: posts });
});
app.post('/posts',(req,res)=>{
    let {username,details}=req.body
    let id=uuidv4()
    posts.push({id,username,details})
    res.redirect('/posts')
})
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    
    res.render("show.ejs",{post})
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)//This line of code is likely being used to retrieve a specific post from the posts array where the post's id matches a given id.
    res.render("edit.ejs",{post})
})

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params
    let newContent=req.body.details
    let post=posts.find((p)=>id===p.id)
    post.details=newContent
    console.log(post)
    res.redirect("/posts")

})

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params
    posts=posts.filter((p)=>id!==p.id)
    res.redirect("/posts")
})