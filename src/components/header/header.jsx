import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {isUserLoggedIn, photo, email} = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={`/`}>
              <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isUserLoggedIn &&
                <Link
                  className="header__nav-link header__nav-link--profile" to='/favorites'>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img style={{borderRadius: 10 + `px`}}
                      src={isUserLoggedIn ? photo : `../img/avatar.svg`}
                      alt="user avatar"
                      width="81"
                      height="41"/>
                  </div>
                  <span className="header__user-name user__name">{email}</span>
                </Link>
                }
                {!isUserLoggedIn && <Link className="header__nav-link header__nav-link--profile" to='/login'>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img style={{borderRadius: 10 + `px`}}
                      src={isUserLoggedIn ? photo : `../img/avatar.svg`}
                      alt="user avatar"
                      width="81"
                      height="41"/>
                  </div>
                  <span className="header__login">Sign in</span>
                </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
  photo: PropTypes.string,
};

export default Header;
