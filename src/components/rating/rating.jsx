import React from "react";
import PropTypes from "prop-types";
import {getRatingPercentage} from "../../helpers";

const RATING_MAX_VALUE = 5;

const Rating = (props) => {
  const {classNamePrefix, rating} = props;
  const getClass = (prefix, basicClass, additionalClass) => prefix ? prefix + basicClass + ` ` + additionalClass : ``;

  return (
    <div className={getClass(classNamePrefix, `__rating`, classNamePrefix)}>
      <div className={getClass(classNamePrefix, `__stars`, `rating__stars`)}>
        <span style={{width: `${getRatingPercentage(rating, RATING_MAX_VALUE, true)}%`}}/>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  classNamePrefix: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Rating;
