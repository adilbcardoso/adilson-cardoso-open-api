async function getPlayerTeamDetails() {
  //const apiKey =  "15de0d1e271f0925e2a5e9dd3b2404f7";
  const query = document.getElementById(`search-player`).value.trim();
  if (!query) return;
  const teamDiv = document.getElementById("display-team");
  const playerDiv = document.getElementById("display-results");
  teamDiv.innerHTML = "<p> looking for team...</p>";
  playerDiv.innerHTML = "<p> looking for player...</p>";

  try {
    const playerResponse = await fetch(
      `https://v3.football.api-sports.io/players/profiles?search=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "15de0d1e271f0925e2a5e9dd3b2404f7",
        },
      }
    );

    const playerData = await playerResponse.json();

    const player = playerData.response?.[0]?.player;

    displayPlayer(player);
    // 🔹 2. Obter nacionalidade do jogador
    const nationality = player?.nationality;
    if (!nationality) {
      teamDiv.innerHTML = "<p>No nationality found for player.</p>";
      return;
    }

    const teamResponse = await fetch(
      `https://v3.football.api-sports.io/teams?search=${encodeURIComponent(
        nationality
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "15de0d1e271f0925e2a5e9dd3b2404f7",
        },
      }
    );
    const teamData = await teamResponse.json();
    displayTeam(teamData.response?.[0]?.team, teamData.response?.[0]?.venue);
  } catch (error) {
    console.log("Error fetching football:", error);
    teamDiv.innerHTML = "<p> looking for team...</P>";
    playerDiv.innerHTML = "<p> looking for player...</P>";
  }
}

function displayTeam(team, venue) {
  const displayDiv = document.getElementById("display-team");
  if (!team) {
    displayDiv.innerHTML = "<p>Nationality not found for player.</p>";
    return;
  } else {
    displayDiv.innerHTML = `
  <div class="team-card">
      <img src="${team.logo}" alt="${team.name}" width="150" />
      <p>Name: ${team.name}</p>
      <p>Country: ${team.country}</p>
      <p>Founded: ${team.founded}</p>
      <p>Venue: ${venue?.name || "N/A"}</p>
      <p>Capacity: ${venue?.capacity || "N/A"}</p>
  </div>`;
  }
}
function displayPlayer(player) {
  const displayDiv = document.getElementById("display-results");
  if (!player) {
    displayDiv.innerHTML = "<p>No player found. Try another name.</p>";
    return;
  } else {
    const { name, age, photo, nationality, position } = player;
    displayDiv.innerHTML = `
    <div class="player-card">
      <img src="${photo}" alt="${name}" width="150" />
      <p>Name: ${name}</p>
      <p>Age: ${age}</p>
      <p>Nationality: ${nationality}</p>
      <p>Position: ${position}</p>
    </div>
  `;
  }
}
