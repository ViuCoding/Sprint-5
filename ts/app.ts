// APIs URLs
const DAD_JOKES = "https://icanhazdadjoke.com/";
const CHUCK_NORRIS = "https://api.chucknorris.io/jokes/random";

async function getJoke() {
  const request = await fetch(`${DAD_JOKES}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await request.json();

  document.querySelector("#joke")!.innerHTML = data.joke;
}
