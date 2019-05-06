import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({adapter: new Adapter()});

it(`In main component click on card header work`, () => {
  const onCardTitleClick = jest.fn();

  const app = shallow(<Main
    rentNames ={[`First`, `Second`, `Third`, `Fourth`]}
    onCardTitleClick = {onCardTitleClick}
  />);

  const cardHeaders = app.find(`.place-card__name`);
  cardHeaders.forEach((cardHeader) => {
    cardHeader.simulate(`click`, {preventDefault() {}});
  });
  expect(onCardTitleClick).toHaveBeenCalledTimes(4);
});
