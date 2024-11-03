import { addElementToStorage } from "./scripts/storage.js";

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
  const newTeam = {
    team_name,
    points: parseInt(points),
    goals_possitive: parseInt(goals_possitive),
    goals_against: parseInt(goals_against),
    games_played: parseInt(games_played),
    games_win: parseInt(games_win),
    games_lost: parseInt(games_lost),
  };

  addElementToStorage("teams", newTeam);

  clearItems(form);

  setFocus("team_name");
});

function setFocus(input) {
  document.getElementById(input).focus();
}

function clearItems(form) {
  form.reset();
}
