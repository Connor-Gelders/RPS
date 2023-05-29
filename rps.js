// Created by Connor Gelders (13994)
// no cookie set yet
let wins=0
let losses=0
let streak=0
let longest_streak=0

if(document.cookie!==''){
  //console.log(document.cookie)
  const stats=document.cookie.split(',')
  wins=parseInt(stats[0])
  losses=parseInt(stats[1])
  streak=parseInt(stats[2])
  longest_streak=parseInt(stats[3])
}

// show stats on page load
document.addEventListener("DOMContentLoaded",function(){
  // add event listeners to buttons
  document.getElementById("rock").addEventListener("click",function(){
    choice("Rock")
  });
  document.getElementById("paper").addEventListener("click",function(){
    choice("Paper")
  });
  document.getElementById("scissors").addEventListener("click",function(){
    choice("Scissors")
  });
  // button reset stats
  document.getElementById("reset").addEventListener("click",function(){
    wins=0
    losses=0
    streak=0
    longest_streak=0
    showStats()
    document.cookie=wins+","+losses+","+streak+","+longest_streak
  });
  // start by showing the stats
  showStats();
})

/**
 * Handles the players choice
 *
 * @param player_choice
 */
function choice(player_choice){
  // show my choice
  let response="<p>You selected "+player_choice+"</p>";
  document.getElementById("player").className="roll "+player_choice;

  // determine computer choice
  let choice_array=new Array(3);
  choice_array[0]="Rock";
  choice_array[1]="Paper";
  choice_array[2]="Scissors";
  const rand_no=Math.floor(Math.random()*choice_array.length);
  let computer_choice=choice_array[rand_no];
  response=response+"<p>I selected "+computer_choice+"</p>";
  document.getElementById("computer").className="roll "+computer_choice;

  // determine who wins
  let result="Draw";
  if(player_choice==="Rock"){
    if(computer_choice==="Paper") result="Lose";
    if(computer_choice==="Scissors") result="Win";
  }
  if(player_choice==="Paper"){
    if(computer_choice==="Scissors") result="Lose";
    if(computer_choice==="Rock") result="Win";
  }
  if(player_choice==="Scissors"){
    if(computer_choice==="Rock") result="Lose";
    if(computer_choice==="Paper") result="Win";
  }

  if(result==="Lose"){
    // Lose
    response=response+"You lose";
    document.getElementById("player").classList.add("lose");
    document.getElementById("computer").classList.add("win");
    // update stats
    losses+=1;
    streak=0;
  }else if(result==="Win"){
    // Win
    response=response+"You win";
    document.getElementById("player").classList.add("win");
    document.getElementById("computer").classList.add("lose");
    // update stats
    wins+=1;
    streak+=1;
    if(streak>longest_streak) longest_streak=streak;
    // confetti
    const defaults={
      spread:360,
      ticks:50,
      gravity:0,
      decay:0.94,
      startVelocity:30,
      shapes:["star"],
      colors:["#FFE400","#FFBD00","#E89400","#FFCA6C","#FDFFB8"],
    };

    function shoot(){
      confetti({
        ...defaults,
        particleCount:40,
        scalar:1.2,
        shapes:["star"],
      });

      confetti({
        ...defaults,
        particleCount:10,
        scalar:0.75,
        shapes:["circle"],
      });
    }

    setTimeout(shoot,0);
    setTimeout(shoot,100);
    setTimeout(shoot,200);
  }else{
    response=response+"It's a draw";
    // Draw
    streak=0
  }

  // output the result
  const div=document.getElementById("result");
  div.innerHTML=response;
  // output the stats
  showStats();
  // write the changed stats to the cookie
  let expiration_date=new Date();
  expiration_date.setFullYear(expiration_date.getFullYear()+1);
  document.cookie=wins+","+losses+","+streak+","+longest_streak+"; expires="+expiration_date.toUTCString();
}

/**
 * Show the statistics
 */
function showStats(){
  // output the stats
  const div=document.getElementById("stats");
  div.innerHTML="<table class='stats'>"+
    "<tr><td>"+wins+"</td><td>"+losses+"</td><td>"+streak+"</td><td>"+longest_streak+"</td></tr>"+
    "<tr><th>Wins</th><th>Losses</th><th>Streak</th><th>Longest streak</th></tr>"+
    "</table>";
}

// end of rps.js