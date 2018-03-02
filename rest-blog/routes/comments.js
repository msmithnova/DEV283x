module.exports = {
    getComments(req, res) {
        res.status(200).send(req.store.posts[req.params.postId].comments);
    },
    addComment(req, res) {
        let postId = req.params.postId;
        req.store.posts[postId].comments.push(req.body);
        res.status(201).send("Added comment to post with Id = " + postId );
    },
    updateComment(req, res) {
        let postId = req.params.postId;
        let commentId = req.params.commentId;
        req.store.posts[postId].comments[commentId] = req.body;
        res.status(201).send("Updated comment with Id = " + commentId + " on post with Id = " + postId);
    },
    removeComment(req, res) {
        let postId = req.params.postId;
        let commentId = req.params.commentId;
        req.store.posts[postId].comments.splice(commentId, 1);
        res.status(201).send("Removed comment with Id = " + commentId + " from post with Id = " + postId);
    }
};