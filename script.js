const msgEl = document.getElementById('msg');

const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log(randomNumber);

try{
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
} catch(error){
        console.error(error);
    }
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// start recognition
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  
  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speak
function writeMessage(msg){
    msgEl.innerHTML =`
    <div>You said: </div>
    <span class ="box">${msg}</span>
    `;
}

// Check msg against number
function checkNumber(msg){
    const num = +msg

    // Check if a valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // Check in range
    if (num > 100 || num < 1){
        msgEl.innerHTML +='<div>Number must be between 1 and 100</div>';
        return;
    }
    // check number
    if(num===randomNumber){
        document.body.innerHTML = `
        <h2>Congratulation! You got it right</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNumber){
        msgEl.innerHTML += '<div>Your guess is too high</div>';
    } else {
        msgEl.innerHTML += '<div>Your guess is too low</div>';
    }
}


// speak result
console.log(onSpeak)
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id =='play-again'){
        window.location.reload();
    }
});