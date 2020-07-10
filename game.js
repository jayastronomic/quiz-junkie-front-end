//////// CONSTANTS ////////////
const h2 = document.querySelector('h2');
const form = document.querySelector('form')



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
}

function showUsers(users) {
  const players = users.data.users
  const scores = users.data.userscores
  players.forEach(player => {
     let li = document.createElement('li')
     let ul = document.querySelector('ul')
     li.innerHTML = player.username
     ul.append(li)
  })
}

function fetchUsers(){
    fetch("http://localhost:3000/api/v1/users")
    .then(resp => resp.json())
    .then(users => showUsers(users));  
}

function createUser() {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users", userPostObj())
    .then(resp => resp.json())
    .then(userObj => changeIndexDOM(userObj))  
    .catch(err => console.log(err))
    form.reset()  // location.href = "/game.html";
}
// function fetchQuestions(){
//     fetch('https://opentdb.com/api.php?amount=10&type=multiple')
//     .then(resp => resp.json())
//     .then(questionData => {
//         console.log(questionData)
//     })
// }



/////// EVENT LISTENERS ///////
form.addEventListener('submit', createUser)


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
    }
}

function userErrorMessage(userObj){
    return `
    <strong id="error-message">${userObj.message}</strong>
    `
}


////// INVOKED FUNCTIONS /////////
// fetchQuestions()
fetchUsers()






