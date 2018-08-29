var happyScoreIntoDom = document.querySelector('.HappyScore');
var healthScoreIntoDom = document.querySelector('.HealthScore');
var conductScoreIntoDom = document.querySelector('.ConductScore');

var smoothieButton = document.querySelector('.smoothieButton');
var junkfoodButton = document.querySelector('.junkfoodButton');
var homeworkButton = document.querySelector('.homeworkButton');

function randomScore(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
 };

let defaultHappyScore = randomScore(2,8);
let defaultHealthScore = randomScore(2,8);
let defaultConductScore = randomScore(2,8);

let updateScores = function(){
    healthScoreIntoDom.textContent = defaultHealthScore;
    happyScoreIntoDom.textContent = defaultHappyScore;
    conductScoreIntoDom.textContent = defaultConductScore;
}
 

smoothieButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultHealthScore += 1;
    updateScores();
    console.log("smoothie");
});

junkfoodButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultHealthScore -= 1;
    defaultHappyScore += 3;
    defaultConductScore -= 1;
    updateScores();
    console.log("junkfood");
});

homeworkButton.addEventListener('click', function(event) {
    event.preventDefault();
    defaultConductScore += 1;
    defaultHappyScore -= 1;
    updateScores();
   console.log("homework");
});






updateScores();