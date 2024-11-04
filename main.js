import { addElementToStorage, readLocalStorage } from "./scripts/storage.js";
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
} from "./scripts/stats.js";

displayTeams();
calculateStats();

//! buscamos el formulario de alta de equipos
const form = document.getElementById("team__new__form");

//! escuchamos los eventos de tipo input, hasta que el form este completo
//! para habilitar el form
form.addEventListener("input", () => {
  document.getElementById("form__submit__add").disabled = !form.checkValidity();
});

//! agregar el evento de submit para poder mandar el form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const team_name = document.getElementById("team_name").value;
  const points = document.getElementById("points").value;

  const goals_for = document.getElementById("goals_for").value;
  const goals_against = document.getElementById("goals_against").value;

  const games_played = document.getElementById("games_played").value;
  const games_win = document.getElementById("games_win").value;
  const games_lost = document.getElementById("games_lost").value;

  //! aca agregamos las validaciones

  //! creamos el objeto para poder agregarlo
  let newTeam = getFormItem(
    team_name,
    points,
    goals_for,
    goals_against,
    games_played,
    games_win,
    games_lost
  );

  addElementToStorage("teams", newTeam);

  displayTeams();
  calculateStats();
  clearItems(form);

  setFocus("team_name");
});

function setFocus(input) {
  document.getElementById(input).focus();
}

function clearItems(form) {
  form.reset();
}

function getFormItem(
  team_name,
  points,
  goals_for,
  goals_against,
  games_played,
  games_win,
  games_lost
) {
  return {
    team_name,
    points: parseInt(points),
    goals_for: parseInt(goals_for),
    goals_against: parseInt(goals_against),
    games_played: parseInt(games_played),
    games_win: parseInt(games_win),
    games_lost: parseInt(games_lost),
  };
}

function displayTeams() {
  //! recorrido del localstorage para armar tabla
  var teams = readLocalStorage("teams");
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

//! funcion que llama a todos los calculos
function calculateStats() {
  var teams = readLocalStorage("teams");
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
