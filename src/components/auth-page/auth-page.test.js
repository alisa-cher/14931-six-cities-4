import React from 'react';
import renderer from 'react-test-renderer';
import AuthPage from "./auth-page.jsx";

it(`Authorisation screen renders correctly`, () => {
  const tree = renderer
    .create(
        <AuthPage onSubmit={() => {}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
