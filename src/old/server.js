import { Map2d } from "./map2d.js";

export class Server {
    constructor() {
        this.map2d = Map2d.createMap2d(mapPattern);
        this.connections = [];
        this.players = [];
    }

    start() {
        this.running = true;
        this.update();
    }

    stop() {
        this.running = false;
    }

    update() {
        Object.keys(this.players).forEach(_ => this.players[_].update());
        this.connections.forEach(_ => _.update({
            map2d: {
                walls: this.map2d.walls,
                decorations: this.map2d.decorations,
                players: this.map2d.players
            }
        }));
        setTimeout(this.update.bind(this), 30 / 1000);
    }

    connect(connection) {
        let id = this.uuidv4();
        this.players[id] = this.map2d.players[0];
        this.connections.push({
            id: id,
            update: connection.update
        });
        return id;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    playerStartMoveFront(id) {
        this.players[id].movingFront = true;
    }

    playerStopMoveFront(id) {
        this.players[id].movingFront = false;
    }

    playerStartMoveBack(id) {
        this.players[id].movingBack = true;
    }

    playerStopMoveBack(id) {
        this.players[id].movingBack = false;
    }

    playerStartMoveRight(id) {
        this.players[id].movingRight = true;
    }

    playerStopMoveRight(id) {
        this.players[id].movingRight = false;
    }

    playerStartMoveLeft(id) {
        this.players[id].movingLeft = true;
    }

    playerStopMoveLeft(id) {
        this.players[id].movingLeft = false;
    }

    playerStartRotateLeft(id) {
        this.players[id].rotatingLeft = true;
    }

    playerStopRotateLeft(id) {
        this.players[id].rotatingLeft = false;
    }

    playerStartRotateRight(id) {
        this.players[id].rotatingRight = true;
    }

    playerStopRotateRight(id) {
        this.players[id].rotatingRight = false;
    }

}
const mapPattern1 = `
00000000000000
00          00
00          00
00    F0  5F00
00          00
00          00
00000000000000
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