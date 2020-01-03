const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let finishGame = false;
let countDisableCards = 0;
let round = 1;
let count = 0;
let score = 0;
let life = 2;
let wins = 0;

function flipCard() {
  if (lockBoard) return;
  count++;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //second click
  secondCard = this;

  checkForMatch();

}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch? disableCards(): unflipCards();
}

function disableCards() {
  countDisableCards++;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  if (countDisableCards == 6){
    ++life;
    cards.forEach(card => setTimeout(()=> {card.classList.remove('flip')}, 1600));
    //cards.forEach( card => card.removeEventListener('click', flipCard));
  }else{
    resetBoard();
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(()=> {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle(){
  cards.forEach( card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

function countDown(secs, elem1) {
  var element = document.getElementById(elem1);
  printCounters();
  element.innerHTML = "00:"+secs;
  if(secs<10) {
    element.innerHTML = "00:0"+secs;
  }
  countDownLife(secs);
  if(secs < 0) {
    clearTimeout(timer);
    element.innerHTML = 'Round '+(++round);
    resetRound();
    return;
  }
  secs--;
  var timer = setTimeout('countDown('+secs+',"'+elem1+'")',1000);
}


function resetRound() {
  cards.forEach( card => card.removeEventListener('click', flipCard));
  cards.forEach(card => card.classList.add('flip'));
  cards.forEach(card => card.classList.remove('flip'));
  cards.forEach( card => card.addEventListener('click', flipCard));
  resetBoard();
  setTimeout('shuffle()',1000);
  count = 0;
  countDisableCards = 0;
  setTimeout('countDown(30, "status")',3000);
  cards.forEach( card => card.removeEventListener('click', flipCard));
  cards.forEach( card => setTimeout(()=> {card.addEventListener('click', flipCard)},3000));
}


function countDownLife(secs) {
  if ((countDisableCards!=6) && (secs == 0)){
    --life;
    if (life == 0){

      cards.forEach( card => card.removeEventListener('click', flipCard));
      cards.forEach(card => card.classList.add('flip'));
      printCounters();
      document.getElementById('gameOver').innerHTML= 'GAME OVER';
        document.getElementById('replay').innerHTML= '<button type="button" class="btn btn-outline-success btn-block"  onclick="countDown(5,`status`)">Ξανά</button>';
      clearTimeout(timer);
    }
  }
}

function printCounters() {
  document.getElementById('round').innerHTML= 'Round: '+round;
  document.getElementById('count').innerHTML='Flips: '+count;
  document.getElementById('life').innerHTML= 'Life : '+life;
}


(function animation() {

setTimeout(showPage, 500);
})();

function showPage() {
    document.getElementById("myDiv").style.display = "block";
}




cards.forEach( card => card.addEventListener('click', flipCard));
shuffle();
