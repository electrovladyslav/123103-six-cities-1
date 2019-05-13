import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RentCard from "./rent-card";

Enzyme.configure({adapter: new Adapter()});

const mockOffer = {
  isPremium: false,
  imageSource: `blabla.jpg`,
  price: 100,
  isBookmarked: false,
  rating: 3,
  name: `Super very best appartment`,
  type: `Closet`,
};
const onCardTitleClick = jest.fn();
const onCardImageClick = jest.fn();

it(`On click on card image active card comes to handler`, () => {
  const app = shallow(
      <RentCard
        offer={mockOffer}
        onCardTitleClick={onCardTitleClick}
        onCardImageClick={onCardImageClick}
      />
  );

  const cardImages = app.find(`.place-card__image-wrapper a`);
  cardImages.forEach((cardImage) => {
    cardImage.simulate(`click`, {preventDefault() {}});
  });
  expect(onCardImageClick.mock.calls[0][0]).toContain([`Super very best appartment`]);
});
