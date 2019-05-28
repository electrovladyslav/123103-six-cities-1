import React, {PureComponent} from "react";
// import this.leaflet from "this.leaflet";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.city = props.city;
    this.offersCords = props.offersCords;
    this.zoom = 10;

    this.leaflet = props.leaflet;
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const cityCords = [this.city.location.latitude, this.city.location.longitude];
    const icon = this.leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.map = this.leaflet.map(`map`, {
      center: cityCords,
      zoom: this.zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(cityCords, this.zoom);
    this.leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.offersCords.forEach((offerCords) => {
      this.leaflet.marker(offerCords, {icon}).addTo(this.map);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.city.name !== prevProps.city.name) {
      this.city = this.props.city;
      this.offersCords = this.props.offersCords;
      this.map.setView([this.city.location.latitude, this.city.location.longitude], this.zoom);

    }
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rentsCount: PropTypes.number,
  }),
  offersCords: PropTypes.array.isRequired,
  leaflet: PropTypes.object.isRequired,
};

export default Map;
