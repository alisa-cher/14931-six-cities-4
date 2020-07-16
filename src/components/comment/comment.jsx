import React from "react";
import PropTypes from "prop-types";

const Comment = (props) => {
  const {comment, tag: Tag} = props;
  const {user, rating, comment: userComment, date} = comment;
  const {name: userName, avatarUrl} = user;

  const commentDate = new Date(date);
  const formattedDate = commentDate.toLocaleString(`en-UK`, {day: `numeric`, month: `long`, year: `numeric`});

  return (
    <Tag className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54"
            alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: (20 * rating) + `%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {userComment}
        </p>
        <time className="reviews__time" dateTime={
          commentDate.getFullYear() + `-` + (commentDate.getMonth() + 1) + `-` + commentDate.getDate()}>
          {formattedDate + ` `}
        </time>
      </div>
    </Tag>
  );
};

const userShape = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

const commentShape = {
  user: PropTypes.shape(userShape).isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

Comment.propTypes = {
  comment: PropTypes.shape(commentShape).isRequired,
  tag: PropTypes.string.isRequired
};

export default Comment;
