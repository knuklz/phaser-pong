
// Create the main Phaser game. 
var game = new Phaser.Game(400, 600, Phaser.AUTO, "");

// Creat the initial phaser state
var mainMenu = {
    preload: function(){
      game.load.image('strt', 'assets/bnt_start.png');  
    },
    create: function(){
        this.btnStart = game.add.button(
            game.world.centerX, 
            game.world.centerY, 
            'strt', 
            function(){
                game.state.start('mainState');
            });
        this.btnStart.anchor.setTo(0.5);
        this.btnStart.scale.setTo(1,1);
        game.add.tween(this.btnStart.scale).to({ x: 1.08, y: 1.08 }, 1000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
    },
    update: function(){
        
    },  
};


// Create the main phaser state
var mainState = {
    
    preload: function () {
        game.load.image('bat', 'assets/bat.png');
        game.load.image('ball', 'assets/ball.png');
    },
    create: function () {
        
        game.stage.backgroundColor = '#476c71'
		//game.physics.startSystem(Phaser.Physics.ARCADE); 
        
        this.cursor = game.input.keyboard.createCursorKeys();
        // Create the ball
        this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
        this.ball.anchor.setTo(0.5, 0.5);
        // Setup ball properties
		game.physics.arcade.enable(this.ball); 
		this.ball.body.velocity.y = -200;
        this.ball.body.velocity.x = 200;
        this.ball.body.bounce.set(1);
        this.ball.body.collideWorldBounds = true;
        
        
        // Create Player bat
        this.player = game.add.sprite(game.world.centerX,585, 'bat');
        this.player.anchor.setTo(.5);
        this.player.scale.x = 2;
        game.physics.arcade.enable(this.player);
        this.player.body.immovable = true;
       
        
        // Create Enemy bat
        this.enemy = game.add.sprite(game.world.centerX, 15, 'bat');
        this.enemy.anchor.setTo(.5);
        this.enemy.scale.x = 2;
        game.physics.arcade.enable(this.enemy);
        this.enemy.body.immovable = true;
        // Seenemy collisions
        
    },
    update: function () {
        this.movePlayer();
        this.moveEnemy();
        game.physics.arcade.collide(this.ball, [this.player, this.enemy]);
       
        
    },   
    movePlayer: function(){
       
        var speed = 200;
        
        if(this.player.x+10<=game.input.activePointer.x){
            this.player.body.velocity.x = speed;
        } else if(this.player.x-15>=game.input.activePointer.x){
            this.player.body.velocity.x = -speed;
        } else {
            this.player.body.velocity.x = 0;
        }
        
        
        
       // Set the paddle to the same x location as mouse/touch
       // this.player.x = game.input.activePointer.x;
    
    },
    moveEnemy: function(){
               var speed = 190;
        
        if(this.enemy.x+10<=this.ball.x){
            this.enemy.body.velocity.x = speed;
        } else if(this.enemy.x-15>=this.ball.x){
            this.enemy.body.velocity.x = -speed;
        } else {
            this.enemy.body.velocity.x = 0;
        } 
    },
    
};

game.state.add('mainState', mainState);
game.state.add('mainMenu', mainMenu);
game.state.start('mainMenu');
