document.addEventListener("DOMContentLoaded", function () {
  playerCommands();
  scrollSnap();
});

try {
const globalSection = document.querySelector('#globalSection');

globalSection.addEventListener("scroll", scrollFunction);
} catch {}

function scrollFunction() {
  var getDivLang = document.getElementById('divLang');
  if (globalSection.scrollTop > 315) {
    getDivLang.style.background = '#05031B';
    document.getElementById('logo').style.opacity = 1;
    document.getElementById('header').style.backgroundColor = '#05031B';


  } else {
    getDivLang.style.background= '#cacaca';
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
  shortcutElements[0].innerHTML = isMac ? "(CTRL + L)" : "(CTRL + L)";
  shortcutElements[1].innerHTML = isMac ? "(CTRL + M)" : "(CTRL + M)";
  shortcutElements[2].innerHTML = isMac ? "(Space)" : "(Space)";
}

var getIDYTB;

//window.onload = function() {
  if (sessionStorage.getItem("idYtb")) {
    let loadingDiv = 'divLoading';
    let divLoading = document.getElementById('divNotLoading');
    let notLoadingDiv = 'divNotLoading';
    let loading0 = 'loading0';
    let loadingSpinner = 'loadingSpinner0';
    let spinner = document.getElementById('loading0');
    divLoading.id = loadingDiv;
    spinner.id = loadingSpinner;
    getIDYTB = sessionStorage.getItem("idYtb");
    vidFromChall(getIDYTB, loading0, notLoadingDiv, spinner);
    sessionStorage.removeItem("idYtb");
  }
//}

async function vidFromChall(id, loading0, notLoadingDiv, spinner) {
  //console.log("end over finish",id);
  let videoSection = document.getElementById("videoSection");
  let guessSection = document.getElementById("guessSection");
  try {
    var getHTTPTranscript = await fetch("/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: id,
    });
      var transcripto = await getHTTPTranscript.json();

  } catch (error) {
    console.log(error);
  }
  videoSection.style.display = "flex";
  guessSection.style.display = "flex";

  clean = await cleanTranscript(transcripto);
  clean = JSON.stringify(clean);
  clean = JSON.parse(clean);

  await loadAPIPls(id);
  countScore(clean);
  divLoading.id = notLoadingDiv;
  spinner.id = loading0;
  const scrollTo = document.querySelector("#guessSection");
  scrollTo.scrollIntoView();

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "l") {
      event.preventDefault();
      repeatAWord();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "m") {
      event.preventDefault();
      replayVideo();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      event.preventDefault();
      toggleVideo();
    }

  });
  input.focus();
}

function setIframeSource() {

  let cutURL = inputUrl.value;
  //console.log(cutURL);
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
    errorURL.innerHTML = 'Please enter a valid YouTube URL';
    return ('URL Invalid');
  }
  if (onlyYtId.length > 11) {
    errorURL.innerHTML = 'Please enter a valid YouTube URL';
    return ('URL Invalid');
  }
  return onlyYtId;
}

 function displayRules() {
  document.getElementById('divInformations').style.display = 'block';
  var cross = document.getElementById('cross');
  cross.addEventListener('click', function() {
    document.getElementById('divInformations').style.display = 'none';
  }); 
}


function countScore(cleanTranscript) {
  var totalWords = cleanTranscript.reduce(function (acc, val) {
    return acc + val.text.split(' ').length;
  }, 0);

  scoreDiv.innerHTML = 0;
  document.getElementById('totalWords').innerHTML = totalWords;
  //console.log(totalWords);
}

function scrollToInput() {
  const scrollTo = document.querySelector("#inputSection");
  scrollTo.scrollIntoView();
}

function millisToSeconds(ms) {
  return (ms / 1000).toFixed(3);
}

//let obj = new oui();

//addEventListenner
let clean;
const output = document.getElementById("foundArea");
const input = document.getElementById("guessArea");
const scoreDiv = document.getElementById('currentScore');
const inputUrl = document.getElementById("urlInput");

////////////INPUT URL

