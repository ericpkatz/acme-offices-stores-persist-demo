const conn = require('./_db');

const Store = conn.define('store', {
  name: conn.Sequelize.STRING
});

module.exports =  Store;
