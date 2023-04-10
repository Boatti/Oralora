document.addEventListener("DOMContentLoaded", function () {
    setUpLang();
  });

function setUpLang() {
    const currentLang = getCookie('i18next');
    const getUserLang = getLang();
    
    if (currentLang == 'en') {
      var currentFlag = document.getElementById('currentFlag');
      var otherFlag = document.getElementById('otherFlag');
      otherFlag.innerHTML = "<a href='/fr'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/FR.png' alt='FR Flag'></a>";
      currentFlag.innerHTML += "<a href='/en'><img id='imgCurrentFlag' class='imgFlag' src='/assets/Img/US.png' alt='US Flag'></a>";
      
    } else if (currentLang == 'fr'){
        var currentFlag = document.getElementById('currentFlag');
        var otherFlag = document.getElementById('otherFlag');
        otherFlag.innerHTML = "<a href='/en'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/US.png' alt='US Flag'></a>";
        currentFlag.innerHTML += "<a href='/fr'><img id='imgCurrentFlag' class='imgFlag' src='/assets/Img/FR.png' alt='FR Flag'></a>";
    } else if ((getUserLang.includes('fr')) && (!currentLang)){
        var currentFlag = document.getElementById('currentFlag');
        var otherFlag = document.getElementById('otherFlag');
        otherFlag.innerHTML = "<a href='/en'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/US.png' alt='US Flag'></a>";
        currentFlag.innerHTML += "<a href='/fr'><img id='imgCurrentFlag' class='imgFlag' src='/assets/Img/FR.png' alt='FR Flag'></a>";
    } else if ((getUserLang.includes('en')) && (!currentLang)){
        var currentFlag = document.getElementById('currentFlag');
        var otherFlag = document.getElementById('otherFlag');
        otherFlag.innerHTML = "<a href='/fr'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/FR.png' alt='FR Flag'></a>";
        currentFlag.innerHTML += "<a href='/en'><img id='imgCurrentFlag' class='imgFlag' src='/assets/Img/US.png' alt='US Flag'></a>";
        
      }
  }

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function getLang() {
    let userLanguage = navigator.language;
    return userLanguage;
  }