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
const newPukenkoSubmitButton = document.querySelector('.new-pukenko-submit');
const errorDisplayPage = document.querySelector('.error-page');
const errorPageOkButton = document.querySelector('.error-page-ok-button');
const myPukenkosPage = document.querySelector('.my-pukenkos-page');
const myPukenkosUserName = document.querySelector('.my-pukenkos-username');
const myPukenkosPageNewButton = document.querySelector('.my-pukenkos-page-new-button');
const myPukenkosDisplayContainer = document.querySelector('.my-pukenkos-display-container');

let pukenkoImageArray = ["images/pukenko.jpg", 
                        "images/pukenko_onion.jpg", 
                        "images/pukenko_dead.jpg", 
                        "images/pukenko_jackolantern.jpg"
                        ];

let currentUser;
let currentPukenko;
let happinessScore;
let healthScore;
let conductScore;

let displayGameScreen = () => {
    pukenkoPic.setAttribute('src', pukenkoImageArray[0]);
    if (currentPukenko) {
        displayPukenkoScreen();
    } else {
        displayBlankScreen();
    }
    clearActionLogDisplay();
    hideModalScreen();
};

let displayBlankScreen = () => {
    healthScoreIntoDom.textContent = '';
    happyScoreIntoDom.textContent = '';
    conductScoreIntoDom.textContent = '';
};

let displayPukenkoScreen = () => {
    healthScoreIntoDom.textContent = healthScore;
    happyScoreIntoDom.textContent = happinessScore;
    conductScoreIntoDom.textContent = conductScore;
};

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

let endGame = () => {
    alert("You killed Pukenko");
};

let updateScores = () => {
    updatePukenkoTable();
    healthScoreIntoDom.textContent = healthScore;
    happyScoreIntoDom.textContent = happinessScore;
    conductScoreIntoDom.textContent = conductScore;
    if (happinessScore && healthScore && conductScore > 0) {
        pukenkoPic.setAttribute('src', pukenkoImageArray[0]);
        };
    if (happinessScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[1]);
    };
    if (conductScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[3]);
    };
    if (healthScore <= 0){
        pukenkoPic.setAttribute('src', pukenkoImageArray[2]);
        endGame();
    };
};

let addItemSmoothie = () => {
    let newLogItem = document.createElement('li');
    newLogItem.classList.add('.new-log-item');
    let message = `You gave ${currentPukenko.name} a Smoothie. Happiness:${happinessScore} Health:${healthScore} Conduct:${conductScore}`;
    newLogItem.textContent = message;
    actionLog.appendChild(newLogItem);
    updateActionLog(currentUser.id, currentPukenko.id, 2, message);
};

let addItemJunkfood = () => {
    let newLogItem = document.createElement('li');
    newLogItem.classList.add('.new-log-item');
    let message = `You gave ${currentPukenko.name} Junkfood. Happiness:${happinessScore} Health:${healthScore} Conduct:${conductScore}`;
    newLogItem.textContent = message;
    actionLog.appendChild(newLogItem);
    updateActionLog(currentUser.id, currentPukenko.id, 3, message);
};

let addItemHomework = () => {
    let newLogItem = document.createElement('li');
    newLogItem.classList.add('.new-log-item');
    let message = `You made ${currentPukenko.name} do homework. Happiness:${happinessScore} Health:${healthScore} Conduct:${conductScore}`;
    newLogItem.textContent = message;
    actionLog.appendChild(newLogItem);
    updateActionLog(currentUser.id, currentPukenko.id, 4, message);
};

smoothieButton.addEventListener('click', function(event) {
    event.preventDefault();
    healthScore += 1;
    happinessScore -= 1;
    updateScores();
    addItemSmoothie();
});

junkfoodButton.addEventListener('click', function(event) {
    event.preventDefault();
    healthScore -= 1;
    happinessScore += 3;
    conductScore -= 1;
    updateScores();
    addItemJunkfood();
});

homeworkButton.addEventListener('click', function(event) {
    event.preventDefault();
    conductScore += 1;
    happinessScore -= 1;
    updateScores();
    addItemHomework();
});

let signUpSubmit = (event) => {
    event.preventDefault();
    let name = signUpUserName.value;
    let password = signUpPassword.value;
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: name,
            userpassword: password
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((data) => {
        return data.json();
    })
    .then(data => {
        let userName = data.username;
        let userPassword = data.userpassword;
        loginUser(userName, userPassword, 'signup');
    })
};

let loginFormSubmit = (event) => {
    event.preventDefault();
    let userName = loginUserName.value;
    let userPassword = loginPassword.value;
    loginUser(userName, userPassword, 'login');
};

let loginUser = (userName, userPassword, sourceForm) => {
    let url = `/login/${userName}&${userPassword}`;
    fetch(url).then((data) => {
        return data.json();
    })
    .then( data => {
        checkForLoginError(data, sourceForm);
    })
};

let checkForLoginError = (data, sourceForm) => {
    if (data.id === 'error') {
        openErrorPage(sourceForm);
        errorDisplayPage.classList.remove('hidden');
    } else {
        currentUser = {
            id: data.id,
            username: data.username
        };
        myPukenkosUserName.textContent = currentUser.username;
        openMyPukenkosPage();
    }
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
    signUpForm.classList.add('hidden');
    myPukenkosPage.classList.remove('hidden');
    modalBackground.classList.remove('hidden');
    getMyPukenkos();
};

