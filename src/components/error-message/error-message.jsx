import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  const {tag: Tag, className, content} = props;
  return (
    <Tag className={className} style={{color: `red`, paddingTop: `15px`, display: `block`}}>
      <span>Something went wrong. Please try again later.</span>
      {content && content}
    </Tag>
  );
};

ErrorMessage.defaultProps = {
  content: ``
};

ErrorMessage.propTypes = {
  tag: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string
};

export default ErrorMessage;
