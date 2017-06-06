//variables
var arrows = [{text:'↑', keycode: 38 }, {text:'↓', keycode: 40 }, {text:'←', keycode: 37 }, {text:'→', keycode: 39 }];
var comboArray = [];
var player1Array = [];
var player2Array = [];
var gameStarted = false

// Random arrow generator after button is pressed
$('.playButton').on('click', displayArrows)

// generate random arrow index
function randomArrowsIndex(){
  return Math.floor(Math.random() * arrows.length);
}

// display arrow function
function displayArrows(){
  gameStarted = true
  var comboString = ""
  for (i=0; i < 20; i++) {
    var arrowsIndex = randomArrowsIndex()
    comboArray.push(arrows[arrowsIndex].keycode)
    comboString += arrows[arrowsIndex].text + " "
    $('.prompt').text(comboString)
    $('.playButton').fadeOut()
  }
}

//player 1 event listener to input arrow keys
$("body").on("keydown",function(event){
  if (gameStarted) {
    if (event.keyCode === 38) {
      var monitor1Text = $('.monitor1').text()
      $('.monitor1').text(monitor1Text + '↑')
      player1Array.push(38)
    }
    if (event.keyCode === 40) {
      var monitor1Text = $('.monitor1').text()
      $('.monitor1').text(monitor1Text + '↓')
      player1Array.push(40)
    }
    if (event.keyCode === 37) {
      var monitor1Text = $('.monitor1').text()
      $('.monitor1').text(monitor1Text + '←')
      player1Array.push(37)
    }
    if (event.keyCode === 39) {
      var monitor1Text = $('.monitor1').text()
      $('.monitor1').text(monitor1Text + '→')
      player1Array.push(39)
    }
    if (event.keyCode === 87) {
      var monitor2Text = $('.monitor2').text()
      $('.monitor2').text(monitor2Text + '↑')
      player2Array.push(38)
    }
    if (event.keyCode === 83) {
      var monitor2Text = $('.monitor2').text()
      $('.monitor2').text(monitor2Text + '↓')
      player2Array.push(40)
    }
    if (event.keyCode === 65) {
      var monitor2Text = $('.monitor2').text()
      $('.monitor2').text(monitor2Text + '←')
      player2Array.push(37)
    }
    if (event.keyCode === 68) {
      var monitor2Text = $('.monitor2').text()
      $('.monitor2').text(monitor2Text + '→')
      player2Array.push(39)
    }
    checkWinner();
  }
})

function checkWinner () {
  if (player1Array.join() === comboArray.join()) {
    alert("Player 1 Wins! Player 2 loses 1 life")
    $('.player2lives').text($('.player2lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
  }
  else if (player2Array.join() === comboArray.join()) {
    alert("Player 2 Wins! Player 1 loses 1 life")
    $('.player1lives').text($('.player1lives').text()-1)
    clearData()
    $('.playButton').fadeIn()
  }
}

var clearData = function(){
  comboArray = [];
  player1Array = [];
  player2Array = [];
  $('.monitor1').text('');
  $('.monitor2').text('');
}

// var turn = 0
// on keypress or keydown or keyup:
// check if the right arrow was pressed for this turn
// increment turn by 1


// var randomArrowsElement = arrows[randomArrowsIndex];
