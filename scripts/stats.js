export function calculateTeamsQuantity(teams) {
  document.getElementById("teams__stats__quantity").innerHTML = teams.length;
}

//! goles a favor
export function calculateGFTotal(teams) {
  let gfTotal = 0;

  teams.forEach((team) => {
    gfTotal += team.goals_for;
  });

  document.getElementById("teams__stats__GF_total").innerHTML = gfTotal;
}

//! promedio de goles a favor del campeonato
export function getFixtureGoalForProm(teams) {
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
    fixtureGoalForProm.toFixed(2);
}

//! promedio de goles en contra del campeonato
export function getFixtureGoalAgainstProm(teams) {
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

  document.getElementById("teams__stats__fixture_GC_prom").innerHTML =
    fixtureGoalAgainstProm.toFixed(2);
}

//! equipo con mayor cantidad de partidos ganados
export function getMaxTeamWithGamesWin(teams) {
  let teamMax = teams[0];

  teams.forEach((team) => {
    if (team.games_win > teamMax.games_win) {
      teamMax = team;
    }
  });

  document.getElementById("teams__stats__max_GW").innerHTML = teamMax.team_name;
}

//! equipo con mayor cantidad de goles a favor
export function getMaxTeamWithGoalsFor(teams) {
  let teamMax = teams[0];

  teams.forEach((team) => {
    if (team.goals_for > teamMax.goals_for) {
      teamMax = team;
    }
  });

  document.getElementById("teams__stats__max_GF").innerHTML = teamMax.team_name;
}

//! equipo con menor cantidad de partidos perdidos
export function getMinTeamWithGamesLost(teams) {
  let teamMin = teams[0];

  teams.forEach((team) => {
    if (team.games_lost < teamMin.games_lost) {
      teamMin = team;
    }
  });

  document.getElementById("teams__stats__min_GL").innerHTML = teamMin.team_name;
}

//! equipo con menor cantidad de goles en contra
export function getMinTeamWithGoalsAgainst(teams) {
  let teamMin = teams[0];

  teams.forEach((team) => {
    if (team.goals_against < teamMin.goals_against) {
      teamMin = team;
    }
  });

  document.getElementById("teams__stats__min_GA").innerHTML = teamMin.team_name;
}

//! cantidad de equipos con menos de diez goles en contra
export function getCountTeamGoalsAgainstLessThanTen(teams) {
  let count = 0;

  teams.forEach((team) => {
    if (team.goals_against < 10) {
      count++;
    }
  });

  document.getElementById(
    "teams__stats_count_teams_GA_less_than_ten"
  ).innerHTML = count;
}

//! cantidad de equipos que superaron la media de puntos
export function getCountTeamsAboveAvg(teams) {
  let count = 0;
  let totalPoints = 0;

  teams.forEach((team) => {
    totalPoints += team.points;
  });

  const averagePoints = totalPoints / teams.length;

  teams.forEach((team) => {
    if (team.points > averagePoints) {
      count++;
    }
  });

  document.getElementById("teams__stats_count_up_avg").innerHTML = count;
}