inputUrl.addEventListener("keydown", async function (mouch) {
  if (mouch.key == "Enter" || mouch.key == 'NumpadEnter') {
    //event.preventDefault();
    let loading = 'loading';
    let loadingSpinner = 'loadingSpinner';
    let spinner = document.getElementById('loading');
    let videoSection = document.getElementById("videoSection");
    let guessSection = document.getElementById("guessSection");
    spinner.id = loadingSpinner;
    getIDYTB2 = setIframeSource();
    //console.log(getIDYTB2);
    if (getIDYTB2 === "URL Invalid") {
      inputUrl.value = "";
      spinner.id = loading;
      
    } else {
      getIDYTB = getIDYTB2;
      try {
      var getHTTPTranscript = await fetch("/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: getIDYTB,
      });/* .then((response) => response.json())
        //.then((transcript) => transcript)
        .catch(() => {
          
          throw new Error('No subtitles are available for this video or it is intended for kids.');
        }); */
        var transcripto = await getHTTPTranscript.json();

    } catch (error) {
      document.getElementById("invalidURL").innerHTML = 'No subtitles are available for this video or it is intended for kids.';
      spinner.id = loading;
      inputUrl.value = "";
      return;
    }
    videoSection.style.display = "flex";
    guessSection.style.display = "flex";
    spinner.id = loading;
    inputUrl.value = "";
    //getHTTPTranscript = JSON.stringify(getHTTPTranscript);
    //getHTTPTranscript = `'${getHTTPTranscript}'`;
    //console.log(transcripto[0].text); 
    //console.log(transcripto[1].duration);

    //console.log("étape 1 ", transcripto)
    //getHTTPTranscript = JSON.parse(getHTTPTranscript);
    clean = cleanTranscript(transcripto);
    //console.log(clean[0].text); 
    clean = JSON.stringify(clean);
    clean = JSON.parse(clean);
    //var startBy = clean[0].offset;
    //console.log(getHTTPTranscript);
    loadAPIPls(getIDYTB);
    //toDoOnStart(startBy);
    //console.log("official ", clean);
    countScore(clean);
    inputUrl.blur(); //Unfocus the input
    const scrollTo = document.querySelector("#guessSection");
    scrollTo.scrollIntoView();


    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "l") {
        event.preventDefault();
        repeatAWord();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "m") {
        event.preventDefault();
        replayVideo();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        event.preventDefault();
        toggleVideo();
      }

    });
    input.focus();
    //var iframe = document.querySelector("iframe#player");
  } }
})
////////////INPUT URL

