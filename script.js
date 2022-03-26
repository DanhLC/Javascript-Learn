// Challenge 1

function calculateYear(){
    if (document.getElementById('age')) document.getElementById('age').remove();

    var inputYear = prompt("What's year you were born?");
    var calculateYear = (new Date().getFullYear()) - parseInt(inputYear);
    var h1CreateElement = document.createElement('h1');
    var textCreate = document.createTextNode(`You are ${calculateYear} years old`);
    h1CreateElement.setAttribute('id','age');
    h1CreateElement.appendChild(textCreate);
    document.getElementById("flex-box-result").appendChild(h1CreateElement);
}

function reset(){
    document.getElementById('age').remove();
}

// Challenge 2

function generateCat(){
    var img = document.createElement('img');
    var div = document.getElementById('flex-box-cat-generate');
    img.src = "https://c.tenor.com/ZhfMGWrmCTcAAAAM/cute-kitty-best-kitty.gif";
    div.appendChild(img);
}

// Challenge 3

function rpsGame(choice) {
    var humanChoice, botChoice;
    humanChoice = choice.id;
    botChoice = randomChoice(randomNumber());
    result = decideWinner(humanChoice, botChoice);
    messageNotice = notificationMessage(result);
    rpsDisplay(humanChoice, botChoice, messageNotice);
}

function randomNumber() {
    return Math.floor(Math.random()*3);
}

function randomChoice(number){
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(humanChoice, botChoice) {
    var rpsData = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };

    var humanScore = rpsData [humanChoice][botChoice];
    var botScore = rpsData [botChoice][humanChoice];

    return [humanScore, botScore];
}

function notificationMessage([humanScore, botScore]) {
    if(humanScore == 0)
    {
        return {
            'message': 'You lost',
            'color': 'red'
        };
    }
    else if (botScore == 0)
    {
        return {
            'message': 'You win',
            'color': 'green'
        };
    }
    else {
        return {
            'message': 'You draw',
            'color': 'yellow'
        };
    }
}

function rpsDisplay(humanChoice, botChoice, notificationMessage) {
    var image = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+ image[humanChoice]+"' height=150 width=150 style='box-shadow: 0 10px 50px rgba(0, 0, 0, 0.7);'/>";

    messageDiv.innerHTML = "<h1 style='color: "+ notificationMessage['color'] +";font-size: 60px; padding: 30px'>" + notificationMessage['message'] + "</h1>";

    botDiv.innerHTML = "<img src='"+ image[botChoice]+"' height=150 width=150 style='box-shadow: 0 10px 50px rgba(0, 0, 0, 0.7);'/>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

function retry() {
    location.reload();
}

// Challenge 4

var allButton = document.getElementsByTagName('button');

var copyAllButton = [];
for (var index = 0; index < allButton.length; index++) {
    copyAllButton.push(allButton[index].classList[1]);
}

function changeButtonColor(buttonColor) {
    if (buttonColor.value == 'red') 
    {
        changeColor('red');
    }
    else if (buttonColor.value == 'green')
    {
        changeColor('green');
    }
    else if (buttonColor.value == 'blue')
    {
        changeColor('blue');
    }
    else if (buttonColor.value == 'yellow')
    {
        changeColor('yellow');
    }
    else if(buttonColor.value == 'reset')
    {
        resetColor();
    }
    else
    {
        randomColor();
    }
}

function changeColor (color) {
    switch (color){
        case 'red':
            buttonClass = 'btn-danger';
            break;
         case 'green':
            buttonClass = 'btn-success';
            break;
        case 'blue':
            buttonClass = 'btn-primary';
            break;
        case 'yellow':
            buttonClass = 'btn-warning';
            break;

        default: 
            break;
    }

    for (var index = 0; index < allButton.length; index++) {
        allButton[index].classList.remove(allButton[index].classList[1]);
        allButton[index].classList.add(buttonClass);
    }
}

function resetColor() {
    for (var index = 0; index < allButton.length; index++) {
        allButton[index].classList.remove(allButton[index].classList[1]);
        allButton[index].classList.add(copyAllButton[index]);
    }
}

function randomColor() {
    var randonChoice = ['btn-danger', 'btn-success', 'btn-primary', 'btn-warning'];
    for (var index = 0; index < allButton.length; index++) {
        var randomNumber = Math.floor(Math.random() * 4);
        allButton[index].classList.remove(allButton[index].classList[1]);
        allButton[index].classList.add(randonChoice[randomNumber]);
    }
}

// Challenge 5

var blackjackGameInfo = {
    "you": {"spScore": "#your-blackjack-result", "div": "#your-box", "score" : 0},
    "dealer": {"spScore": "#dealer-blackjack-result", "div": "#dealer-box", "score" : 0},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    "cardsMap": {"2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8": 8, "9": 9, "10" : 10, "J" : 10, "Q" : 10, "K" : 10, "A" : [1, 11]}
};

const you = blackjackGameInfo["you"];
const dealer = blackjackGameInfo["dealer"];
const cards = blackjackGameInfo["cards"];
const hitSound = new Audio("static/sounds/switch.m4a");

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    var cardDeal = randomCard();
    console.log(cardDeal);
    showCard(cardDeal, you);
    showCard(cardDeal, dealer);
}

function showCard(cardDeal, activePlayer) {
    var cardImage = document.createElement('img');
    cardImage.src = `static/images/${cardDeal}.jpg`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackStand() {
}

function blackjackDeal() {
    var yourCardImages = document.querySelector('#your-box').querySelectorAll('img');
    var dealerCardImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(var index = 0; index <yourCardImages.length; index ++)
    {
        yourCardImages[index].remove();
    }

    for(var index = 0; index <dealerCardImages.length; index ++)
    {
        dealerCardImages[index].remove();
    }
}

function randomCard() {
    var randomIndex= Math.floor(Math.random() * 13);
    return cards[randomIndex];
}