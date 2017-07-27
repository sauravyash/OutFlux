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
var trackimg = "";
var track = new Audio(tracklink);
var playermode = "pause";
var progressInPercent = 0;
var reader  = new FileReader();
var trackdata = ["Track Name", "Track Artist", track];
var volume = 50;

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


// volume to percentage
function volUpdate() {
  $('.vol-slider').width(
    ~~((parseInt($('.vol-scroll > .ui-slider-handle').css('left')) / 92) * 100)
  );
  var volPerc = ~~((parseInt($('.vol-scroll > .ui-slider-handle').css('left')) / 92) * 100);
  track.volume = volPerc / 100;
}
// volume bar update
$(function() {
  $( ".vol-scroll" ).slider();
});


$(function() {
  $( ".progressbar" ).slider();
});

// seconds to minutes (+ Hours if required)
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

// function runs every second
function clockInTime() {
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
  // console.log();
  // progress bar
  var progressInPercent = ~~((track.currentTime / track.duration) * 10000) / 100;
  $('.currentprogress').css('width', progressInPercent +'%');
}
function milisecFunc(){
  if ($('.vol-slider').width() !== ~~((parseInt($('.vol-scroll > .ui-slider-handle').css('left')) / 92) *100)) {
    volUpdate();
  }
}

function sliderclock(){
  //volume icon
  if ($('.vol-slider').width() > 50) {
    $('.vol-ico').addClass('fa-volume-up').removeClass('fa-volume-down').removeClass('fa-volume-off');
  } else if ($('.vol-slider').width() > 0) {
    $('.vol-ico').addClass('fa-volume-down').removeClass('fa-volume-up').removeClass('fa-volume-off');
  } else {
    $('.vol-ico').addClass('fa-volume-off').removeClass('fa-volume-down').removeClass('fa-volume-up');
  }
}

// excecute function
setInterval(clockInTime, 1000);
setInterval(sliderclock, 200);
setInterval(milisecFunc, 20);


// id3 tag scanner
/* reader.readAsDataURL(trackblob).onchange = function(e) {
	id3(this.files[0], function(err, tags) {
		// tags now contains the ID3 tags
    console.log(err, tags);
	});
}
*/
