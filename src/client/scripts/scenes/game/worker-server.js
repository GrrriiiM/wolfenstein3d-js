const module = false;

importScripts(
    "../../../../server/scripts/config.js",
    "../../../../server/scripts/vector2d.js",
    "../../../../server/scripts/block.js",
    "../../../../server/scripts/item.js",
    "../../../../server/scripts/wall.js",
    "../../../../server/scripts/view.js",
    "../../../../server/scripts/person.js",
    "../../../../server/scripts/player.js",
    "../../../../server/scripts/ray.js",
    "../../../../server/scripts/map2d.js");

function require(path) {
    switch (path) {
        case "./config": return Config;
        case "./vector2d": return Vector2d;
        case "./block": return Block;
        case "./item": return Item;
        case "./wall": return Wall;
        case "./view": return View;
        case "./person": return Person;
        case "./player": return Player;
        case "./map2d": return Map2d;
        case "./ray": return Ray;
    }
}

class WorkerServer {
    constructor(worker) {
        this.worker = worker;
        this.map2d = Map2d.create(mapPattern, Config);
        this.player = new Player(1, 3, 0, "", this.map2d);
        this.map2d.addPlayer(this.player);
        this.worker.onmessage = event => {
            switch (event.data.command) {
                case 'start': return this.start();
                case 'stop': return this.stop();
                case 'startMoveFront': return this.startMoveFront();// return this.startMoveFront();
                case 'startMoveBack': return this.startMoveBack();
                case 'startMoveRight': return this.startMoveRight();
                case 'startMoveLeft': return this.startMoveLeft();
                case 'startRotateRight': return this.startRotateRight();
                case 'startRotateLeft': return this.startRotateLeft();
                case 'stopMoveFront': return this.stopMoveFront();
                case 'stopMoveBack': return this.stopMoveBack();
                case 'stopMoveRight': return this.stopMoveRight();
                case 'stopMoveLeft': return this.stopMoveLeft();
                case 'stopRotateRight': return this.stopRotateRight();
                case 'stopRotateLeft': return this.stopRotateLeft();
            }
        }
    }

    start() {
        this.running = true;
        this.update();
    }

    stop() {
        this.running = false;
    }

    update() {
        this.map2d.update();
        this.state = this.player.getState();
        this.worker.postMessage({ command: "state", state: this.state });
        setTimeout(this.update.bind(this), 1000 / 20);
    }

    startMoveFront() {
        this.player.movingFront = true;
    }

    stopMoveFront() {
        this.player.movingFront = false;
    }

    startMoveBack() {
        this.player.movingBack = true;
    }

    stopMoveBack() {
        this.player.movingBack = false;
    }

    startMoveRight() {
        this.player.movingRight = true;
    }

    stopMoveRight() {
        this.player.movingRight = false;
    }

    startMoveLeft() {
        this.player.movingLeft = true;
    }

    stopMoveLeft() {
        this.player.movingLeft = false;
    }

    startRotateLeft() {
        this.player.rotatingLeft = true;
    }

    stopRotateLeft() {
        this.player.rotatingLeft = false;
    }

    startRotateRight() {
        this.player.rotatingRight = true;
    }

    stopRotateRight() {
        this.player.rotatingRight = false;
    }

}
const mapPattern1 = `
. 0001020304
05          13
06          12
07    F0  5F11
08          10
09          0F
  0A0B0C0D0E
`;
const mapPattern = `
.     0B0B090B0B0B0B0B090B0B
    0B46                  460B
    09    3C    3C    3C    090B0B0B
    0B                      0B5858580B
  31            3E                5709    
    0B                      0B5858580B
    0A                      0A0B0B0B
    0B                      0B
      0B0B0B0B0B  0B0B0B0B0B
            0B      0B
            0A  48  0A
            0B      0B
            0B      0B
          0B0B      0B0B     
        09      48    4A0B
          0B0B      0B0B 
            0B      0B
            0B      0B
            09  48  09
            0B      0B                                    
            0B09  090B                                
  010001020145      450102000100                      0708070807080708                
01                            4500                  0852      3A5D5D5D07
05                              05  070807080708070807              5D08
01                                07                08                07
00  3E          3E          3E                                        04
01                                07                08                07
05                              05  0708        080707    4752  47    08
01                            4500      07    08    08            52  07
  0100030001          0100030100        08    07      08075F07085F0708              
            0708  0807                  07    08          08    07      
            08      08                  08    07              
            07  48  07                  07    08    08  08  08  08            
            08      08                  08    07  07  07  07  07  07            
            07      07                  07      08                  07
            08  48  08                  08                          04
            07      07                  07      08                5107
            08      08                    080708  07  07  07  07  07
            07  48  07                              08  08  08  08 
            08      08
    080708070708  080708070807 
  084D52    08      08        08
  07                      43  07
  08        08      08        08
  07        07      07        07
    0807080707      0708070807 
  08        08      08        08
  07F0                  52  4D07
  08        08      08        08
    0807080707      0708070807 
  08                          08
  07  48        48        485407
  08            52            08
    04070804070806080704080704 
`

const workerServer = new WorkerServer(self);
