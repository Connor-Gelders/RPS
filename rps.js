function choice(player_choice) {
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
  if (player_choice==="Rock") {
    if (computer_choice==="Paper") result="Lose";
    if (computer_choice==="Scissors") result="Win";
  }
  if (player_choice==="Paper") {
    if (computer_choice==="Scissors") result="Lose";
    if (computer_choice==="Rock") result="Win";
  }
  if (player_choice==="Scissors") {
    if (computer_choice==="Rock") result="Lose";
    if (computer_choice==="Paper") result="Win";
  }

  if (result==="Lose") {
    response=response+"You lose";
    document.getElementById("player").classList.add("lose");
    document.getElementById("computer").classList.add("win");

  } else if (result==="Win") {
    response=response+"You win";
    document.getElementById("player").classList.add("win");
    document.getElementById("computer").classList.add("lose");
    if (result==="Draw") response=response+"It's a draw";
  }

  // output the result
  const div=document.getElementById("result");
  div.innerHTML=response;
}
