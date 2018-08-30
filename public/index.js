const happyScoreIntoDom = document.querySelector('.HappyScore');
const healthScoreIntoDom = document.querySelector('.HealthScore');
const conductScoreIntoDom = document.querySelector('.ConductScore');
const actionLog = document.querySelector('.actionLog');
const smoothieButton = document.querySelector('.smoothieButton');
const junkfoodButton = document.querySelector('.junkfoodButton');
const homeworkButton = document.querySelector('.homeworkButton');

let randomScore = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
 };


let defaultHappyScore = randomScore(2,8);
let defaultHealthScore = randomScore(2,8);
let defaultConductScore = randomScore(2,8);

let updateScores = () => {
    healthScoreIntoDom.textContent = defaultHealthScore;
    happyScoreIntoDom.textContent = defaultHappyScore;
    conductScoreIntoDom.textContent = defaultConductScore;
};


let addItemSmoothie = () => {
    let newLogItem = document.createElement('li');
    newLogItem.textContent = `You gave Pukenko a Smoothie. Happiness:${defaultHappyScore} Health:${defaultHealthScore} Conduct:${defaultConductScore}`;
    actionLog.appendChild(newLogItem);
    
};

let addItemJunkfood = () => {
    let newLogItem = document.createElement('li');
    newLogItem.textContent = `You gave Pukenko Junkfood. Happiness:${defaultHappyScore} Health:${defaultHealthScore} Conduct:${defaultConductScore}`
    actionLog.appendChild(newLogItem);
};

let addItemHomework = () => {
    let newLogItem = document.createElement('li');
    newLogItem.textContent = `You made Pukenko do homework. Happiness:${defaultHappyScore} Health:${defaultHealthScore} Conduct:${defaultConductScore}`
    actionLog.appendChild(newLogItem);
};

 

smoothieButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultHealthScore += 1;
    updateScores();
    addItemSmoothie();
});

junkfoodButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultHealthScore -= 1;
    defaultHappyScore += 3;
    defaultConductScore -= 1;
    updateScores();
    addItemJunkfood();
});

homeworkButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultConductScore += 1;
    defaultHappyScore -= 1;
    updateScores();
    addItemHomework();
});

updateScores();

fetch('http://localhost:3000/pukenkos/1').then((data) => {
    return data.json();
}).then(data => console.log(data))


fetch('http://localhost:3000/pukenkos', {
    method: 'POST',
    body: JSON.stringify({
        test: 'result'
    }),
    headers: {
        "Content-Type": 'application/json'
    }
}).then((data) => {
    return data.json();
}).then(data => console.log(data))

// fetch('http://localhost:3000/pukenkos/1', {
//     method: 'POST',
//     headers: {
//         // authorization: getItem(Token),
//         "Content-Type": 'application/json'
//     },
//     {
//         body: JSON.stringify({'whatever object I\'m sending': '''});
//     }

// }).then((data) => {
//     return data.json();
// }).then(data => console.log(data))
