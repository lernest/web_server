console.log("Loaded client side script");

// GOAL: fetch the forecast information

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  e.preventDefault();
  const location = search.value;
  console.log(location);

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        return console.log(
          "Unable to find location.  Please try another search."
        );
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
