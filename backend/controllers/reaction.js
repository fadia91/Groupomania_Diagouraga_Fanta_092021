const db = require("../models/Index.js");
const Reaction = db.reaction;
const Post = db.post;

exports.likeOrDisLike = (req, res, _next) => {

    if(req.body.type === 1){
      Reaction.create({
        userId : req.body.userId,
        postId : req.body.postId,
        type : req.body.type,
      })
      .then(() =>{
        
          Post.increment('likes', { by: 1, where: { id: req.body.postId } })
          .then(() => res.send("Reaction enregistrée"))
      })
    }else if(req.body.type === -1){
      Reaction.create({
        userId : req.body.userId,
        postId : req.body.postId,
        type : req.body.type,
      })
      .then(() =>{
        
          Post.increment('dislikes', { by: 1, where: { id: req.body.postId } })
          .then(() => res.send("Réaction enregistrée"))
      })
    }else{
      Reaction.findOne({where : {postId: req.body.postId, userId: req.body.userId},})
      .then((reaction) =>{
          
          reaction.destroy()
          if (reaction.type === 1){
            Post.decrement('likes', { by: 1, where: { id: req.body.postId } })
            .then(() => res.send("Reaction annulée"))
          }else{
            Post.decrement('dislikes', { by: 1, where: { id: req.body.postId } })
            .then(() => res.send("Reaction annulée"))
          }
          
      })
    }

  
    
};

