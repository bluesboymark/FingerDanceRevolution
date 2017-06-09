//variables
var arrows = [{text:'↑', keycode: 38 }, {text:'↓', keycode: 40 }, {text:'←', keycode: 37 }, {text:'→', keycode: 39 }];
var comboArray = [];
var player1Array = [];
var player2Array = [];
var gameStarted = false

$('.prompt').css({ opacity: 0 });
$('.playButton').on('click', displayArrows)
$(document).keypress(function(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
        displayArrows()
    }
});

$('.monitor1').hide()
$('.monitor2').hide()

function randomArrowsIndex(){
  return Math.floor(Math.random() * arrows.length);
}

function displayArrows(){
  gameStarted = true
  $('.prompt').css({ opacity: 1 });
  $('.alert').css({ opacity: 0 });
  $(".bluechar").attr("src","images/bluestatic.png")
  $(".redchar").attr("src","images/redstatic.png")
  buttonListener()
  var comboString = ""
  var diffculty = Math.floor(Math.random() * 5) +10;
  for (i=0; i < diffculty; i++) {
    var arrowsIndex = randomArrowsIndex()
    comboArray.push(arrows[arrowsIndex].keycode)
    comboString += arrows[arrowsIndex].text + " "
    $('.prompt').text(comboString)
    $('.playButton').hide()
    if ($('.player1lives').text() == 0 || $('.player2lives').text() == 0) {
      $('.player1lives').text(3)
      $('.player2lives').text(3)
    }
  }
}

//player 1 event listener to input arrow keys
function buttonListener () {
    $("body").on("keydown",function(event){
    if (gameStarted) {
      if (event.keyCode === 38) {
        var monitor2Text = $('.monitor2').text()
        $('.monitor2').text(monitor2Text + '↑')
        player2Array.push(38)
        $(".bluechar").attr("src","images/blueup.png")
      }
      if (event.keyCode === 40) {
        var monitor2Text = $('.monitor2').text()
        $('.monitor2').text(monitor2Text + '↓')
        player2Array.push(40)
        $(".bluechar").attr("src","images/bluedown.png")
      }
      if (event.keyCode === 37) {
        var monitor2Text = $('.monitor2').text()
        $('.monitor2').text(monitor2Text + '←')
        player2Array.push(37)
        $(".bluechar").attr("src","images/blueleft.png")
      }
      if (event.keyCode === 39) {
        var monitor2Text = $('.monitor2').text()
        $('.monitor2').text(monitor2Text + '→')
        player2Array.push(39)
        $(".bluechar").attr("src","images/blueright.png")
      }
      if (event.keyCode === 87) {
        var monitor1Text = $('.monitor1').text()
        $('.monitor1').text(monitor1Text + '↑')
        player1Array.push(38)
        $(".redchar").attr("src","images/redup.png")
      }
      if (event.keyCode === 83) {
        var monitor1Text = $('.monitor1').text()
        $('.monitor1').text(monitor1Text + '↓')
        player1Array.push(40)
        $(".redchar").attr("src","images/reddown.png")
      }
      if (event.keyCode === 65) {
        var monitor1Text = $('.monitor1').text()
        $('.monitor1').text(monitor1Text + '←')
        player1Array.push(37)
        $(".redchar").attr("src","images/redleft.png")
      }
      if (event.keyCode === 68) {
        var monitor1Text = $('.monitor1').text()
        $('.monitor1').text(monitor1Text + '→')
        player1Array.push(39)
        $(".redchar").attr("src","images/redright.png")
      }
      if (player1Array.length > 0) {
        $('.monitor1').show()
      } else if (player2Array.length > 0) {
        $('.monitor2').show()
      } else {
        $('.monitor1').hide()
        $('.monitor2').hide()
      }


      if(player2Array[player2Array.length-1] != comboArray[player2Array.length-1]){
        looseLife("player2")
        checkGameWinner ()
      }else if(player1Array[player1Array.length-1] != comboArray[player1Array.length-1]){
        looseLife("player1")
        checkGameWinner ()
      }
      checkRoundWinner ();
    }
  })
}

function checkRoundWinner () {
  if (player1Array.join() === comboArray.join() && player1Array.join()) {
    // alert("Player 1 wins the round! Player 2 loses 1 life")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 1 wins the round! Player 2 loses 1 life")
    $('.player2lives').text($('.player2lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
    $("body").off("keydown")
    checkGameWinner ()
  }else if (player2Array.join() === comboArray.join() && player2Array.join()) {
    // alert("Player 2 wins the round! Player 1 loses 1 life")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 2 wins the round! Player 1 loses 1 life")
    $('.player1lives').text($('.player1lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
    $("body").off("keydown")
    checkGameWinner ()
  }
}

function looseLife(player){
  if (player == "player2") {
    // alert("Player 2 made a mistake! Player 2 loses 1 life")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 2 made a mistake! Player 2 loses 1 life")
    $('.player2lives').text($('.player2lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
    $("body").off("keydown")
  }else if (player == "player1") {
    // alert("Player 1 made a mistake! Player 1 loses 1 life")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 2 made a mistake! Player 2 loses 1 life")
    $('.player1lives').text($('.player1lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
    $("body").off("keydown")
  }
}

function clearData(){
  comboArray = [];
  player1Array = [];
  player2Array = [];
  $('.monitor1').text('');
  $('.monitor2').text('');
  $('.monitor1').hide()
  $('.monitor2').hide()
  }

function checkGameWinner () {
  if ($('.player1lives').text() == 0) {
    // alert("Player 2 wins the game!")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 2 wins the game!")
    $("body").off("keydown")
  }
  else if ($('.player2lives').text() == 0) {
    // alert("Player 1 wins the game!")
    $('.alert').css({ opacity: 1 });
    $('.alert').text("Player 1 wins the game!")
    $("body").off("keydown")
  }
}
