document.addEventListener("DOMContentLoaded", function () {
  playerCommands();
});

const globalSection = document.querySelector('#globalSection');
  globalSection.addEventListener("scroll", scrollFunction);

  function scrollFunction() {
    if (globalSection.scrollTop > 500) {
      document.getElementById('logo').style.opacity = 1;
      document.getElementById('header').style.backgroundColor = 'black';

    } else {
      document.getElementById('logo').style.opacity = 0;
      document.getElementById('header').style.backgroundColor = 'transparent';
    }
  }

function getNavigator() {
  const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? true : false;
}

function playerCommands() {
  const shortcutElements = document.getElementsByClassName("shortcut");
  const isMac = getNavigator();
  shortcutElements[0].innerHTML = isMac ? "CMD + A" : "CTRL + A";
  shortcutElements[1].innerHTML = isMac ? "CMD + Z" : "CTRL + Z";
}

function setIframeSource() {

  let cutURL = inputUrl.value;
  console.log(cutURL);
  let onlyYtId;
  let errorURL = document.getElementById("invalidURL");

  if (cutURL.startsWith("https://www.youtube.com/watch?v=")) {
    if (cutURL.indexOf('&') !== -1) { // Cut if URL has a &t=1234s
      cutURL = cutURL.split('&')[0];
    }
    onlyYtId = cutURL.split('=').pop();

    errorURL.innerHTML = "";
  } else if (cutURL.startsWith("https://youtu.be/")) {
    onlyYtId = cutURL.split('/').pop();

    errorURL.innerHTML = "";
  } else {
    errorURL.innerHTML = "Please enter a valid YouTube URL";
    return ('URL Invalid');
  }
  if (onlyYtId.length > 11) {
    errorURL.innerHTML = "Please enter a valid YouTube URL";
    return ('URL Invalid');
  }
  return onlyYtId;
}
/* 
function loadAPIPls(getIDYTB) {

   if (typeof YT !== 'undefined' && YT.loaded) {
    return;
} 
  loadYouTubeAPI();
  window.onYouTubeIframeAPIReady = function () {

  createYouTubePlayer(getIDYTB);
  }
} */

function cleanTranscript(transcript) {

  // Supprimer les objets qui ont pour seul texte [Music] ou [Applause]
  const filteredArr = transcript.filter(obj => !/^(\[Music\]|\[Applause\])$/.test(obj.text));

  // Enlever tout ce qui n'est pas une lettre de l'alphabet, remplacer les '\n' par des espaces, enlever les "whooah argh aaaah aaah whoa huh" si ce mot est seul dans le text on supprime tout l'objet mais si il est avec du text a coté on supprime que le mot
  const modifiedArr = filteredArr.map(obj => {
    let newText = obj.text.replace(/[^a-z \n]/gi, '').replace(/\n/g, ' ').replace(/\bwhooah\s*|\bargh\s*|\baaaah\s*|\baaah\s*|\bwhoa\s*|\bhuh\s*/gi, '');
    if (newText.trim() === '') {
      return null; // supprimer l'objet si le texte est vide après avoir enlevé les mots
    }
    return {
      ...obj,
      text: newText.trim().toLowerCase()
    };
  }).filter(obj => obj !== null); // filtrer les objets null

  // Si le dernier objet a pour texte "you", le supprimer
  if (modifiedArr[modifiedArr.length - 1].text === 'you') {
    modifiedArr.pop();
  }
  return modifiedArr;
}

function countScore(cleanTranscript) {
  var totalWords = cleanTranscript.reduce(function (acc, val) {
    return acc + val.text.split(' ').length;
  }, 0);
  
  scoreDiv.innerHTML = 0;
  document.getElementById('totalWords').innerHTML = ' / ' + totalWords;

  console.log(totalWords);

}

function scrollToInput() {
  const scrollTo = document.querySelector("#inputSection");
  scrollTo.scrollIntoView();
}

function millisToSeconds(ms) {
  return (ms / 1000).toFixed(3);
}

function getLang() {
  let userLanguage = navigator.language;
  return userLanguage;
}



//let obj = new oui();


//addEventListenner
let clean;
const output = document.getElementById("foundArea");
const input = document.getElementById("guessArea");
const scoreDiv = document.getElementById('currentScore');
const inputUrl = document.getElementById("urlInput");


inputUrl.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        //event.preventDefault();
        let loading = 'loading';
        let loadingSpinner = 'loadingSpinner';
        let spinner = document.getElementById('loading');
        let videoSection = document.getElementById("videoSection");
        let guessSection = document.getElementById("guessSection");
        spinner.id = loadingSpinner;
        var getIDYTB = setIframeSource();
        console.log(getIDYTB);
        if (getIDYTB === "URL Invalid") {
            inputUrl.value = "";
            spinner.id = loading;
            return;
        }
        try {
            var getHTTPTranscript = await fetch("/id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: getIDYTB,
            }).then((response) => response.json())
                .then((transcript) => transcript)
                .catch(error => {
                    console.error(error);
                    document.getElementById("invalidURL").innerHTML = "No subtitles are available for this video or it is intended for kids.";
                    spinner.id = loading;
                    inputUrl.value = "";
                    throw new Error('Error T');
                });

        } catch (error) {
            console.error(error);
            spinner.id = loading;
            inputUrl.value = "";
            return;
        }
        videoSection.style.display = "flex";
        guessSection.style.display = "flex";
        spinner.id = loading;
        inputUrl.value = "";
        clean = cleanTranscript(getHTTPTranscript);
        clean =  JSON.stringify(clean);
        clean = JSON.parse(clean);
        var startBy = clean[0].offset;
        console.log(getHTTPTranscript);
        loadAPIPls(getIDYTB, startBy);
        //toDoOnStart(startBy);
        console.log(clean);
        countScore(clean);
        const scrollTo = document.querySelector("#guessSection");
        scrollTo.scrollIntoView();
    }
},{passive:true}
);

