import React from 'react';
import renderer from 'react-test-renderer';
import FavoritesPlaceholder from "./favorites-placholder.jsx";

it(`Favorites placeholders renders correctly`, () => {
  const tree = renderer
    .create(
        <FavoritesPlaceholder
          heading={`some-heading`}
          title={`some-title`}
          description={`some-description`}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
