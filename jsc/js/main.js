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
	this.interval = setInterval(updateBoard, 100);
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
    pawnPromote();
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
        if(moves.length > 0) {
            for(var x = 0; x < moves.length; x++) {
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
}

function pawnPromote() {
    for(var i = 0; i < places.length; i++) {
        for(var j = 0; j < places[i].length; j++) {
            if(places[i][j] == "wpa" && j == 7) {
                places[i][j] = "wqu";
            }
            if(places[i][j] == "bpa" && j == 0) {
                places[i][j] = "bqu";
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
        clearInterval(board.interval);
        alert("Checkmate! White has won.");
        location.reload();
    }
    if(!whiteKing) {
        clearInterval(board.interval);
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
	var i = 0;
    switch(piece) {
		case "wpa":
			// first up
			if(coords[1] == 1) {
				if(places[coords[0]][coords[1] + 1 ] == "" && places[coords[0]][coords[1] + 2 ] == "") {
					good_moves[i] = [coords[0], coords[1] + 2];
					i++;
				}
			}
			// up
			if(coords[1] != 7) {
				if(places[coords[0]][coords[1] + 1] == "") {
					good_moves[i] = [coords[0], coords[1] + 1];
					i++;
				}
			}
			// right up
			if(coords[0] != 7 && coords[1] != 7) {
				if(places[coords[0] + 1][coords[1] + 1][0] == "b") {
					good_moves[i] = [coords[0] + 1, coords[1] + 1];
					i++;
				}
			}
			// left up
			if(coords[0] != 0 && coords[1] != 7) {
				if(places[coords[0] - 1][coords[1] + 1][0] == "b") {
					good_moves[i] = [coords[0] - 1, coords[1] + 1];
					i++;
				}
			}
			break;
		case "bpa":
			// first down
			if(coords[1] == 6) {
				if(places[coords[0]][coords[1] - 1 ] == "" && places[coords[0]][coords[1] - 2 ] == "") {
					good_moves[i] = [coords[0], coords[1] - 2];
					i++;
				}
			}
			// down
			if(coords[1] != 0) {
				if(places[coords[0]][coords[1] - 1] == "") {
					good_moves[i] = [coords[0], coords[1] - 1];
					i++;
				}
			}
			// down right
			if(coords[0] != 7 && coords[1] != 0) {
				if(places[coords[0] + 1][coords[1] - 1][0] == "w") {
					good_moves[i] = [coords[0] + 1, coords[1] - 1];
					i++;
				}
			}
			// down left
			if(coords[0] != 0 && coords[1] != 0) {
				if(places[coords[0] - 1][coords[1] - 1][0] == "w") {
					good_moves[i] = [coords[0] - 1, coords[1] - 1];
					i++;
				}
			}
			break;
        case "wkn":
        case "bkn":
            // right up
            if(coords[0] != 7 && coords[1] < 6) {
                if(places[coords[0] + 1][coords[1] + 2][0] != turn[0]) {
					good_moves[i] = [coords[0] + 1, coords[1] + 2];
					i++;
                }
            }
            // left up
            if(coords[0] != 0 && coords[1] < 6) {
                if(places[coords[0] - 1][coords[1] + 2][0] != turn[0]) {
					good_moves[i] = [coords[0] - 1, coords[1] + 2];
					i++;
                }
            }
            // right down
            if(coords[0] != 7 && coords[1] > 1) {
                if(places[coords[0] + 1][coords[1] - 2][0] != turn[0]) {
					good_moves[i] = [coords[0] + 1, coords[1] - 2];
					i++;
                }
            }
            // left down
            if(coords[0] != 0 && coords[1] > 1) {
                if(places[coords[0] - 1][coords[1] - 2][0] != turn[0]) {
					good_moves[i] = [coords[0] - 1, coords[1] - 2];
					i++;
                }
            }
            // right up (side)
            if(coords[0] < 6 && coords[1] != 7) {
                if(places[coords[0] + 2][coords[1] + 1][0] != turn[0]) {
					good_moves[i] = [coords[0] + 2, coords[1] + 1];
					i++;
                }
            }
            // left up (side)
            if(coords[0] > 1 && coords[1] != 7) {
                if(places[coords[0] - 2][coords[1] + 1][0] != turn[0]) {
					good_moves[i] = [coords[0] - 2, coords[1] + 1];
					i++;
                }
            }
            // right down (side)
            if(coords[0] < 6 && coords[1] != 0) {
                if(places[coords[0] + 2][coords[1] - 1][0] != turn[0]) {
					good_moves[i] = [coords[0] + 2, coords[1] - 1];
					i++;
                }
            }
            // left down (side)
            if(coords[0] > 1 && coords[1] != 0) {
                if(places[coords[0] - 2][coords[1] - 1][0] != turn[0]) {
					good_moves[i] = [coords[0] - 2, coords[1] - 1];
					i++;
                }
            }
            break;
        case "wro":
        case "bro":
            // up
            for(var j = 0; j < 8; j++) {
                if(j > coords[1]) {
                    if(places[coords[0]][j] == "") {
                        good_moves[i] = [coords[0], j];
                        i++;
                    } else if(places[coords[0]][j][0] != turn[0]) {
                        good_moves[i] = [coords[0], j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down
            for(var j = 7; j >= 0; j -= 1) {
                if(j < coords[1]) {
                    if(places[coords[0]][j] == "") {
                        good_moves[i] = [coords[0], j];
                        i++;
                    } else if(places[coords[0]][j][0] != turn[0]) {
                        good_moves[i] = [coords[0], j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // right
            for(var j = 0; j < 8; j++) {
                if(j > coords[0]) {
                    if(places[j][coords[1]] == "") {
                        good_moves[i] = [j, coords[1]];
                        i++;
                    } else if(places[j][coords[1]][0] != turn[0]) {
                        good_moves[i] = [j, coords[1]];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // left
            for(var j = 7; j >= 0; j -= 1) {
                if(j < coords[0]) {
                    if(places[j][coords[1]] == "") {
                        good_moves[i] = [j, coords[1]];
                        i++;
                    } else if(places[j][coords[1]][0] != turn[0]) {
                        good_moves[i] = [j, coords[1]];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
        case "wbi":
        case "bbi":
            // up right
            for(var j = 1; j < 9; j++) {
                if(coords[0] + j < 8 && coords[1] + j < 8) {
                    if(places[coords[0] + j][coords[1] + j] == "") {
                        good_moves[i] = [coords[0] + j, coords[1] + j];
                        i++;
                    } else if(places[coords[0] + j][coords[1] + j][0] != turn[0]) {
                        good_moves[i] = [coords[0] + j, coords[1] + j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // up left
            for(var j = 1; j < 9; j++) {
                if(coords[0] - j > -1 && coords[1] + j < 8) {
                    if(places[coords[0] - j][coords[1] + j] == "") {
                        good_moves[i] = [coords[0] - j, coords[1] + j];
                        i++;
                    } else if(places[coords[0] - j][coords[1] + j][0] != turn[0]) {
                        good_moves[i] = [coords[0] - j, coords[1] + j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down right
            for(var j = 1; j < 9; j++) {
                if(coords[0] + j < 8 && coords[1] - j > -1) {
                    if(places[coords[0] + j][coords[1] - j] == "") {
                        good_moves[i] = [coords[0] + j, coords[1] - j];
                        i++;
                    } else if(places[coords[0] + j][coords[1] - j][0] != turn[0]) {
                        good_moves[i] = [coords[0] + j, coords[1] - j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down left
            for(var j = 1; j < 9; j++) {
                if(coords[0] - j > -1 && coords[1] - j > -1) {
                    if(places[coords[0] - j][coords[1] - j] == "") {
                        good_moves[i] = [coords[0] - j, coords[1] - j];
                        i++;
                    } else if(places[coords[0] - j][coords[1] - j][0] != turn[0]) {
                        good_moves[i] = [coords[0] - j, coords[1] - j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            break;
        case "wqu":
        case "bqu":
            // up right
            for(var j = 1; j < 9; j++) {
                if(coords[0] + j < 8 && coords[1] + j < 8) {
                    if(places[coords[0] + j][coords[1] + j] == "") {
                        good_moves[i] = [coords[0] + j, coords[1] + j];
                        i++;
                    } else if(places[coords[0] + j][coords[1] + j][0] != turn[0]) {
                        good_moves[i] = [coords[0] + j, coords[1] + j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // up left
            for(var j = 1; j < 9; j++) {
                if(coords[0] - j > -1 && coords[1] + j < 8) {
                    if(places[coords[0] - j][coords[1] + j] == "") {
                        good_moves[i] = [coords[0] - j, coords[1] + j];
                        i++;
                    } else if(places[coords[0] - j][coords[1] + j][0] != turn[0]) {
                        good_moves[i] = [coords[0] - j, coords[1] + j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down right
            for(var j = 1; j < 9; j++) {
                if(coords[0] + j < 8 && coords[1] - j > -1) {
                    if(places[coords[0] + j][coords[1] - j] == "") {
                        good_moves[i] = [coords[0] + j, coords[1] - j];
                        i++;
                    } else if(places[coords[0] + j][coords[1] - j][0] != turn[0]) {
                        good_moves[i] = [coords[0] + j, coords[1] - j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down left
            for(var j = 1; j < 9; j++) {
                if(coords[0] - j > -1 && coords[1] - j > -1) {
                    if(places[coords[0] - j][coords[1] - j] == "") {
                        good_moves[i] = [coords[0] - j, coords[1] - j];
                        i++;
                    } else if(places[coords[0] - j][coords[1] - j][0] != turn[0]) {
                        good_moves[i] = [coords[0] - j, coords[1] - j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // up
            for(var j = 0; j < 8; j++) {
                if(j > coords[1]) {
                    if(places[coords[0]][j] == "") {
                        good_moves[i] = [coords[0], j];
                        i++;
                    } else if(places[coords[0]][j][0] != turn[0]) {
                        good_moves[i] = [coords[0], j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // down
            for(var j = 7; j >= 0; j -= 1) {
                if(j < coords[1]) {
                    if(places[coords[0]][j] == "") {
                        good_moves[i] = [coords[0], j];
                        i++;
                    } else if(places[coords[0]][j][0] != turn[0]) {
                        good_moves[i] = [coords[0], j];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // right
            for(var j = 0; j < 8; j++) {
                if(j > coords[0]) {
                    if(places[j][coords[1]] == "") {
                        good_moves[i] = [j, coords[1]];
                        i++;
                    } else if(places[j][coords[1]][0] != turn[0]) {
                        good_moves[i] = [j, coords[1]];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            // left
            for(var j = 7; j >= 0; j -= 1) {
                if(j < coords[0]) {
                    if(places[j][coords[1]] == "") {
                        good_moves[i] = [j, coords[1]];
                        i++;
                    } else if(places[j][coords[1]][0] != turn[0]) {
                        good_moves[i] = [j, coords[1]];
                        i++;
                        break;
                    } else {
                        break;
                    }
                }
            }
            break;
        case "wki":
        case "bki":
            // up
            if(coords[1] != 7) {
                if(places[coords[0]][coords[1] + 1][0] != turn[0]) {
                    good_moves[i] = [coords[0], coords[1] + 1];
                    i++;
                }
            }
            // down
            if(coords[1] != 0) {
                if(places[coords[0]][coords[1] - 1][0] != turn[0]) {
                    good_moves[i] = [coords[0], coords[1] - 1];
                    i++;
                }
            }
            // right
            if(coords[0] != 7) {
                if(places[coords[0] + 1][coords[1]][0] != turn[0]) {
                    good_moves[i] = [coords[0] + 1, coords[1]];
                    i++;
                }
            }
            // up
            if(coords[0] != 0) {
                if(places[coords[0] - 1][coords[1]][0] != turn[0]) {
                    good_moves[i] = [coords[0] - 1, coords[1]];
                    i++;
                }
            }
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