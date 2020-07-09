//////// CONSTANTS ////////////
const h2 = document.querySelector('h2');
const form = document.querySelector('form')
const question = document.getElementById("questions");


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

function showUsers(users){
  const players = users
  players.forEach(player =>{
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
    .then(user => changeDOM(user))  
    .catch(err => console.log(err))
    form.reset()  // location.href = "/game.html";
}
function fetchQuestions(){
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(resp => resp.json())
    .then(questionData => console.log(questionData))
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
    }


////// INVOKED FUNCTIONS /////////
fetchQuestions()
fetchUsers()






