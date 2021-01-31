class SceneA extends Phaser.Scene {
    map;
    player;
    playerStartPoint;
    preload() {
        //loading in the assets
        this.load.image('heart', '../Assets/heart-small.png');
        //loading in the tileset which will be used in the Tiled program
        this.load.image('tiles', '../Assets/Medieval_tiles_free2.png');
        //loading in the player
        this.load.spritesheet('player', '../Assets/e.png', {
            frameWidth: 100,
            frameHeight: 73
        })
        this.load.spritesheet("bat", "../Assets/bat.png", {
            frameWidth: 64,
            frameHeight: 38
        });
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
        //creating layers from Tiled map
        this.map.createStaticLayer('background', [tiles], 0, 0);
        let groundLayer = this.map.createStaticLayer('ground', [tiles], 0, 0);
        groundLayer.setCollisionBetween(1, 1000);

        //creating the player and spawning the player in the point made in Tiled
        this.playerStartPoint = SceneA.FindPoint(this.map, 'object', 'player', 'playerSpawn');
        this.player = this.physics.add.sprite(this.playerStartPoint.x, this.playerStartPoint.y, 'player');
        //resizing the players hitbox
        this.player.body.setSize(40, 60, true);
        //moving the players hitbox so the player is centered
        this.player.body.setOffset(25, 0);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, groundLayer);
    }

    update() {

    }

    static FindPoint(map, layer, type, name) {
        var loc = map.findObject(layer, function (object) {
          if (object.type === type && object.name === name) {
            return object;
          }
        });
        return loc
      }
      static FindPoints(map, layer, type) {
        var locs = map.filterObjects(layer, function (object) {
          if (object.type === type) {
            return object
          }
        });
        return locs
      }
}
