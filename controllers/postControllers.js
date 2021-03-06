const Blog = require('../models/Blog')

exports.getAllPosts = async (req, res) => {
    const page = req.query.page || 1;
    const postPerPage = 2;

    const totalPosts = await Blog.find().countDocuments()
    const blogs = await Blog.find({}).
        sort('-dateCreated').
        skip((page - 1) * postPerPage)
        .limit(postPerPage);

    res.render('index', {
        blogs: blogs,
        current: page,
        pages: Math.ceil(totalPosts / postPerPage)
    })
}

exports.getPost = async (req, res) => {
    const post = await Blog.findById(req.params.id)
    res.render('post', {
        post
    })
}

exports.createPost = async (req, res) => {
    await Blog.create(req.body)
    res.redirect('/')
}

exports.updatePost = async (req, res) => {
    const post = await Blog.findOne({ _id: req.params.id })
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save()

    res.redirect(`/post/${req.params.id}`)
}

exports.deletePost = async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.redirect('/')
}