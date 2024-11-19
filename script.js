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
    if ((buttonColor.value == 'red') 
        || (buttonColor == 'red' ))
    {
        changeColor('red');
    }
    else if ((buttonColor.value == 'green')
        || (buttonColor == 'green' ))
    {
        changeColor('green');
    }
    else if ((buttonColor.value == 'blue')
        || (buttonColor == 'blue' ))
    {
        changeColor('blue');
    }
    else if ((buttonColor.value == 'yellow')
        || (buttonColor == 'yellow' ))    
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
    "cardsMap": {"2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8": 8, "9": 9, "10" : 10, "J" : 10, "Q" : 10, "K" : 10, "A" : [1, 11]},
    "wins" : 0,
    "loses" : 0,
    "draws" : 0,
    "moneys" : 5000,
    "isStand" : false,
    "turnOver" : false
};

const you = blackjackGameInfo["you"];
const dealer = blackjackGameInfo["dealer"];
const cards = blackjackGameInfo["cards"];
const hitSound = new Audio("static/sounds/switch.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const loseSound = new Audio("static/sounds/aww.mp3");
const drawSound = new Audio("static/sounds/small-crowd-laugh-and-applause.mp3");

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGameInfo['isStand'] === false) {
        let cardDeal = randomCard();
        showCard(cardDeal, you);
        updateScore(cardDeal, you);
        showScore(you);       
    }
}

function showCard(cardDeal, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${cardDeal}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGameInfo['turnOver'] === true) {
        blackjackGameInfo['isStand'] = false;
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

        you['score'] = 0;
        dealer['score'] = 0;
        document.querySelector("#your-blackjack-result").textContent = 0;
        document.querySelector("#dealer-blackjack-result").textContent = 0;
        document.querySelector("#blackjack-result").textContent = "Let's play";

        document.querySelector("#your-blackjack-result").style.color = "#fff";
        document.querySelector("#dealer-blackjack-result").style.color = "#fff";
        document.querySelector("#blackjack-result").style.color = "black";

        blackjackGameInfo['turnOver'] = false;
    }
}

function randomCard() {
    var randomIndex= Math.floor(Math.random() * 13);
    return cards[randomIndex];
}

