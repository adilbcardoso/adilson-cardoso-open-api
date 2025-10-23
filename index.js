async function getPlayerDetails() {
  //const apiKey =  "15de0d1e271f0925e2a5e9dd3b2404f7";
  const player = document.getElementById(`search-player`).value.trim();
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players/profiles?search=${player}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "15de0d1e271f0925e2a5e9dd3b2404f7",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch footbal data. please try again later.");
    }
    const data = await response.json();
    console.log(data);
    displayResults(data.response?.[0]?.player);
  } catch (error) {
    console.log("Error fetching football:", error);
  }
}

function displayResults(player) {
  if (!player) return;
  const { name, age, photo, nationality, position } = player;
  const htmlOupt = `
  <div class="player-card">
  <img src="${photo}" alt="${name}" width="200" /p>;
  <p> Player name : ${name} </p>
  <p> Player age : ${age} </p>
  <p> Player nationatity : ${nationality} </p>
  <p> Player position : ${position} </p>
  </div>`;
  const displayResults = document.getElementById("display-results");
  displayResults.innerHTML = htmlOupt;
}
