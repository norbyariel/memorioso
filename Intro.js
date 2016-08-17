var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, 'DivHtmlgame');

var intro = {
				preload: function () {
					/*Asset para intro*/
					game.load.image('fondo', 'asset/images/fondoIntro.png');
					game.load.spritesheet('intro', 'asset/images/intro2.png', 96, 96, 15);
				},
				create: function () {
					var fondo = game.add.sprite(0,0, 'fondo');
					fondo.width = screen.width; 
					fondo.height = screen.height;
					game.background = fondo;
					//game.stage.backgroundColor = "#10253f";
					game.seconds = game.time.now/1000;
					var elefante = game.add.sprite(game.world.centerX, game.world.centerY, 'intro');
					elefante.anchor.setTo(0.5, 0.5);
					elefante.width = 200;
					elefante.height = 200;

					//  Here we add a new animation called 'walk'
					//  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'elefante' sprite sheet
					var walk = elefante.animations.add('walk');

					//  And this starts the animation playing by using its key ("walk")
					//  30 is the frame rate (30fps)
					//  true means it will loop when it finishes
					elefante.animations.play('walk', 2, true);
					game.time.events.add(8000, function(){$(document).trigger('startMenu', [game, elefante]);}, game);
					
				}
			};
$(document).bind('startMenu', function (event, game, elefante) {
	//game.state.start('Menunivel');
	elefante.animations.stop(null, true);
	console.log("Arranca el menu");
});			
game.state.add('Game', intro);
game.state.start('Game');