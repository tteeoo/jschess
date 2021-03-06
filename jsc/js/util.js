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
    
    return([index, number - 1]);
}

function placeToAN(letterin, numberin) {
    var letter;

    switch(letterin) {
	case 0:
	    letter = "a";
	    break;
	case 1:
	    letter = "b";
	    break;
	case 2:
	    letter = "c";
	    break;
	case 3:
	    letter = "d";
	    break;
	case 4:
	    letter = "e";
	    break;
	case 5:
	    letter = "f";
	    break;
	case 6:
	    letter = "g";
	    break;
	case 7:
	    letter = "h";
	    break;
	default:
	    letter = "a";
	    break;
    }
    
    return([letter, numberin + 1]);
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

function ANToCoords(letter, number) {
    var x;
    var y;

    switch(letter) {
	case "a":
	    x = 0;
	    break;
	case "b":
	    x = 64;
	    break;
	case "c":
	    x = 128;
	    break;
	case "d":
	    x = 192;
	    break;
	case "e":
	    x = 256;
	    break;
	case "f":
	    x = 320;
	    break;
	case "g":
	    x = 384;
	    break;
	case "h":
	    x = 448;
	    break;
	default:
	    x = 0;
	    break;
    }
    
    switch(number) {
	case 8:
	    y = 0;
	    break;
	case 7:
	    y = 64;
	    break;
	case 6:
	    y = 128;
	    break;
	case 5:
	    y = 192;
	    break;
	case 4:
	    y = 256;
	    break;
	case 3:
	    y = 320;
	    break;
	case 2:
	    y = 384;
	    break;
	case 1:
	    y = 448;
	    break;
	default:
	    y = 0;
	    break;
    }

    return([x, y]);
}
