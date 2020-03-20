function getCursorPos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(coordsToAN(x, y));
}

var board = {
    canvas: document.createElement("canvas"),
    start: function() {
	this.canvas.width = 512;
	this.canvas.height = 512;
	this.canvas.id = "main";
	this.context = this.canvas.getContext("2d");
	document.getElementById("chess").appendChild(this.canvas);
	this.interval = setInterval(updateBoard(), 20);
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
    pawn = new piece("pawn", "black", "a", 8);
    board.start();
    
    board.canvas.addEventListener("mousedown", function(e) {
	getCursorPos(board.canvas, e)
    });
}

function updateBoard() {
    board.draw();
    //pawn.draw();
}

function piece(type, color, letter, number) {
    this.type = type;
    this.color = color;
    this.image = new Image();
    if(color == "white") {
	this.image.src = "img/w" + type + ".png";
    } else {
	this.image.src = "img/" + type + ".png";
    }
    this.draw = function() {
	ctx = board.context;
	ctx.drawImage(this.image, ANToCoords(letter, number)[0], ANToCoords(letter, number)[1], 64, 64);
    }
}

var whitePieces = [];
var blackPieces = [];

var places = [
	// 1   2   3   4   5   6   7   8
    /*a*/ ["", "", "", "", "", "", "", ""],
    /*b*/ ["", "", "", "", "", "", "", ""],
    /*c*/ ["", "", "", "", "", "", "", ""],
    /*d*/ ["", "", "", "", "", "", "", ""],
    /*e*/ ["", "", "", "", "", "", "", ""],
    /*f*/ ["", "", "", "", "", "", "", ""],
    /*g*/ ["", "", "", "", "", "", "", ""],
    /*h*/ ["", "", "", "", "", "", "", ""]
];

startGame();
pawn.draw();
