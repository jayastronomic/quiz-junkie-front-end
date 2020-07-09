//////// CONSTANTS ////////////
const h2 = document.querySelector('h2');
const form = document.querySelector('form')
const question = document.getElementById("questions");

/////// FUNCTIONS /////////////
// function fetchQuestion () {
//     fetch("http://localhost:3000/api/v1/quizzes/1/questions")
//     .then(resp => resp.json())
//     .then(quiz => console.log(quiz))
// }

function userPostObj(){
    let username = event.target[0].value;
    let userData = {
        username: username
    }
    return {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userData)
    }
}

// function placeOnPage(user){

// }
function showUser(users){
  const players = users.data
  players.forEach(player =>{
     let pTag = document.createElement('p')
     let div = document.getElementById('scroll-content')
     pTag.innerHTML = player.username
     div.append(pTag)
  })
}

function fetchUsers(){
    fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
    .then(users => showUser(users))
}

function createUser() {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users", userPostObj())
    .then(resp => resp.json())
    .then(user => changeDOM(user))  
    .catch(err => console.log(err))
    form.reset()  // location.href = "/game.html";
}
function fetchFirstQuizQuestions(){
    fetch("http://localhost:3000/api/v1/quizzes/1/questions")
    .then(resp => resp.json())
    .then(quizData => console.log(quizData))
}



/////// EVENT LISTENERS ///////
form.addEventListener('submit', createUser)


function changeDOM(user){
        let div = document.getElementById('home')
        let button = document.createElement('a')
        button.setAttribute('class', 'btn')
        button.setAttribute('href', '/game.html')
        button.innerHTML = `Start Quiz ${user.username}`
        div.appendChild(button)  
        debugger
    }


////// INVOKED FUNCTIONS /////////
fetchFirstQuizQuestions()
fetchUsers()






