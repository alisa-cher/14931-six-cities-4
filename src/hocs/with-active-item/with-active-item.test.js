import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from "./with-active-item";

it(`Should render WithActiveItem component`, () => {
  const MockComponent = () => <div />;
  const NewComponent = withActiveItem(MockComponent);

  const tree = renderer
    .create(
        <NewComponent/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
