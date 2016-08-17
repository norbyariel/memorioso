var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, 'game');
/*Configuro el comportamiento de la aplicacion frente a la pantalla,
el movimiento y demas particularidades del celular*/
/*Ciclo de juego aqui se decide si el juego siguge o se detien*/

var menuNiveles = {preload:preload, create:create,}
var botonPlay, btnbackMenu;
var grupoDeCuadros;
var x, xcc, xc, xs, xmargenes;
var y, yc, ys, ym, yd, yj, ymargenes;
var filas;
var ancholvl, altolvl, anchoMenu, altoMenu;
function nivel()
{
 this.value = 1;
}

var lvl = new nivel();

function preload(game) {
	game.load.image('fondoMenu','asset/images/fondoMenu.png');
	game.load.spritesheet('botonPlay','asset/images/lvl.png', 95, 100);
	game.load.spritesheet('btnMenu','asset/images/botonMenu.png', 193, 70);
}

function create(game){
	configuracionDePantalla(game);
	
	btnbackMenu = game.add.button(game.world.centerX, ym, 'btnMenu', function(){$(document).trigger('backMenu', [game]);}, game, 2, 1, 0);
	btnbackMenu.width = ancholvl;
	btnbackMenu.height = altolvl/2;
	btnbackMenu.anchor.setTo(0.5, 0.5);
	/*
	Agrega texto en la pantalla
	game.add.text(x/4, y/4, "Funes el Memorioso", game.fontBig);
	*/
	var textMenu = game.add.text(game.world.centerX, ym, "Menu", game.fontSmall);
	textMenu.anchor.setTo(0.5, 0.5);
	
	grupoDeCuadros = game.add.group();
	
	nivel = 1;
	for (var i = 0; i <= filas.length; i++)
	{
		posicionarBotones(filas[i], xmargenes[i], ymargenes[i], 'botonPlay', 2,  lvl);
	}
	/*
	var item;
	item = grupoDeCuadros.create((x + xc) + (xcc), y + yj, 'botonPlay', 2);
	item.anchor.setTo(0.5, 0.5);
	item.width = ancholvl;
	item.height = altolvl;
	item.inputEnabled = true;
	item.input.start(0, true);	
	var textnivel = game.add.text((x + xc) + (xcc), y + yj, lvl.value, game.fontBig);
	textnivel.anchor.setTo(0.4, 0.3);*/
}

function posicionarBotones(numBotones, margen, y, imagen, sheet, nivel){
	for (var i = 0; i < numBotones; i++)
	{
		var item;
		item = grupoDeCuadros.create(margen + (xcc * i), y, imagen, sheet);		
		item.anchor.setTo(0.5, 0.5);
		item.width = ancholvl;
		item.height = altolvl;
		item.inputEnabled = true;
		item.input.start(0, true);		
		//item.events.onInputDown.add(select);
        item.events.onInputUp.add(function(){$(document).trigger('nivel', [item.z]);});
        //item.events.onInputOut.add(moveOff);
		var textnivel = game.add.text(margen + (xcc * i), y, nivel.value, game.fontBig);
		textnivel.anchor.setTo(0.4, 0.3);
	
		nivel.value++;
	}
}

$(document).bind('backMenu', function (event, game) {
	//game.state.start('menuPpal');
	console.log("llamando al menu principal");
});

$(document).bind('nivel', function (event, lvl) {
	//game.state.start('menuPpal');
	console.log(lvl);
});

function configuracionDePantalla(game){

	game.stage.backgroundColor = "#10253f";
	game.fontSmall = { font: "16px Arial", fill: "black" };
	game.fontBig = { font: "42px Arial", fill: "white" };
	game.fontMessage = { font: "24px Arial", fill: "black",  align: "center", stroke: "#320C3E", strokeThickness: 4 };

	x = game.world.centerX/3;
	xc = (game.world.centerX*20.3)/100;
	xcc = (game.world.centerX*46.9)/100;
	xs = (game.world.centerX*-3.1)/100;
	
	y = game.world.centerY;
	yc = (game.world.centerY*46.1)/100;
	ys = (game.world.centerY*21.1)/100;
	yd = (game.world.centerY*-1.7)/100;
	ym = (game.world.centerY*25)/100;
	yj = (game.world.centerY*70)/100;
	
	ancholvl = (game.world.centerX*29.7)/100;
	altolvl = (game.world.centerY*55.5)/100;
	anchoMenu = (game.world.centerX*60.3)/100;
	altoMenu = (game.world.centerY*38.9)/100;	
	
	filas = [4, 3, 4, 3];
	xmargenes = [x + xs, (x + xc), x + xs, (x + xc)];
	ymargenes = [y + yd, y + ys, y + yc, y + yj];	
}


game.state.add('menuNiveles', menuNiveles);
game.state.start('menuNiveles');