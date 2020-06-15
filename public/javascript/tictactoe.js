var origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
]
const cells = document.querySelectorAll('.cell');
//var for counter
var counter = 0;
//var for start button
var menuStart = document.getElementById('menuStart');


var score = 0;
var win = 0;
var lose = 0;
var tie = 0;
//vars for keeping score

//used when going into a new round
function startGame() {

	counter++;
	menuStart.style.display = 'none';
	origBoard = Array.from(Array(9).keys());
	document.querySelector(".endgame").style.display = "none";
	for (var i = 0; i<cells.length; i++){
		cells[i].innerText = '';
		cells[i].addEventListener('click', turnClick, false); 
	}
}
//used at beginning
function newGame() {
	
	counter = 1;
	tie = 0;
	win = 0;
	lose = 0; 

	document.querySelector(".endgametext").style.display = "none";
	document.querySelector(".startgametext").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i<cells.length; i++){

		cells[i].innerText = '';
		cells[i].addEventListener('click', turnClick, false); 
	}
}


function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number'){
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie())
		 turn(bestSpot(), aiPlayer);
		}
}

function turn(squareId, player){
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon)
		gameOver(gameWon);
}

function checkWin(board, player){
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if(win.every(elem => plays.indexOf(elem) > -1)){
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;

}

function gameOver(gameWon) {
	
	for (var i = 0; i < cells.length; i++){
		cells[i].removeEventListener('click', turnClick, false);
	}
	//test
	if(gameWon = aiPlayer)
		lose++;
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!");
}

function declareWinner(who) {
	//5 round limit
	if(counter != 5){
		document.querySelector(".endgame").style.display = "block";
		document.querySelector(".endgame .text").innerText = who;
	} else {
		score = checkScore(win, tie, lose);
		document.querySelector(".endgametext").style.display = "block";
		document.querySelector(".endgametext .text").innerText = "Game Over. Your score is: " + score;

	}

}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');

}

function bestSpot() {
	return miniMax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++){
			cells[i].removeEventListener('click', turnClick, false);
		}
		tie++;
		declareWinner("Tie Game!");

		return true;
	}
	return false;
	//test


}
//minimax algorithm
function miniMax(newBoard, player){
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if(checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++){
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			 if (checkWin(newBoard, aiPlayer)) {
		        move.score = 10;
		        newBoard[availSpots[i]] = move.index;
		        return move;
		       }
			var result = miniMax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = miniMax(newBoard, aiPlayer);
			move.score = result.score;
		}
	newBoard[availSpots[i]] = move.index;
	
	moves.push(move);	
	}

	var bestMove;
	
	if(player === aiPlayer){
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++){
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++){
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
};
//figures end result
function checkScore(w, t, l){
	score = (w*2+t)-l;
	if (score<0) {
		score = 0;
	}
	return score;
}