function cleanTranscript(transcriptu) {

   // Enlever tout ce qui n'est pas une lettre de l'alphabet, remplacer les '\n' par des espaces, enlever les "whooah argh aaaah aaah whoa huh" si ce mot est seul dans le text on supprime tout l'objet mais si il est avec du text a coté on supprime que le mot
   const modifiedArr = transcriptu.map(obj => {
     let newText = obj.text ? obj.text
     .replace(/\[[^\]]+\]/g, '') // supprimer les mots entre []
     .replace(/\*[^*]+\*/g, '') // supprimer les mots entre *
     .replace(/\([^)]*\)/g, '') // supprimer les mots entre ()
     .replace(/\n|-/g, ' ') // remplacer les \n par des espaces
     .replace(/\./g, ' ') //remplacer les points par des espaces
     .replace(/\s+/g, ' ') // remplacer les multiples espaces par des espaces
     .replace(/[^a-z0-9-àâäéèêëîïôöùûüçáíóúñü \n']/gi, '') // enlever tout ce qui n'est pas une lettre ou un chiffre ou un accent
     .replace(/\bwhooah\s*|\bargh\s*|\baaaah\s*|\baaah\s*|\bwhoa\s*|\bhuh\s*/gi, '')
     .replace(/\s+/g, ' ') : ''; // remplacer les multiples espaces par des espaces
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



// const myVariable = new Proxy({ value: false }, {

//const observer = new MutationObserver(function(mutationsList) 

/////////// PASTE
input.addEventListener("paste", function (event) {
  event.preventDefault();
});

input.addEventListener('keydown', function(event) {
  if (event.key === "Backspace" || event.code === "Space") {
    event.preventDefault();
  }
});
/////////// PASTE

////////////OUTPUT
let selectedSpans = [];
output.addEventListener("click", function(event) {
  if (event.target.tagName === "SPAN" ) {
    event.target.style.background = "#12a5d9";
    event.target.style.borderRadius = "8px";
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
    stringGuess = clean[indexObject].text; // 'Let's go to a place'
  } catch (e) { console.log(e) }
    let stringListGuess = stringGuess.split(" ");
    //console.log(stringListGuess);
    currentWord = stringListGuess[indexWord];
    cara = cara + " " + currentWord;
    cara = cara.trim();
    if (indexWord == 0 && indexObject == 0) {
      currentWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
    } 
    output.innerHTML += "<span class='guessWords'>" + currentWord + "</span>" + ' ';

//Le END de la fin
    if (cara === clean[clean.length - 1].text && (endForLoad === null || endOffset === null)) { 
      output.innerHTML += "<div id='strongEnd'>END</div>";
      input.disabled = true;
      stopVideo();
      document.getElementById("guessButton").removeAttribute("onclick");
      document.getElementById("repeat").removeAttribute("onclick");
      document.getElementById("replay").removeAttribute("onclick");
      document.getElementById("play").removeAttribute("onclick");
    }

indexWord++;
    if (cara === stringGuess) {
      cara = "";
      indexObject++;
      indexWord = 0;
      countLoopInput++;
    } 
    
    //console.log('chat', countLoopInput, ' ', countLoop);
    if (countLoopInput == countLoop) {
      countLoopInput = 0;
      //console.log("c gagné button");
      var [startForLoad, endForLoad] = getOffset();
      //console.log("mmm " + startForLoad, endForLoad);
      changeAll(getIDYTB, startForLoad, endForLoad);
    }
    indexLetter = 0;
    input.value = '';
    input.focus();
   
  output.scrollTop = output.scrollHeight;
}
///////////BUTTON END

let indexObject = 0;
let indexWord = 0;
let indexLetter = 0;
let score = 0;
let currentWord;
var cara = "";
let string;
let stringList;
let countLoopInput = 0;

//////////////////INPUT
input.addEventListener("input", function (event) {
  input.placeholder = '';
  try {
    string = clean[indexObject].text;//'lets go to a place'
  } catch (e) { console.log(e) };
    stringList = string.split(" "); // ["lets", "go", "to", "a", "place"]
    currentWord = stringList[indexWord];
    //var letter = currentWord[indexLetter]; //'l'
    //var inputData = event.data; //'f'
    const value = event.target.value;
    setTimeout(() => {
      // Vérification caractère par caractère
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== currentWord[i]) {
          // Suppression de la saisie à partir de la position incorrecte
          event.target.value = value.substring(0, i);
          break; // Sortie de la boucle
        }
      }
    }, 50);

    if (input.value === currentWord) {
      setTimeout(() => {input.value = '';}, 30);

      cara = cara + " " + currentWord;
      cara = cara.trim();

      //Met le premier mot avec une majuscule
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
    if (cara === clean[clean.length - 1].text && (endForLoad === null || endOffset === null)) {
      output.innerHTML += "<div id='strongEnd'>END</div>";
      stopVideo();
      input.disabled = true;
      document.getElementById("guessButton").removeAttribute("onclick");
      document.getElementById("repeat").removeAttribute("onclick");
      document.getElementById("replay").removeAttribute("onclick");
      document.getElementById("play").removeAttribute("onclick");
      
    }
    try {
      //console.log("voici cara " + cara);

      if (cara === string) {
        cara = "";
        indexObject++;
        indexWord = 0;
        countLoopInput++;
      } 
      if (countLoopInput == countLoop) {
        countLoopInput = 0;
        //console.log("c gagné");
        var [startForLoad, endForLoad] = getOffset();
        //console.log("mmm " + startForLoad, endForLoad);
        changeAll(getIDYTB, startForLoad, endForLoad);
      }
      

      //console.log('chat', countLoopInput, ' ', countLoop);

    } catch (e) { console.log(e) };
  
  output.scrollTop = output.scrollHeight;
});
///////////////////INPUT END

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


