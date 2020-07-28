import React from 'react';
import renderer from 'react-test-renderer';
import SortingOptions from "./sorting-options.jsx";

it(`SortingOptions renders ok`, () => {
  const tree = renderer
    .create(
        <SortingOptions
          onSortingClick={() => {}}
          activeSorting={`to-high`}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
