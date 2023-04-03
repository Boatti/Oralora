document.addEventListener("DOMContentLoaded", function () {
  playerCommands();
  scrollSnap();
});

const globalSection = document.querySelector('#globalSection');
globalSection.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (globalSection.scrollTop > 315) {
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

function scrollSnap() {
  const isMac = getNavigator();
  const globalSection = document.getElementById('globalSection')
  isMac ? globalSection.style.scrollSnapType = "y mandatory" : globalSection.style.scrollSnapType = "none";
}

function playerCommands() {
  const shortcutElements = document.getElementsByClassName("shortcut");
  const isMac = getNavigator();
  shortcutElements[0].innerHTML = isMac ? "Ctrl + A" : "CTRL + A";
  shortcutElements[1].innerHTML = isMac ? "Ctrl + Z" : "CTRL + Z";
  shortcutElements[2].innerHTML = isMac ? "Ctrl + E" : "CTRL + E";
}

function setIframeSource() {

  let cutURL = inputUrl.value;
  console.log(cutURL);
  let onlyYtId;
  let errorURL = document.getElementById("invalidURL");

  if (cutURL.startsWith("https://www.youtube.com/watch?v=") || cutURL.includes("youtube.com")) {
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

/* function cleanTranscript(transcript) {

  // Supprimer les objets qui ont pour seul texte [Music] ou [Applause]
  const filteredArr = transcript.filter(obj => !/^(\[Music\]|\[Applause\])$/.test(obj.text));

  // Enlever tout ce qui n'est pas une lettre de l'alphabet, remplacer les '\n' par des espaces, enlever les "whooah argh aaaah aaah whoa huh" si ce mot est seul dans le text on supprime tout l'objet mais si il est avec du text a coté on supprime que le mot
  const modifiedArr = filteredArr.map(obj => {*/
    //let newText = obj.text.replace(/[^a-z \n]/gi, '').replace(/\n/g, ' ').replace(/\bwhooah\s*|\bargh\s*|\baaaah\s*|\baaah\s*|\bwhoa\s*|\bhuh\s*/gi, '');
   /* if (newText.trim() === '') {
      return null; // supprimer l'objet si le texte est vide après avoir enlevé les mots
    }
    return {
      ...obj,
      text: newText.trim().toLowerCase()
    };
  }).filter(obj => obj !== null); // filtrer les objets null

   Si le dernier objet a pour texte "you", le supprimer
  if (modifiedArr[modifiedArr.length - 1].text === 'you') {
    modifiedArr.pop();
  }
  return modifiedArr;
} */

function cleanTranscript(transcript) {

  // Supprimer les objets qui ont pour seul texte [Music] ou [Applause]

  // Enlever tout ce qui n'est pas une lettre de l'alphabet, remplacer les '\n' par des espaces, enlever les "whooah argh aaaah aaah whoa huh" si ce mot est seul dans le text on supprime tout l'objet mais si il est avec du text a coté on supprime que le mot
  const modifiedArr = transcript.map(obj => {
    let newText = obj.text
    .replace(/\[\S+?\]/g, '') // supprimer les mots entre []
    .replace(/\*[^*]+\*/g, '')// supprimer les mots entre *
    .replace(/\([^)]*\)/g, '')// supprimer les mots entre ()
    
    .replace(/[^a-z0-9-àâäéèêëîïôöùûüçáíóúñü \n']/gi, '')
 // enlever tout ce qui n'est pas une lettre ou un chiffre
    .replace(/\n|-/g, ' ')
    .replace(/\bwhooah\s*|\bargh\s*|\baaaah\s*|\baaah\s*|\bwhoa\s*|\bhuh\s*/gi, '')
    .replace(/\s+/g, ' ');
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
  document.getElementById('totalWords').innerHTML = totalWords;

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
var getIDYTB;
const output = document.getElementById("foundArea");
const input = document.getElementById("guessArea");
const scoreDiv = document.getElementById('currentScore');
const inputUrl = document.getElementById("urlInput");

////////////INPUT URL
inputUrl.addEventListener("keydown", async function (event) {
  if (event.key === "Enter" || event.key === 'NumpadEnter') {
    //event.preventDefault();
    let loading = 'loading';
    let loadingSpinner = 'loadingSpinner';
    let spinner = document.getElementById('loading');
    let videoSection = document.getElementById("videoSection");
    let guessSection = document.getElementById("guessSection");
    spinner.id = loadingSpinner;
    getIDYTB = setIframeSource();
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
        .catch(() => {
          
          throw new Error('No subtitles are available for this video or it is intended for kids.');
        });

    } catch (error) {
      document.getElementById("invalidURL").innerHTML = error.message;
      spinner.id = loading;
      inputUrl.value = "";
      return;
    }
    videoSection.style.display = "flex";
    guessSection.style.display = "flex";
    spinner.id = loading;
    inputUrl.value = "";
    clean = cleanTranscript(getHTTPTranscript);
    clean = JSON.stringify(clean);
    clean = JSON.parse(clean);
    //var startBy = clean[0].offset;
    console.log(getHTTPTranscript);
    loadAPIPls(getIDYTB);
    //toDoOnStart(startBy);
    console.log(clean);
    countScore(clean);
    inputUrl.blur(); //Unfocus the input
    const scrollTo = document.querySelector("#guessSection");
    scrollTo.scrollIntoView();


    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "a") {
        repeatAWord();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "z") {
        replayVideo();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "e") {
       ; // clear the setInterval
        toggleVideo();
      }

    });
    input.focus();
    //var iframe = document.querySelector("iframe#player");
  }
}, { passive: true });
////////////INPUT URL

getLang();

// const myVariable = new Proxy({ value: false }, {

//const observer = new MutationObserver(function(mutationsList) 

let indexObject = 0;
let indexWord = 0;
let indexLetter = 0;
let score = 0;
let indexStartOffset = 0;
let indexEndOffset = 0;
let currentWord;

/////////// PASTE
input.addEventListener("paste", function (event) {
  event.preventDefault();
});

input.addEventListener('keydown', function(event) {
  if (event.key === "Backspace") {
    event.preventDefault();
  }
});
/////////// PASTE
let string;
let stringList;

////////////OUTPUT
let selectedSpans = [];
output.addEventListener("click", function(event) {
  if (event.target.tagName === "SPAN" ) {
    event.target.style.background = "#12a5d9";
    event.target.style.borderRadius = "20px";
    selectedSpans.push(event.target);
    if (selectedSpans.length === 2) {
      selectedSpans.sort(function(a, b) {
        return Array.prototype.indexOf.call(a.parentNode.childNodes, a) - Array.prototype.indexOf.call(b.parentNode.childNodes, b);
      });
      let startIndex = Array.prototype.indexOf.call(selectedSpans[0].parentNode.childNodes, selectedSpans[0]);
      let endIndex = Array.prototype.indexOf.call(selectedSpans[1].parentNode.childNodes, selectedSpans[1]);
      let phrase = Array.prototype.slice.call(selectedSpans[0].parentNode.childNodes, startIndex, endIndex + 1)
        .map(function(span) {
          return span.textContent;
        })
        .join(" ");
      //let phraseAvecPourcentage = phrase.replace(/ /g, '%20');
      //console.log("Selected phrase: " + phrase);
      phrase = phrase.replace(/   /g, ' ');
      setTimeout(() => {window.open("https://www.deepl.com/translator#en/fr/" + phrase); }, 50) 
      //selectedSpans[0].parentNode.querySelectorAll("span").forEach(function(span) {
        selectedSpans.forEach(function(span) {
        setTimeout(() => {span.style.background = ""}, 50);
        setTimeout(() => {span.style.borderRadius = ""}, 50);
        
      });
      selectedSpans = [];
    }
  }
});
////////////OUTPUT

///////////BUTTON
function guessButton() {
  let stringGuess;
  try {
    stringGuess = clean[indexObject].text;
  } catch (e) { console.log(e) }
    let stringListGuess = stringGuess.split(" ");
    console.log(stringListGuess);
    currentWord = stringListGuess[indexWord];
    cara = cara + " " + currentWord;
    cara = cara.trim();
    if (indexWord == 0 && indexObject == 0) {
      currentWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
    } 
    output.innerHTML += "<span class='guessWords'>" + currentWord + "</span>" + ' ';
    
    if (cara === clean[clean.length - 1].text) {
      output.innerHTML += "<div id='strongEnd'>END</div>";
      input.disabled = true;
      stopVideo();
      document.getElementById("guessButton").removeAttribute("onclick");
    }
    if (endOffset != null || endForLoad != null) {
      var p = clean[endOffset - 1].text;
    } else {
      var p = clean[startOffset].text;
    }
    if (cara === p) {
      console.log("c gagné button");
      var [startForLoad, endForLoad] = getOffset();
      console.log("ddd " + startForLoad, endForLoad);
      changeAll(getIDYTB, startForLoad, endForLoad);
    }
    if (cara === stringGuess){
      cara = "";
    }

    indexWord++;
    indexLetter = 0;
    input.value = '';
    input.focus();
    try {
      const lastWordDiv = output.lastElementChild.textContent;
      //console.log('A' + lastWordDiv);
      const lastWord = lastWordDiv.trim();
      console.log(lastWord);
      if (lastWord === stringListGuess[stringListGuess.length - 1]) {
        indexObject++;
        indexWord = 0;
      }
    } catch (e) { console.log(e) };

  
  output.scrollTop = output.scrollHeight;
}
///////////BUTTON

//////////////////INPUT
var cara = "";
input.addEventListener("input", function (event) {
  input.placeholder = '';
  try {
    string = clean[indexObject].text;//'lets go to a place'
  } catch (e) { console.log(e) };
    stringList = string.split(" "); // ["lets", "go", "to", "a", "place"]
    currentWord = stringList[indexWord];
    var letter = currentWord[indexLetter]; //'l'
    var inputData = event.data; //'f'

    if (inputData === letter) {
      indexLetter++;

    } else {
      setTimeout(() => { input.value = input.value.slice(0, indexLetter) + input.value.slice(indexLetter + 3) }, 1);

    }
    if (input.value === currentWord) {
      setTimeout(() => {input.value = '';}, 30);

      cara = cara + " " + currentWord;
      cara = cara.trim();

      if (indexWord == 0 && indexObject == 0) {
        currentWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
      } 
      output.innerHTML += "<span>" + currentWord + "</span>" + ' ';
      
      
      score = score + 1;
      setTimeout(() => {scoreDiv.innerHTML = score}, 100) 
      indexWord++;
      indexLetter = 0;
      currentWord = '';
    }
    if (cara === clean[clean.length - 1].text) {
      output.innerHTML += "<div id='strongEnd'>END</div>";
      stopVideo();
      input.disabled = true;
      document.getElementById("guessButton").removeAttribute("onclick");
    }
    try {
      const lastWordDiv = output.lastElementChild.textContent;
      console.log("voici cara " + cara);
      if (endOffset != null) {
        var p = clean[startOffset].text;
      } else {
      var p = clean[endOffset - 1].text;
      }
      if (cara === p) {
        console.log("c gagné");
        var [startForLoad, endForLoad] = getOffset();
        console.log("mmm " + startForLoad, endForLoad);
        changeAll(getIDYTB, startForLoad, endForLoad);
      }
      if (cara === string) {
        cara = "";
        indexObject++;
        indexWord = 0;
      }
    } catch (e) { console.log(e) };
  
  output.scrollTop = output.scrollHeight;
});
///////////////////INPUT

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


