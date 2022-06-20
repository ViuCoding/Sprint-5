// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";

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
}
