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
            playerVars: {'loop': 1, 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'enablejsapi': 1, 'cc_load_policy': 0, 'cc_lang_pref': 'en', 'iv_load_policy': 3, 'modestbranding': 1 },
            events: {
                'onReady': function (event) {
                    onPlayerReady(event, id);//, startBy);
                },
                //'onStateChange': function(event) {onPlayerStateChange(event,id);}
            }
        });
    } else {
        loadNewIframe(id);
    }
}

function loadNewIframe(id) {
    input.value = "";
    output.innerHTML = "";

    indexObject = 0;
    startOffset = 0;
    endOffset = 0;

    [startOf, endOf] = getOffset();
    var start =  millisToSeconds(clean[startOf].offset);
    var end = millisToSeconds(clean[endOf].offset);
   
    console.log(start,end);
    
    player.loadVideoById({
        videoId: id,
        startSeconds: startOf,
        endSeconds: endOf
      });
}

function onPlayerReady(event, id) { // quand la video est lancé la premiere fois, load avec le start de debut et de fin

    [startO, endO] = getOffset();
    var start =  millisToSeconds(clean[startO].offset);
    var end = millisToSeconds(clean[endO].offset);
   
    console.log(start,end);

    console.log("tamere" + startO, endO);

    event.target.loadVideoById({
      videoId: id,
      startSeconds: start,
      endSeconds: end
    });
    event.target.setVolume(60);
    event.target.playVideo();

    event.target.addEventListener('onStateChange', function(state) {
       
        if (state.data == YT.PlayerState.ENDED) {
            var start2 =  millisToSeconds(clean[startOffset].offset);
            var end2 = millisToSeconds(clean[endOffset].offset);
            
            console.log("par pitié " + start2);
                //player.seekTo(start, false);
                //setTimeout(() => {player.playVideo()}, 1000);
                event.target.loadVideoById({
                    videoId: id,
                    startSeconds: start2,
                    endSeconds: end2
                });
                event.target.pauseVideo();
                setTimeout(() => {event.target.playVideo()}, 1500);
            } 
        }
    );

}

var count = 0;
var endOffset = 0;
var startOffset;

function getOffset() {
    startOffset = endOffset;

    if (clean[startOffset].text.split(" ").length > 7) {
        endOffset = endOffset + 1;
        return [startOffset, endOffset];
    }

    for (i = endOffset; i < clean.length; i++) {
        count = count + clean[i].text.split(" ").length;
        if(count > 7) {
            count = 0;
            endOffset = i;
            return [startOffset, endOffset];
        }
    }
}

   
function changeAll(id, startOff, endOff) {
    var start =  millisToSeconds(clean[startOff].offset);
    var end = millisToSeconds(clean[endOff].offset);
   
    console.log(start,end);
    console.log(start,end);
    player.loadVideoById({
        videoId: id,
        startSeconds: start,
        endSeconds: end
    });
    setTimeout(() => {player.playVideo()}, 100);
}
/* 
 function onPlayerStateChange(event, id) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.pauseVideo();
      
    }
  }  */
/* function onPlayerStateChange(event) {
    var start = 1;
    var end = 3;
    event.target.cueVideoById({
        
      videoId: 'MmB9b5njVbA',
      startSeconds: start,
      endSeconds: end
    });
    //event.target.playVideo();

} */


//let checkDuration;
//let startOffset;
//let endOffset;
//let isPlaying = false;
//let owi = true;



