'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

let Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  route: {
    type: Sequelize.STRING,
    get: function() {
      var urlTitle = this.getDataValue('urlTitle');
      return `/wiki/${urlTitle}`;
    }
  }
});

let User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});

module.exports = {
  Page: Page,
  User: User
};