getLang();

document.addEventListener("keydown", function (event) {
    if (event.key === "n") {
        console.log(3);
    }
}); 



// trouver l'élément parent qui contiendra l'iframe
const parentElement = document.getElementById('player');

// ajouter un écouteur d'événements pour l'événement "load"
parentElement.addEventListener('load', function() {
  // trouver l'iframe
  var youtubeIframe = document.querySelector("iframe#player");

  // attendre que l'iframe soit chargé
  youtubeIframe.addEventListener('load', function() {
    // trouver l'objet de la vidéo à l'intérieur de l'iframe
    const youtubeVideo = youtubeIframe.contentWindow.document.querySelector('video');

    // ajouter un event listener pour l'événement "timeupdate"
    youtubeVideo.addEventListener('timeupdate', function() {
      // obtenir la durée de la vidéo et la position actuelle
      const duration = youtubeVideo.duration;
      console.log('la duration : ' + duration);
      const currentTime = youtubeVideo.currentTime;

      // vérifier si la position actuelle atteint un certain chiffre
      const threshold = 30; // changer cette valeur en fonction de vos besoins
      if (currentTime >= threshold) {
        // appeler votre fonction ici
        myFunction();
      }
    });
  });
});

function myFunction() {
  // votre fonction ici
  console.log('La position de la vidéo a atteint 30 secondes!');
}


function myFunction() {
  // votre fonction ici
  console.log('La position de la vidéo a atteint 30 secondes!');
}


let indexObject = 0;
let indexWord = 0;
let indexLetter = 0;
let score = 0;
let indexStartOffset = 0;
let indexEndOffset = 0;
let currentWord;



/* function goToOffset(sendOffset){



} */

function guessButton(){
  let stringGuess;
  try {
   stringGuess = clean[indexObject].text;
  } catch(e){console.log(e)}
  if (stringGuess != null) {
  let stringListGuess = stringGuess.split(" ");
  console.log(stringListGuess);
  currentWord = stringListGuess[indexWord];
  output.innerHTML += "<a href = https://translate.google.com/?sl=en&tl=fr&text=" + currentWord + "&op=translate target=_blank><span class='guessWords'>" + currentWord + "</span>" + ' ';
  indexWord++;
  input.value = '';
  input.focus();
  const lastWordDiv = output.lastChild.textContent;
  const lastWord = lastWordDiv.trim();
  console.log(lastWord);
    if (lastWord === stringListGuess[stringListGuess.length - 1]){
      indexObject++;
      indexWord = 0;
    }
  } else {
    output.innerHTML += "END";
    document.getElementById("guessButton").removeAttribute("onclick");
  }
}

input.addEventListener("paste", function(event) {
  event.preventDefault();
});


input.addEventListener("input", function(event) {

  

  ///goToOffset(sendOffset);

  


    //var inputValue = input.value;
    
    //console.log("c parti2");
    let string;
  try {
   string = clean[indexObject].text;//'lets go to a place'
  } catch(e){console.log(e)}
  if (string != null) {
    var stringList = string.split(" "); // ["lets", "go", "to", "a", "place"]
    //console.log(p.split());
    currentWord = stringList[indexWord];
    var letter = currentWord[indexLetter]; //'l'
    //console.log(z);
    var inputData = event.data; //'f'

    if ( clean[indexObject].text.length + clean[indexObject + 1].text.length <= 14) {
      indexEndOffset++;
    }
    
    //console.log(t);
    if (inputData === letter) {
        indexLetter++;
        
    } else {
        setTimeout(() => {input.value = input.value.slice(0, indexLetter) + input.value.slice(indexLetter + 2)}, 100); 
        
    }

   if (input.value === currentWord) {

    output.innerHTML += "<a href = https://translate.google.com/?sl=en&tl=fr&text=" + currentWord + "&op=translate target=_blank>" + currentWord + ' ';
    currentWord = '';
    indexWord++;
    indexLetter = 0;
    input.value = '';
    score =  score + 1;
    scoreDiv.innerHTML = score;
   }
   const lastWordDiv = output.lastChild.textContent;
   const lastWord = lastWordDiv.trim();
    if (lastWord === stringList[stringList.length - 1]){
      indexObject++;
      indexWord = 0;
    }

  } else {
    output.innerHTML += "END";
    
  }
    });
    

///rule display : 

/*     // récupérer la variable de stockage local
const rulesDisplayed = localStorage.getItem('rulesDisplayed');

// si les règles n'ont pas encore été affichées, afficher la div de règles
if (!rulesDisplayed) {
  const rulesDiv = document.getElementById('rules');
  rulesDiv.style.display = 'block';

  // enregistrer la variable de stockage local pour indiquer que les règles ont été affichées
  localStorage.setItem('rulesDisplayed', true);
} */