let newPukenkoSubmit = (event) => {
    event.preventDefault();
    let body = {
        userid: currentUser.id,
        name: newPukenkoName.value
    };
    fetch('/pukenkos', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((data) => {
        return data.json();
    })
    .then(data => {
        getNewPukenko(data);
    })
};

let getNewPukenko = (data) => {
    let pukenkoName = data.name;
    let userid = data.userid;
    let url = `/pukenkos/${pukenkoName}&${userid}`;
    fetch(url).then((data) => {
        return data.json();
    })
    .then( data => {
        currentPukenko = data;
        let userId = currentUser.id;
        let pukenkoId = currentPukenko.id;
        let actionId = 1;
        let message = `${currentPukenko.name} has been created`
        updateActionLog(userId, pukenkoId, actionId, message);
        happinessScore = currentPukenko.happiness;
        healthScore = currentPukenko.hunger;
        conductScore = currentPukenko.conduct;
    })
    .then(() => {
        displayGameScreen();
    })
}

let getExistingPukenko = (data) => {
    let pukenkoName = data.name;
    let userid = data.userid;
    let url = `/pukenkos/${pukenkoName}&${userid}`;
    fetch(url).then((data) => {
        return data.json();
    })
    .then( data => {
        currentPukenko = data;
        happinessScore = currentPukenko.happiness;
        healthScore = currentPukenko.hunger;
        conductScore = currentPukenko.conduct;
    })
    .then(() => {
        displayGameScreen();
    })
};

let getMyPukenkos = () => {
    let url = `/users/${currentUser.id}/pukenkos`;
    fetch(url).then((data) => {
        return data.json();
    }).then( data => {
        clearMyPukenkos();
        data.forEach( (pukenko) => {
            let name = pukenko.name;
            let health = pukenko.hunger;
            let happiness = pukenko.happiness;
            let conduct = pukenko.conduct;
            addPukenkoListing(name, health, happiness, conduct);
        })
    })
};

let clearMyPukenkos = () => {
    let myPukenkos = document.querySelectorAll('.pukenko-listing-container');
    myPukenkos.forEach((pukenko) => {
        myPukenkosDisplayContainer.removeChild(pukenko);
    })
};

let clearActionLogDisplay = () => {
    let logItems = document.querySelectorAll('.new-log-item');
    logItems.forEach((item) => {
        actionLog.removeChild(item);
    })
};

let addPukenkoListing = (name, health, happiness, conduct) => {
    let listingContainer = document.createElement('div');
    listingContainer.classList.add('pukenko-listing-container');
    listingContainer.appendChild(addListingName(name));
    listingContainer.appendChild(addPukenkoStatsContainer(health, happiness, conduct));
    listingContainer.addEventListener('click', () => {
        let data = {
            name: name,
            userid: currentUser.id
        };
        getExistingPukenko(data);
    });
    myPukenkosDisplayContainer.appendChild(listingContainer);
};

let addListingName = (name) => {
    let listingName = document.createElement('p');
    listingName.classList.add('pukenko-listing-name');
    listingName.textContent = name;
    return listingName;
};

let addPukenkoStatsContainer = (health, happiness, conduct) => {
    let statsContainer = document.createElement('div');
    statsContainer.classList.add('pukenko-listing-stats-container');
    statsContainer.appendChild(addSingleStatContainer(health, 'health'));
    statsContainer.appendChild(addSingleStatContainer(happiness, 'happiness'));
    statsContainer.appendChild(addSingleStatContainer(conduct, 'conduct'));
    return statsContainer;
};

let addSingleStatContainer = (stat, title) => {
    let listingStatContainer = document.createElement('div');
    listingStatContainer.classList.add('listing-stat-container');
    let titleElement = document.createElement('p');
    titleElement.textContent = title;
    listingStatContainer.appendChild(titleElement);
    let statElement = document.createElement('p');
    statElement.classList.add('listing-stat');
    statElement.textContent = stat;
    listingStatContainer.appendChild(statElement);
    return listingStatContainer;
};

let updateActionLog = (userId, pukenkoId, actionId, message) => {
    let body = {userId, pukenkoId, actionId, message};
    fetch('/actions', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((data) => {
        return data.json();
    })
    .then(data => {
        console.log(data + ' added to action Log');
    })
};

let updatePukenkoTable = () => {
    let body = {
        id: currentPukenko.id,
        hunger: healthScore,
        happiness: happinessScore,
        conduct: conductScore
    };
    fetch(`/pukenkos/${currentPukenko.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

errorPageOkButton.addEventListener('click', closeErrorPage);
myPukenkosPageNewButton.addEventListener('click', openNewPukenkoForm);
signUpSubmitButton.addEventListener('click', signUpSubmit);
newPukenkoSubmitButton.addEventListener('click', newPukenkoSubmit);
loginSubmitButton.addEventListener('click', loginFormSubmit);
headerLoginButton.addEventListener('click', showLoginForm);
headerSignUpButton.addEventListener('click', showSignUpForm);
modalCloseButton.addEventListener('click', hideModalScreen);
window.addEventListener('click', windowOnClick);

displayGameScreen();