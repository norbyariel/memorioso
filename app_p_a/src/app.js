(function () {
    /* Este es un objeto Phaser basico pero debo ver donde configurar 
	todo lo que necesito*/
	console.log(screen.width + " x " + screen.height);
    var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, 'DivHtmlgame');
	/*Configuro el comportamiento de la aplicacion frente a la pantalla,
	el movimiento y demas particularidades del celular*/
	/*Ciclo de juego aqui se decide si el juego siguge o se detien*/
	game.state.add('configInicial', configInicial);
	game.state.add('intro', intro);
	game.state.add('menuPpal', menuPpal);
	game.state.add('menuNiveles', menuNiveles);
	game.state.add('game', memorioso);
	
	game.state.start('configInicial');
	/*Desde configuracion inicial se llama a el siguiente modulo
	y este llama al siguiente y asi sucesivamente*/

})();