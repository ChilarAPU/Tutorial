class SceneA extends Phaser.Scene {
    map;
    preload() {
        //loading in the assets (bat and heart)
        this.load.image('bat', '../Assets/bat.png');
        this.load.image('heart', '../Assets/heart-small.png');
        //loading in the tileset which will be used in the Tiled program
        this.load.image('tiles', '../Assets/Medieval_tiles_free2.png');
        //loading in the player
        this.load.spritesheet('player', '../Assets/e.png', {
            frameWidth: 100,
            frameHeight: 73
        })
        //load in tilemap from tiled
        this.load.tilemapTiledJSON('gameMap', '../Assets/TiledMap.json');
    }

    create() {
        //creating the map from the preloaded map
        this.map = this.make.tilemap({key: 'gameMap'});
        //setting the bounds for the player so he cannot run off the screen
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        //finding and adding the tileset from Tiled 
        let tiles = this.map.addTilesetImage('Medieval-Tileset', 'tiles');
        //creating background layer from Tiled map
        this.map.createStaticLayer('background', [tiles], 0, 0);
    }

    update() {

    }
}