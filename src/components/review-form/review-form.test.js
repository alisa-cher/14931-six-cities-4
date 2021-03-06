import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from "./review-form.jsx";

it(`Review form renders correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          onSubmit={() => {}}
          offerId={1}
          isError={false}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
