$(function(){

	var First = $("#start-scene");
	var tit = $(".title").find("h1");
	var tit_re = $(".title-reverse").find("p");
	var sirudora = $(".sirudora");
	var enter = $(".start-menu").find("p");
	var titHeight = 98;

	var prelude = new Audio();

	function firstInit(){

		prelude.src = "music/prelude.mp3";
		prelude.play();

		First.css({
			opacity : 0
		})

		sirudora.css({
			opacity : 0
		});

		enter.css({
			opacity : 0
		});

		tit.css({
			top : titHeight
		});

		tit_re.css({
			top : -titHeight
		});

	}

	function firstScene(){

		First.fadeTo(10000,1,function(){
			tit.animate({
				top : 0
			},3000,function(){
				sirudora.fadeTo(3000,1,function(){
					enter.fadeTo(3000,1);
				});
			});

			tit_re.animate({
				top : 0
			},3000);
		});
	}

	function firstToSecond(){
		var timer;
		var count = 1;
		var battle_start = new Audio();

		battle_start.src = "music/battle-start.wav";
		

		enter.on("click",function(){
			First.fadeOut(3000);
			
			timer = setInterval(function(){

				prelude.volume = count;
				count -= 0.1;

				if(count < 0){
					clearInterval(timer);
					prelude.pause();
					battle_start.play();

					setTimeout(function(){
						secondInit();
					},1800);
					
				}

			},300);
			
		});
	}

	var giruWordFirst = [
	"「よう、バッツ！！」",
	"「突然で悪いが」",
	"「今日はじゃんけんで勝負だ！！」",
	"「え、なんでかって？」",
	"「ジーズアカデミーの課題なんだよ！」",
	"「まあ・・・なんていうか」",
	"「今日だけはつきあってくれ！」",
	"「ああ、ありがとな！」",
	"「一応ルールを説明するぞ」",
	"「先に3回勝ったほうが勝ちだ」",
	"「ずるはなしだぞ！」",
	"「いくぜ！！」"
	];

	// var giruWordFirst = [

	// "test",
	// "test"

	// ];

	var textArea = $(".text-voice");
	var command = $(".command");
	var commnadHeight = 20 + "%";
	var hand = command.find("p");

	var Second = $("#battle-scene");
	var enemy = $("#img-enemy");
	var enemy_out = -220;
	var enemy_in = 120;

	var big = new Audio();

	function secondInit(){
		
		var timer;
		var count = 1;
		big.src = "music/big.mp3";
		big.volume = 1;
		big.play();

		enemy.css({
			left : enemy_out
		});

		command.hide();
		textArea.hide();

		Second.delay(2500).fadeIn(800);

		enemy.delay(3000).animate({
			left : enemy_in
		},100,function(){

			textArea.show();
			textArea.text(giruWordFirst[0]);

			timer = setInterval(function(){

				textArea.text(giruWordFirst[count]);
				count++;

				if(count > giruWordFirst.length){
					clearInterval(timer);
					textArea.hide();
					command.show();
				}

			},3000);
		});

		commandClick();
	}

	function commandClick(){

		command.find("p").on("click",function(){
			var $this = $(this);
			var id = $this.attr("id");
			var yourChoice;

			switch(id){
				case "goo":
					yourChoice = 0;
					judge_goo(yourChoice);
					break;
				case "tyoki":
					yourChoice = 1;
					judge_tyoki(yourChoice);
					break;
				case "pa":
					yourChoice = 2;
					judge_goo(yourChoice);
					break;
				default:
				break;
			}

		});
	}


	function randomReturn(){
		var random = Math.floor(Math.random()* 3);
		return random;
	}

	function judge_goo(yourChoice){

		var random = randomReturn();
		var judge = undefined;


		if(random === 0){
			console.log("あいこ");
		}else if(random === 1){
			console.log("かち");
			judge = true;
		}else if(random === 2){
			console.log("まけ");
			judge = false;
		}

		lifeCounter(judge);

	}

	function judge_tyoki(yourChoice){

		var random = randomReturn();
		var judge = undefined;

		if(random === 0){
			console.log("まけ");
			judge = false;
		}else if(random === 1){
			console.log("あいこ");
		}else if(random === 2){
			console.log("かち");
			judge = true;
		}

		lifeCounter(judge);
	}

	function judge_pa(yourChoice){

		var random = randomReturn();
		var judge = undefined;

		if(random === 0){
			console.log("かち");
			judge = true;
		}else if(random === 1){
			console.log("まけ");
			judge = false;
		}else if(random === 2){
			console.log("あいこ");
		}

		lifeCounter(judge);
	}

	var friendLife = 3;
	var enemyLife = 3;
	
	var friendHP = $(".st-friend").find("span");
	var enemyHP = $(".st-enemy").find("span");

	friendHP.text(friendLife);
	enemyHP.text(enemyLife);

	function lifeCounter(judge){

		var timer;
		var count = 1;

		if(judge == true){
			enemyLife--;
		}else if(judge == false){
			friendLife--;
		}else{
			return false;
		}

		friendHP.text(friendLife);
		enemyHP.text(enemyLife);

		if(enemyLife == 0){

			command.hide();

			textArea.show();
			textArea.text("「バッツ、お前の勝ちだ！」");
			setTimeout(function(){
				textArea.hide();
			},3000);

			enemy.delay(3000).fadeOut(5000,function(){
				timer = setInterval(function(){

					big.volume = count;
					count -= 0.1;

					if(count < 0){
						big.pause();
						enemyLose();
						clearInterval(timer);
					}

				},100);			
			});
		}

		if(friendLife == 0){

			command.hide();

			friendLose();
		}

	}

	var finish = new Audio();

	var finishDom = $("#finish-scene");

	finishDom.hide();

	function enemyLose(){

		finish.src = "music/finish.mp3";
		finish.currentTime = 1;
		finish.play();
		textArea.show();

		textArea.text("勝負に勝った");

		setTimeout(function(){
			finishScene();
		},4000);
	}

	function friendLose(){

		textArea.show();
		textArea.text("「バッツ、お前の負けだ！」");

		setTimeout(function(){

			textArea.text("「もう一度勝負するか？」");

			setTimeout(function(){

				textArea.hide();

				$(".wall").fadeIn(600,function(){
					$(".lose").show();
					continueClick();
				});

			},2000);

		},3000);

	}

	function finishScene(){
		
		textArea.hide();
		Second.fadeOut(6000,function(){

			$("#battle-background").remove();

			finishDom.fadeIn(4000);

		});

	}

	function continueClick(){
		$(".lose").find("p").on("click",function(){
			var $this = $(this);
			var id = $this.attr("id");

			if(id == "yes"){

				friendLife = enemyLife = 3;

				friendHP.text(friendLife);
				enemyHP.text(enemyLife);

				$(".lose").hide();
				$(".wall").fadeOut(1000,function(){
					command.show();
				});

			}else if(id == "no"){

				friendLife = 9999;
				enemyLife = 1;
				friendHP.text(friendLife);
				enemyHP.text(enemyLife);

				$(".lose").hide();
				$(".wall").fadeOut(1000,function(){
					command.show();
				});

			}
		});
	}

	firstInit();
	firstScene();
	firstToSecond();

	// secondInit();

});