/* function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      // Lecture en cours
      //var duration = player.getDuration();
      //console.log("duration is " + duration);
      
      //console.log("current time is " + currentTime);
     //checkDuration = setInterval(function() {
            
        //startOffset = getStartOffset();
            //console.log('durée de début : ' + startOffset);
        //endOffset = getEndOffset();
            //console.log('durée de fin : ' + endOffset);
        var startOff = 1000;
        startOffset = 1.000;
        endOffset = 3000;
      //var startOffset = millisToSeconds(startOff);
      //console.log("staroffset is " + startOffset);
      //var endOffset = millisToSeconds(endOff);
      //console.log('je suis en play');
      isPlaying = true;
    
      setTimeout(() => {event.target.pauseVideo(); console.log("Après 3s d'attente je met pause à " + event.target.getCurrentTime());}, endOffset - startOff);
      
      
      //console.log("endoffset is " + endOffset);
  
      // Vérifier la durée de la vidéo à chaque ms
      
    //var currentTime = player.getCurrentTime();
    //}, 10);
       // if (currentTime > endOffset) {
       //    player.seekTo(startOffset, false);
            //setTimeout(() => {player.seekTo(startOffset, true);}, 1000);
        //} 
      
    } else if (isPlaying) {//event.data == YT.PlayerState.PAUSED) {
        //console.log('je suis en pause');
        isPlaying = false;
        event.target.seekTo(startOffset, false);
        setTimeout(() => {event.target.playVideo(); console.log('Après 2s de pause je start à ' + player.getCurrentTime())}, 2000);
       //owi = false;
        //startOffset = getStartOffset();
        //startOffset = millisToSeconds(startOffset);
        //console.log(startOffset);
        
        //event.target.seekTo(startOffset, true);
        //event.target.playVideo();
        
        //clearInterval(checkDuration);
       
      // Lecture en pause
    } //else if (event.data == YT.PlayerState.ENDED) {
        //clearInterval(checkDuration);
      // Lecture terminée
    //}
  }
 */
/*//function getStartOffset() {
    const lastWordDiv = output.lastElementChild.textContent;
    if (clean[indexObject].text.length + clean[indexObject + 1].text.length <= 14) { //cas1
       // try {
       // const lastWordOutput = output.lastElementChild.textContent;
        //lastWordOutput = lastWordOutput.trim();
        //if (lastWordOutput === stringList[stringList.length - 1]){
        var offset = clean[indexObject].offset;
        indexObject = indexObject + 2;
        console.log(offset);
        isChanging = true;
        //}
       // } catch(e){ 
          //  offset = clean[indexObject + 1].offset
            return offset;
    }
    //console.log("start offset = " + offset);
    else if (clean[indexObject].text.length <= 3) {

        var offset = clean[indexObject + 1].offset;
        console.log(offset);
        isChanging = true;
        //try {   
    } else {
          //  const lastWordOutput = output.lastElementChild.textContent;
            //lastWordOutput = lastWordOutput.trim();
          //  if (lastWordOutput === stringList[stringList.length - 1]){
        var offset = clean[indexObject].offset;
            console.log(offset);
            isChanging = true;
         //  }
         //   } catch(e){
         //       offset = clean[indexObject].offset
       // };
     }   
}

function getEndOffset() { 
    if (clean[indexObject].text.length + clean[indexObject + 1].text.length <= 14) {
        indexObject = indexObject + 1;
        var offset = clean[indexObject + 2].offset;
        console.log(offset);
        isChanging = true;
        return offset;
     }
     else if (clean[indexObject].text.length <= 3) {
         var offset = clean[indexObject + 1].offset;
         console.log(offset);
         isChanging = true;
     } else {
         var offset = clean[indexObject].offset;
             console.log(offset);
             isChanging = true;
      }  
} */

function playVideo() {
    player.playVideo();
}

function pauseVideo2() {
    player.pauseVideo();
}

function repeatAWord(){
    var currentTime = player.getCurrentTime();
    player.seekTo(currentTime - 1.5);
}

function replayVideo() {
    var offset = clean[indexObject].offset;
    var damn = millisToSeconds(offset);
    player.seekTo(damn);
    
}

function toggleVideo() {
    if (player.getPlayerState() == 1) {
      pauseVideo2();
    } else {
      playVideo();
    }
  }

function stopVideo() {
    player.stopVideo();
}
/* function onPlayerStateChange(event) {
  
} */