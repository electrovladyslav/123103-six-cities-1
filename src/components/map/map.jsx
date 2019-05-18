import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      city: props.city,
      offersCords: props.offersCords,
      zoom: 12,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const cityCords = this.state.city.coordinates;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = leaflet.map(`map`, {
      center: cityCords,
      zoom: this.state.zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(cityCords, this.state.zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    // const offerCords = [52.3709553943508, 4.89309666406198];
    this.state.offersCords.forEach((offerCords) => {
      leaflet.marker(offerCords, {icon}).addTo(map);
    });
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    coordinates: PropTypes.array,
    rentsCount: PropTypes.number,
  }),
  offersCords: PropTypes.array.isRequired,
};

export default Map;
