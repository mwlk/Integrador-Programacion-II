import { addElementToStorage, readLocalStorage } from "./scripts/storage.js";

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
  }
}

function calculateTeamsQuantity(teams) {
  document.getElementById("teams__stats__quantity").innerHTML = teams.length;
}

//! goles a favor
function calculateGFTotal(teams) {
  let gfTotal = 0;

  teams.forEach((team) => {
    gfTotal += team.goals_for;
  });

  document.getElementById("teams__stats__GF_total").innerHTML = gfTotal;
}

//! promedio de goles a favor del campeonato
function getFixtureGoalForProm(teams) {
  let gamesPlayedTotal = 0;
  let goalsForTotal = 0;

  teams.forEach((team) => {
    gamesPlayedTotal += team.games_played;
    goalsForTotal += team.goals_for;
  });

  //! hay que validar que no sea infinito ni que sea == 0 para no lanzar excepciones
  const fixtureGoalForProm =
    gamesPlayedTotal > 0 &&
    isFinite(goalsForTotal) &&
    isFinite(gamesPlayedTotal)
      ? goalsForTotal / gamesPlayedTotal
      : 0;

  document.getElementById("teams__stats__fixture_GF_prom").innerHTML =
    fixtureGoalForProm;
  console.log(goalsForTotal / gamesPlayedTotal);
}

//! promedio de goles en contra del campeonato
function getFixtureGoalAgainstProm(teams) {
  let gamesPlayedTotal = 0;
  let goalsAgainstTotal = 0;

  teams.forEach((team) => {
    gamesPlayedTotal += team.games_played;
    goalsAgainstTotal += team.goals_against;
  });

  const fixtureGoalAgainstProm =
    gamesPlayedTotal > 0 &&
    isFinite(goalsAgainstTotal) &&
    isFinite(gamesPlayedTotal)
      ? goalsAgainstTotal / gamesPlayedTotal
      : 0;

  console.log(goalsAgainstTotal / gamesPlayedTotal);

  document.getElementById("teams__stats__fixture_GC_prom").innerHTML =
    fixtureGoalAgainstProm.toFixed(2);
}

//! equipo con mayor partidos ganados
function getMaxTeamWithGamesWin(teams) {
  let teamMax = teams[0];

  teams.forEach((team) => {
    if (team.games_win > teamMax.games_win) {
      teamMax = team;
    }
  });

  document.getElementById("teams__stats__max_GW").innerHTML =
    teamMax.team_name.toFixed(2);
}
