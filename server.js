const express = require('express')
const path = require('path')

const posts = require('./routes/posts')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}))

app.use(express.static(path.join(__dirname, 'dist/postsNg')))

app.get('/api/posts', posts)

app.get('/api/posts/:id', posts)

app.delete('/api/posts/:id', posts)

app.post('/api/posts', posts)

app.post('/api/posts/:id', posts)

app.put('/api/posts/:id', posts)


app.listen(3000, (req, res) => {
    console.log('Running')
})
    