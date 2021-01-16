var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var started = false;

//function that is triggered by typing 'a' (to start the game)

$(".btn").click(function(){
  if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      $(".btn").hide();
  }
});

//funtion that generates random patterns for the game

function nextSequence(){
  userClickedPattern=[];
  ++level;
  $("#level-title").text("Level "+level);

  var randomNumber =(Math.floor(Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//functon that stores the players pattern in game

$(".bttn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(this.id);
  animatePress(this.id);

  checkAnswer(userClickedPattern.length-1);
});

//function for sound

function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

//function of button click animation

function animatePress(currentColor){
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

//function to check the pattern

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $(".btn").text("Replay");
    $(".btn").show();
    startOver();
  }
}

//function to restart the game stored values

function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}
