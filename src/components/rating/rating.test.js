import React from 'react';
import renderer from 'react-test-renderer';
import Rating from "./rating.jsx";

it(`Rating renders correctly`, () => {
  const tree = renderer
    .create(
        <Rating
          classNamePrefix={`some-prefix`}
          rating={2}
          isInteger={true}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
