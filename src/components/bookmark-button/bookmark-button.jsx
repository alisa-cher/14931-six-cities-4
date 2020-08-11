import React from "react";
import PropTypes from "prop-types";
import {Button} from "../../const.js";

class BookmarkButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _toggleButton(isDisabled, newStatus) {
    const {
      offerId,
      onItemToggle,
      onButtonClick
    } = this.props;

    onItemToggle(isDisabled);
    onButtonClick(offerId, newStatus);
  }

  _handleClick() {
    const {
      disabledItem,
    } = this.props;

    if (disabledItem) {
      this._toggleButton(false, Button.STATUS.IS_FAVORITE);
    } else {
      this._toggleButton(true, Button.STATUS.IS_NOT_FAVORITE);
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
          width={isBig ? Button.SIZE.BIG_BUTTON_WIDTH : Button.SIZE.SMALL_BUTTON_WIDTH}
          height={isBig ? Button.SIZE.BIG_BUTTON_HEIGHT : Button.SIZE.SMALL_BUTTON_HEIGHT}>
          <use xlinkHref="#icon-bookmark"/>
        </svg>
        <span className="visually-hidden">To bookmarks</span></button>
    );
  }
}

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onItemToggle: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  disabledItem: PropTypes.bool,
  isBig: PropTypes.bool,
};

export default BookmarkButton;
