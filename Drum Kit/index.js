var i;
var holdLetter;
var audio;
for(i=0;i<document.querySelectorAll(".set button").length;i++){
    document.querySelectorAll("button")[i].addEventListener("click", function (){
        holdLetter = this.innerText;
        soundFunc(holdLetter);
        makeAnim(holdLetter);
    })
}

document.addEventListener("keydown", function(event){
        var keyForSounds = event.key;
        soundFunc(keyForSounds);
        makeAnim(keyForSounds);
})

function soundFunc(keyForSounds){
        switch(keyForSounds){
                case "w": audio = new Audio("sounds/tom-1.mp3");
                        audio.play();
                        break;
                case "a": audio = new Audio("sounds/tom-2.mp3");
                        audio.play();
                        break;
                case "s": audio = new Audio("sounds/tom-3.mp3");
                        audio.play();
                        break;
                case "d": audio = new Audio("sounds/tom-4.mp3");
                        audio.play();
                        break;
                case "j": audio = new Audio("sounds/crash.mp3");
                        audio.play();
                        break;
                case "k": audio = new Audio("sounds/kick-bass.mp3");
                        audio.play();
                        break;
                case "l": audio = new Audio("sounds/snare.mp3");
                        audio.play();
                        break;
                default: console.log("Wrong press");
        }
}

function makeAnim(keyPressed){
        document.querySelector("." + keyPressed).classList.add("pressed");
        setTimeout(function(){
                document.querySelector("." + keyPressed).classList.remove("pressed");
        },100);
}