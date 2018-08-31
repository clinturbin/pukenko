const happyScoreIntoDom = document.querySelector('.HappyScore');
const healthScoreIntoDom = document.querySelector('.HealthScore');
const conductScoreIntoDom = document.querySelector('.ConductScore');
const actionLog = document.querySelector('.actionLog');
const smoothieButton = document.querySelector('.smoothieButton');
const junkfoodButton = document.querySelector('.junkfoodButton');
const homeworkButton = document.querySelector('.homeworkButton');
const pukenkoPic = document.querySelector('.pumpkinpic');
const headerLoginButton = document.querySelector(".header_login_button");
const headerSignUpButton = document.querySelector(".header_signup_button");
const modalBackground = document.querySelector('.modal-background');
const modalCloseButton = document.querySelector('.modal-close-button');
const signUpForm = document.querySelector('.sign-up-form');
const loginForm = document.querySelector('.login-form');
const loginUserName = document.querySelector(".login-username");
const loginPassword = document.querySelector(".login-password");
const loginSubmit = document.querySelector(".login-submit");
const signUpUserName = document.querySelector(".sign-up-username");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpSubmit = document.querySelector(".sign-up-submit");
const newPukenkoForm = document.querySelector('.new-pukenko-form');
const newPukenkoName = document.querySelector('.pukenko-name-input');
const newPukenkoInputName = document.querySelector('.pukenko-name');
const newPukenkoSubmit = document.querySelector('.new-pukenko-submit')

let hideModalScreen = () => {
    modalBackground.classList.add('hidden');
    loginForm.classList.add('hidden');
    signUpForm.classList.add('hidden');
};

let windowOnClick = (event) => {
    if (event.target === modalBackground) {
        hideModalScreen();
    }
};

let showModalBackground = () => modalBackground.classList.remove('hidden');

let showLoginForm = () => {
    showModalBackground();
    loginForm.classList.remove('hidden');
};

let showSignUpForm = () => {
    showModalBackground();
    signUpForm.classList.remove('hidden');
};

let pukenkoImageArray = ["images/pukenko.jpg", "images/pukenko_onion.jpg", "images/pukenko_dead.jpg", "images/pukenko_jackolantern.jpg"]

let randomScore = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
 };

let endGame = () => {
    alert("You killed Pukenko");
}

let defaultHappyScore = randomScore(2,8);
let defaultHealthScore = randomScore(2,8);
let defaultConductScore = randomScore(2,8);

let updateScores = () => {
    healthScoreIntoDom.textContent = defaultHealthScore;
    happyScoreIntoDom.textContent = defaultHappyScore;
    conductScoreIntoDom.textContent = defaultConductScore;
    if (defaultHappyScore && defaultHealthScore && defaultConductScore > 0) {
        pukenkoPic.setAttribute('src', pukenkoImageArray[0]);
        };
    if (defaultHappyScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[1]);
    };
    if (defaultConductScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[3]);
    };
    if (defaultHealthScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[2]);
        endGame();
    };
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

let testFetch = (event) => {
    event.preventDefault();
    let name = signUpUserName.value;
    let password = signUpPassword.value;
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: name,
            userpassword: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        return data.json();
    })
};

signUpSubmit.addEventListener('click', testFetch);
headerLoginButton.addEventListener('click', showLoginForm);
headerSignUpButton.addEventListener('click', showSignUpForm);
modalCloseButton.addEventListener('click', hideModalScreen);


window.addEventListener('click', windowOnClick);

updateScores();