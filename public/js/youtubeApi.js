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
            playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'enablejsapi': 1, 'cc_load_policy': 1, 'cc_lang_pref': 'en', 'iv_load_policy': 3, 'modestbranding': 1 },
            events: {
                'onReady': function (event) {
                    onPlayerReady(event, startBy);
                }
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

function seekTo() {
    console.log(3);
    player.seekTo();
}

/* function onPlayerStateChange(event) {
  
} */