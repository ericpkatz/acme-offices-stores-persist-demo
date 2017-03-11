const conn = require('./_db');

const Place = conn.define('place', {
  lat: conn.Sequelize.DECIMAL,
  lng: conn.Sequelize.DECIMAL,
  name: conn.Sequelize.STRING
});

module.exports = Place;
