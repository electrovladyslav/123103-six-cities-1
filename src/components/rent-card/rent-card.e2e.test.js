import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RentCard from './rent-card';

Enzyme.configure({adapter: new Adapter()});

const mockOffer = {
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment`,
  type: `Closet`,
  activeCard: `activeCardId`
};
const onCardTitleClick = jest.fn();
const onCardImageClick = jest.fn();


it(`On click on card image active card comes to state`, () => {

  const app = shallow(<RentCard
    offer ={mockOffer}
    onCardTitleClick = {onCardTitleClick}
    onCardImageClick = {onCardImageClick}
  />);

  const cardHeader = app.find(`.place-card__name`);
  cardHeader.simulate(`click`, {preventDefault() {}});
  expect(onCardTitleClick).toHaveBeenCalledTimes(1);

  const cardImage = app.find(`.place-card__image`);
  cardImage.simulate(`click`, {preventDefault() {}});
  expect(onCardImageClick.mock.calls).toContain([`activeCardId`]);
});
