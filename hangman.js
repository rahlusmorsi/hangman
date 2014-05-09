if (!getCookie('hungword')){
	RESET_GAME();
}
	
//#COOKIE FUNCTIONS#######################################################
function setCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function deleteCookie(name) {
	setCookie(name,"",-1);
}

//#INTERACTION FUNCTIONS#######################################################
function processGuess(evt) {
	var $guess = evt.currentTarget.id; // accept guess into variable
	var $hungword = getCookie('hungword'); // get the hangman! word

	// hide used button
	$('#' + $guess).addClass("hide");




//locate guess in hungword
// if guess exists in hungword
	if($hungword.indexOf($guess) >= 0){
//		alert($guess + ' was in hungword');
	
		// add variable to hungright Cookie
		var $hungright = getCookie('hungright');
		$hungright = ($hungright == null) ? $guess : $hungright + $guess;  //if Cookie is empty, put guess in, else add guess to existing
		setCookie('hungright',$hungright,5);
//		alert(' hungright cookie is now ' + $hungright);
	
	
	//PERHAPS THIS IS THE START OF A NEW FUNCTION... UPDATE BOARD
		var $hungword = getCookie('hungword'); // get the hangman! word
		//find the position of correct guess in hangman! word
		var $hungWordArray = $hungword.split("");
		$.each($hungWordArray,function(i,l){
			if ($hungright.indexOf(l) >= 0){
				// change class of that id to visible
				$('#' + i).addClass('visible');
			}
		});
	}
	
//else add variable to hungwrong Cookie
	else{
//		alert($guess + ' was NOT in hungword');

	//increment howdead
		UPDATE_GALLOWS($guess);
	
	}
}


//########################################################
function DRAW_WORD() {

	var $correct = getCookie('hungright'); // get the correct tries
	var $hungword = getCookie('hungword'); // get the hangman! word
	var $hungWordArray = $hungword.split("");	
				
// ITERATE THROUGH EACH LETTER IN THE ARRAY
	$.each($hungWordArray,function(i,l){
		 $("#word").append("<span id=" + i + " class='letter'><span class='hide'>" + l + "</span></span>");
	});

}

//INIT_WORD#########################################################
function INIT_WORD() {
	
	var $a = new Array('abate','aberrant','abscond','accolade','acerbic','acumen','adulation','adulterate','aesthetic','aggrandize','alacrity','alchemy','amalgamate','ameliorate','amenable','anachronism','anomaly','approbation','archaic','arduous','ascetic','assuage','astringent','audacious','austere','avarice','aver','axiom','bolster','bombast','bombastic','bucolic','burgeon','cacophony','canon','canonical','capricious','castigation','catalyst','caustic','censure','chary','chicanery','cogent','complaisance','connoisseur','contentious','contrite','convention','convoluted','credulous','culpable','cynicism','dearth','decorum','demur','derision','desiccate','diatribe','didactic','dilettante','disabuse','discordant','discretion','disinterested','disparage','disparate','dissemble','divulge','dogmatic','ebullience','eccentric','eclectic','effrontery','elegy','eloquent','emollient','empirical','endemic','enervate','enigmatic','ennui','ephemeral','equivocate','erudite','esoteric','eulogy','evanescent','exacerbate','exculpate','exigent','exonerate','extemporaneous','facetious','fallacy','fawn','fervent','filibuster','flout','fortuitous','fulminate','furtive','garrulous','germane','glib','grandiloquence','gregarious','hackneyed','halcyon','harangue','hedonism','hegemony','heretical','hubris','hyperbole','iconoclast','idolatrous','imminent','immutable','impassive','impecunious','imperturbable','impetuous','implacable','impunity','inchoate','incipient','indifferent','inert','infelicitous','ingenuous','inimical','innocuous','insipid','intractable','intransigent','intrepid','inured','inveigle','irascible','laconic','laud','loquacious','lucid','luminous','magnanimity','malevolent','malleable','martial','maverick','mendacity','mercurial','meticulous','misanthrope','mitigate','mollify','morose','mundane','nebulous','neologism','neophyte','noxious','obdurate','obfuscate','obsequious','obstinate','obtuse','obviate','occlude','odious','onerous','opaque','opprobrium','oscillation','ostentatious','paean','parody','pedagogy','pedantic','penurious','penury','perennial','perfidy','perfunctory','pernicious','perspicacious','peruse','pervade','pervasive','phlegmatic','pine','pious','pirate','pith','pithy','placate','platitude','plethora','plummet','polemical','pragmatic','prattle','precipitate','precursor','predilection','preen','prescience','presumptuous','prevaricate','pristine','probity','proclivity','prodigal','prodigious','profligate','profuse','proliferate','prolific','propensity','prosaic','pungent','putrefy','quaff','qualm','querulous','query','quiescence','quixotic','quotidian','rancorous','rarefy','recalcitrant','recant','recondite','redoubtable','refulgent','refute','relegate','renege','repudiate','rescind','reticent','reverent','rhetoric','salubrious','sanction','satire','sedulous','shard','solicitous','solvent','soporific','sordid','sparse','specious','spendthrift','sporadic','spurious','squalid','squander','static','stoic','stupefy','stymie','subpoena','subtle','succinct','superfluous','supplant','surfeit','synthesis','tacit','tenacity','terse','tirade','torpid','torque','tortuous','tout','transient','trenchant','truculent','ubiquitous','unfeigned','untenable','urbane','vacillate','variegated','veracity','vexation','vigilant','vilify','virulent','viscous','vituperate','volatile','voracious','waver','zealous');
	
	var $word=($a[parseInt(Math.random()* $a.length)]);
	
	setCookie('hungword',$word,5);

}


//RESET_GAME#########################################################
function RESET_GAME() {
	deleteCookie("hungword");
	deleteCookie("hungright");
	deleteCookie("hungwrong");
	$("#head").removeClass("visible");
	$("#larm").removeClass("visible");
	$("#torso").removeClass("visible");
	$("#rarm").removeClass("visible");
	$("#lleg").removeClass("visible");
	$("#rleg").removeClass("visible");
	INIT_WORD();
	location.reload(true);
}


//#########################################################
function SAVE_GUESS($guess) {
	var $word = getCookie('hungword');
	var $priorGood = getCookie('hungright');
	var $priorBad = getCookie('hungwrong');
	
	
	/*if (strstr($word, $guess)) {
		
		if (!strstr($priorGood, $guess)) {
			setcookie("hungright", $priorGood.$guess, 5);
		}
	}
	else {
		if (!strstr($priorBad, $guess)) {
			setcookie("hungwrong", $priorBad.$guess, 5);
		}
	}*/

}

//DRAW GALLOWS########################################################
function UPDATE_GALLOWS($wrongGuess) {
	
	$hungwrong = getCookie('hungwrong');
	$hungwrong = ($hungwrong == null) ? $wrongGuess : $hungwrong + $wrongGuess;  //if Cookie is empty, put guess in, else add guess to existing
	setCookie('hungwrong',$hungwrong,5);
	$howdead = $hungwrong.length;
//			alert('hungwrong is now ' + $hungwrong.length + ' long, and contains ' + $hungwrong);
	
	
	switch ($howdead){
	case 1:
		$("#head").addClass("visible");
		break;
	case 2:
		$("#larm").addClass("visible");
		break;
	case 3:
		$("#torso").addClass("visible");
		break;
	case 4:
		$("#rarm").addClass("visible");
		break;
	case 5:
		$("#lleg").addClass("visible");
		break;
	case 6:
		$("#rleg").addClass("visible");
	}
}


//#########################################################


window.onload = DRAW_WORD();