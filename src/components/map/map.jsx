import React, {PureComponent} from "react";
// import this.leaflet from "this.leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.zoom = 10;
    this.leaflet = props.leaflet;
  }

  render() {
    return (
      <React.Fragment>
        <div id="map" />
      </React.Fragment>
    );
  }

  componentDidMount() {
    const cityCords = [
      this.props.city.location.latitude,
      this.props.city.location.longitude,
    ];

    this.map = this.leaflet.map(`map`, {
      center: cityCords,
      zoom: this.zoom,
      zoomControl: false,
      marker: true,
    });
    this.map.setView(cityCords, this.zoom);
    this.leaflet
      .tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
          }
      )
      .addTo(this.map);

    this.renderOffersMarkers();
  }

  componentDidUpdate() {
    this.map.setView(
        [this.props.city.location.latitude, this.props.city.location.longitude],
        this.zoom
    );

    this.renderOffersMarkers();
  }

  renderOffersMarkers() {
    const icon = this.leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    this.props.offersLocation.forEach((offerLocation) => {
      this.leaflet.marker([offerLocation.latitude, offerLocation.longitude], {icon}).addTo(this.map);
    });
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    rentsCount: PropTypes.number,
  }),
  offersLocation: PropTypes.array.isRequired,
  leaflet: PropTypes.object.isRequired,
};

export default Map;
