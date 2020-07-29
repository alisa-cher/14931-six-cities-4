import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from "./with-active-item";

it(`Comment renders correctly`, () => {
  const element = `div`;
  const NewComponent = withActiveItem(element);

  const tree = renderer
    .create(
        <NewComponent/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
