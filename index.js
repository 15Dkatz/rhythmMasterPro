// var userDisplay = false;
var currentPage=1;


var page3topage2 = function() {
	$("#page3").addClass("fadeOut lowZ");
	$("#page3").removeClass("highZ");
	$("#page2").removeClass("lowZ");
	$("#page2").addClass("highZ");
	currentPage=2;
}

var page1topage2 = function() {
	$("#page2").addClass("animated fadeIn show");
	$("#page1").addClass("animated fadeOut");
	currentPage=2;
}

$(document).ready(function() {
})



var rhythmAppPro = angular.module("rhythmAppPro", []);

rhythmAppPro.controller("rhythmProController", function($scope) {
	//48 = whole note, 24 = half note, 12 = quarter note, 6 = eigth note, 3 = sixteenth note. 8-8-8 = quarter triplet.
	var noteValues = [3, 6, 12, 18, 24, 36, 48];

	$scope.globalLevel=1;

	$scope.changeLevel = function() {
		if ($scope.globalLevel===3) {
			$scope.globalLevel=0
		}
		$scope.globalLevel++;
	}

	var generateGameRhythm = function(level) {
		var gameRhythm = [];
		// var limit = 192;
		if (level===1) {
			limit=72;
		} else if (level===2) {
			limit = 96;
		} else {
			limit = 192;
		}
		var randIndex;
		var total=0;
		while (limit>0) {
			var randIndex = Math.floor(Math.random()*6);
			if (limit<48) {
				randIndex = Math.floor(Math.random()*5);
			}
			if (limit<36) {
				randIndex = Math.floor(Math.random()*4);
			}
			if (limit<24) {
				randIndex = Math.floor(Math.random()*3);
			}
			if (limit<18) {
				randIndex = Math.floor(Math.random()*2);
			}
			if (limit<12) {
				randIndex = Math.floor(Math.random()*1);
			}
			if (limit<6) {
				randIndex = Math.floor(Math.random());
			}
			var randNoteVal = noteValues[randIndex];
			
			if (randNoteVal!=24) {
				gameRhythm.push(randNoteVal);
			} else {
				randChance = Math.random();
				if (randChance>.33) {
					gameRhythm.push(randNoteVal)
				} else {
					for (var i=0; i<3; i++) {
						gameRhythm.push(8);
					}
				}
			}
			total+=randNoteVal;
			limit -= randNoteVal;

		}
		console.log(total);
		return gameRhythm;
	}

	var timeItv;
	$scope.time = 0;

	var userRhythm = [];

	$scope.accuracy;

	var incrementTime = function() {
		$scope.time+=1;
	}

	$scope.startTime = function() {
		timeItv = setInterval(incrementTime, 10);
	}

	$scope.stopTime = function() {
		//append time to a userRhythmArray here
		// console.log($scope.time, "current userRhythmArray:", userRhythm);
		console.log(userRhythm.length, "UR l")
		userRhythm.push($scope.time);
		clearInterval(timeItv);
		$scope.time=0;
		if (userRhythm.length == gameRhythm.length) {
			console.log("compare", gameRhythm, "to", userRhythm)
			console.log("run the compare function!");
			var accuracy = (compareRhythms(gameRhythm, userRhythm)*100).toFixed(2);
			console.log("accuracy", accuracy);
			$scope.accuracy=accuracy;
			// userDisplay=true;
			currentPage=3;
			console.log(currentPage, "cp3");
			$("#page2").addClass("lowZ");
			$("#page2").removeClass("highZ");
			$("#page3").removeClass("fadeOut");
			$("#page3").addClass("animated fadeIn show highZ");
			// currentPage=3;
		}

	}

	var gameRhythm;
	$scope.gameRhythmDisplay="";


	// var noteValues = [3, 6, 12, 18, 24, 36, 48];

	var numPairs = {
		3: "s",
		6: "e",
		12: "q",
		18: "q.",
		24: "h",
		36: "h.",
		48: "w",

	}

	var rhythmDisplay = function(rhythm) {
		var rhythmDisplay = "$4 \u00A0";
		for (var i=0; i<rhythm.length; i++) {
			var letter;
			if (rhythm[i]===8) {
				rhythmDisplay+= "Pqqq";
				i+=2;
			}
			else if ((i<rhythm.length-3)&&((rhythm[i]===3)&&(rhythm[i+1]===3)&&(rhythm[i+2]===3)&&(rhythm[i+3]===3))) {
				rhythmDisplay+="dffg";
				i+=3;
			}
			else if ((i<rhythm.length-2)&&((rhythm[i]===3)&&(rhythm[i+1]===3)&&(rhythm[i+2]===6))) {
				rhythmDisplay+="dgy";
				i+=2;
			}
			else if ((i<rhythm.length-2)&&((rhythm[i]===6)&&(rhythm[i+1]===3)&&(rhythm[i+2]===3))) {
				rhythmDisplay+="rdg";
				i+=2;
			}
			else if ((i<rhythm.length-1)&&((rhythm[i]===6)&&(rhythm[i+1]===6))) {
				rhythmDisplay+="ry";
				i+=1;
			} 
			else if ((i<rhythm.length-1)&&((rhythm[i]===3)&&(rhythm[i+1]===3))) {
				rhythmDisplay+="dg";
				i+=1;
			}       
			else {
				letter = numPairs[rhythm[i]];
				// 15% chance of rest instead of normal note
				var randRest = Math.random();
				if (randRest<=.15) {
					letter = letter.toUpperCase();
					// remove restNote and go back an index
					// gameRhythm.splice(i,1);
					rhythm.splice(i, 1);
					gameRhythm = rhythm;
					i-=1;
					// gameRhythm[i] = 1;
				}
				rhythmDisplay += letter;
				letter = letter.toLowerCase();
			}
			
			switch(letter) {
				case "e":
					rhythmDisplay += "\u00A0";
					break;
				case "q":
					rhythmDisplay += "\u00A0\u00A0";
					break;
				case "q.":
					rhythmDisplay += "\u00A0\u00A0\u00A0";
					break;
				case "h":
					rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0";
					break;
				case "h.":
					rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
					break;
				case "w":
					rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
					break;
				default:
					rhythmDisplay += "";
					break;	
			}
		}
		console.log(rhythmDisplay, "rd");
		return rhythmDisplay;
	}

	var randBackground = ["green", "orange", "deep-orange", "light-blue", "teal", "blue", "red", "pink"];
	var previous=undefined;
	
	$scope.generateGRhythm = function() {
		//debugging
		console.log(currentPage, "CP");
		gameRhythm = generateGameRhythm($scope.globalLevel);
		$scope.gameRhythmDisplay=rhythmDisplay(gameRhythm);	
		console.log(gameRhythm);

		if (previous!=undefined) {
			$("#page2").removeClass(previous);
		}

		var randBIndex = Math.floor(Math.random()*randBackground.length);
		$("#page2").addClass(randBackground[randBIndex]);
		previous = randBackground[randBIndex];

		

		userRhythm = [];
		if (currentPage===1) {
 			page1topage2();
		} else if (currentPage===3) {
			page3topage2();
		}
	}

	$scope.tryAgain = function() {
		userRhythm=[];
		page3topage2();
	}

	var compareRhythms = function(rhythm1, rhythm2) {
		var rhythm1Divisor = rhythm1[0];
		var rhythm1total = 0;
		for (var r1=0; r1<rhythm1.length; r1++) {
			rhythm1total+=(rhythm1[r1]/rhythm1Divisor);
		}

		var rhythm2Divisor = rhythm2[0];
		var rhythm2total = 0;
		for (var r2=0; r2<rhythm2.length; r2++) {
			rhythm2total+=(rhythm2[r2]/rhythm2Divisor);
		}

		if (rhythm1total/rhythm2total>0&&rhythm1total/rhythm2total<1) {
			return rhythm1total/rhythm2total;
		} else {
			return rhythm2total/rhythm1total;
		}
	}



	//debugging
	// $scope.test= rhythmDisplay([8,8,8,3,3,3,3,3,3,6,6,3,3, 3, 3, 6, 3, 3, 3, 6, 6])
	// console.log(compareRhythms([1,2,3,4], [60000,120000,180000,240000]), "test 1: ~100%");
	// console.log(compareRhythms([1,2,3,4], [8,8,12,25]), "test 2...");
	// console.log(compareRhythms([1,2,3,4], [3,6,9,255]), "test 2...");

});

//animation that creates a hovering circle as you hold down the mouse. A sustained pulsation to signal the length of hold.
