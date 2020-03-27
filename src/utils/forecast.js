const request = require("request");

// in daily.data
/* 
"temperatureHigh": 56.53,
"temperatureHighTime": 1585259400,
"temperatureLow": 45.48,
"temperatureLowTime": 1585317600, */

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/12502acaa2e0eb7327163f97ca203d8e/" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.currently;
      const forecast_str =
        body.daily.data[0].summary +
        " It is currently " +
        data.temperature +
        " degrees out.  There is a " +
        data.precipProbability * 100 +
        "% chance of rain.  The high for the day is " +
        body.daily.data[0].temperatureHigh +
        " degrees, and the low is " +
        body.daily.data[0].temperatureLow +
        " degrees.";
      callback(undefined, forecast_str);
    }
  });
};

module.exports = forecast;
