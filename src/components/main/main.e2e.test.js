import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({adapter: new Adapter()});

const onCardTitleClick = jest.fn();
const mockOffers = [{
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment 1`,
  type: `Closet`,
  activeCard: `activeCardId`
}, {
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment 2`,
  type: `Closet`,
  activeCard: `activeCardId`
}, {
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment 3`,
  type: `Closet`,
  activeCard: `activeCardId`
}, {
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment 4`,
  type: `Closet`,
  activeCard: `activeCardId`
}];

it(`In main component click on card header works`, () => {
  const app = mount(
      <Main offers={mockOffers} onCardTitleClick={onCardTitleClick} />
  );

  const cardHeaders = app.find(`.place-card__name`);
  cardHeaders.forEach((cardHeader) => {
    cardHeader.simulate(`click`, {preventDefault() {}});
  });
  expect(onCardTitleClick).toHaveBeenCalledTimes(4);
});
