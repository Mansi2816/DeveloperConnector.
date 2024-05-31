const express = require('express');
const router = express.Router();
const auth = require ('../../Middleware/auth');
const Profile = require('../../Models/Profile');
const User = require('../../Models/User');
const Post = require('../../Models/Posts');
const { check, validationResult } = require('express-validator');

//@route  POST api/post
//@desc   Create a post
//@access Private

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]] , async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //if you don't wanna send password back, then write -password
        const user = await User.findById(req.user.id).select('-password');

        //create new post 
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  Get api/post
//@desc   Get all post
//@access Private

router.get('/', auth , async(req,res) => {
try {

//to get by most recent dates, we will use date: -1
    const posts= await Post.find().sort({date: -1})
    res.json(posts)
} catch (error) {
    console.error(error.message);
        res.status(500).send('Server Error');
}
})


//@route  Get api/post/:id
//@desc   Get post by id
//@access Private

///get post by object id and not user id
router.get('/:id', auth , async(req,res) => {
    try {
    
    //to get post
        const post = await Post.findById(req.params.id)
       
       if(!post) {
        return res.status(404).json({ msg: 'Post not found' })
       }
        res.json(post)
    } catch (error) {
        console.error(error.message);
        
       if(error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' })
       }
            res.status(500).send('Server Error');
    }
    })

    
//@route  delete api/post/:id
//@desc   delete post by id
//@access Private

///get post by object id and not user id
router.delete('/:id', auth , async(req,res) => {
    try {
    
    //to get post by id
        const post = await Post.findById(req.params.id)

        //check user, user post should be equal to logged in user
        if(post.user.toString()!== req.user.id){
            return res.status(401).json({ msg: 'user not authorized'})
        }
        await post.deleteOne()
      
        res.json({msg: 'post removed'})
    } catch (error) {
        console.error(error.message);
        
       if(error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' })
       }
            res.status(500).send('Server Error');
    }
    })

        
//@route  Put api/post/like/:id
//@desc   Like a post
//@access Private

router.put('/like/:id',auth, async (req,res) => {
try {
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    //check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
        return res.status(400).json({ msg: 'Post already liked' })
    }

    post.likes.unshift({user:req.user.id})

    await post.save()
    res.json(post.likes)

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
    
}
})


//@route  Put api/post/unlike/:id
//@desc   Like a post
//@access Private

router.put('/unlike/:id',auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
    
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
    
        //check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }
        
    //get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

        await post.save()
        res.json(post.likes)
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
    })

//@route  POST api/posts/comment/:id
//@desc   Comment on a post
//@access Private

router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]] , async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //if you don't wanna send password back, then write -password
        const user = await User.findById(req.user.id).select('-password');
        //get the post
        const post = await Post.findById(req.params.id)
        
        //create new post 
        const newComment = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        //add a new comment to post comments
        post.comments.unshift(newComment)
        await post.save()
      
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@route  Delete api/posts/comment/:id/:comment_id
//@desc   Delete Comment
//@access Private

router.delete('/comment/:id/:comment_id', auth, async(req,res) => {
    try {
        //get the post by id
        const post = await Post.findById(req.params.id)

        //pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        
        //make sure comment exists
        if(!comment){
            return res.status(404).json({ msg: 'Comment does not exist' })
        }

        //check user, object id === logged in user
        if(comment.user.toString()!== req.user.id){
            return res.status(401).json({ msg: 'user not authorized'})
        }
//get remove index
const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

post.comments.splice(removeIndex, 1)

    await post.save()
    res.json(post.comments)

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
    
}
})


module.exports = router;
