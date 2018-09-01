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
const loginSubmitButton = document.querySelector(".login-submit");
const signUpUserName = document.querySelector(".sign-up-username");
const signUpPassword = document.querySelector(".sign-up-password");
const signUpSubmitButton = document.querySelector(".sign-up-submit");
const newPukenkoForm = document.querySelector('.new-pukenko-form');
const newPukenkoName = document.querySelector('.pukenko-name-input');
const newPukenkoSubmit = document.querySelector('.new-pukenko-submit');
const errorDisplayPage = document.querySelector('.error-page');
const errorPageOkButton = document.querySelector('.error-page-ok-button');
const myPukenkosPage = document.querySelector('.my-pukenkos-page');
const myPukenkosUserName = document.querySelector('.my-pukenkos-username');
const myPukenkosPageNewButton = document.querySelector('.my-pukenkos-page-new-button');

let currentUser;

let hideModalScreen = () => {
    modalBackground.classList.add('hidden');
    loginForm.classList.add('hidden');
    signUpForm.classList.add('hidden');
    newPukenkoForm.classList.add('hidden');
    myPukenkosPage.classList.add('hidden');
    errorDisplayPage.classList.add('hidden');
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

let createNewUser = (event) => {
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
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then( () => {
        signUpForm.classList.add('hidden');
        newPukenkoForm.classList.remove('hidden');
    })
};

let loginFormSubmit = (event) => {
    event.preventDefault();
    let userName = loginUserName.value;
    let userPassword = loginPassword.value;
    let url = `http://localhost:3000/login/${userName}&${userPassword}`;
    fetch(url).then((data) => {
        return data.json();
    })
    .then( data => {
        if (data.id === 'error') {
            openErrorPage('login');
            errorDisplayPage.classList.remove('hidden');
        } else {
            currentUser = {
                id: data.id,
                username: data.username
            };
            myPukenkosUserName.textContent = currentUser.username;
            openMyPukenkosPage();
        }
    })
};

let openErrorPage = (form) => {
    if (form === 'login') {
        loginForm.classList.add('hidden');
    } else if (form === 'signup') {
        signUpForm.classList.add('hidden');
    }
    errorDisplayPage.classList.remove('hidden');
};

let closeErrorPage = (event) => {
    event.preventDefault();
    hideModalScreen();
};

let openNewPukenkoForm = (event) => {
    event.preventDefault();
    signUpForm.classList.add('hidden');
    myPukenkosPage.classList.add('hidden');
    loginForm.classList.add('hidden');
    newPukenkoForm.classList.remove('hidden');
};

let openMyPukenkosPage = () => {
    loginForm.classList.add('hidden');
    myPukenkosPage.classList.remove('hidden');
    modalBackground.classList.remove('hidden');
};

errorPageOkButton.addEventListener('click', closeErrorPage);
myPukenkosPageNewButton.addEventListener('click', openNewPukenkoForm);
signUpSubmitButton.addEventListener('click', createNewUser);
loginSubmitButton.addEventListener('click', loginFormSubmit);
headerLoginButton.addEventListener('click', showLoginForm);
headerSignUpButton.addEventListener('click', showSignUpForm);
modalCloseButton.addEventListener('click', hideModalScreen);
window.addEventListener('click', windowOnClick);

updateScores();