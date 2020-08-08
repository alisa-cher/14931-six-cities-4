import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from "./error-message.jsx";

it(`Error message correctly`, () => {
  const tree = renderer
    .create(
        <ErrorMessage
          className={`test`}
          tag={`span`}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
