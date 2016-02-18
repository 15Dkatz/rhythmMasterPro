var userDisplay = false;
var currentPage=1;

$(document).ready(function() {
	// var currentPage = 1;

	// $(document).click(function() {
	// 	if (currentPage===1) {
	// 		// $(".page").addClass("animated fadeOut show");
	// 		$("#page2").addClass("animated fadeIn show");
	// 		$("#page1").addClass("animated fadeOut");
	// 		currentPage+=1;
	// 	}

	// })
})



var rhythmAppPro = angular.module("rhythmAppPro", []);

rhythmAppPro.controller("rhythmProController", function($scope) {
	//48 = whole note, 24 = half note, 12 = quarter note, 6 = eigth note, 3 = sixteenth note. 8-8-8 = quarter triplet.
	var noteValues = [3, 6, 12, 24, 48];

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
			//pick random noteValue
			var randIndex = Math.floor(Math.random()*4);
			if (limit<48) {
				randIndex = Math.floor(Math.random()*3);
			}
			if (limit<24) {
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

	//later convert into whole and half note notation.
	// for (var a=0; a<gameRhythm.length; a++) {
	// 	$scope.gameRhythmDisplay+=gameRhythm[a]+" ";
	// }
	//record the interval between mousedown and mouseup.
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
			userDisplay=true;
			$("#page2").addClass("animated fadeOut lowZ");
			$("#page2").removeClass("highZ");
			$("#page3").removeClass("fadeOut");
			$("#page3").addClass("animated fadeIn show highZ");
			currentPage=3;
		}

	}

	var gameRhythm;
	$scope.gameRhythmDisplay="";

	var page3topage2 = function() {
		$("#page3").addClass("fadeOut lowZ");
		$("#page3").removeClass("highZ");
		$("#page2").removeClass("fadeOut lowZ");
		$("#page2").addClass("fadeIn show highZ");
		currentPage=2;
	}
	
	$scope.generateGRhythm = function() {
		gameRhythm = generateGameRhythm($scope.globalLevel);
		$scope.gameRhythmDisplay="";	
		console.log(gameRhythm);
		for (var a=0; a<gameRhythm.length; a++) {
			$scope.gameRhythmDisplay+=gameRhythm[a]+" ";
		}
		userRhythm = [];
		if (currentPage===1) {
 			$("#page2").addClass("animated fadeIn show");
			$("#page1").addClass("animated fadeOut");
			currentPage=2;
		} else if (currentPage===3) {
			page3topage2();
		}
	}

	$scope.tryAgain = function() {
		userRhythm=[];
		page3topage2();
	}
	//!!when accuracy shown, clear the userRhythm for a new exercise.

	// var compare = function(rhythm1, rhythm2) {}
	//figure out method to compare proportions between two arrays

	//not that accurate yet... figure outa  better algorithm.
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

		//accuracy! - round to two decimal places.
		if (rhythm1total/rhythm2total>0&&rhythm1total/rhythm2total<1) {
			return rhythm1total/rhythm2total;
		} else {
			return rhythm2total/rhythm1total;
		}
	}






	//debugging
	console.log(compareRhythms([1,2,3,4], [60000,120000,180000,240000]), "test 1: ~100%");
	console.log(compareRhythms([1,2,3,4], [8,8,12,25]), "test 2...");
	console.log(compareRhythms([1,2,3,4], [3,6,9,255]), "test 2...");

});
