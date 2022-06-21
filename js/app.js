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
        // Random number between 1 and 10
        let random = Math.floor(Math.random() * 10) + 1;
        // If random is <= 5 we got with Dad Jokes otherwise it's Chuck Norris Time.
        if (random <= 5) {
            // First we create a fetch request with all the parameters needed to get a JSON value as a return.
            request = yield fetch(`${DAD_JOKES}`, {
                headers: {
                    Accept: "application/json",
                },
            });
            // Then we transform the "request" object into a JSON object, and then we can work with it.
            data = yield request.json();
            document.querySelector("#joke").innerHTML = data.joke;
        }
        else {
            request = yield fetch(`${CHUCK_NORRIS}`);
            data = yield request.json();
            document.querySelector("#joke").innerHTML = data.value;
        }
        react.style.display = "block";
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
