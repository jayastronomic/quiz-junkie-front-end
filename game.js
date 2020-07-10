//////// CONSTANTS ////////////
// const h2 = document.querySelector('h2');
const userGet = document.querySelector('form');
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

////////////////////QUESTIONS HARDCODE////////////////////////////////
let questions = [
    {
        question: "The Harvard architecture for micro-controllers added which additional bus?",
        choice1: "Instruction",
        choice2: "Address",
        choice3: "Data",
        choice4: "Control",
        answer: 1,
    },
    {
        question: "When was the first Call of Duty title released?",
        choice1: "December 1, 2003",
        choice2: "November 14, 2002",
        choice3: "July 18, 2004",
        choice4: "October 29, 2003",
        answer: 4,
    },
    {
        question: "Which Elton John hit starts with the line 'When are you gonna come down' ?",
        choice1: "Rocket Man",
        choice2: "Goodbye Yellow Brick Road",
        choice3: "Bennie and the Jets",
        choice4: "Crocodile Rock",
        answer: 2,
    },
    {
        question: "The Internet Meme 'All your base are belong to us' is based on the poorly translated English Version of which Video Game?",
        choice1: "Zero Wing",
        choice2: "F-Zero",
        choice3: "Wing Commander",
        choice4: "Star Wars: X-Wing",
        answer: 1,
    },
    {
        question: "What was the nickname of the original model for Half-Life's protagonist Gordon Freeman?",
        choice1: "Gordon the Space Biker",
        choice2: "Ivan the Alien Biker",
        choice3: "Ivan the Space Biker",
        choice4: "Gordon the Alien Biker",
        answer: 3,
    },
    {
        question: "When was YouTube founded?",
        choice1: "February 14, 2005",
        choice2: "May 22, 2004",
        choice3: "March 22, 2005",
        choice4: "June 22, 2004",
        answer: 1,
    },
    {
        question: "The mountainous Khyber Pass connects which of the two following countries?",
        choice1: "Afghanistan and Pakistan",
        choice2: "India and Nepal",
        choice3: "Pakistan and India",
        choice4: "Tajikistan and Kyrgyzstan",
        answer: 1,
    },
    {
        question: "What is isobutylphenylpropanoic acid more commonly known as?",
        choice1: "Morphine",
        choice2: "Aspirin",
        choice3: "Ketamine",
        choice4: "Ibuprofen",
        answer: 4,
    },
    {
        question: "Which of these songs is not by Tatsuro Yamashita?",
        choice1: "Merry-Go Round",
        choice2: "Lucky Lady Feel So Good",
        choice3: "Let's Dance Baby",
        choice4: "Love Talking",
        answer: 2,
    },
    {
        question: "Which of these was the name of a bug found in April 2014 in the publicly available OpenSSL cryptography library?",
        choice1: "ShellShock",
        choice2: "Corrupted Blood",
        choice3: "ShellScript",
        choice4: "Heartbleed",
        answer: 4,
    },
];
/////////////////////////////////////////////////////////

////////////////USER////////////////////////////
function userPostObj(){
    let username = event.target[0].value;
    let userData = {
        username: username
    }
    return {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "ACCEPT": "application/json"
        },
        body: JSON.stringify(userData)
    }
};

function showUsers(users) {
  const players = users.data.users
  const scores = users.data.userscores
  players.forEach(player => {
     let li = document.createElement('li')
     let ul = document.querySelector('ul')
     li.innerHTML = player.username
     ul.append(li)
  })
};

function fetchUsers(){
    fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
    .then(users => showUsers(users));  
};

function createUser() {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users", userPostObj())
    .then(resp => resp.json())
    .then(userObj => changeIndexDOM(userObj))  
    .catch(err => console.log(err))
    form.reset()  // location.href = "/game.html";
};
////////////////////////////////////////////////////


/////// EVENT LISTENERS ///////
// userGet.addEventListener('submit', userPostObj);


function changeIndexDOM(userObj){
        if (userObj.status === "ERROR"){
            let div = document.getElementById('error-container')
            div.innerHTML = userErrorMessage(userObj)
        } else {
        let a = document.getElementById('highscore-btn')
        let div = document.getElementById('home')
        let button = document.createElement('a')
        let form = document.querySelector('form')
        button.setAttribute('class', 'btn')
        button.setAttribute('href', '/game.html')
        button.innerHTML = `Start Quiz ${userObj.username}`
        div.insertBefore(button, a)  
        form.remove() 
    };
};

function userErrorMessage(userObj){
    return `
    <strong id="error-message">${userObj.message}</strong>
    `
}
/////////////////////GAME/////////////////////////////////////
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion();
    consol.log(questions)
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        // return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      let classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  
  startGame();
//////////////////////////////////////////////////////////////////////


////// INVOKED FUNCTIONS /////////
// fetchQuestions()
fetchUsers();
startGame();






