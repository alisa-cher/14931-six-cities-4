import React from 'react';
import renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {MemoryRouter} from 'react-router';

const MockComponent = () => <div />;

it(`Should render private route component`, () => {
  const tree = renderer.create(
      <MemoryRouter initialEntries={[`/favorites`]}>
        <PrivateRoute
          exact
          path={`/favorites`}
          authorizationStatus={AuthorizationStatus.AUTH}
          render={() => <MockComponent />}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
