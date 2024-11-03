import { addElementToStorage, readLocalStorage } from "./scripts/storage.js";

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

  const goals_possitive = document.getElementById("goals_possitive").value;
  const goals_against = document.getElementById("goals_against").value;

  const games_played = document.getElementById("games_played").value;
  const games_win = document.getElementById("games_win").value;
  const games_lost = document.getElementById("games_lost").value;

  //! aca agregamos las validaciones

  //! creamos el objeto para poder agregarlo
  let newTeam = getFormItem(
    team_name,
    points,
    goals_possitive,
    goals_against,
    games_played,
    games_win,
    games_lost
  );

  addElementToStorage("teams", newTeam);

  clearItems(form);

  setFocus("team_name");

  //! recorrido del localstorage para armar tabla
  var teams = readLocalStorage("teams");
  const tBody = document.querySelector(`#teams__list tbody`);

  tBody.innerHTML = "";
  teams.forEach((team) => {
    // document.write(`${element.team_name} <br>`);
    const row = document.createElement("tr");

    row.innerHTML = ` <td>${team.team_name}</td>
      <td>${team.points}</td>
      <td>${team.goals_possitive}</td>
      <td>${team.goals_against}</td>
      <td>${team.games_played}</td>
      <td>${team.games_win}</td>
      <td>${team.games_lost}</td>`;

    tBody.appendChild(row);
  });
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
  goals_possitive,
  goals_against,
  games_played,
  games_win,
  games_lost
) {
  return {
    team_name,
    points: parseInt(points),
    goals_possitive: parseInt(goals_possitive),
    goals_against: parseInt(goals_against),
    games_played: parseInt(games_played),
    games_win: parseInt(games_win),
    games_lost: parseInt(games_lost),
  };
}
