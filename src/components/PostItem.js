import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUpvote, setMyOwnTime, setDetailPost } from "../store/actions/postAction";

function PostItem({ post }) {
  const dispatch = useDispatch();
  
  return (
    <div className="post">
      <div className="post__left">
        <i onClick={(() => {dispatch(updateUpvote('up', post?.id, 'fromPost'))})} className="bi bi-caret-up-fill" style={{ cursor: 'pointer' }}></i>
        <span>{post?.upvote}</span>
        <i onClick={(() => {dispatch(updateUpvote('down', post?.id, 'fromPost', post))})} className="bi bi-caret-down-fill" style={{ cursor: 'pointer' }}></i>
      </div>
      <div className="post__center">
        <img src={post?.fileType === 'image' ? post?.file : 'https://apply.sts.net.pk/assets/images/default-upload-image.jpg'} alt="" />
      </div>
      <div className="post__right">
        <h3><Link onClick={(() => { dispatch(setDetailPost(post)) })} to={`/detail/${post?.id}`}>{post?.title} </Link></h3>
        <span className="post__info">
          submitted on {setMyOwnTime(post?.createdAt)} by {post?.user} to {post?.subreddit ? post?.subreddit : 'Others'}
        </span>
        <p className="post__info">
            {post?.comments.length} comments
        </p>
      </div>
    </div>
  );
}

export default PostItem;
