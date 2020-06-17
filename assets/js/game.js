var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if(this.money >= 8){
      this.health += 25;
      this.money -= 8;
    }else{
      console.log("You don't have enough money to refill health.");
    }
  },
  restoreHealth: function(){
    if(this.money >= 15){
    this.health = 100;
    this.money -=15;
    }else{
      console.log("You don't have enough money to restore health.");
    }
  },
  upgradeAttack: function(){
    if(this.money >= 6){
        this.attack +=6;
      this.money -=6;
    }else{  
      console.log("You don't have enough money to restore health.");
    }
  }

};

var enemyInfo = [
  {
    name: "Roborto",
    attack: 12,
    health: 0
  },
  {
    name: "Amy Android",
    attack: 13,
    health: 0
  },
  {
    name: "Robo Trumble",
    attack: 14,
    health: 0
  }
];


function getPlayerName(){
  var name = ""
  while(name == "" || name == null){
    name = window.prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
}


//Random Number Generator
function randomNumber(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
};

//defines how a fight occurs
function fight(enemy) {
  console.log(enemy);
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask user if they'd liked to fight or run
    fightOrSkip();
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
    enemy.health = Math.max( 0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;
      console.log(playerInfo.name + " now has " + playerInfo.money + " dollars.")

      // leave while() loop since enemy is dead
      break;
    } else {
      console.log(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      console.log(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

function fightOrSkip(){
  var promptSkip = window.prompt("Would you like to fight or skip. 1 for fight. 2 for skip.");

  switch(promptSkip){
    case '1':
      break;
    case '2':
      var confirmSkip = window.confirm("Please confirm you'd like to skip.");
      if(confirmSkip){
        window.alert(playerInfo.name + " has skipped the fight. Lose 10 money.");
        playerInfo.money = playerInfo.money - 10;
      }
      break;
    default:
      window.alert("Invalid entry, please try again."); 
      break; 
  }
}


//game ending message
function endGame(){
  console.log("Game Over! Your score is " + playerInfo.money);
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
      if(playerInfo.money >= 8){
        playerInfo.refillHealth();
      }
      else{window.alert("You don't have enough money for health refill.");}
      break;
    case '2':
      if(playerInfo.money >= 6 ){
      playerInfo.upgradeAttack();
      }
      else{window.alert("You don't have enough money for attack upgrade.")}
      break;
    case '3':
      if (playerInfo.money >= 15){
      playerInfo.restoreHealth();
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
  playerInfo.reset();
  for(var i = 0; i < enemyInfo.length; i++){
    enemyInfo[i].health = randomNumber(40, 60); //Set enemy health.
    if(playerInfo.health > 0){
      console.log("Round " + (i+1) + ". Fight!");
      fight(enemyInfo[i]);
      if(i < enemyInfo.length - 1 && playerInfo.health > 0){
        var storeConfirm=window.confirm("Do you wish to shop?")
        if(storeConfirm){
          shop();
        }
      }
    }else
    {
      endGame();
      break;
    }//you be dead, game over.
  }
  //prompt to reset and restart
  var replayPrompt = window.confirm("Would you like to play again?");
  if(replayPrompt){
    startGame();
  }
  else{
    endGame();
  }
}

//Code here calls the game to start

startGame(); 
