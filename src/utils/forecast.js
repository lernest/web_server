const request = require("request");

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
        "% chance of rain";
      callback(undefined, forecast_str);
    }
  });
};

module.exports = forecast;
