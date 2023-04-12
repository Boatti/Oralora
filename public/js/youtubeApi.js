
function loadAPIPls(getIDYTB) {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        loadYouTubeAPI();
        window.onYouTubeIframeAPIReady = function () {
        createYouTubePlayer(getIDYTB);
        }
    } else {
        createYouTubePlayer(getIDYTB);
    }
}

function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function createYouTubePlayer(id) {

    var iframePlayer = document.querySelector("iframe#player");
    if (iframePlayer == null) {
        // create the YT.Player object if it doesn't exist
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: id,
            playerVars: {'loop': 1, 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'enablejsapi': 1, 'cc_load_policy': 0, 'cc_lang_pref': 'en', 'iv_load_policy': 3, 'modestbranding': 1 },
            events: {
                'onReady': function (event) {
                    onPlayerReady(player, event, id);
                },
                //'onStateChange': function(event) {onPlayerStateChange(event,id);}
            }
        });
    } else {
    indexWord = 0;
    indexObject = 0;
    startOffset = 0;
    endOffset = 0;
    indexLetter = 0;
    score = 0;
    cara = "";
    input.value = "";
    output.innerHTML = "";
    
    input.disabled = false;
    const guessButton = document.getElementById("guessButton");
    const repeatButton = document.getElementById("repeat");
    const replayButton = document.getElementById("replay");
    const playButton = document.getElementById("play");

    if (!guessButton.onclick) {
    guessButton.onclick = guessButton;
    }

    if (!repeatButton.onclick) {
    repeatButton.onclick = repeatAWord;
    repeatButton.removeAttribute("onclick");
    }

    if (!replayButton.onclick) {
    replayButton.onclick = replayVideo;
    }

    if (!playButton.onclick) {
    playButton.onclick = toggleVideo;
    }
 
    onPlayerReady(player, null, id);
      
   }
}

function onPlayerReady(player, event, id) { // quand la video est lancé la premiere fois, load avec le start de debut et de fin

    [startO, endO] = getOffset();
    var start =  millisToSeconds(clean[startO].offset);
    var end = millisToSeconds(clean[endO].offset);

    if (event) {
    event.target.loadVideoById({
      videoId: id,
      startSeconds: start,
      endSeconds: end
    });
    event.target.setVolume(60);
    event.target.playVideo();

} else {
    player.loadVideoById({
        videoId: id,
        startSeconds: start,
        endSeconds: end
      });
      player.setVolume(60);
      player.playVideo();
}

    player.addEventListener('onStateChange', function(state) {
        if (state.data == YT.PlayerState.ENDED) {
            var start2 =  millisToSeconds(clean[startOffset].offset);
            if (endOffset != null) {
                var end2 = millisToSeconds(clean[endOffset].offset);
            } else {
                end2 = endOffset;
            }
            console.log("par pitié " + start2);
                //player.seekTo(start, false);
                //setTimeout(() => {player.playVideo()}, 1000);
                player.loadVideoById({
                    videoId: id,
                    startSeconds: start2,
                    endSeconds: end2
                });
                player.pauseVideo();
                setTimeout(() => {player.playVideo()}, 1500);
            } 
        }
    );

}

var count = 0;
var endOffset = 0;
var startOffset;

function getOffset() {
    startOffset = endOffset; 

    /* if (clean[startOffset + 1] == undefined) {
        endOffset = null;
        return [startOffset, endOffset]
    }
     */
    if (clean[startOffset].text.split(" ").length > 15) {
       endOffset = endOffset + 1;
        return [startOffset, endOffset];
        } 
    
    for (i = endOffset; i < (clean.length); i++) {
        console.log(clean.length);
        console.log("i vaut : ", i);
        count = count + clean[i].text.split(" ").length;
        console.log('count is : ', count);
            if(count > 15) {
                count = 0;
                endOffset = i;
                return [startOffset, endOffset];
            }
        if (i == clean.length - 1) {
            endOffset = null;
            return [startOffset, endOffset]
        } 
            
        
    }
}

function changeAll(id, startOff, endOff) {
    var start =  millisToSeconds(clean[startOff].offset);
    if (endOff != null) {
    var end = millisToSeconds(clean[endOff].offset);
   } else {
    end = endOff;
    console.log("essaie " + end);
   }
    console.log(start,end);
    console.log(start,end);
    player.loadVideoById({
        videoId: id,
        startSeconds: start,
        endSeconds: end
    });
    setTimeout(() => {player.playVideo()}, 100);
}

function playVideo() {
    player.playVideo();
}

function pauseVideo2() {
    player.pauseVideo();
}

function stopVideo() {
    player.stopVideo();
}

function repeatAWord(){
    var currentTime = player.getCurrentTime();
    var add = parseFloat(millisToSeconds(clean[startOffset].offset));
    var img = document.getElementById("play");
    console.log(add);
    console.log("current time is : " + currentTime + " et start offset : " + add);
    if (currentTime <= add + 1.5) {
        player.seekTo(add);
    } else {
         player.seekTo(currentTime - 1.5);
    }
    if (player.getPlayerState() == 2) {
        img.setAttribute("src", "/assets/Img/playButton2.png");
    }
    playVideo();
    
}

function replayVideo() {
    var offset = clean[startOffset].offset;
    var rplay = millisToSeconds(offset);
    var img = document.getElementById("play");
    player.seekTo(rplay);
    if (player.getPlayerState() == 2) {
        img.setAttribute("src", "/assets/Img/playButton2.png");
    }
    playVideo();

}



function toggleVideo() {
    var img = document.getElementById("play");
    if (player.getPlayerState() == 1) {
        pauseVideo2();
        img.setAttribute("src", "/assets/Img/pauseButton2.png");
    } else {
        playVideo();
        img.setAttribute("src", "/assets/Img/playButton2.png");
    }
    
  }


/* function onPlayerStateChange(event) {
  
} */