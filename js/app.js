var gameMain = function(game){
    a = 0;
    b = 0;
    c = 0;
    
    n = 0;
    
    notes = ['c4','g4','d4','a4','e4','b4','f#4','c#4','g#4','d#4','a#4','f4'];
    
    colors = 
    [
        [79,252,5], 
        [162,8,8],
        [6,168,252],
        [253,58,6],
        [58,7,253],
        [188,250,3],
        [83,7,112],
        [3,250,115],
        [217,5,5],
        [8,39,255],
        [254,194,7],
        [91,8,185]
    ];
    
    volumes = 
    [
        [1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75], 
        [0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25], 
        [0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.5, 0.75], 
        [0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0.5, 0.75, 1]
    ];
    
    quotes = 
    [
        'To truly know the world, look deeply within your own being; to truly know yourself, take real interest in the world',
        'Live through deeds of love, and let others live with tolerance for their unique intentions',
        "The fundamental maxim of free men is to live in love towards our actions, and to let live in the understanding of the other person's will",
        "Ethical individualism is spiritualized theory of evolution carried over into moral life",
        "Only to the extent that a man has emancipated himself from all that is generic, does he count as a free spirit within a human community",
        "No man is all genus, none is all individuality",
        "Truth is a free creation of the human spirit, that never would exist at all if we did not generate it ourselves",
        "The task of understanding is not to replicate in conceptual form something that already exists, but rather to create a wholly new realm, that together with the world given to our senses constitutes the fullness of reality",
        "Each individual is a species unto him/herself",
        "You have no idea how unimportant is all that the teacher says or does not say on the surface, and how important what he himself is as teacher",
        "Because of their very nature, science and logical thinking can never decide what is possible or impossible. Their only function is to explain what has been ascertained by experience and observation"
    ];
    
    prevHead = 0;
    prevNote = null;
};

gameMain.prototype = {
    create: function(){  
        bg = this.add.image(0, 0, 'bg');
        
        compass = this.add.sprite(930, 525, 'compass');
        compass.enableBody = true;
        this.physics.enable(compass, Phaser.Physics.ARCADE);
        compass.anchor.set(0.5, 0.5);
        compass.scale.set(1.25, 1.25);
        compass.body.collideWorldBounds = true;
        compass.body.immovable = true;
        compass.alpha = 0.9;
        
        compass.inputEnabled = true;
        compass.events.onInputDown.add(function(){
            try{
                steinerText.fill = '#'+Math.floor(Math.random()*16777215).toString(16);
            } catch(e){}
        }, this); 

        elementSounds = [
            sfxEarth = game.add.audio('earth', 0.5, true),
            sfxAir = game.add.audio('air', 0.5, true),
            sfxWater = game.add.audio('water', 0.5, true),
            sfxFire = game.add.audio('fire', 0.5, true)
        ];
        
        sfxFire.play();
        sfxAir.play();
        sfxWater.play();
        sfxEarth.play();

        initAd();    

        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}
        
        setTimeout(function(){
            try{
                StatusBar.hide();
            } catch(e){}   
        }, 1000);
		
		try{
			window.addEventListener("deviceorientation", compassSuccess, true);
        } catch(e){ 
        	try{navigator.compass.watchHeading(compassSuccess, compassError)catch(e){alert(e)}; 
        }   
    },

    update: function(){  
        game.stage.backgroundColor = 'rgb(' + a + "," + b + "," + c + ')';
    }
};

function compassSuccess(heading) {
    var head = 360 - (Math.round(heading.alpha));
    if (head == 0) head = 360;
    var note = Math.round(head / 30);

    compass.angle = head;

    a = Math.round((colors[note][0]) + head % 30);
    b = Math.round((colors[note][1]) + head % 30);
    c = Math.round((colors[note][2]) + head % 30);

    if (note != prevNote){
        frequency = teoria.note(notes[note]).fq();
        osc = T("cosc", {wave:'sin', beats:6, mul:0.50});
        osc.set({freq: frequency});
        
        T("perc", {a: 350, d:3000, s:4800, r:2600}, osc).on("ended", function() {
            this.pause();
        }).bang().play();
        
        n++;
        if (n == 12){
            showText();
            n = 0;
        }
    }

    sfxFire.volume = volumes[0][Math.round(head / 15)] - 0.25;
    sfxAir.volume = volumes[1][Math.round(head / 15)] - 0.25;
    sfxWater.volume = volumes[2][Math.round(head / 15)] - 0.25;
    sfxEarth.volume = volumes[3][Math.round(head / 15)] - 0.25;
    
    prevHead = head;
    prevNote = note;
}

function compassError(e){
    alert('Compass Error!');
}

function showText(){
    var colors = ['brown', 'maroon', 'black', 'darkblue', 'darkgreen', 'darkred', 'darkgrey'];
    
    steinerText = game.add.text(0, game.world.centerY, 
        '', {font: '48px ' + font, fill: 'white', fontWeight: 'normal', align: 'center',
        stroke:colors[game.rnd.integerInRange(0, colors.length - 1)], strokeThickness: 4
    });
        
    steinerText.text = quotes[game.rnd.integerInRange(0, quotes.length - 1)];

    steinerText.x = game.world.width;
    steinerText.y = game.rnd.integerInRange(steinerText.height, game.world.height - steinerText.height);
    steinerText.alpha = 0;
    
    tween = game.add.tween(steinerText).to( { x: 0 - steinerText.width }, 15000 + steinerText.width * 2, Phaser.Easing.Linear.In, true);
    tween2 = game.add.tween(steinerText).to( { alpha: 1 }, steinerText.width * 2, Phaser.Easing.Linear.Out, true);
    
    setTimeout(function(){
        tween3 = game.add.tween(steinerText).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.Out, true);
    }, 12000 + steinerText.width * 2);
}

function initAd(){
    var admobid = {};

    admobid = {
        banner: 'ca-app-pub-9795366520625065/9360995021'
    };

    if(AdMob) AdMob.createBanner({
       adId: admobid.banner,
       position: AdMob.AD_POSITION.BOTTOM_CENTER,
       autoShow: true
    });
}
