module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts);
    },
    addPost(req, res) {
        req.store.posts.push(req.body);
        res.status(201).send("Post added: Id = " + (req.store.posts.length - 1));
    },
    updatePost(req, res) {
        req.store.posts[req.params.postId] = req.body;
        res.status(201).send("Updated post with Id = " + req.params.postId);
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1);
        res.status(201).send("Removed post with Id = " + req.params.postId);
    }
};