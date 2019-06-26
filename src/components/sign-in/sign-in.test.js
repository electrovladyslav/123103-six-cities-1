import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in.jsx';

it(`Sign in component renders correctly`, () => {
  const tree = renderer
  .create(<SignIn
    onSignIn={jest.fn()}
    isAuthorized={false}
    redirectToMain={jest.fn()}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
