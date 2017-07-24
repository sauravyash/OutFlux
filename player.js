/* Notes
myaudio.play(); - This will play the music.
myaudio.pause(); - This will stop the music.
myaudio.duration; - Returns the length of the music track.
myaudio.currentTime = 0; - This will rewind the audio to the beginning.
myaudio.loop = true; - This will make the audio track loop.
myaudio.muted = true; - This will mute the track
*/

// initialise variables
var tracklink = "Gang-Related.mp3";
var track = new Audio(tracklink);
var playermode = "pause";
var progressInPercent = 0;



// Play action
function playerPlay() {
  track.play();
  $('.playerbutton').addClass('pausebutton').removeClass('playbutton');
}

// pause action
function playerPause() {
  track.pause();
  $('.playerbutton').addClass('playbutton').removeClass('pausebutton');
}

// play button - \f04b
$('.play').on('click','.playbutton', function(){
  playerPlay();
});

// pause button - \f04c
$('.play').on('click', '.pausebutton', function(){
  playerPause();
});

// seconds to minutes
function timecalc(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~(time % 60);

    // Output with minimal digits
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    if(ret === 'NaN:NaN') {
      var ret = 'Error';
    }
    return ret;
}

function oneSecondFunction() {
  // current time
  $( document ).ready(function() {
      $(".ctime").text(timecalc(track.currentTime));
      // console.log(timecalc(track.currentTime));
  });

    // total progress
  $( document ).ready(function() {
      $(".ttime").text(timecalc(track.duration));
      // console.log(timecalc(track.duration));
  });

  // progress bar
  var progressInPercent = ~~((track.currentTime / track.duration) * 10000) / 100;
  $('.currentprogress').css('width', progressInPercent +'%');
}

var myVar = setInterval(oneSecondFunction, 1000);
