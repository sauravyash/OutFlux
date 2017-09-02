/* Notes
myaudio.play(); - This will play the music.
myaudio.pause(); - This will stop the music.
myaudio.duration; - Returns the length of the music track.
myaudio.currentTime = 0; - This will rewind the audio to the beginning.
myaudio.loop = true; - This will make the audio track loop.
myaudio.muted = true; - This will mute68  the track
*/

// initialise variables
var tracklink = "Music/Would You Ever.mp3";
var track = new Audio(tracklink);
var playermode = "pause";

// node modules
var path = require('path');
var jsmediatags = require("jsmediatags");
var base64js = require('base64-js');
const BrowserWindow = require('electron');
var marquee = require("jquery.marquee");
var shuffleMode = false;
var $mq = $('.marquee');


function setProgress(time){
  track.currentTime = time;
}

// change window size on title bar double click
function resize() {
  var win = BrowserWindow.getCurrentWindow();
  win.maximize();
}

$( ".titlebar" ).dblclick(function() {
  resize();
  alert('titlebar is dblclicked');
});

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

// play button - font unicode: \f04b
$('.play').on('click','.playbutton', function(){
  playerPlay();
});

// pause button - \f04c
$('.play').on('click', '.pausebutton', function(){
  playerPause();
});

// repeat button
function repeat() {
  if (track.loop === false){
    track.loop = true;
    $('.fa-retweet').addClass('repeat-on')
  }
  else {
    track.loop = false;
    $('.fa-retweet').removeClass('repeat-on')
  }
}

$('div.repeat').on('click', function(){
  repeat();
});

// shuffle button
function shuffle() {
  if (shuffleMode === false){
    shuffleMode = true;
    $('.fa-random').addClass('shuffle-on');
  }
  else {
    shuffleMode = false;
    $('.fa-random').removeClass('shuffle-on')
  }
}

$('div.shuffle').on('click', function(){
  shuffle()
});

// progress bar update on click
$('.progressinfo').on('mouseup', '.progressbar', function(){
  var progress = ~~((parseInt($('.progressbar > span').css('left')) / $('.progressbar').width()) * 100 );
  var progInTime = ~~(progress * track.duration) / 100;
  //console.log(progInTime);
  setProgress(progInTime);
});

// Update Progres Bar every second
function progressUpdate(){
  var sliderProg = ((track.currentTime / track.duration) * 10000) / 100;
  $( ".progressbar" ).slider('value', sliderProg);
  //console.log(sliderProg);
}

// volume to percentage
function volUpdate() {
  var volPerc = ~~((parseInt($('.vol-scroll > .ui-slider-handle').css('left')) / 92) * 100);
  if (volPerc > 100) {var volPerc = 100}
  track.volume = volPerc / 100;
}

// volume bar update
$(function() {
  $( ".vol-scroll" ).slider({
    value: 60,
    range: "min"
  });
});

// progressbr slider
$(function()  {
  $( ".progressbar" ).slider({
    range: "min",
    step: 0.1
  });
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
  });

  // total time
  $( document ).ready(function() {
      $(".ttime").text(timecalc(track.duration));
  });

  // pause player when song finished
  if (track.currentTime == track.duration){
    playerPause();
  }

  // console logs
}

function milisecFunc(){
  volUpdate();

}

function volIcons(){
  //volume icon
  if (track.volume > 0.50) {
    $('.vol-ico').addClass('fa-volume-up').removeClass('fa-volume-down').removeClass('fa-volume-off');
  } else if (track.volume > 0) {
    $('.vol-ico').addClass('fa-volume-down').removeClass('fa-volume-up').removeClass('fa-volume-off');
  } else {
    $('.vol-ico').addClass('fa-volume-off').removeClass('fa-volume-down').removeClass('fa-volume-up');
  }
}

function progressBarClock() {
  // progress bar
  progressUpdate();
  setID3Data();
}


$(".tname").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
  $(this).removeClass("marquee")
})

$(".tname").hover(function(){
  $(this).addClass("marquee");
})

function setID3Data() {
  // id3 tag scanner
  jsmediatags.read(path.join(__dirname, tracklink), {
    onSuccess: function(tag) {
      id3json = tag;
      // console.log(tag);
    },
    onError: function(error) {
      console.log('ID3parser Error: ', error.type, error.info);
    }
  });
  $('.aname').html(id3json.tags.artist);
  $('.tname').html(id3json.tags.title);
  // id3json.tags.picture.data
  var b64encoded = base64js.fromByteArray(id3json.tags.picture.data)

  $('#albumart').attr('src', 'data:image/png;base64,'+b64encoded);

}



// excecute clocks
function initialise() {
  setInterval(clockInTime, 500);
  setInterval(volIcons, 200);
  setInterval(milisecFunc, 20);
  setInterval(progressBarClock, 1000);
}

setTimeout(initialise, 2000);
