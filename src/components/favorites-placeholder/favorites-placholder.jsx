import React from "react";
import PropTypes from "prop-types";

const FavoritesPlaceholder = (props) => {
  const {
    heading,
    title,
    description
  } = props;

  return (
    <section className="favorites favorites--empty" style={{minHeight: 550 + `px`}}>
      <h1 className="visually-hidden">{heading}</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">{title}</b>
        <p className="favorites__status-description">{description}</p>
      </div>
    </section>
  );
};

FavoritesPlaceholder.defaultProps = {
  heading: `Favorites (empty)`,
  title: `Nothing yet saved.`,
  description: `Save properties to narrow down search or plan yor future
  trips.`
};

FavoritesPlaceholder.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default FavoritesPlaceholder;
