const react = document.querySelector(".reactions") as HTMLElement;
react.style.display = "none";

// Weather API Keys
let lat = 41.390205;
let lon = 2.154007;
let apiKey = "37f2111fdeb0f75bcb28fbd30c3c518c";
let lang = "EN";

// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";
const CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`;

// Global Variables
const reportJokes: any[] = [];

async function getJoke() {
  // First we create a fetch request with all the parameters needed to get a JSON value as a return.
  const request = await fetch(`${DAD_JOKES}`, {
    headers: {
      Accept: "application/json",
    },
  });

  // Then we transform the "request" object into a JSON object, and then we can work with it.

  const data = await request.json();

  document.querySelector("#joke")!.innerHTML = data.joke;
  react.style.display = "block";
}
function voteJoke(score: number) {
  const joke = document.querySelector("#joke")!.innerHTML;
  const date = new Date();
  let dateText = date.toISOString();

  reportJokes.push({
    joke: joke,
    score: score,
    date: dateText,
  });

  react.style.display = "none";
  console.table(reportJokes);
}

window.onload = async function getWeather() {
  const weatherRequest = await fetch(`${CURRENT_WEATHER}`);
  const weatherData = await weatherRequest.json();

  document.querySelector("#weather")!.innerHTML = weatherData.weather[0].description;
  document.querySelector("#city")!.innerHTML = weatherData.name;

  console.log(weatherData);
};
