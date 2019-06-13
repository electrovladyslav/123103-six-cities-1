import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';

it(`Sign in component renders correctly`, () => {
  const tree = renderer
  .create(<SignIn
    sendForm={jest.fn()}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
