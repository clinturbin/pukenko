
function randomHappyScore(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
 };
 
 function randomHealthScore(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
  };
 
 function randomConductScore(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
  };
 
 var defaultHappyScore = randomHappyScore(2,8);
 var defaultHealthScore = randomHealthScore(2,8);
 var defaultConductScore = randomConductScore(2,8);
 
//inserts happy score - for my own reference, should come from DB in final version
 var happyScoreIntoDom = document.querySelector('.HappyScore');
 var happyScore = document.createElement('p');
 happyScore.textContent = defaultHappyScore;
 happyScoreIntoDom.appendChild(happyScore);

//inserts health score - for my own reference, should come from DB in final version
 var healthScoreIntoDom = document.querySelector('.HealthScore');
 var healthScore = document.createElement('p');
 healthScore.textContent = defaultHealthScore;
 healthScoreIntoDom.appendChild(healthScore);

 //inserts conduct score - for my own reference, should come from DB in final version
 var conductScoreIntoDom = document.querySelector('.ConductScore');
 var conductScore = document.createElement('p');
 conductScore.textContent = defaultConductScore;
 conductScoreIntoDom.appendChild(conductScore);