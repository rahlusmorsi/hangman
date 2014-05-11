$(function() {
	// Bind universal events that appear on every page
	$('.guessletter button').bind( 'click', processGuess );
	$('#reset').bind( 'click', resetGame );
});

if (!getCookie('hungword')){
	resetGame();
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
	
		// add to hungright Cookie
		var $hungright = getCookie('hungright');
		$hungright = ($hungright == null) ? $guess : $hungright + $guess;  //if Cookie is empty, put guess in, else add guess to existing
		setCookie('hungright',$hungright,5);
	
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
	
	else{
		updateGallows($guess);
	}
}

function drawWord() {

	var $correct = getCookie('hungright'); // get the correct tries
	var $hungword = getCookie('hungword'); // get the hangman! word
	var $hungWordArray = $hungword.split("");	
				
	$.each($hungWordArray,function(i,l){
		 $("#word").append("<span id=" + i + " class='letter'><span class='hide'>" + l + "</span></span>");
	});

}

function initWord() {
	var $a = new Array('abate','aberrant','abscond','accolade','acerbic','acumen','adulation','adulterate','aesthetic','aggrandize','alacrity','alchemy','amalgamate','ameliorate','amenable','anachronism','anomaly','approbation','archaic','arduous','ascetic','assuage','astringent','audacious','austere','avarice','aver','axiom','bolster','bombast','bombastic','bucolic','burgeon','cacophony','canon','canonical','capricious','castigation','catalyst','caustic','censure','chary','chicanery','cogent','complaisance','connoisseur','contentious','contrite','convention','convoluted','credulous','culpable','cynicism','dearth','decorum','demur','derision','desiccate','diatribe','didactic','dilettante','disabuse','discordant','discretion','disinterested','disparage','disparate','dissemble','divulge','dogmatic','ebullience','eccentric','eclectic','effrontery','elegy','eloquent','emollient','empirical','endemic','enervate','enigmatic','ennui','ephemeral','equivocate','erudite','esoteric','eulogy','evanescent','exacerbate','exculpate','exigent','exonerate','extemporaneous','facetious','fallacy','fawn','fervent','filibuster','flout','fortuitous','fulminate','furtive','garrulous','germane','glib','grandiloquence','gregarious','hackneyed','halcyon','harangue','hedonism','hegemony','heretical','hubris','hyperbole','iconoclast','idolatrous','imminent','immutable','impassive','impecunious','imperturbable','impetuous','implacable','impunity','inchoate','incipient','indifferent','inert','infelicitous','ingenuous','inimical','innocuous','insipid','intractable','intransigent','intrepid','inured','inveigle','irascible','laconic','laud','loquacious','lucid','luminous','magnanimity','malevolent','malleable','martial','maverick','mendacity','mercurial','meticulous','misanthrope','mitigate','mollify','morose','mundane','nebulous','neologism','neophyte','noxious','obdurate','obfuscate','obsequious','obstinate','obtuse','obviate','occlude','odious','onerous','opaque','opprobrium','oscillation','ostentatious','paean','parody','pedagogy','pedantic','penurious','penury','perennial','perfidy','perfunctory','pernicious','perspicacious','peruse','pervade','pervasive','phlegmatic','pine','pious','pirate','pith','pithy','placate','platitude','plethora','plummet','polemical','pragmatic','prattle','precipitate','precursor','predilection','preen','prescience','presumptuous','prevaricate','pristine','probity','proclivity','prodigal','prodigious','profligate','profuse','proliferate','prolific','propensity','prosaic','pungent','putrefy','quaff','qualm','querulous','query','quiescence','quixotic','quotidian','rancorous','rarefy','recalcitrant','recant','recondite','redoubtable','refulgent','refute','relegate','renege','repudiate','rescind','reticent','reverent','rhetoric','salubrious','sanction','satire','sedulous','shard','solicitous','solvent','soporific','sordid','sparse','specious','spendthrift','sporadic','spurious','squalid','squander','static','stoic','stupefy','stymie','subpoena','subtle','succinct','superfluous','supplant','surfeit','synthesis','tacit','tenacity','terse','tirade','torpid','torque','tortuous','tout','transient','trenchant','truculent','ubiquitous','unfeigned','untenable','urbane','vacillate','variegated','veracity','vexation','vigilant','vilify','virulent','viscous','vituperate','volatile','voracious','waver','zealous');
	var $word=($a[parseInt(Math.random()* $a.length)]);
	setCookie('hungword',$word,5);
}

function resetGame() {
	deleteCookie("hungword");
	deleteCookie("hungright");
	deleteCookie("hungwrong");
	initWord();
	location.reload(true);
}

function saveGuess($guess) {
	var $word = getCookie('hungword');
	var $priorGood = getCookie('hungright');
	var $priorBad = getCookie('hungwrong');
}

function updateGallows($wrongGuess) {
	
	$hungwrong = getCookie('hungwrong');
	$hungwrong = ($hungwrong == null) ? $wrongGuess : $hungwrong + $wrongGuess;  //if Cookie is empty, put guess in, else add guess to existing
	setCookie('hungwrong',$hungwrong,5);
	$howdead = $hungwrong.length;	
	
	switch ($howdead){
	case 1:
		ctx.fillText("0",90,45);	//head
		break;
	case 2:
		ctx.fillText("|",95,65);	//body
		break;
	case 3:
		ctx.fillText("/",90,70);	//left arm
		break;
	case 4:
		ctx.fillText("\\",100,70);	//right arm
		break;
	case 5:
		ctx.fillText("/",90,92);	//left leg
		break;
	case 6:
		ctx.fillText("\\",100,92);	//right leg
	}
}


//#########################################################

window.onload = drawWord();

var canvas=document.getElementById('gallows');
var ctx=canvas.getContext('2d');

//draw empty gallows
ctx.moveTo(10,150);
ctx.lineTo(10,10);
ctx.lineTo(100,10);
ctx.lineTo(100,50);
ctx.stroke();

ctx.font = "30px Arial";
ctx.textBaseline = "top";