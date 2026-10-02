import data from './data.json' with { type: 'json' };


let typingText = document.getElementById('js-typing-text');
let difficulty= "easy";
let currentPosition=0;
let personalB=0
let gameStarted=false;
let wpm=0
let accuracy=0
let accurateChar=0;
const startButton = document.querySelector(".start-button");




console.log(data);

console.log(data.easy);


//GENERATES A RANDOM PASSAGE
function random(){
    let RandomIndex= Math.random() * data[difficulty].length;
    let randomIndex= Math.floor(RandomIndex);
    let randomText= data[difficulty][randomIndex];
    console.log(randomText);
    typingText.innerHTML= randomText.text
    return randomText;
}

// HIGHLIGHTS CHARACTERS
function highlight(){
    document.querySelectorAll(".highlight").forEach(span => {
    span.classList.remove("highlight");
    });
    if(currentPosition< typingText.children.length){
        typingText.children[currentPosition].classList.add("highlight");
    
    }
   
}

random();
//GENERATES EACH CHARACTER AS A SPAN
function spanGen(){
    const text = typingText.textContent;

    typingText.textContent = "";

    [...text].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        typingText.appendChild(span);
    });
}


let time = 30;

function startTimer() {
    time=30;
    let timer;
    timer = setInterval(() => {
        time--;

        document.querySelector(".time").textContent = `Time: ${time}`;

        if (time === 0) {
            clearInterval(timer);
            gameStarted = false;
            alert("pass");
            gameEnded();
            accurateChar=0;
        }

        if (gameFinished===true){
            clearInterval(timer);
            gameStarted=false;
        }

    }, 1000);
}


function gameEnded(){
    gameFinished=true;
    gameStarted=false;
    document.querySelector(".results").classList.remove("hideresults");
    getfinalstats();
}

function getfinalstats(){
    let finalWPM=Math.floor(wpm)
    let finalAcc=accuracy
    document.querySelector(".finalwpm").innerHTML=finalWPM;
    document.querySelector(".finalaccuracy").innerHTML=finalAcc;
    if (finalWPM > personalB){
        personalB= finalWPM
        document.querySelector(".personalB").innerHTML= personalB+' WPM';
    }
}


spanGen();

easy.addEventListener('click', () => {
    difficulty= "easy";
    random();
    spanGen();
    gameStarted=false;
    document.querySelector(".starter").classList.remove("hidden");
    currentPosition=0
});
medium.addEventListener('click', () => {
  difficulty= "medium";
   random();
   spanGen();
   gameStarted=false;
   document.querySelector(".starter").classList.remove("hidden");
   currentPosition=0
});

hard.addEventListener('click', () => {
    difficulty= "hard";
    random();
    spanGen();
    gameStarted=false;
    document.querySelector(".starter").classList.remove("hidden");
    currentPosition=0
});

let hasError = false;


let x;
x= setInterval(()=>  {
let charactersTyped = currentPosition;
let totalChar = typingText.children.length;
let minutesElapsed = (30 - time) / 60;
accuracy= Math.floor(accurateChar/currentPosition*100);
wpm = (charactersTyped / 5) / minutesElapsed;
if (isNaN(accuracy)){
    document.querySelector(".accuracy").innerHTML = "Accuracy: 100%";
}
else{
    document.querySelector(".accuracy").innerHTML= "Accuracy:" + accuracy +"%";
}

if (isNaN(wpm)){
    document.querySelector(".wpm").innerHTML = "WPM: 0";
}
else{
    document.querySelector(".wpm").innerHTML = "WPM: " + Math.round(wpm);
}

}, 1000)




let gameFinished= false;

    document.addEventListener("keydown", function(event) {

    if (gameFinished===true){
        return;
    }
    if (gameStarted===true){
  
        if (event.key === "Backspace"){
            typingText.children[currentPosition-1].classList.remove("incorrect");
            typingText.children[currentPosition-1].classList.remove("correct");
            currentPosition--;
            highlight();
            console.log("Backspace press")

        }

        else if(event.key.length > 1) {
        console.log("Special key pressed");
        }

        else if (event.key === typingText.children[currentPosition].textContent) {
            console.log("Correct key pressed");
            currentPosition++;
            highlight();
            accurateChar++;
            console.log(typingText.children[currentPosition]);
            typingText.children[currentPosition-1].classList.add("correct");
        }
        
        else{
            console.log("Incorrect key pressed");
            typingText.children[currentPosition].classList.add("incorrect");
            hasError = true;
            currentPosition++;
            highlight();
        }


        if (currentPosition=== typingText.children.length){
            alert("pass");
            gameEnded();
            console.log(
            accurateChar, currentPosition
            );
            currentPosition=0;
            accurateChar=0;
            
            console.log(getfinalstats());
        }
    };
        });



startButton.addEventListener('click', () => {
    document.querySelector(".starter").classList.add("hidden");
    console.log("clicked");
    gameStarted=true;
    startTimer();
    gameFinished=false;
});


let retry= document.querySelector(".retry");

retry.addEventListener('click', ()=>{
    console.log("Retry clicked!");

    document.querySelector(".results").classList.add("hideresults");

})