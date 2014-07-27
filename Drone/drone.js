// Global Variales
var isActive = false;
var lastX, lastY;

// Event Handlers
function onControlPadClick(event) {
	isActive = !isActive;
	event.stopPropagation();
	var controlPadMsg = $('.drone-div--control-pad-message');
	if (!isActive) {
		controlPadMsg.html('Click here to activate.');
	} else {
		controlPadMsg.html('Click here to de-activate.');
		lastX = event.clientX;
		lastY = event.clientY;
	}
}

function onKeyDown(event) {
	if (isActive) {
		var keyOutput = $('.drone-div--control-pad-keys');
		keyOutput.html(event.key);
		switch(event.keyCode) {
			case 87: // w
				sendCommand('north');
				break;
			case 65: // a
				sendCommand('west');
				break;
			case 83: // s
				sendCommand('south');
				break;
			case 68: // d
				sendCommand('east');
				break;
			case 38: // up arrow
				sendTakeOff();
				break;
			case  40: // down arrow
				sendLand();
		}
	}
}

function onKeyUp(event) {
	if (isActive) {
		var keyOutput = $('.drone-div--control-pad-keys');
		keyOutput.html('');
	}
}

function onPadMouseMove(event) {
	event.stopPropagation();
	if (isActive) {
		var diffX = lastX - event.clientX;
		var diffy = lastY - event.clientY;
		var mouseSens = $('.drone-input--mouse').val();
		if (diffX == mouseSens && diffy > mouseSens) {
			sendCommand('north');
		} else if (diffX == mouseSens && diffy < mouseSens) {
			sendCommand('south');
		} else if (diffX > mouseSens && diffy == mouseSens) {
			sendCommand('est');
		} else if (diffX < mouseSens && diffy == mouseSens) {
			sendCommand('west');
		} else if (diffX > mouseSens && diffy > mouseSens) {
			sendCommand('north-east');
		} else if (diffX > mouseSens && diffy < mouseSens) {
			sendCommand('south-east');
		} else if (diffX < mouseSens && diffy > mouseSens) {
			sendCommand('north-west');
		} else if (diffX < mouseSens && diffy < mouseSens) {
			sendCommand('south-west');
		}
		lastX = event.clientX;
		lastY = event.clientY;
	}
}

function onPadMouseOver(event) {
	event.stopPropagation();
	lastX = event.clientX;
	lastY = event.clientY;
}

function onPadMouseOut(event){
	
}

// Utlity Methods
/**
 * Sends the AJAX command to the host
 * @param {Object} data the move commands
 */
var sendCommand = function(data) {
	var hostname = $('.drone-input--hostname').val();
	var port = $('.drone-input--port').val();
	$.post('http://' + hostname + ':' + port + '/' + data);
};

var sendTakeOff = function () {
    var hostname = $('.drone-input--hostname').val();
	var port = $('.drone-input--port').val();
	$.post('http://' + hostname + ':' + port + '/takeoff');
};

var sendLand = function() {
	var hostname = $('.drone-input--hostname').val();
	var port = $('.drone-input--port').val();
	$.post('http://' + hostname + ':' + port + '/land');
};
