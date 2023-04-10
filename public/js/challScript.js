
function onChangeFilter() {
    var x = document.getElementById("selectFilter");
    
    //console.log(x.value);
    const category = window.location.pathname.split('/').pop();
    //console.log(category);
    fetch(`/challenge/${category}?filter=${x.value}`)
    .then(() => location.reload());
    
    //const filter = getCookie("filter");
    //if (filter) {
     //   select.value = filter;
     // }
}

function predefTranscript() {

    appelAutrefonction();

       /*  const shortcutElements = document.getElementsByClassName("shortcut");
        const isMac = getNavigator();
        shortcutElements[0].innerHTML = isMac ? "Ctrl + L" : "CTRL + L";
        shortcutElements[1].innerHTML = isMac ? "Ctrl + M" : "CTRL + M";
        shortcutElements[2].innerHTML = isMac ? "Space" : "Space";
      }
      
      async function aRedirect(id) {
        window.location.href = "/";
        //window.open("/", "_blank");
        let videoSection = document.getElementById("videoSection");
        let guessSection = document.getElementById("guessSection");
        
        console.log(id);
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
      
        clean = cleanTranscript(transcripto);
        clean = JSON.stringify(clean);
        clean = JSON.parse(clean);
      
        loadAPIPls(id);
        countScore(clean);
      
        const scrollTo = document.querySelector("#videoSection");
        scrollTo.scrollIntoView(); */

}