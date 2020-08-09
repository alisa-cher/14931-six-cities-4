import React from "react";
import PropTypes from "prop-types";

const button = {
  STATUS: {
    IS_FAVORITE: 1,
    IS_NOT_FAVORITE: 0,
  },
  SIZE: {
    BIG_BUTTON_WIDTH: 32,
    BIG_BUTTON_HEIGHT: 33,
    SMALL_BUTTON_WIDTH: 18,
    SMALL_BUTTON_HEIGHT: 19,
  }
};

class BookmarkButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _toggleButton(isDisabled, newStatus) {
    const {
      offerId,
      toggleItem,
      onButtonClick
    } = this.props;

    toggleItem(isDisabled);
    onButtonClick(offerId, newStatus);
  }

  _handleClick() {
    const {
      disabledItem,
    } = this.props;

    if (disabledItem) {
      this._toggleButton(false, button.STATUS.IS_FAVORITE);
    } else {
      this._toggleButton(true, button.STATUS.IS_NOT_FAVORITE);
    }
  }

  render() {
    const {
      classNamePrefix,
      disabledItem,
      isBig
    } = this.props;


    const getClass = (prefix, element) => prefix ? `button ` + prefix + `__bookmark-` + element : `button`;
    const basicButtonClass = getClass(classNamePrefix, `button`);
    const basicIconClass = getClass(classNamePrefix, `icon`);
    const activeClass = classNamePrefix + `__bookmark-button--active`;

    return (
      <button
        onClick={this._handleClick}
        className={basicButtonClass + ` ` + (!disabledItem ? activeClass : ``)}
        type="button">
        <svg className={basicIconClass}
          width={isBig ? button.SIZE.BIG_BUTTON_WIDTH : button.SIZE.SMALL_BUTTON_WIDTH}
          height={isBig ? button.SIZE.BIG_BUTTON_HEIGHT : button.SIZE.SMALL_BUTTON_HEIGHT}>
          <use xlinkHref="#icon-bookmark"/>
        </svg>
        <span className="visually-hidden">To bookmarks</span></button>
    );
  }
}

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  disabledItem: PropTypes.bool,
  isBig: PropTypes.bool,
};

export default BookmarkButton;
