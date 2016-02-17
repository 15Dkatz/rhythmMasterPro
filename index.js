var rhythmAppPro = angular.module("rhythmAppPro", []);

rhythmAppPro.controller("rhythmProController", function($scope) {
	//48 = whole note, 24 = half note, 12 = quarter note, 6 = eigth note, 3 = sixteenth note. 8-8-8 = quarter triplet.
	var noteValues = [3, 6, 12, 24, 48];

	var generateGameRhythm = function() {
		var gameRhythm = [];
		var limit = 192;
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

	var gameRhythm = generateGameRhythm();
	console.log(gameRhythm);

	//later convert into whole and half note notation.
	$scope.gameRhythmDisplay="";
	for (var a=0; a<gameRhythm.length; a++) {
		$scope.gameRhythmDisplay+=gameRhythm[a]+" ";
	}
	//record the interval between mousedown and mouseup.
	var timeItv;
	$scope.time = 0;

	var userRhythm = [];

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
			var accuracy = compareRhythms(gameRhythm, userRhythm);
			console.log("accuracy", accuracy);
		}

	}

	// var compare = function(rhythm1, rhythm2) {}
	//figure out method to compare proportions between two arrays
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

		var result = Math.abs(rhythm1total-rhythm2total);
		//returning accuracy.
		return 10-result;

	}

	console.log(compareRhythms([1,2,3,4], [60000,120000,199999,240049]), "test 1: ~100%");
	console.log(compareRhythms([1,2,3,4], [8,8,12,25]), "test 2...");

});
