var playerName = "Dig"//window.prompt("What is your robot's name?");
var playerHealth = 120;
var playerAttack = 10;
var playerMoney= 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName;
var enemyHealth = 50;
var enemyAttack = 12;

var enemyNames = ["Roborto", "Amy Android", "Robo Trouble"];
var promptFight;

var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask user if they'd liked to fight or run
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("Penalty for skipping, ", playerMoney)
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;
      console.log(playerName + " now has " + playerMoney + " dollars.")

      // leave while() loop since enemy is dead
      break;
    } else {
      console.log(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      console.log(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};

function reset(){
  playerMoney = 10;
  playerHealth = 100;
  playerAttack = 10;
  enemyHealth = 50;
}

function endGame(){
  console.log("Game Over! Your score is " + playerMoney);
  window.alert("Thanks for playing.");
}

//main logic for game
function startGame(){
  for(var i = 0; i < enemyNames.length; i++){
    if(playerHealth > 0){
      enemyName = enemyNames[i];
      console.log("Round " + (i+1) + ". Fight!");
      fight(enemyNames[i]); 
      enemyHealth = 50; //set health for next round enemy
    }else
    {
      endGame();
      break;
    }//you be dead, game over.
  }
  //prompt to reset and restart
  var replayPrompt = window.confirm("Would you like to play again?");
  if(replayPrompt){
    reset();
    startGame();
  }
  else{
    endGame();
  }
}

//Code here calls the game to start

startGame();
