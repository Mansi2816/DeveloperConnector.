import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'


const Post = ({getPost, post: {post, loading}, match}) => {
  
  useEffect(() =>{
getPost(match.params.id)
  }, [getPost])

    return loading || post === null ? <Spinner/> : <>
   <Link to= "/posts" className="btn">
    Back To Posts
   </Link>
    <PostItem post= {post} showAction={false} />
    <CommentForm postId={post._id}/>
    <div className="comments">
        {post.comments.map(comment=> (
            <CommentItem key={comment._id} comment={comment} postId={post._id}/>
        ))}
    </div>
    </>
   
}

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post:state.post
})

export default connect(mapStateToProps,{getPost}) (Post)