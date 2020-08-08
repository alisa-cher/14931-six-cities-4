import React from 'react';
import renderer from 'react-test-renderer';
import withToggleItem from "./with-toggle-item";

it(`Should render WithToggleItem component`, () => {
  const MockComponent = () => <div />;
  const NewComponent = withToggleItem(MockComponent);

  const tree = renderer
    .create(
        <NewComponent/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
