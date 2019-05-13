
var cards = document.querySelectorAll('.memory-card');

//Musimy wiedzieć czy to jest pierwsza czy druga karta 
var hasFlippeedCard = false;
var firstCard, secoundCard;
var lockBoard = false;



//Tworzymy funkcję 
function flipCard(){
	if (lockBoard) return;

	if (this === firstCard) return;

	this.classList.add('flip');

	if(!hasFlippeedCard){
		//first click
		hasFlippeedCard= true;
		firstCard= this;
		return ;
		} 
	
		
		hasFlippeedCard = false;
		secondCard = this;
		checkForMatch();
	}


	function checkForMatch(){ 
		var isMatch = firstCard.dataset.framework === secondCard.dataset.framework
		isMatch ? disableCards() : unflipCards();
	}

	function disableCards(){
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
		resetBoard();
	}

	function unflipCards(){
		lockBoard = true;

		setTimeout(()=>{
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
		
		}, 1500);
	}

	function resetBoard() {
		[hasFlippeedCard, lockBoard] = [false, false]
		[firstCard, secoundCard] = [null, null]
	}

	//tasowanie kard
	(function shuffle(){
		cards.forEach(card=> {
			var randomPos = Math.floor(Math.random()*12);
			card.style.order = randomPos;
		});
	}
)(); //Natychmiast wywołano wyrażenie funkcji, co oznacza, że funkcja ta zostanie wykonana zaraz po jej definicji
cards.forEach(card=> card.addEventListener('click', flipCard)); 