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

  // Random number between 1 and 2
  let random = Math.floor(Math.random() * 2) + 1;
  console.log(random);

  // If random is < 2 we got with Dad Jokes otherwise it's Chuck Norris Time.
  if (random < 2) {
    // First we create a fetch request with all the parameters needed to get a JSON value as a return.
    request = await fetch(`${DAD_JOKES}`, {
      headers: {
        Accept: "application/json",
      },
    });
    // Then we transform the "request" (which is in JSON format) object into a JS object.

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

// Testing Event Listener
let nextBtn = document.querySelector(".next-jk");
let blob = document.querySelector(".blobber") as HTMLImageElement;
let blob2 = document.querySelector(".blobber2") as HTMLImageElement;
let blob3 = document.querySelector(".blobber3") as HTMLImageElement;
let i = 1;
let j = 2;
let k = 3;
nextBtn?.addEventListener("click", () => {
  i++;
  j++;
  k++;
  blob.src = `../img/blob${i}.svg`;
  blob2.src = `../img/blob${j}.svg`;
  blob3.src = `../img/blob${k}.svg`;
  if (i >= 5) {
    i = 0;
  }
  if (j >= 5) {
    j = 0;
  }
  if (k >= 5) {
    k = 0;
  }
});
