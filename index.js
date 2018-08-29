const happyScoreIntoDom = document.querySelector('.HappyScore');
const healthScoreIntoDom = document.querySelector('.HealthScore');
const conductScoreIntoDom = document.querySelector('.ConductScore');

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

var actionLog = document.querySelector('.actionLog');


var addItemSmoothie = () => {
    var newLogItem = document.createElement('li');
    newLogItem.textContent = `You gave Pukenko a Smoothie. Happiness:${defaultHappyScore} Health:${defaultHealthScore} Conduct:${defaultConductScore}`;
    actionLog.appendChild(newLogItem);
    
};

var addItemJunkfood = () => {
    var newLogItem = document.createElement('li');
    newLogItem.textContent = `You gave Pukenko Junkfood. Happiness:${defaultHappyScore} Health:${defaultHealthScore} Conduct:${defaultConductScore}`
    actionLog.appendChild(newLogItem);
};

var addItemHomework = () => {
    var newLogItem = document.createElement('li');
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


