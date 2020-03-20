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
}

function updateBoard() {
    board.draw();
}

function piece(type, color, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
}

startGame();
