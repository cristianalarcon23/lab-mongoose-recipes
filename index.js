const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({title: 'Tortilla de papas', level: 'Easy Peasy', ingredients: ['huevos','patata','AOVE','sal','cebolla'], cuisine: 'spanish', dishType: 'main_course', duration: 20, creator: 'Cristian'})
  })
  .then((tortilla) => {
    console.log('Created:', tortilla.title)
  })
  .then(() => {
    return Recipe.create(data);
  })
  .then((recipes) => {
    for(let i = 0; i<recipes.length; i++) {
    console.log('Created:', recipes[i].title)}
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then((rigatoni) => {
    console.log('Updated duration:', rigatoni)
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then((carrot) => {
    console.log('Deleted:', carrot)
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
