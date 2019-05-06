import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

// const mockState = {
//   rentNames: [`First`, `Second`, `Third`, `Fourth`]
// };

it(`Main component renders correctly`, () => {
  const tree = renderer
  .create(<Main
    rentNames ={[`First`, `Second`, `Third`, `Fourth`]}
    onCardTitleClick = {jest.fn()}
  />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