function updateScore(card, activePlayer) {
    if (card == "A")
    {
        if (activePlayer['score'] + blackjackGameInfo['cardsMap'] [card][1] <= 21)
        {
            activePlayer['score'] += blackjackGameInfo['cardsMap'][card][1];
        }
        else
        {
            activePlayer['score'] += blackjackGameInfo['cardsMap'][card][0];   
        }
    }
    else
    {
        activePlayer['score'] += blackjackGameInfo['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21)
    {
        document.querySelector(activePlayer['spScore']).textContent = "BUST";
        document.querySelector(activePlayer['spScore']).style.color = "red";
    }
    else{
        document.querySelector(activePlayer['spScore']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
    if (blackjackGameInfo['turnOver'] === false)
    {
        blackjackGameInfo['isStand'] = true;

        while ((dealer['score'] < 16)
            && (blackjackGameInfo['isStand'] === true))
        {
            let cardDeal = randomCard();
            showCard(cardDeal, dealer);
            updateScore(cardDeal, dealer);
            showScore(dealer);
            await sleep(1000);
        }

        blackjackGameInfo['turnOver'] = true;
        var winner = botWinner();
        showResult(winner);
    }
}

function botWinner() {
    var winner;
    if (blackjackGameInfo['turnOver'] === true) {
        if (you['score'] <= 21) {
            if ((you['score'] > dealer['score'])
                || (dealer['score'] > 21))
            {
                blackjackGameInfo["wins"] ++;
                blackjackGameInfo["moneys"] += 300;
                winner = you;
            }
            else if (you['score'] < dealer['score'])
            {
                blackjackGameInfo["loses"] ++;
                blackjackGameInfo["moneys"] -= 300;
                winner = dealer;
            }
            else if (you['score'] === dealer['score'])
            {
                blackjackGameInfo["draws"] ++;
            }
        }
        else if ((you['score'] > 21)
            && (dealer['score'] <=21))
        {
            blackjackGameInfo["loses"] ++;
            blackjackGameInfo["moneys"] -= 300;
            winner = dealer;
        }
        else if ((you['score'] > 21)
            && (dealer['score'] > 21))
        {
            blackjackGameInfo["draws"] ++;
        }

        return winner;
    }
}

function showResult(winner) {
    var message, color;

    if (blackjackGameInfo['turnOver'] === true) {
        if (winner === you)
        {
            document.querySelector("#wins").textContent = blackjackGameInfo["wins"];
            document.querySelector("#moneys").textContent = blackjackGameInfo["moneys"] + "$";
            message = "You won";
            color = "green";
            winSound.play();
        }
        else if (winner === dealer)
        {
            document.querySelector("#loses").textContent = blackjackGameInfo["loses"];
            document.querySelector("#moneys").textContent = blackjackGameInfo["moneys"] + "$";
            message = "You lost";
            color = "red";
            loseSound.play();
        }
        else
        {
            document.querySelector("#draws").textContent = blackjackGameInfo["draws"];
            message = "You draw";
            color = "black";
            drawSound.play();
        }

        document.querySelector("#blackjack-result").textContent = message;
        document.querySelector("#blackjack-result").style.color = color;
    }
}

/**
 * 
 * @param {*} task 
 * @param {*} callback 
 */
// function doTask(task, callback) {
//     console.log(`Doing ${task}...`);
//     callback();
// }

// doTask("homework", function() {
//     console.log("Task completed!");
// });

// promise
// function fetchData() {
//     return new Promise((resolve, reject) => {
//         let success = true;
//         setTimeout(() => {
//             if (success) {
//                 resolve("Data fetched successfully!");
//             } else {
//                 reject("Failed to fetch data!");
//             }
//         }, 1000);
//     });
// }

// fetchData()
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));

//async/await
// async function fetchData() {
//     let success = true;
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (success) {
//                 resolve("Data fetched successfully!");
//             } else {
//                 reject("Failed to fetch data!");
//             }
//         }, 1000);
//     });
// }

// async function getData() {
//     try {
//         const data = await fetchData();
//         console.log(data);

//     } catch (error) {
//         console.error(error);
//     }
// }

// getData();

// closure
// var createCounter = function(n) {
//     return function() {
//         return n++;    
//     };
// };

// const counter = createCounter(-2);
// console.log(counter())

// var expect = function(val) {
//     return {
//         toBe(value)
//         {
//            if (val === value) return true;
//            else throw new Error("Not Equal");
//         },
//         notToBe(value)
//         {
//             if (val !== value) return true;
//             else throw new Error("Equal");
//         }
//     }
// };

// console.log(expect(5).notToBe(5));

// var createCounter = function(init) {
//     let initValue = init;

//     function increment()
//     {
//         return ++init;
//     }

//     function decrement()
//     {
//         return --init;
//     }
//     function reset()
//     {
//         init = initValue;
//         return initValue;
//     }

//     return { increment, decrement, reset }
// };

// const counter = createCounter(5);
// console.log(counter.increment());
// console.log(counter.reset());
// console.log(counter.decrement());

// var map = function(arr, fn) {
//     const transformedArr = [];
//     arr.forEach(function(currentValue, i){
//         transformedArr[i] = fn(currentValue, i);
//     })
//     return transformedArr;
// };

//   console.log(map([1,2,3], function plusone(n) { return n + 1; }))

// var filter = function(arr, fn) {
//     const filteredArr = [];
//     for(let i in arr)
//     {
//         if (fn(arr[i], i)) filteredArr.push(arr[i])
//     }

//     return filteredArr;
// };

// console.log(filter([0,10,20,30], function greaterThan10(n) { return n > 10; }));

// function reduce(nums, fn, init) {
//     return nums.reverse().reduceRight((index, value) => fn(index, value), init);
// }

// console.log(reduce( [1,2,3,4], function sum(accum, curr) { return accum + curr; }, 0))

// var compose = function(functions) {
//     return function(x) {
//         return functions.reduceRight((acc, fn) => fn(acc), x);
//     }
// };

// console.log(compose([x => 10 * x, x => 10 * x, x => 10 * x])(1))

// var once = function(fn) {
//     let called = false;
    
//     return function(...args){
//         if (called) return undefined;

//         called = true;
//         return fn(...args)
//     }
// };

// let fn = (a,b,c) => (a + b + c)
// let onceFn = once(fn)
// console.log(onceFn(1,2,3));
// console.log(onceFn(2,3,6));

// function memoize(fn) {
//     const cache = new Map();

//     return function(...args) {
//         const key = JSON.stringify(args);

//         if (cache.has(key)) return cache.get(key);

//         const result = fn(...args);
//         cache.set(key, result);
//         return result;
//     };
// }

// const sum = (a, b) => a + b;

// const fib = (n) => {
//     if (n <= 1) return 1;
//     return fib(n - 1) + fib(n - 2);
// };

// const factorial = (n) => {
//     if (n <= 1) return 1;
//     return factorial(n - 1) * n;
// };

// const memoizedSum = memoize(sum);
// const memoizedFib = memoize(fib);
// const memoizedFactorial = memoize(factorial);

// console.log(memoizedSum(3, 2)); 
// console.log(memoizedSum(2, 3));
// console.log(memoizedSum(3, 2)); 

// console.log(memoizedFib(10));
// console.log(memoizedFactorial(5));

//promise
// function addTwoPromises(promise1, promise2) {
//     return Promise.all([promise1, promise2])
//         .then(([value1, value2]) => value1 + value2);
// }

// addTwoPromises(Promise.resolve(2), Promise.resolve(2))
//     .then(console.log);

// async function sleep(millis) {
//     return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve(millis);
//                 }, millis);
//             });
// }

// let t = Date.now();
// sleep(1000).then(() => {
//   console.log(Date.now() - t);
// });

// var cancellable= function(fn, args, t) {
//     const timer = setTimeout(() => {
//         fn(...args);
//     }, t);

//     return function cancelFn() {
//         clearTimeout(timer);
//     };
// }

// const result = [];
 
//  const fn = (x) => x * 5;
//  const args = [2], t = 20, cancelTimeMs = 50;
 
//  const start = performance.now();
 
//  const log = (...argsArr) => {
//      const diff = Math.floor(performance.now() - start);
//      result.push({"time": diff, "returned": fn(...argsArr)});
//  }
      
//  const cancel = cancellable(log, args, t);
 
//  const maxT = Math.max(t, cancelTimeMs);
          
//  setTimeout(cancel, cancelTimeMs);
 
//  setTimeout(() => {
//      console.log(result);
//      console.log("Excute cancelled")
//  }, maxT + 15)