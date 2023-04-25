document.addEventListener("DOMContentLoaded", function () {
    setUpLang();
  });

  function setUpLang() {
    const currentLang = getCookie('i18next');
    const getUserLang = getLang();
    const currentFlag = document.getElementById('currentFlag');
    const otherFlag = document.getElementById('otherFlag');
    
    const frLink = "<a href='/fr'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/country/FR.png' alt='FR Flag'></a>";
    const enLink = "<a href='/en'><img id='imgOtherFlag' class='imgFlag' src='/assets/Img/country/US.png' alt='US Flag'></a>";
  
    if (currentLang == 'en') {
      otherFlag.innerHTML = frLink;
      currentFlag.innerHTML += enLink;
    } else if (currentLang == 'fr') {
      otherFlag.innerHTML = enLink;
      currentFlag.innerHTML += frLink;
    } else if ((getUserLang.includes('fr')) && (!currentLang)) {
      otherFlag.innerHTML = enLink;
      currentFlag.innerHTML += frLink;
    } else if ((getUserLang.includes('en')) && (!currentLang)) {
      otherFlag.innerHTML = frLink;
      currentFlag.innerHTML += enLink;
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