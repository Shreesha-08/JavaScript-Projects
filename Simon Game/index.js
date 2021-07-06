var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$("body").one("keypress",function(){
    nextSequence();
})

var level=0;

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){nextSequence()},1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("gameOver");
        setTimeout(function(){
            $("body").removeClass("gameOver");
        },200);
        $("#level-title").html("Game Over, Press any key to restart");
        $("body").one("keypress",function(){
            startOver();
        })
        return;
        }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    nextSequence();
}