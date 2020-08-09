import React from 'react';
import renderer from 'react-test-renderer';
import BookmarkButton from "./bookmark-button.jsx";

it(`Bookmark button renders correctly`, () => {
  const tree = renderer
    .create(
        <BookmarkButton
          classNamePrefix={`place-card`}
          isFavorite={true}
          offerId={1}
          toggleItem={() => {}}
          onButtonClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
