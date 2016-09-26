'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');

var Page = db.define('page', {
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
  }
}, {
  hooks: {
    beforeValidate: (page, options) => {
      page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
  },
  getterMethods: {
    route: function () {
      return '/wiki/' + this.urlTitle;
    },
    renderedContent: function() {
      return marked(this.content);
    }
  }
});

var User = db.define('user', {
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

Page.belongsTo(User, {
  as: 'author'
});

module.exports = {
  Page: Page,
  User: User
};
