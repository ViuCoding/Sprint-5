const react = document.querySelector(".reactions") as HTMLElement;
react.style.display = "none";

// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";

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
