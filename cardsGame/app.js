
function thisIsProcess(urlID) {
    return fetch(urlID)
}

async function getData() {
    let response = await thisIsProcess("https://deckofcardsapi.com/api/deck/new/");
    let data = response.json();
    return data;
}

function consoleTheValue(data) {
    return new Promise((resolve, reject) => {
        console.log('consoleTheValue', data)
        reject(data)
    })
    console.log('consoleTheValue', data)
    return data
}

getData().then(data => {
    let deckID = data.deck_id
    console.log("deckID", deckID)
    return thisIsProcess(`https://deckofcardsapi.com/api/deck/${deckID}/draw`)
    let drawCard = thisIsProcess(`https://deckofcardsapi.com/api/deck/${deckID}/draw`)
    console.log("drawncard", drawCard)
})
    .then(drawData => {
        dp = drawData
        console.log('draw response', drawData)
        console.log("checking data", dp)
        return this.consoleTheValue(dp)
        return this.consoleTheValue(dp)
    })
    .then(chainedResponse => {
        console.log('chainedResponse', chainedResponse)
    })
    .catch(err => {
        console.log('err', err)
    })