const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const ejs = require('ejs')
const postControllers = require('./controllers/postControllers')
const pageControllers = require('./controllers/pageControllers')

const app = express()

//connect DB
mongoose.connect('mongodb+srv://mert:VhJZFmbJa3M2NPdd@cluster0.fbssk.mongodb.net/blog-test-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connected')
}).catch((err) => console.log(err))

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));


//Routes 
app.get('/', postControllers.getAllPosts)
app.get('/post/:id', postControllers.getPost)
app.post('/blogs', postControllers.createPost)
app.put('/post/:id', postControllers.updatePost)
app.delete('/post/:id', postControllers.deletePost)
app.get('/post/edit/:id', pageControllers.getEditPage)
app.get('/about', pageControllers.getAboutPage)
app.get('/add_post', pageControllers.getAddPage)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server ${port} portunda başlatıldı`)
})