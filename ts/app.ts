const react = document.querySelector(".reactions") as HTMLElement;
react.style.display = "none";

// Weather API Keys
let lat = 41.390205;
let lon = 2.154007;
let apiKey = "37f2111fdeb0f75bcb28fbd30c3c518c";
let lang = "EN";
let unit = "metric";

// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";
const CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}&lang=${lang}`;

// Global Variables
const reportJokes: any[] = [];

async function getJoke() {
  let request: any;
  let data: any;

  // Random number between 1 and 10
  let random = Math.floor(Math.random() * 10) + 1;

  // If random is <= 5 we got with Dad Jokes otherwise it's Chuck Norris Time.
  if (random <= 5) {
    // First we create a fetch request with all the parameters needed to get a JSON value as a return.
    request = await fetch(`${DAD_JOKES}`, {
      headers: {
        Accept: "application/json",
      },
    });
    // Then we transform the "request" object into a JSON object, and then we can work with it.

    data = await request.json();
    document.querySelector("#joke")!.innerHTML = data.joke;
  } else {
    request = await fetch(`${CHUCK_NORRIS}`);
    data = await request.json();
    document.querySelector("#joke")!.innerHTML = data.value;
  }

  react.style.display = "block";
}

// This functions is used to give a score to the jokes and store it in the array reportJokes
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

// This function is called when we load the page and it is used to get weather info
window.onload = async function getWeather() {
  const weatherRequest = await fetch(`${CURRENT_WEATHER}`);
  const weatherData = await weatherRequest.json();
  let weather = document.querySelector("#weather") as HTMLImageElement;
  let icon = weatherData.weather[0].icon;
  let temp: any = Math.trunc(weatherData.main.temp);

  weather.src = `http://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector("#temp")!.innerHTML = temp;

  console.log(weatherData);
};
