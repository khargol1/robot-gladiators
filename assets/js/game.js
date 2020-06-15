var playerName = "Dig"//window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney= 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName;
var enemyHealth = 50;
var enemyAttack = 12;

var enemyNames = ["Roborto", "Amy Android", "Robo Trouble"];
var promptFight;


//defines how a fight occurs
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask user if they'd liked to fight or run
    promptFight = "fight";//window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

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

//resets game to start conditions
function reset(){
  playerMoney = 10;
  playerHealth = 100;
  playerAttack = 10;
  enemyHealth = 50;
}

//game ending message
function endGame(){
  console.log("Game Over! Your score is " + playerMoney);
  window.alert("Thanks for playing.");
}

//Shop function
function shop(){
  console.log("Entered the shop.");
  console.log("1. Refill 25 health. $8");
  console.log("2. Increase your attack by 6. $6");
  console.log("3. Restore all Health. $15");
  console.log("4. Leave.");
  var shopChoice=5; 
  //while(shopChoice != 3){
    shopChoice=window.prompt("Please make your selection. (Type a number)");
    switch(shopChoice){
    case '1':
      if(playerMoney >= 8){
      playerHealth = playerHealth + 25;
      playerMoney = playerMoney - 8; //nevermind we don't every check if they can afford it.
      }
      else{window.alert("You don't have enough money for health refill.");}
      break;
    case '2':
      if(playerMoney >= 6 ){
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney - 6;
      }
      else{window.alert("You don't have enough money for attack upgrade.")}
      break;
    case '3':
      if (playerMoney >= 15){
      playerHealth = 100;
      playerMoney = playerMoney - 15;
      }
      else{window.alert("You don't have enought money for a full health refill.")}
      break;
    case '4':
      break;
    default:
      console.log("Invalid entry, try again.");
      shop();
      break;
    }
  //} leave the while loop out for a bit
}

//main logic for game
function startGame(){
  for(var i = 0; i < enemyNames.length; i++){
    if(playerHealth > 0){
      enemyName = enemyNames[i];
      console.log("Round " + (i+1) + ". Fight!");
      fight(enemyNames[i]);
      if(i < enemyNames.length - 1 && playerHealth > 0){
        var storeConfirm=window.confirm("Do you wish to shop?")
        if(storeConfirm){
          shop();
        }
      }
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
