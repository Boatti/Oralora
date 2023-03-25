function loadAPIPls(getIDYTB, startBy) {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        loadYouTubeAPI();
        window.onYouTubeIframeAPIReady = function () {
        createYouTubePlayer(getIDYTB, startBy);
        }
    } else {
        createYouTubePlayer(getIDYTB, startBy);
    }
}

function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function createYouTubePlayer(id, startBy) {

    var iframePlayer = document.querySelector("iframe#player");
    if (iframePlayer == null) {
        // create the YT.Player object if it doesn't exist
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: id,
            playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'enablejsapi': 1, 'cc_load_policy': 0, 'cc_lang_pref': 'en', 'iv_load_policy': 3, 'modestbranding': 1 },
            events: {
                'onReady': function (event) {
                    onPlayerReady(event, startBy);
                },
                'onStateChange': onPlayerStateChange
                
            }
        });
    } else {
        loadNewIframe(id);
    }
}

function loadNewIframe(id) {
    player.loadVideoById(id);
}

function onPlayerReady(event, startBy) {
    var ms = millisToSeconds(startBy);
    setTimeout(function () { event.target.seekTo(ms, true); }, 1000);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      // Lecture en cours
      var duration = player.getDuration();
      //console.log("duration is " + duration);
      var currentTime = player.getCurrentTime();
      //console.log("current time is " + currentTime);
      var checkDuration = setInterval(function() {
      var startOff = getStartOffset();
      var endOff = getEndOffset();
      var startOffset = millisToSeconds(startOff);
      //console.log("staroffset is " + startOffset);
      var endOffset = millisToSeconds(endOff);
      //console.log("endoffset is " + endOffset);
  
      // Vérifier la durée de la vidéo à chaque ms
      
        currentTime2 = player.getCurrentTime();
        
        if (currentTime2 > endOffset) {
            player.seekTo(startOffset, false);
            setTimeout(() => {player.seekTo(startOffset, true);}, 1000);
        } 
      }, 10);
    } else if (event.data == YT.PlayerState.PAUSED) {
       
      // Lecture en pause
    } else if (event.data == YT.PlayerState.ENDED) {
      // Lecture terminée
    }
  }

function getStartOffset() {

    try {
        const lastWoord = output.lastChild.textContent;
        const lastWordo = lastWoord.trim();
        if (lastWordo === stringList[stringList.length - 1]){
            
          var offset = clean[indexObject].offset;
        }
        }catch(e){ offset = clean[indexObject].offset};
    //console.log("start offset = " + offset);
    return offset;
}

function getEndOffset() {

    
        
    offset = clean[indexObject + 2].offset;
    //console.log("end offset = " + offset);
    return offset;
}


function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function replayVideo() {
    player.pauseVideo();
}

function stopVideo() {
    player.stopVideo();
}



/* function onPlayerStateChange(event) {
  
} */