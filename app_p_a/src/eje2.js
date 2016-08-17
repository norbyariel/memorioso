var game = new Phaser.Game(screen.width, screen.height, Phaser.AUTO, 'DivHtmlgame');
var grupoDeCuadros;
var N = 1;
var ContadorToquesUsuario = 0;
var contadorActual = 0;
var ContadorSecuencia = 16;
var ListaDeSecuencia = [];
var funesAlgo = false;
var timeCheck;
var ListaDeCuadros;
var gana = false;
var pierde = false;
var pausar = true;
var intro;
var memorioso = function(game){};
memorioso.prototype = {
	preload:function(){
		game.load.spritesheet('item', 'asset/images/opciones2.png', 160, 160);
	},
	create: function() {
		grupoDeCuadros = game.add.group();
		var item;
		
		for (var i = 0; i < 3; i++)
		{
			item = grupoDeCuadros.create(168 * i, 10, 'item', i);
			// Enable input.
			item.inputEnabled = true;
			item.input.start(0, true);
			item.events.onInputDown.add(function(){this.select(item);}, this);
			item.events.onInputUp.add(function(){this.release(item);}, this);
			item.events.onInputOut.add(function(){this.moveOff(item);}, this);
			grupoDeCuadros.getAt(i).alpha = 0;
		}

		for (var i = 0; i < 3; i++)
		{
			item = grupoDeCuadros.create(168 * i, 178, 'item', i + 3);
			// Enable input.
			item.inputEnabled = true;
			item.input.start(0, true);
			item.events.onInputDown.add(function(){this.select(item);}, this);
			item.events.onInputUp.add(function(){this.release(item);}, this);
			item.events.onInputOut.add(function(){this.moveOff(item);}, this);
			grupoDeCuadros.getAt(i + 3).alpha = 0;
		}
		this.introTween();
		this.setUp();
		
		game.time.events.add(6000, function(){intro = false; this.funesSecuencia();}, this);
		
	},
	select: function(item, pointer) {
		
		if (!funesAlgo && !intro && !pierde && !gana)
		{
			item.alpha = 1;
		}
	},
	release: function(item, pointer) {
		if (!funesAlgo && !intro && !pierde && !gana)
		{
			item.alpha = .25;
			console.log("Lo paso");
			this.secuenciaDelJugador(item);
		}
	},
	moveOff: function(item, pointer) {
		console.log("Oaka");
		if (!funesAlgo && !intro && !pierde && !gana)
		{
			item.alpha = .25;
		}
	},
	introTween: function(){
		intro = true;
		for (var i = 0; i < 6; i++)
		{
			var flashing = game.add.tween(grupoDeCuadros.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
			var final = game.add.tween(grupoDeCuadros.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);

			flashing.chain(final);
			flashing.start();
		}
	},
	 setUp: function(){
		for (var i = 0; i < ContadorSecuencia; i++)
		{
			cuadro = game.rnd.integerInRange(0,5);
			ListaDeSecuencia.push(cuadro);
		}
	},
	funesSecuencia: function() {
		funesAlgo = true;
		CuadroIluminado = ListaDeSecuencia[contadorActual];
		grupoDeCuadros.getAt(CuadroIluminado).alpha = 1;
		timeCheck = game.time.now;
		contadorActual++;
	},
	update: function(){
		if (funesAlgo && pausar)
		{
			if (game.time.now - timeCheck > 700-N*40)
			{
				grupoDeCuadros.getAt(CuadroIluminado).alpha = .25;
				game.time.events.add(400 - N * 20, function(){this.subUpdate();}, this);
				pausar = false;
			}
		}
	},
	subUpdate: function()
	{
		if (contadorActual< N)
		{
			this.funesSecuencia();
		}
		else
		{
			funesAlgo = false;
			pausar = true;
		}
	},
	restart: function() {
		N = 1;
		ContadorToquesUsuario = 0;
		contadorActual = 0;
		ListaDeSecuencia = [];
		gana = false;
		pierde = false;
		this.introTween();
		this.setUp();
		game.time.events.add(6000, function(){this.funesSecuencia(); intro = false;}, this);
	},
	secuenciaDelJugador: function(selected) {
		console.log("Y ahora que");
		CuadroCorrecto = ListaDeSecuencia[ContadorToquesUsuario];
		ContadorToquesUsuario++;
		cuadroTocado = grupoDeCuadros.getIndex(selected);

		if (cuadroTocado == CuadroCorrecto)
		{
			if (ContadorToquesUsuario == N)
			{
				if (N == ContadorSecuencia)
				{
					gana = true;
					game.time.events.add(3000, this.funesSecuencia(), this);
				}	
				else
				{
					ContadorToquesUsuario = 0;
					contadorActual = 0;
					N++;
					funesAlgo = true;
				}
			}
		}
		else
		{
			pierde = true;
			game.time.events.add(3000, this.funesSecuencia(), this);
		}

	}
};
game.state.add('Game', memorioso);
game.state.start('Game');