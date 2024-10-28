const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Items = sequelize.define("items", {
  color: Sequelize.STRING,
  year: Sequelize.INTEGER,
  mileage: Sequelize.INTEGER,
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  bhp: Sequelize.INTEGER,
  raaminess: Sequelize.INTEGER,
  description: Sequelize.STRING,
  image: Sequelize.STRING,
  price: Sequelize.INTEGER,
});

module.exports = {
  db: sequelize,
  Sauce, Items,
};
