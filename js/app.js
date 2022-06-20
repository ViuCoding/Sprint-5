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
// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        // First we create a fetch request with all the parameters needed to get a JSON value as a return.
        const request = yield fetch(`${DAD_JOKES}`, {
            headers: {
                Accept: "application/json",
            },
        });
        // Then we transform the "request" object into a JSON object, and then we can work with it.
        const data = yield request.json();
        document.querySelector("#joke").innerHTML = data.joke;
    });
}
