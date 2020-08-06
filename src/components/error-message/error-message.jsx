import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  const {tag: Tag, className} = props;
  return (
    <Tag className={className} style={{color: `red`, paddingTop: `5px`, display: `block`}}>
      Something went wrong. Please try again later.
    </Tag>
  );
};

ErrorMessage.propTypes = {
  tag: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ErrorMessage;
