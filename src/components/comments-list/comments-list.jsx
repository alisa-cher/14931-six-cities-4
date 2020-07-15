import React from "react";
import Comment from "../comment/comment.jsx";
import PropTypes from "prop-types";

const CommentsList = (props) => {
  const {comments} = props;
  return (
    <ul className="reviews__list">
      {comments.map((comment, id) =>
        <Comment
          key={comment + id}
          comment={comment}
          tag={`li`}
        />
      )}
    </ul>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
