import {
  calculateTeamsQuantity,
  calculateGFTotal,
  getFixtureGoalForProm,
  getFixtureGoalAgainstProm,
  getMaxTeamWithGamesWin,
  getMaxTeamWithGoalsFor,
  getMinTeamWithGamesLost,
  getMinTeamWithGoalsAgainst,
  getCountTeamGoalsAgainstLessThanTen,
  getCountTeamsAboveAvg,
} from "../scripts/stats.js";

//! importa todas las estadisticas y usa el alias de 'Storage'
import * as Storage from "../scripts/storage.js";

//! hacemos la variable goblal pra acceder cuando sea necesario
let teams;

var teamsStoraged = Storage.readLocalStorage("teams");
if (teamsStoraged) {
  teams = teamsStoraged;

  displayTeams(teams);
  calculateStats(teams);
  toggleButton("button__load", true);
} else {
  toggleButton("button__clear", true);
  toggleButton("button__save", true);
  toggleTable();
}

//! boton para cargar el archivo
document.getElementById("button__load").addEventListener("click", async () => {
  teams = await readJsonFile("../data/teams.json");

  if (teams) {
    displayTeams(teams);
    calculateStats(teams);

    //! hay que volver a habilitar los botones
    toggleButton("button__load", true);
    toggleButton("button__save", false);
    toggleButton("button__clear", false);
  }
});

//! boton para guardar en local storage
document.getElementById("button__save").addEventListener("click", () => {
  Storage.setLocalStorage("teams", teams);

  toggleButton("button__load", true);
  toggleButton("button__save", true);
});

//! boton para limpiar el almacenamiento
document.getElementById("button__clear").addEventListener("click", () => {
  localStorage.clear();
  toggleTable();
  resetStats();

  toggleButton("button__save", true);
  toggleButton("button__clear", true);
  toggleButton("button__load", false);
});

async function readJsonFile(path) {
  return fetch(path).then((response) => response.json());
}

function calculateStats(teams) {
  if (teams) {
    calculateTeamsQuantity(teams);
    calculateGFTotal(teams);
    getFixtureGoalForProm(teams);
    getFixtureGoalAgainstProm(teams);
    getMaxTeamWithGamesWin(teams);
    getMaxTeamWithGoalsFor(teams);
    getMinTeamWithGamesLost(teams);
    getMinTeamWithGoalsAgainst(teams);
    getCountTeamGoalsAgainstLessThanTen(teams);
    getCountTeamsAboveAvg(teams);
  }
}

//! esta funcion recorre la lista/vector/array/coleccion
//! para luego ir llenando las tablas
function displayTeams(teams) {
  if (teams) {
    document.getElementById("teams__list").style.display = "block";

    const tBody = document.querySelector(`#teams__list tbody`);

    tBody.innerHTML = "";
    teams.forEach((team) => {
      const row = document.createElement("tr");

      row.innerHTML = ` <td>${team.team_name}</td>
       <td>${team.points}</td>
       <td>${team.goals_for}</td>
       <td>${team.goals_against}</td>
       <td>${team.games_played}</td>
       <td>${team.games_win}</td>
       <td>${team.games_lost}</td>`;

      tBody.appendChild(row);
    });
  } else {
    document.getElementById("teams__list").style.display = "none";
  }
}

//! funcion que oculta la tabla
function toggleTable() {
  const tBody = document.querySelector(`#teams__list tbody`);
  tBody.innerHTML = "";

  document.getElementById("teams__list").style.display = "none";
}

//! su nombre lo indica pero por las dudas, setea en las cards de
//! las estadisticas un valor por defecto => '-'
function resetStats() {
  const labels = document.querySelectorAll("#teams__stats label");

  labels.forEach((label) => {
    label.textContent = "-";
  });
}

//! funcion para cambiar el estado de habilitado de un boton
function toggleButton(elementId, value) {
  document.getElementById(elementId).disabled = value;
}
