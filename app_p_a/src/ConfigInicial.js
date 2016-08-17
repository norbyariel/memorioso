configInicial = function (game){};

configInicial.prototype = {
	
    init: function () {
		game.stage.backgroundColor = "#10253f";
		game.fontSmall = { font: "24px Arial", fill: "black" };
		game.fontBig = { font: "42px Arial", fill: "white" };
		game.fontMessage = { font: "24px Arial", fill: "black",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(false, true);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.refresh();
    },
	preload: function() {
	
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('intro');
	},
    gameResized: function (width, height) {


    }
};