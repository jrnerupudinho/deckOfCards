let ALL_CARDS = []
let newGameButton = document.getElementById('new-game-button')
function thisIsProcess(urlID) {
    return fetch(urlID).then(ans =>{
        p = ans.json()
        return p
    })
}
        
async function getData() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
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
            displayCards();
            let img =document.createElement("img")
            img.src= ALL_CARDS.cards.image
            document.body.appendChild(img)
        })
    
    })
    function displayCards(){

    }