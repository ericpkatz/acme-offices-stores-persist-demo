const conn = require('./_db');

const Office = conn.define('office', {
  name: conn.Sequelize.STRING
});

module.exports = Office;
