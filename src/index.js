import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getGif(keyWord) {
  let request = new XMLHttpRequest();
  const url =`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyWord}&limit=25&offset=0&rating=r&lang=en`;
  const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=r`;



  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response);
    } else {
      printError(this, keyWord);
    }
  });

  if (keyWord === 'trending') {
    request.open("GET", trendingUrl, true);    
  } else {
    request.open("GET", url, true);
  }
  request.send();
}

function getRandomGif() {
  let request = new XMLHttpRequest();
  const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=r`;
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    if (this.status === 200) {
      printElements(response, "ajbftyy");
    } else {
      printError(this);
    }
  });
  request.open("GET", randomUrl, true);
  request.send();
}

function printElements(apiResponse, keyWord) {
  let responseField = document.querySelector("#response");
  responseField.innerHTML = null;
  if(keyWord && keyWord !== "ajbftyy"){
    responseField.append(`Here're the results for ${keyWord}`);
    const br = document.createElement("br");
    responseField.append(br);
  }
  // <img src=${apiResponse.data[0].images.original.url}>
  if(keyWord === "ajbftyy"){
    document.getElementById("random").innerHTML = `<img src=${apiResponse.data.images.original.url}></img>`;
  } else {
    apiResponse.data.forEach(gif => {
      console.log(gif.images.original.url);
      let img = document.createElement("img");
      img.setAttribute("src", gif.images.original.url);
      img.setAttribute("width", "150px");
      responseField.append(img);
    })
  }
  // document.querySelector("#random").innerHTML = 
}

// let request = new XMLHttpRequest();
// const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=X0GS8XgYnf2YEuXoUFLknNghlNv0taC4&tag=&rating=r`;
// request.open("GET", randomUrl, true);
// request.send();
// const response = JSON.parse(request.responseText);
// response.data
// typeof response.data


function printError(request, keyWord) {
  document.querySelector("#response").innerHTML = `There was an error accessing the weather data for ${keyWord}:  ${request.status} ${request.statusText}`;
}

function handleSearch(event) {
  event.preventDefault();
  const keyWord = document.querySelector("#key-word").value;
  document.querySelector("#key-word").value = null;
  getGif(keyWord);
}

function handleTrending(event) {
  event.preventDefault();
  getGif('trending');
}

function handleRandom(event) {
  event.preventDefault();
  getRandomGif();
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleSearch);
  document.getElementById('button-trending').addEventListener('click', handleTrending);
  document.getElementById('button-random').addEventListener('click', handleRandom);
});