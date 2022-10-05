
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started = false;
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
function animatePress(button)
{
  $("#"+button).addClass("pressed");
  setTimeout(function () {
    $("#"+button).removeClass("pressed");

  }, 100);

}
function nextSequence() {
     userClickedPattern = [];
   level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{ console.log("success");
if (userClickedPattern.length === gamePattern.length){
  setTimeout(function () {
    nextSequence();
  }, 1000);
  }
}
    else {
      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();

    }
  }
  function startOver()
  {
    level=0;
    gamePattern=[];
    started=false;



  }
