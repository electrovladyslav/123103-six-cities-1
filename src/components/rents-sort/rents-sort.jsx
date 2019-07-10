import React from "react";
import PropTypes from "prop-types";

const RentsSort = ({
  isSortingMenuOpen,
  onSortingMenuToggle,
  sortingVariants,
  onChooseVariant,
  activeSortingVariant,
}) => {
  return (
    <React.Fragment>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={(event) => {
            onSortingMenuToggle();
            event.preventDefault();
          }}>
          {activeSortingVariant}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        {isSortingMenuOpen ? (
          <ul className="places__options places__options--custom places__options--opened">
            {Object.values(sortingVariants).map((variant) => {
              return (
                <li
                  onClick={(event) => {
                    onChooseVariant(variant);
                    event.preventDefault();
                  }}
                  className={`places__option ${
                    variant === activeSortingVariant
                      ? `places__option--active`
                      : ``
                  }`}
                  tabIndex="0"
                  key={variant}>
                  {variant}
                </li>
              );
            })}
          </ul>
        ) : (
          ``
        )}
      </form>
    </React.Fragment>
  );
};

RentsSort.propTypes = {
  isSortingMenuOpen: PropTypes.bool,
  onSortingMenuToggle: PropTypes.func,
};

export default RentsSort;
