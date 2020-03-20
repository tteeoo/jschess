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
    board.start();
    
    board.canvas.addEventListener("mousedown", function(e) {
	getCursorPos(board.canvas, e)
    });
}

function updateBoard() {
    board.draw();
}

function getPlace(letter, number) {
    var index;

    switch(letter) {
	case "a":
	    index = 0;
	    break;
	case "b":
	    index = 1;
	    break;
	case "c":
	    index = 2;
	    break;
	case "d":
	    index = 3;
	    break;
	case "e":
	    index = 4;
	    break;
	case "f":
	    index = 5;
	    break;
	case "g":
	    index = 6;
	    break;
	case "h":
	    index = 7;
	    break;
	default:
	    index = 0;
	    break;
    }
    
    return(places[index][number - 1]);
}

function coordsToAN(x, y) {
    var letter;
    var number;

    if(0 <= x && x < 64) {
	letter = "a";
    } else if (64 <= x && x < 128) {
	letter = "b";
    } else if (128 <= x && x < 192) {
	letter = "c";
    } else if (192 <= x && x < 256) {
	letter = "d";
    } else if (256 <= x && x < 320) {
	letter = "e";
    } else if (320 <= x && x < 384) {
	letter = "f";
    } else if (384 <= x && x < 448) {
	letter = "g";
    } else if (448 <= x && x < 512) {
	letter = "h";
    } else {
	letter = "a";
    }

    if(0 <= y && y < 64) {
	number = 8;
    } else if (64 <= y && y < 128) {
	number = 7;
    } else if (128 <= y && y < 192) {
	number = 6;
    } else if (192 <= y && y < 256) {
	number = 5;
    } else if (256 <= y && y < 320) {
	number = 4;
    } else if (320 <= y && y < 384) {
	number = 3;
    } else if (384 <= y && y < 448) {
	number = 2;
    } else if (448 <= y && y < 512) {
	number = 1;
    } else {
	number = 8;
    }

    return([letter, number]);
	
}

function piece(type, color) {
    this.type = type;
    this.color = color;
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
