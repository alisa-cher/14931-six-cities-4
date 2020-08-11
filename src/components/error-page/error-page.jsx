import React from "react";
import PropTypes from "prop-types";

const ErrorPage = (props) => {
  const {
    status,
    description
  } = props;

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">{status}</b>
                <p className="cities__status-description">{description}</p>
              </div>
            </section>
            <div className="cities__right-section"/>
          </div>
        </div>
      </main>
    </div>
  );
};

ErrorPage.defaultProps = {
  status: `No places to stay available`,
  description: `We could not find any property available at the moment.`
};

ErrorPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  userPhoto: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string
};

export default ErrorPage;
