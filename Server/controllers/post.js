const Post = require("../models/post")
const image = require("../utils/image")


async function createPost(req, res) {
    try {
        const post = new Post(req.body)
        post.created_at = new Date()

        const imagePath = image.getFilePath(req.files.miniature)
        post.miniature = imagePath

        const postStored = await post.save()
        res.status(201).send(postStored)

    } catch (error) {
        console.error("Error al crear el post")
        res.status(400).send({ msg: "Error al crear el post" })
    }
}

async function getPosts(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { created_at: "desc" }
        }
        const listPost = await Post.find().paginate({}, options)
        res.status(200).send(listPost)
    } catch (error) {
        console.error("Error al obtener los posts: ", error);
        res.status(400).send({ msg: "Error al obtener los posts" })
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params
        const postData = req.body
        if (req.file && req.file.miniature) {
            const imagePath = image.getFilePath(req.file.miniature)
            postData.miniature = imagePath
        }

        const postUpdate = await Post.findByIdAndUpdate({ _id: id }, postData)
        res.status(200).send({ msg: "post modificado correctamente" })
    } catch (error) {
        console.error("Error al modificar el post: ", error);
        res.status(400).send({ msg: "Error al modificar el post" })
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params
        await Post.findByIdAndDelete(id)
        res.status(200).send({ msg: "Post eliminado correctamente" })

    } catch (error) {
        console.error("Error al eliminar el Post: ", error);
        res.status(400).send({ msg: "Error al eliminar el Post" })
    }
}

async function getPost(req, res) {
    try {
        const { path } = req.params
        const postStore = await Post.findOne({ path: path })
        if (!postStore) {
            return res.status(400).send({ msg: "Error al obtener el post" })
        }
        res.status(200).send(postStore)
    } catch (error) {
        console.error("Error al obtener el Post: ", error);
        res.status(400).send({ msg: "Error al obtener el Post" })
    }
}


module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}