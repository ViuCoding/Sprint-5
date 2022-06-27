"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const react = document.querySelector(".reactions");
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
const reportJokes = [];
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let request;
        let data;
        // Random number between 1 and 2
        let random = Math.floor(Math.random() * 2) + 1;
        console.log(random);
        try {
            // If random is < 2 we got with Dad Jokes otherwise it's Chuck Norris Time.
            if (random < 2) {
                // First we create a fetch request with all the parameters needed to get a JSON string as a return.
                request = yield fetch(`${DAD_JOKES}`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                // Then we transform the "request" (which is in JSON format) object into a JS object.
                data = yield request.json();
                document.querySelector("#joke").innerHTML = data.joke;
            }
            else {
                request = yield fetch(`${CHUCK_NORRIS}`);
                data = yield request.json();
                document.querySelector("#joke").innerHTML = data.value;
            }
            // We show the "reactions" emoticons once we recieve a Joke from the APIs
            react.style.display = "block";
        }
        catch (error) {
            console.log("Sorry Matey, something went wrong!", error);
        }
    });
}
// This functions is used to give a score to the jokes and store it in the array reportJokes
function voteJoke(score) {
    const joke = document.querySelector("#joke").innerHTML;
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
window.onload = function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherRequest = yield fetch(`${CURRENT_WEATHER}`);
        const weatherData = yield weatherRequest.json();
        let weather = document.querySelector("#weather");
        let icon = weatherData.weather[0].icon;
        let temp = Math.trunc(weatherData.main.temp);
        weather.src = `http://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector("#temp").innerHTML = temp;
        console.log(weatherData);
    });
};
// Testing Event Listener
let nextBtn = document.querySelector(".next-jk");
let blob = document.querySelector(".blobber");
let blob2 = document.querySelector(".blobber2");
let blob3 = document.querySelector(".blobber3");
let i = 1;
let j = 2;
let k = 3;
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", () => {
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
