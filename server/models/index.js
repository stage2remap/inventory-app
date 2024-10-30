const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

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

const Review = sequelize.define("reviews", {
  name: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  comment: Sequelize.TEXT,
});


module.exports = {
  db: sequelize,
  Items, Review
};
