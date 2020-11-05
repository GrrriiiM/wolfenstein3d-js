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
const mapPattern = `
000000000000000000
00              00
00F0        43  00
00              00
000000000000000000
`;
const mapPattern1 = `
.               31
            0B09  090B
000100010201          010200010001
01                              00
05                              05
01                                07
00                                  31
01                                07
05                              05
01                              00
000100030001          010003010001
            0708  0807
            08      08
            07      07
            08      08
            07      07
            08      08
            07      07
            08      08
            07      07
            08      08
  07080708070708  08070807080707
  08        08      08        08
  07                          07
  08        08      08        08
  07        07      07        07
  070807080707      070807080707
  08        08      08        08
  07F0                    43  07
  08        08      08        08
  070807080707      070807080707
  08                          08
  07                          07
  08                          08
  070407080407080608070408070407
`