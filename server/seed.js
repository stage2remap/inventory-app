const {sauces, items, reviews} = require('./seedData.js');

const {sequelize} = require('./db');
const {Items, Review} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(items.map(item => Items.create(item)));
        await Promise.all(reviews.map(item => Review.create(item)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();
