import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import RentCard from "../rent-card/rent-card.jsx";

class RentsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    // this._setActiveCard = this._setActiveCard.bind(this);
    // this._removeActiveCard = this._setActiveCard.bind(this);
    // this._cardImageClickHandler = this._cardImageClickHandler.bind(this);
  }

  render() {
    const {offers, onCardTitleClick, cityName, rentsCount} = this.props;
    return (
      <React.Fragment>
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {rentsCount} places to stay in {cityName}
          </b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex="0">
                Popular
              </li>
              <li className="places__option" tabIndex="0">
                Price: low to high
              </li>
              <li className="places__option" tabIndex="0">
                Price: high to low
              </li>
              <li className="places__option" tabIndex="0">
                Top rated first
              </li>
            </ul>
            {/*
                <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" selected="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select>
                */}
          </form>
          <div className="cities__places-list places__list tabs__content">
            {/* ---Rent card--- */}
            {offers.map((offer) => {
              return (
                <RentCard
                  offer={offer}
                  onCardTitleClick={onCardTitleClick}
                  onCardImageClick={() => {
                    this._cardImageClickHandler(this.state.activeCard);
                  }}
                  key={offer.name}
                  onMouseEnterCard={() => {
                    this._setActiveCard(offer.name);
                  }}
                  onMouseLeaveCrad={() => {
                    this._removeActiveCard();
                  }}
                />
              );
            })}
            {/* ---End of rent card--- */}
          </div>
        </section>
      </React.Fragment>
    );
  }

  _setActiveCard(id) {
    this.setState({
      activeCard: id
    }, () => {
      console.log(`SetActive card: ${this.state.activeCard}`); // eslint-disable-line no-console
    });
  }

  _removeActiveCard() {
    this.setState({
      activeCard: null
    }, () => {
      console.log(`removeActive card: ${this.state.activeCard}`); // eslint-disable-line no-console
    });
  }

  _cardImageClickHandler(activeCard) {
    console.log(`Active card: ${activeCard}`); // eslint-disable-line no-console
  }
}

RentsList.propTypes = {
  offers: PropTypes.array.isRequired,
  cityName: PropTypes.string.isRequired,
  rentsCount: PropTypes.number.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default RentsList;