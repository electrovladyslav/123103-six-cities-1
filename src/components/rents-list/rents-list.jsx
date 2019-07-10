import React from "react";
import PropTypes from "prop-types";

import RentCard from "../rent-card/rent-card.jsx";
import RentsSort from "../rents-sort/rents-sort.jsx";
import sortingVariantsFunctions from "../../utils/sortVariantsfunctions";

const RentsList = (props) => {
  const {
    elements,
    cityName,
    rentsCount,
    onElementActivate,
    sortingVariants,
    isSortingMenuOpen,
    onChooseVariant,
    onSortingMenuToggle,
    activeSortingVariant,
  } = props;

  return (
    <React.Fragment>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {rentsCount} places to stay in {cityName}
        </b>
        <RentsSort
          sortingVariants={sortingVariants}
          isSortingMenuOpen={isSortingMenuOpen}
          onSortingMenuToggle={onSortingMenuToggle}
          onChooseVariant={onChooseVariant}
          activeSortingVariant={activeSortingVariant}
        />
        <div className="cities__places-list places__list tabs__content">
          {/* ---Rent card--- */}
          {elements
            .sort(sortingVariantsFunctions(activeSortingVariant))
            .map((offer, index) => {
              return (
                <RentCard
                  offer={offer}
                  onCardImageClick={() => {
                    onElementActivate(offer);
                  }}
                  key={`${offer.name}${index}`}
                />
              );
            })}
          {/* ---End of rent card--- */}
        </div>
      </section>
    </React.Fragment>
  );
};

RentsList.propTypes = {
  elements: PropTypes.array.isRequired,
  cityName: PropTypes.string.isRequired,
  rentsCount: PropTypes.number.isRequired,
  onElementActivate: PropTypes.func.isRequired,
  sortingVariants: PropTypes.object,
  isSortingMenuOpen: PropTypes.bool,
  onChooseVariant: PropTypes.func,
  onSortingMenuToggle: PropTypes.func,
  activeSortingVariant: PropTypes.string,
};

export default RentsList;
