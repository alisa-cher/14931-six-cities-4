import React, {createRef} from "react";
import PropTypes from "prop-types";
import {ClientEvaluation, Textarea} from "../../const.js";
import ErrorMessage from "../error-message/error-message.jsx";

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRefs = [];
    this.reviewRef = createRef();

    this.clientEvaluations = [
      ClientEvaluation.PERFECT,
      ClientEvaluation.GOOD,
      ClientEvaluation.NOT_BAD,
      ClientEvaluation.BADLY,
      ClientEvaluation.TERRIBLY
    ];

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this._checkIfIsValid = this._checkIfIsValid.bind(this);
    this._handleTextareaChange = this._handleTextareaChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {activeItem} = this.props;

    if (activeItem !== prevProps.activeItem) {
      this._checkIfIsValid();
    }
  }

  createRefs() {
    this.clientEvaluations.forEach(() => {
      this.inputRefs.push(createRef());
    });
    return this.inputRefs;
  }

  _resetForm() {
    const {
      onItemSet: uncheckCheckbox,
      onItemToggle: toggleSubmitButton
    } = this.props;

    toggleSubmitButton(true);
    uncheckCheckbox();

    this.reviewRef.current.value = ``;
  }

  _checkIfIsValid() {
    const {
      activeItem: checkedInput,
      onItemToggle: disableSubmitButton
    } = this.props;

    const inputIsChecked = checkedInput > 0 || checkedInput === 0;
    const textareaValue = this.reviewRef.current.value.length;
    const isTextIsValid = textareaValue > Textarea.MIN_LENGTH && textareaValue < Textarea.MAX_LENGTH;

    if (isTextIsValid && inputIsChecked) {
      disableSubmitButton(false);
    } else {
      disableSubmitButton(true);
    }
  }

  _handleInputChange(id) {
    const {
      onItemSet: checkInput,
    } = this.props;

    checkInput(id);
    this._checkIfIsValid();
  }

  _handleTextareaChange() {
    this._checkIfIsValid();
  }

  _handleSubmit(evt) {
    const {
      onSubmit,
      activeItem: checkedInput,
      onItemToggle: toggleSubmitButton,
      offerId
    } = this.props;

    const inputValue = this.inputRefs[checkedInput].current.value;

    const formData = {
      comment: this.reviewRef.current.value,
      rating: inputValue
    };

    evt.preventDefault();

    onSubmit(formData, offerId, () => toggleSubmitButton(true), this._resetForm);
  }

  render() {
    const {
      activeItem: checkedInput,
      disabledItem: disabledButton,
      isError
    } = this.props;

    const inputs = this.createRefs();

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {this.clientEvaluations.map((rating, id) =>
            <React.Fragment key={rating + id}>
              <input ref={inputs[id]}
                onChange={() => this._handleInputChange(id)}
                checked={id === checkedInput}
                className="form__rating-input visually-hidden"
                name="rating"
                value={this.clientEvaluations.length - id}
                id={this.clientEvaluations.length - id + `-stars`}
                type="radio"/>
              <label
                htmlFor={this.clientEvaluations.length - id + `-stars`}
                className="reviews__rating-label form__rating-label"
                title={rating}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </React.Fragment>)
          }
        </div>
        <textarea
          ref={this.reviewRef}
          onChange={this._handleTextareaChange}
          className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          minLength="30" maxLength="500"
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button"
            type="submit"
            disabled={disabledButton}>Submit</button>
        </div>
        {isError && <ErrorMessage tag={`span`}/>}
      </form>
    );
  }
}

ReviewForm.propTypes = {
  isError: PropTypes.bool,
  offerId: PropTypes.number.isRequired,
  onItemSet: PropTypes.func,
  onItemReset: PropTypes.func,
  activeItem: PropTypes.number,
  disabledItem: PropTypes.bool,
  onItemToggle: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ReviewForm;
