import React from 'react';
import renderer from 'react-test-renderer';
import CommentsList from "./comments-list";

const comments = [{
  user: {
    name: `Emely`,
    avatarUrl: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/8.jpg`},
  rating: 4,
  comment: `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
  date: `2020-06-17T10:54:44.806Z`
}];

it(`Comments list renders correctly`, () => {
  const tree = renderer
    .create(
        <CommentsList
          comments={comments}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
