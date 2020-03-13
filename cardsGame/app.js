let ALL_CARDS = [];
let playerData = [];
let dealerData = [];
let startGame = false;
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;
let playerWon = false;
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
hitButton.style.display = "none";
stayButton.style.display = "none";

function thisIsProcess(urlID) {
  return fetch(urlID).then(ans => {
    p = ans.json();
    return p;
  });
}

async function getData() {
  let response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/"
  );
  let data = response.json();
  return data;
}
getData()
  .then(data => {
    let deckID = data.deck_id;
    console.log("deckID", deckID);
    return thisIsProcess(
      `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`
    );
  })
  .then(drawData => {
    ALL_CARDS = drawData;
    newGameButton.addEventListener("click", function() {
      startGame = true;
      gameOver = false;
      playerWon = false;
      playerData = [getCards(), getCards()];
      dealerData = [getCards(), getCards()];
      let playerLength = playerData.length;
      let dealerLength = dealerData.length;
      for (let i = 0; i < playerLength; i++) {
        playerDisplayCards(playerData[i].image);
      }
      for (let i = 0; i < dealerLength; i++) {
        dealerDisplayCards(dealerData[i].image, i);
      }
      newGameButton.style.display = "none";
      hitButton.style.display = "inline";
      stayButton.style.display = "inline";
    });
  });
function getCards() {
  return ALL_CARDS.cards.shift();
}
function playerDisplayCards(player) {
  let img = document.createElement("img");
  img.src = player;
  document.body.insertBefore(img, hitButton);
}
function dealerDisplayCards(dealer, i) {
  let img = document.createElement("img");
  img.src = dealer;
  document.body.insertBefore(img, hitButton);

  if (i === 0) {
    img.style.marginLeft = "500px"
  }
}
hitButton.addEventListener("click", function() {
  let dummydata = ALL_CARDS.cards.pop();
  playerData.push(dummydata);
  displayCards(dummydata.image);
  checkForEndOfGame()
})
stayButton.addEventListener("click", function() {
  gameOver = true
  checkForEndOfGame()
  displayResult()
})
function displayCards(popedData) {
  let img = document.createElement("img")
  img.src = popedData
  document.body.append(img)
}
function getCardNumericValue(card) {
  switch (card.value) {
    case "Ace":
      return 1
    case "2":
      return 2
    case "3":
      return 3
    case "4":
      return 4
    case "5":
      return 5
    case "6":
      return 6
    case "7":
      return 7
    case "8":
      return 8
    case "9":
      return 9
    default:
      return 10
  }
}
function checkForEndOfGame() {
  updateScores()

  if (gameOver) {
    while (
      dealerScore < playerScore &&
      playerScore <= 21 &&
      dealerScore <= 21
    ) {
      dealerData.push(getCards());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    const cardLength = cardArray.length 
    for(let i=0; i<cardLength; i++){
      let card = cardArray[i];
      score += getCardNumericValue(card);
      if(card.value == 'Ace'){
        hasAce = true;
      }
      
      if(hasAce && score+10<=21){
        return score+10;
      }
    }
     return score; 
  }
  
  function updateScores(){
    dealerScore = getScore(dealerData);
    playerScore = getScore(playerData); 
  }
  function displayResult() {
    if(gameOver){
        if(playerWon)
        {
          alert( "YOU WINS!")
        }
        else{
            alert( "DEALER WINS!")
        }
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
        
  }
}