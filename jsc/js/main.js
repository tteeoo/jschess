// JSChess by Theo Henson (GH: tteeoo/jschess)

function onBoardClick(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    var AN = coordsToAN(x, y);
    var letter = AN[0];
    var number = AN[1];
    var place = getPlace(letter, number);
    var piece = places[place[0]][place[1]];
    if(piece[0] == turn[0]) {
		if(selected.length == 0) {
			selected = [place[0], place[1]];
		} else {
			newSelected = [place[0], place[1]];
		}

		if(newSelected[0] == selected[0] && newSelected[1] == selected[1]) {
			selected = [];
			newSelected = [];
		}
    } else {
		if(selected.length != 0) {
			if(isArrayInArray(getValidMoves(selected), place))  {
				places[place[0]][place[1]] = places[selected[0]][selected[1]];
				places[selected[0]][selected[1]] = "";
				selected = [];
				newSelected = [];
				if(turn == "white") {
					turn = "black";
				} else { turn = "white"}
			}
		}
	}
}

var board = {
    canvas: document.createElement("canvas"),
    start: function() {
	this.canvas.width = 512;
	this.canvas.height = 512;
	this.canvas.id = "main";
	this.context = this.canvas.getContext("2d");
	document.getElementById("chess").appendChild(this.canvas);
	this.interval = setInterval(updateBoard, 20);
    },
    draw: function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	var co = 0;
	for(const i of Array(64).keys()) {
	    if(co % 2 == 0) {
		co = 1;
	    } else {
		co = 0;
	    }
	    for(const j of Array(8).keys()) {
		co++;
		if(co % 2 == 0) {
		    this.context.fillStyle = "#FEFEC8";
		} else {
		    this.context.fillStyle = "#8E5A44";
		}
		this.context.fillRect(i * 64, j * 64, 64, 64);
	    }
	}
    }
}

function startGame() {
    board.start();
    board.canvas.addEventListener("mousedown", function(e) {
	onBoardClick(board.canvas, e)
    });
}

function updateBoard() {
    checkKing();
    updateTurn();
    pieces = materialize(places);
    board.draw();
    updateSelection();
    drawPieces();
}

function piece(type, color, letter, number) {
    this.type = type;
    this.color = color;
    this.letter = letter;
    this.number = number;
    this.image = new Image();
    if(color == "white") {
	this.image.src = "img/w" + type + ".png";
    } else {
	this.image.src = "img/" + type + ".png";
    }
    this.draw = function() {
	ctx = board.context;
	ctx.drawImage(this.image, ANToCoords(this.letter, this.number)[0], ANToCoords(this.letter, this.number)[1], 64, 64);
    }
}

function materialize(places) {
    var whitePieces = [];
    var blackPieces = [];
    var windex = 0;
    var bindex = 0;

    for(var i = 0; i < places.length; i++) {
	for(var j = 0; j < places[i].length; j++) {
	    switch(places[i][j]) {
		case "wpa":
		    whitePieces[windex] = new piece("pawn", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;
		case "wro":
		    whitePieces[windex] = new piece("rook", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;
		case "wkn":
		    whitePieces[windex] = new piece("knight", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;
		case "wbi":
		    whitePieces[windex] = new piece("bishop", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;
		case "wqu":
		    whitePieces[windex] = new piece("queen", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;
		case "wki":
		    whitePieces[windex] = new piece("king", "white", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    windex++;
		    break;

		case "bpa":
		    blackPieces[bindex] = new piece("pawn", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
		case "bro":
		    blackPieces[bindex] = new piece("rook", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
		case "bkn":
		    blackPieces[bindex] = new piece("knight", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
		case "bbi":
		    blackPieces[bindex] = new piece("bishop", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
		case "bqu":
		    blackPieces[bindex] = new piece("queen", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
		case "bki":
		    blackPieces[bindex] = new piece("king", "black", placeToAN(i, j)[0], placeToAN(i, j)[1]);
		    bindex++;
		    break;
	    }
	}
    }

    return([whitePieces, blackPieces]);
}

function drawPieces() {
    for(var i = 0; i < pieces[0].length; i++) {
	pieces[0][i].draw();
    }
    for(var i = 0; i < pieces[1].length; i++) {
	pieces[1][i].draw();
    }
}

function updateTurn() {
    var text = document.getElementById("turn");
    if(turn == "white") {
	text.innerHTML = "White's turn";	
    }
    if(turn == "black") {
	text.innerHTML = "Black's turn";	
    }
}

function updateSelection() {
    var text = document.getElementById("selected");
    try {
	var AN = placeToAN(selected[0], selected[1]);
	text.innerHTML = " | " + AN[0] + AN[1] + ": " + places[selected[0]][selected[1]];	
    } catch(err) {
	text.innerHTML = " | None selected";
    }
    var ctx = board.context;
    ctx.fillStyle = "#98F5FF";
    for(const i of Array(64).keys()) {
		for(const j of Array(8).keys()) {
			if(j == 7 - selected[1] && i == selected[0]) {
				ctx.fillRect(i * 64, j * 64, 64, 64);
			}
		}
	}
	if(selected.length != 0) {
		var moves = getValidMoves(selected);
		for(var x = 0; x < moves.length; x++) {
			console.log(x)
			for(const i of Array(64).keys()) {
				for(const j of Array(8).keys()) {
					if(j == 7 - moves[x][1] && i == moves[x][0]) {
						ctx.fillRect(i * 64, j * 64, 64, 64);
					}
				}
			}
		}
	}
}

function checkKing() {
    var blackKing = false;
    var whiteKing = false;
    for(column in places) {
	for(item in places[column]) {
	    if(places[column][item] == "wki") {
		whiteKing = true;
	    }
	    if(places[column][item] == "bki") {
		blackKing = true;
	    }
	}
    }

    if(!blackKing) {
	alert("Checkmate! White has won.");
	location.reload();
    }
    if(!whiteKing) {
	alert("Checkmate! Black has won.");
	location.reload();
    }
}

function isArrayInArray(arr, item) {
	var item_as_string = JSON.stringify(item);
  
	var contains = arr.some(function(ele){
	  return JSON.stringify(ele) === item_as_string;
	});
	return contains;
}

function getValidMoves(coords) {
	var piece = places[coords[0]][coords[1]];
	var good_moves = [];
    switch(piece) {
		case "wpa":
			good_moves[0] = [coords[0], coords[1] + 1]
			break;
		default:
			break;
	}
	
	return good_moves;
}

var turn = "white";
var pieces = [[], []];
var selected = [];
var newSelected = [];
var places = [
	//   1      2    3   4   5   6     7      8
    /*a*/ ["wro", "wpa", "", "", "", "", "bpa", "bro"],
    /*b*/ ["wkn", "wpa", "", "", "", "", "bpa", "bkn"],
    /*c*/ ["wbi", "wpa", "", "", "", "", "bpa", "bbi"],
    /*d*/ ["wqu", "wpa", "", "", "", "", "bpa", "bqu"],
    /*e*/ ["wki", "wpa", "", "", "", "", "bpa", "bki"],
    /*f*/ ["wbi", "wpa", "", "", "", "", "bpa", "bbi"],
    /*g*/ ["wkn", "wpa", "", "", "", "", "bpa", "bkn"],
    /*h*/ ["wro", "wpa", "", "", "", "", "bpa", "bro"]
];

startGame();