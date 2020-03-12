let ALL_CARDS = []
let playerData = []
let dealerData = []
let startGame = false
let newGameButton = document.getElementById('new-game-button')
let hitButton = document.getElementById('hit-button')
let stayButton = document.getElementById('stay-button')
hitButton.style.display = 'none'
stayButton.style.display = 'none'

function thisIsProcess(urlID) {
    return fetch(urlID).then(ans =>{
        p = ans.json()
        return p
    })
}
        
async function getData() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    let data = response.json();
    return data;
}
getData().then(data => {
    let deckID = data.deck_id
    console.log("deckID", deckID)
    return thisIsProcess(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
})
    .then(drawData => {
        ALL_CARDS = drawData
        newGameButton.addEventListener('click', function() {
            startGame = true
            playerData = [getCards(),getCards()]
            dealerData = [getCards(),getCards()]
            let playerLength = playerData.length
            let dealerLength = dealerData.length
            for (let i= 0; i<playerLength; i++)
            {
                playerDisplayCards(playerData[i].image)
            }
            for (let i= 0; i<dealerLength; i++)
            {
                dealerDisplayCards(dealerData[i].image,i)
            }
            newGameButton.style.display = 'none';
            hitButton.style.display = 'inline';
            stayButton.style.display = 'inline';
            
        })

    
    })
    function getCards(){
       return ALL_CARDS.cards.shift()
    }
    function playerDisplayCards(player ){
        
        let img =document.createElement("img")
        img.src= player
        document.body.insertBefore(img,hitButton)

        // var playerTag = document.createTextNode("Player Cards")
        // document.body.insertBefore(playerTag,img)
        
        // document.getElementById("img").height = "300"
        // document.getElementById("img").width = "300"
    }
    function dealerDisplayCards(dealer,i ){
        let img =document.createElement("img")
        img.src= dealer
        document.body.insertBefore(img,hitButton)
        
        if( i === 0 ){
        img.style.marginLeft ="500px"
        }// document.getElementById("img").height = "300"
        // document.getElementById("img").width = "300"
    }
    hitButton.addEventListener('click', function(){
        playerData.push(getCards())
        displayCards()

    })
    function displayCards() {
        let img =document.createElement("img")
        img.src= dealer
        document.body.append(img)
    }