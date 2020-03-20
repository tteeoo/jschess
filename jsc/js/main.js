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
		    this.context.fillStyle = "grey";
		} else {
		    this.context.fillStyle = "brown";
		}
		this.context.fillRect(i * 64, j * 64, 64, 64);
	    }
	}
    }
}

function startGame() {
    var whitePieces = [];
    var blackPieces = [];

    var places = {
	a: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	b: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	c: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	d: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	e: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	f: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	g: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""},
	h: {"one": "", "two": "", "thr": "", "fou": "", "fiv": "", "six": "", "sev": "", "eig": ""}
    };

    board.start();
    
    board.canvas.addEventListener("mousedown", function(e) {
	getCursorPos(board.canvas, e)
    });
}

function updateBoard() {
    board.draw();
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

function piece(type, color, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
}

startGame();
