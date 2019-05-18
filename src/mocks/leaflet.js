
const leaflet = {
  map() {
    return {
      setView: jest.fn(),
    };
  },

  tileLayer() {
    return {
      addTo() {
        return jest.fn();
      }
    };
  },

  icon() {
    return jest.fn();
  },

  marker() {
    return {
      addTo() {
        return jest.fn();
      }
    };
  }
};

export default leaflet;
