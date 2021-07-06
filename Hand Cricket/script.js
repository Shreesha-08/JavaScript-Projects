var compToss = ['heads','tails'];
var compTossNumber = Math.floor(Math.random()*2);
var playerToss;
for(var i=0; i<2;i++){
    document.querySelectorAll(".beforeToss input")[i].addEventListener("click", function(){
        playerToss = this.value;
        document.querySelector(".beforeToss").classList.add("beforeTossVis");
        tossWinner(playerToss);
    }, { once: true})
}

function tossWinner (receivedToss){
    var tossImage = "images/" + compToss[compTossNumber] + ".jpg";
    compTossWin = ['bat','bowl'];
    compTossWinNumber = Math.floor(Math.random()*2);
    if(receivedToss===compToss[compTossNumber]){
        document.querySelector(".afterToss img").setAttribute("src",tossImage);
        document.querySelector(".afterToss").classList.remove("afterToss");
        playerChooses();
    }
    else{
        document.querySelector(".afterTossComp img").setAttribute("src",tossImage);
        document.querySelector(".afterTossComp").classList.remove("afterTossComp");
        document.querySelector(".tossWinnerComp").innerHTML = "Computer won the toss and chose to "+compTossWin[compTossWinNumber]+ " first.";
        setTimeout(() => {
            document.querySelector("section#aTC").classList.add("afterTossComp");
            document.querySelector(".game").classList.remove("game");
        }, 3000);
        if(compTossWin[compTossWinNumber]==="bowl"){
            batFirst(1);
        }
        if(compTossWin[compTossWinNumber]==="bat"){
            bowlFirst(0);
        }
    }
}

var playerDecides;
function playerChooses(){
    for(var j=2; j<4;j++){
        document.querySelectorAll("input")[j].addEventListener("click", function(){
            playerDecides = this.value;
            if(playerDecides==="bat"){
                document.querySelector("section#aT").setAttribute("class","afterToss");
                document.querySelector(".game").classList.remove("game");
                batFirst(1);
            }
            if(playerDecides==="bowl"){
                document.querySelector("section#aT").setAttribute("class","afterToss");
                document.querySelector(".game").classList.remove("game");
                bowlFirst(0);
            }
        })
    }
}

var score;
function batFirst(compBatFirst, targetReceived){
    var tar = 0;
    for(var k=0; k<7;k++){
        document.querySelectorAll(".row img")[k].addEventListener("click",function(){
            score = Number(this.getAttribute("id"));
            var randomScore = Math.ceil(Math.random()*6);
            var yourScoreImage = scoreImage(score);
            var compScoreImage=  scoreImage(randomScore);
            document.querySelector(".yourScore img").setAttribute("src",yourScoreImage);
            document.querySelector(".compScore img").setAttribute("src",compScoreImage);
            if(score===randomScore){
                if(compBatFirst===0){
                    document.querySelector(".outAndSix").innerHTML = "Out!!<br>GAME OVER<br>Refresh to Play a new game.";
                    
                }
                else{
                    document.querySelector(".outAndSix").innerHTML = "Out!!";
                    playSound();
                    setTimeout(function(){
                        document.querySelector(".outAndSix").innerHTML = "";
                    },1000);
                    bowlFirst(1,tar+1);
                }
            }
            tar = displayScore(score,1);
            if(compBatFirst===0){
                if(tar>=targetReceived){
                    document.querySelector(".outAndSix").innerHTML = "<br>GAME WON<br>Refresh to Play a new game.";
                }
            }
            if(compBatFirst===1){
                document.querySelector(".targetScore").innerHTML = "Target: " + (tar+1);
            }
            if(compBatFirst===0){
                document.querySelector(".targetScore").innerHTML = "Target: " + targetReceived;
            }
        })
    }
}

function bowlFirst(compBatFirst, targetReceived){
    var target=0;
    for(var k=0; k<7;k++){
        document.querySelectorAll(".row img")[k].addEventListener("click",function(){
            score = Number(this.getAttribute("id"));
            var randomScore = Math.ceil(Math.random()*6);
            var yourScoreImage = scoreImage(score);
            var compScoreImage=  scoreImage(randomScore);
            document.querySelector(".yourScore img").setAttribute("src",yourScoreImage);
            document.querySelector(".compScore img").setAttribute("src",compScoreImage);
            if(score===randomScore){
                if(compBatFirst===1){
                    document.querySelector(".outAndSix").innerHTML = "Out!!<br>GAME WON<br>Refresh to Play a new game.";
                }
                else{
                    document.querySelector(".outAndSix").innerHTML = "Out!!";
                    playSound();
                    setTimeout(function(){
                        document.querySelector(".outAndSix").innerHTML = "";
                    },1000);
                    batFirst(0,target+1);
                }
            }
            target = displayScore(randomScore,0);
            if(compBatFirst===1){
                if(target>=targetReceived){
                    document.querySelector(".outAndSix").innerHTML = "<br>GAME OVER<br>Refresh to Play a new game.";
                }
            }
            if(compBatFirst===1){
                document.querySelector(".targetScore").innerHTML = "Target: " + targetReceived;
            }
            if(compBatFirst===0){
                document.querySelector(".targetScore").innerHTML = "Target: " + (target+1);
            }
        })
    }
}

var sum=0;
var sum1=0;
function displayScore(score,flag){
    if(flag===1){
        sum1 +=score;
        document.querySelector(".totalScore").innerHTML = "Total Score: " + sum1;
        return sum1;
    }
    sum +=score;
    document.querySelector(".totalScore").innerHTML = "Total Score: " + sum;
    return sum;
}

function scoreImage (score){
    var imageReturn;
    switch(score){
        case 1: imageReturn = "images/" + "one" + ".png";
                break;
        case 2: imageReturn = "images/" + "two" + ".png";
                break;
        case 3: imageReturn = "images/" + "three" + ".png";
                break;
        case 4: imageReturn = "images/" + "four" + ".png";
                break;
        case 5: imageReturn = "images/" + "five" + ".png";
                break;
        case 6: imageReturn = "images/" + "six" + ".png";
                break;
        default: console.log("click on number");
    }
    return imageReturn;
}

function playSound(){
    var audio = new Audio("crash.mp3");
    audio.play();
}