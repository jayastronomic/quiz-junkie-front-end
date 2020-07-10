// function getContent(fragmentId, callback){

//   var pages = {
//     home: "This is the Home page. Welcome to my site.",
//     players: "This page will describe what my site is about",
//     games: "Contact me on this page if you have any questions"
//   };

//   callback(pages[fragmentId]);
// }



// function loadContent(){

//   var contentDiv = document.getElementById("players-page"),
//       fragmentId = location.hash.substr(1);

//   getContent(fragmentId, function (content) {
//     contentDiv.innerHTML = content;
//   });

// }

// if(!location.hash) {
//   location.hash = "#home";
// }

// loadContent();

// window.addEventListener("hashchange", loadContent)