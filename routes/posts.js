const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true   });

const Post = mongoose.model('posts', { name: String});


// Send all posts
router.get('/api/posts', (req, res) => {
    Post.find((err, posts) => {
        res.send(posts)
    })
})


//Send the requested post
router.get('/api/posts/:id', (req, res) => {

    var id = mongoose.Types.ObjectId(req.param("id"));
    Post.findById(id, (err, post) => {
        res.send(post)
    })
})


//Delete the post
router.delete('/api/posts/:id', (req, res) => {
    console.log("Came")
    var id = mongoose.Types.ObjectId(req.param("id"));
    Post.findByIdAndRemove(id, (err, post) => {
        res.send(post)
    })
})


//Add a post
router.post('/api/posts', (req, res) => {

    const newPost = new Post(req.body);
    newPost.save().then(() => {
        
        res.send(req.body)
    })
})


//Update the post
router.put('/api/posts/:id', (req, res) => {

    const newPost = new Post(req.body);
    var id = mongoose.Types.ObjectId(req.param("id"));

   Post.findByIdAndUpdate(id, {$set: req.body}, () => {
       res.send("updated")
   })
})


module.exports = router;