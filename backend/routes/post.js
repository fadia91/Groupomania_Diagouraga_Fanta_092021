const express = require("express")
const router = express.Router()
const postCtrl = require("../controllers/post")
const reactionCtrl = require("../controllers/reaction")
const multer = require("../middleware/multer-config")
const auth = require('../middleware/auth');

router.post("/post", auth, multer, postCtrl.createPost)
router.get("/posts", auth, multer,  postCtrl.getAllPost)
router.get("/post/:id", auth, multer, postCtrl.getOnePost)
router.put("/post/:id", auth, multer, postCtrl.updatePost)
router.delete("/posts/:id",auth, postCtrl.deletePost)

router.post("/reaction", auth, reactionCtrl.likeOrDisLike)


module.exports = router