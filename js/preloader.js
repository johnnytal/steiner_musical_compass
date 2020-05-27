var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        font = 'Kavoon';

        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'green', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.game.load.image("bg", "assets/images/bg.png");

        this.game.load.audio('earth', 'assets/audio/earth.ogg'); 
        this.game.load.audio('air', 'assets/audio/air.ogg');
        this.game.load.audio('water', 'assets/audio/water.ogg'); 
        this.game.load.audio('fire', 'assets/audio/fire.ogg'); 

    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};
