import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import likeThumb from "../../img/likeThumb.png";
import thumbsUp from "../../img/thumbsUp.png";
import thumbsDown from "../../img/thumbsDown.png";
import thumbsDownFilled from "../../img/thumbsDownFilled.png";
import { likePost, DislikePost } from "../../api/PostsRequests"; // fixed import
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [disliked, setDisLiked] = useState(data.dislikes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [dislikes, setDisLikes] = useState(data.dislikes.length);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked(!liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
    console.log("liked it", data._id);
  };

  const handleDisLike = () => {
    DislikePost(data._id, user._id);
    setDisLiked(!disliked);
    disliked ? setDisLikes(dislikes - 1) : setDisLikes(dislikes + 1);
    console.log("nah fam", data._id);
  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt="post pic"
      />
      <div className="detail">
        <span><b>{data.name} </b></span>
        <span>{data.desc}</span>
      </div>
      <div className="postReact">
        <img
          src={liked ? thumbsUp : likeThumb}
          alt="like"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={disliked ? thumbsDownFilled : thumbsDown}
          alt="dislike"
          style={{ cursor: "pointer" }}
          onClick={handleDisLike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>
      <span style={{ color: "#666", fontSize: "12px" }}>{likes} likes</span>
      <span style={{ color: "#666", fontSize: "12px" }}>{dislikes} dislikes</span>
    </div>
  );
};

export default Post;