import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._updatePoints();
    this.zoom = 12;
    this.markersStorage = [];
  }

  render() {
    return (
      <React.Fragment>
        <div id="map" />
      </React.Fragment>
    );
  }

  componentDidMount() {
    const centerCords = [this.centerPoint.latitude, this.centerPoint.longitude];

    this.map = this.leaflet.map(`map`, {
      center: centerCords,
      zoom: this.zoom,
      zoomControl: false,
      marker: true,
    });
    this.map.setView(centerCords, this.zoom);
    this.leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
          }
      )
      .addTo(this.map);

    this._renderOffersMarkers();
  }

  componentDidUpdate() {
    this._updatePoints();

    this.map.setView(
        [this.centerPoint.latitude, this.centerPoint.longitude],
        this.zoom
    );

    this._renderOffersMarkers();
  }

  _updatePoints() {
    if (this.props.activeOffer) {
      this.centerPoint = this.props.activeOffer.location;
    } else if (this.props.city) {
      this.centerPoint = this.props.city.location;
    } else {
      this.centerPoint = this.props.offersLocation[0];
    }
    this.offersLocation = this.props.offersLocation;
    this.leaflet = this.props.leaflet;
  }

  _renderOffersMarkers() {
    const icon = this.leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    if (this.markersStorage.length) {
      this.markersStorage.forEach((marker) => this.map.removeLayer(marker));
    }

    this.markersStorage = [];

    this.offersLocation.forEach((offerLocation) => {
      this.markersStorage.push(
          this.leaflet
          .marker([offerLocation.latitude, offerLocation.longitude], {icon})
          .addTo(this.map)
      );
    });

    if (this.props.activeOffer) {
      const activeIcon = this.leaflet.icon({
        iconUrl: `img/pin-orange.svg`,
        iconSize: [30, 30],
      });

      this.markersStorage.push(
          this.leaflet
          .marker(
              [
                this.props.activeOffer.location.latitude,
                this.props.activeOffer.location.longitude,
              ],
              {icon: activeIcon}
          )
          .addTo(this.map)
      );
    }
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
  activeOffer: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
  offersLocation: PropTypes.array.isRequired,
  leaflet: PropTypes.object.isRequired,
};

export default Map;
