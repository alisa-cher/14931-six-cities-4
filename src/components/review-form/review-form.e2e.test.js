import React from 'react';
import {mount} from 'enzyme';
import ReviewForm from "./review-form.jsx";

it(`ReviewForm is submitted`, () => {
  const submitHandler = jest.fn();
  const preventDefault = jest.fn();

  const reviewForm = mount(
      <ReviewForm onSubmit={submitHandler} activeItem={2}/>
  );

  const reviewRef = reviewForm.instance().reviewRef;
  const inputRefs = reviewForm.instance().inputRefs;

  const mockEvent = {
    preventDefault,
    reviewRef,
    inputRefs
  };

  const form = reviewForm.find(`.reviews__form`);
  form.simulate(`submit`, mockEvent);
  expect(preventDefault).toHaveBeenCalled();
  expect(submitHandler).toHaveBeenCalled();
});
