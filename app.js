
alert('Game Rules:\n\n- The GAME has two players playing in ROUNDS.\n\n- In each turn, a PLAYER rolls a dice as many time as a PLAYER wishes. Each result gets added to his/her ROUND score.\n\n- But if the PLAYER rolls a \'1\', then all his/her ROUND scores gets lost (but not GLOBAL score). After that it\'s the next PLAYER\'S turn.\n\n- The PLAYER can chose to \'HOLD\' which means that his/her ROUND score gets added to his/her GLOBAL score. After that it\'s the next PLAYER\'S turn.\n\n- If a player gets back to back two \'6\'s then he/she will lost all his/her Global score. After that it\'s the nextPlayer\'s turn.\n\n- The one who will reach 100 POINTS first will be the WINNER');

var globalScore,roundScore,activePlayer,gamePlaying;

var first=0,second=0;

init();

//document.querySelector('#current-0').innerHTML='<em>'+dice+'</em>';

document.querySelector('.button-roll').addEventListener('click',function(){

	if(gamePlaying==true)
	{
		//1. Rolling Dice
		var dice=Math.floor(Math.random()*6)+1;

		//2. Display the Dice
		var diceDOM=document.querySelector('.dice');
		diceDOM.src='images/dice-roll-'+dice+'.png';
		
		document.querySelector('.dice').classList.add('piggi');

		//3. Display current score
		if(dice!==1)
		{
			roundScore+=dice;
			document.getElementById('current-'+activePlayer).textContent=roundScore;
			if(first===0 && dice===6)
				first=dice;
			else if(second===0)
			{
				second=dice;
				if(first===second)
				{
					globalScore[activePlayer]=0;
					document.getElementById('score-'+activePlayer).textContent=globalScore[activePlayer];
					nextPlayer();
				}
				first=0;
				second=0;
			}
		}
		else
			nextPlayer();
	}
});


document.querySelector('.button-hold').addEventListener('click',function(){

	if(gamePlaying===true)
	{
		first=0;
		second=0;
		
		var flag=0;

		//1. Update global score
		globalScore[activePlayer]+=roundScore;

		//2. Display global score
		document.getElementById('score-'+activePlayer).textContent=globalScore[activePlayer];

		//3. Check winner
		var input=document.querySelector('.winning-score').value;
		var winningScore;

		if(input)
			winningScore=input;
		else
			winningScore=100;

		if(globalScore[activePlayer]>=winningScore)
		{
			document.getElementById('name-'+activePlayer).textContent='WINNER!';
			document.querySelector('.dice').src='images/pig.png';
			document.querySelector('.dice').classList.remove('piggi');
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			document.getElementById('current-'+activePlayer).textContent='0';
			gamePlaying=false;
			flag=1;
		}

		//4. switch to next Player
		if(flag===0)
			nextPlayer();
	}
});

function nextPlayer()
{
	roundScore=0;
	document.getElementById('current-'+activePlayer).textContent=roundScore;
	document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
	activePlayer===0 ? activePlayer=1 : activePlayer=0;
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}

function init()
{
	globalScore=[0,0];
	roundScore=0;
	activePlayer=0;
	gamePlaying=true;

	/*
	var player1=prompt('Enter name of Player-1: ');
	var player2=prompt('Enter name of Player-2: ');
	document.querySelector('#name-0').textContent=player1;
	document.querySelector('#name-1').textContent=player2;
	*/

	document.querySelector('.dice').src='images/pig.png';
	document.querySelector('.dice').classList.remove('piggi');

	document.getElementById('score-0').textContent='0';
	document.getElementById('score-1').textContent='0';
	document.getElementById('current-0').textContent='0';
	document.getElementById('current-1').textContent='0';

	document.getElementById('name-0').textContent='Player 1';
	document.getElementById('name-1').textContent='Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.button-new').addEventListener('click',init);