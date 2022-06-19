const db = require("../models");
const Post = db.post;
const User = db.user;
const Reaction = db.reaction;
const fs = require("fs");


exports.createPost = (req, res, _next) => {

    if (!req.body.content) {
        res.status(400).send({
            message: "impossible de publier un message vide !"
        });
        return
    } 
    if (req.file) {
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
            .then(() => res.status(201).json({
                message: 'post créé !'
            }))
            .catch((error) => res.status(400).json({
                error,
                message: ''
            }))
    } else {
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
            imageUrl: null,
        })
            .then(() => res.status(201).json({
                message: 'post créé !'
            }))
            .catch((error) => res.status(400).json({
                error,
                message: ''
            }))
    }
}


// Modifier un message
exports.updatePost = (req, res, next) => {
    let postObject;
    if(req.file){
         postObject =  {
            content: req.body.content,
            userId: req.body.userId,
            is_admin: req.body.is_admin=true,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        }
        
    }if(req.file){
         postObject =  {
            content: req.body.content,
            userId: req.body.userId,
            is_admin: req.body.is_admin=true,
            
        }
    }
    Post.update({ ...postObject, id:  req.params.id}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Message modifié !" }))
    .catch(error => res.status(400).json({ error }))
}

// Supprimer un message
exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Message supprimé !" }))
        .catch(error => res.status(400).json({ error }))
};

exports.getAllPost = (_req, res) => {
    Post.findAll({
        // relie au Post, l'utilisateur qui l'a fait + les commentaires
        include: [User,
            { model: db.reaction }
        ],
        //trie dans l'ordre du + récent
        order: [["createdAt", "DESC"]]
    })
        .then((allPost) => res.status(200).json(allPost))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, _next) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(400).json({ error }))
};