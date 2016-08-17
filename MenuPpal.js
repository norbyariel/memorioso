var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, 'DivHtmlgame');
/*Configuro el comportamiento de la aplicacion frente a la pantalla,
el movimiento y demas particularidades del celular*/
/*Ciclo de juego aqui se decide si el juego siguge o se detien*/

var menuPpal = {preload:preload, create:create,}
var botonPlay;
var botonOpcion;
function preload(game) {
	game.load.image('fondoMenu','asset/images/fondoMenu.png');
	game.load.spritesheet('botonPlay','asset/images/botonMenu.png', 193, 70);
	game.load.spritesheet('mummy', 'asset/images/metalslug_mummy37x45.png', 37, 45, 18);
}

function create(game){
	game.stage.backgroundColor = "#10253f";
	game.fontSmall = { font: "24px Arial", fill: "black" };
	game.fontBig = { font: "42px Arial", fill: "white" };
	game.fontMessage = { font: "24px Arial", fill: "black",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
	x = game.world.centerX/2;
	y = game.world.centerY;
	animacion(game);
	botonPlay = game.add.button(x, y, 'botonPlay', function(){$(document).trigger('startGame', [game]);}, game, 2, 1, 0);
	botonPlay.anchor.setTo(0.5, 0.5);
	botonPlay.id = "btnPlay";
	botonOpcion = game.add.button(x, y + 70, 'botonPlay', function(){$(document).trigger('fntOpciones', [game]);}, game, 2, 1, 0);
	botonOpcion.anchor.setTo(0.5, 0.5);
	botonSalir = game.add.button(x, y + 140, 'botonPlay', function(){$(document).trigger('salir', [game]);}, game, 2, 1, 0);
	botonSalir.anchor.setTo(0.5, 0.5);
	game.add.text(x/4, y/4, "Funes el Memorioso", game.fontBig);
	textJugar = game.add.text(x, y, "Jugar", game.fontSmall);
	textJugar.anchor.setTo(0.5, 0.5);
	textOpciones = game.add.text(x, y + 70, "Opciones", game.fontSmall);
	textOpciones.anchor.setTo(0.5, 0.5);
	textSalir = game.add.text(x, y + 140, "Salir", game.fontSmall);
	textSalir.anchor.setTo(0.5, 0.5);
}

function animacion(game){
	 var mummy = game.add.sprite(450, 150, 'mummy');
	 mummy.width = 100;
	 mummy.height = 200;

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    var walk = mummy.animations.add('walk');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    mummy.animations.play('walk', 5, true);
}

$(document).bind('startGame', function (event, game) {
	game.state.start('Menunivel');
});

$(document).bind('fntOpciones', function (event, game) {
	game.state.start('gameOpciones');
});

$(document).bind('salir', function (event, game) {
	game.state.start('salir');
});

game.state.add('menuPpal', menuPpal);
game.state.start('menuPpal');