// no cookie set yet
let wins = 0
let losses = 0
let streak = 0
let longest_streak = 0

if (document.cookie !== '') {
    //console.log(document.cookie)
    const stats = document.cookie.split(',')
    wins = parseInt(stats[0])
    losses = parseInt(stats[1])
    streak = parseInt(stats[2])
    longest_streak = parseInt(stats[3])
}

/**
 * Handles the players choice
 *
 * @param player_choice
 */
function choice(player_choice) {
    // show my choice
    let response = "<p>You selected " + player_choice + "</p>";
    document.getElementById("player").className = "roll " + player_choice;

    // determine computer choice
    let choice_array = new Array(3);
    choice_array[0] = "Rock";
    choice_array[1] = "Paper";
    choice_array[2] = "Scissors";
    const rand_no = Math.floor(Math.random() * choice_array.length);
    let computer_choice = choice_array[rand_no];
    response = response + "<p>I selected " + computer_choice + "</p>";
    document.getElementById("computer").className = "roll " + computer_choice;

    // determine who wins
    let result = "Draw";
    if (player_choice === "Rock") {
        if (computer_choice === "Paper") result = "Lose";
        if (computer_choice === "Scissors") result = "Win";
    }
    if (player_choice === "Paper") {
        if (computer_choice === "Scissors") result = "Lose";
        if (computer_choice === "Rock") result = "Win";
    }
    if (player_choice === "Scissors") {
        if (computer_choice === "Rock") result = "Lose";
        if (computer_choice === "Paper") result = "Win";
    }

    if (result === "Lose") {
        // Lose
        response = response + "You lose";
        document.getElementById("player").classList.add("lose");
        document.getElementById("computer").classList.add("win");
        losses += 1;
        streak = 0;
    } else if (result === "Win") {
        // Win
        response = response + "You win";
        document.getElementById("player").classList.add("win");
        document.getElementById("computer").classList.add("lose");
        if (result === "Draw") response = response + "It's a draw";
        wins += 1;
        streak += 1;
        if (streak > longest_streak) longest_streak = streak;
    } else {
        // Draw
        streak = 0
    }

    // output the result
    const div = document.getElementById("result");
    div.innerHTML = response;
    // output the stats
    showStats();
    // write the changed stats to the cookie
    let expiration_date = new Date();
    expiration_date.setFullYear(expiration_date.getFullYear() + 1);
    document.cookie = wins + "," + losses + "," + streak + "," + longest_streak+"; expires=" + expiration_date.toUTCString();
}

/**
 * Show the statistics
 */
function showStats() {
    // output the stats
    const div = document.getElementById("stats");
    div.innerHTML = "<table class='stats'>" +
        "<tr><td>" + wins + "</td><td>" + losses + "</td><td>" + streak + "</td><td>" + longest_streak + "</td></tr>" +
        "<tr><th>Wins</th><th>Losses</th><th>Streak</th><th>Longest streak</th></tr>" +
        "</table>";
}
