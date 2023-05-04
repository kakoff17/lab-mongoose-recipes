const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
mongoose.set("strictQuery", true);

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //creando el model
    return Recipe.create({
      title: "tortilla de patata",
      level: "Amateur Chef",
      ingredients: ["4 patatas", "5 huevos", "sal", "cebolla", "aceite"],
      cuisine: "Española",
      dishType: "snack",
      image: 0,
      duration: 25,
      creator: "Cristina y Carlos",
    });
  })
  .then((newRecipe) => {
    console.log("Nueva receta:", newRecipe.title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log("La receta es: ");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updateRecipe) => {
    console.log(
      "Luigi es un chico precavido, pero cambiamos el tiempo a",
      updateRecipe.duration
    );
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Success, recipe deleted");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
