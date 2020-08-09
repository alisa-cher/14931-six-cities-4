import React from 'react';
import {mount} from 'enzyme';
import AuthPage from "./auth-page.jsx";

it(`Auth form is submitted`, () => {
  const submitHandler = jest.fn();
  const preventDefault = jest.fn();

  const authPage = mount(
      <AuthPage onSubmit={submitHandler}/>
  );

  const emailRef = authPage.instance().emailRef;
  const passwordRef = authPage.instance().passwordRef;

  const mockEvent = {
    preventDefault,
    emailRef,
    passwordRef
  };

  const authForm = authPage.find(`.login__form`);
  authForm.simulate(`submit`, mockEvent);
  expect(preventDefault).toHaveBeenCalled();
  expect(submitHandler).toHaveBeenCalled();
});
