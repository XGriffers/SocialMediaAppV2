import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import likeThumb from '../../img/likeThumb.png';
import thumbsUp from '../../img/thumbsUp.png';
import thumbsDown from '../../img/thumbsDown.png';
import thumbsDownFilled from '../../img/thumbsDownFilled.png';
import { likePost } from "../../api/PostsRequests";
import { DislikePost } from '../../api/PostsRequests';
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [disliked, setDisLiked] = useState(data.dislikes.includes(user._id));

  const [likes, setLikes] = useState(data.likes.length)
  const [dislikes, setDisLikes] = useState(data.dislikes.length)



  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);


    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)


  };

  const handleDisLike = () => {
    DislikePost(data._id, user._id);
    setDisLiked((prev) => !prev);


    disliked ? setDisLikes((prev) => prev - 1) : setDisLikes((prev) => prev + 1)

  };

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>

        <span>{data.desc}</span>
      </div>

      <div className="postReact">
        <img
          src={liked ? thumbsUp : likeThumb}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={disliked ? thumbsDownFilled : thumbsDown}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleDisLike}
        />

        <img src={Comment} alt="" />
        <img src={Share} alt="" />


      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {dislikes} dislikes
      </span>
    </div>
  );
};

export default Post;
