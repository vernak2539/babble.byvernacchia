(function() {
	// mercilessly taken from http://www.zomb.io/
	"use strict";

	var bubbleCan;
	var bubbleC;
	var docBody;

	window.onload = function() {
		docBody = document.getElementById('contentBody');
		bubbleCan = document.getElementById("sharingIsCaring");
		bubbleC = bubbleCan.getContext("2d");

		bubbleCan.width = window.innerWidth;
		bubbleCan.height = docBody.clientHeight;

		var bubbles = [];
		var bubTime = 1;

		function addBubble() {
			setTimeout(function() {
				bubbles.push({opacity:1, size:0, x:Math.random()*bubbleCan.width+1, y:Math.random()*bubbleCan.height+1});
				bubTime = Math.random()*2+1;
				addBubble();
			}, bubTime*1000);
		}
		addBubble();

		setInterval(function() {
			update();
			draw();
		}, 1000/60);

		function update() {
			for(var i=0; i<bubbles.length; i++) {
				if(bubbles[i].size > 10) {
					bubbles[i].opacity -= 0.01;
				}

				if(bubbles[i].size > 20) {
					bubbles.splice(i, 1);
				}
				else {
					bubbles[i].size += 0.1;
				}
			}
		}

		function draw() {
			bubbleC.fillStyle = "#fff";
			bubbleC.fillRect(0,0,bubbleCan.width,bubbleCan.height);

			bubbleC.strokeStyle = "#cd4128";
			bubbleC.lineWidth = 2;
			for(var i=0; i<bubbles.length; i++) {
				bubbleC.globalAlpha = bubbles[i].opacity;
				bubbleC.beginPath();
				bubbleC.arc(bubbles[i].x,bubbles[i].y,bubbles[i].size,0,2*Math.PI);
				bubbleC.stroke();
				bubbleC.globalAlpha = 1;
			}
		}

	};

	window.onresize = function() {
		docBody = document.getElementById('contentBody');
		bubbleCan.height = docBody.clientHeight;
		bubbleCan.width = window.innerWidth;
	};
})();