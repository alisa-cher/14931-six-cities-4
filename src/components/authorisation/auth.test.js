import React from 'react';
import renderer from 'react-test-renderer';
import AuthPage from "./auth.jsx";

it(`Authorisation screen renders correctly`, () => {
  const tree = renderer
    .create(
        <AuthPage onSubmit={() => {}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
