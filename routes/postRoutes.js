const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

const protect = require("../middleware/authMiddleware");


//localhost:3000/
router.route("/").get(postController.getAllPosts).post(protect, postController.createPost);

//
router.route("/:id")
    .get(protect, postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;