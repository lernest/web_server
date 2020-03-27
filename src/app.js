const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publiDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publiDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Liam"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address");
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      // destructured
      if (error) {
        return res.send({ error });
      }
      // only run if geocode() is successful
      // latitude, longitude, callback function
      forecast(latitude, longitude, (error, forecast_data) => {
        if (error) {
          res.send(error);
          return;
        }
        // only run if geocode() and forecast() are successful
        res.send({
          location: location,
          forecast: forecast_data,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);

  res.send({
    products: []
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Liam"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Do you need help?  You came to the right place!",
    name: "Liam"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "u lost bruv",
    name: "Liam"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Liam"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
