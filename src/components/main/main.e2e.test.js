import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({adapter: new Adapter()});

it(`In main component click on card header work`, () => {
  const handleClick = jest.fn();

  const app = shallow(<Main
    rentNames ={[`First`, `Second`, `Third`, `Fourth`]}
    handleClick = {handleClick}
  />);

  const cardHeaders = app.find(`.place-card__name`);
  cardHeaders.forEach((cardHeader) => {
    cardHeader.simulate(`click`, {preventDefault() {}});
  });
  expect(handleClick).toHaveBeenCalledTimes(4);
});
