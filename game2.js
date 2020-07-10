const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("choice-text"))
console.log(choices)

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions;
questions = parseQuestionObj()

// CONSTANTS ///

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10; 




///// FUNCTIONS///
function parseQuestionObj(questionObj){
    let ArrofQuestions = []
    questionObj.results.forEach(result => {
     let question = result.question
     ArrofQuestions.push(question)
    })
    return ArrofQuestions
}

function fetchQuestionObj(){
    debugger
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(resp => resp.json())
    .then(questionObj => parseQuestionObj(questionObj))
    .catch(err => console.log(err))
}

function startGame() {
    
    questionCounter = 0
    score = 0

    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion()
}

function getNewQuestion(){

    questionCounter++;
    Math.floor(Math.random() * availableQuestions ) 
}



///// INVOKED FUNCTIONS ////
fetchQuestionObj()
startGame()
