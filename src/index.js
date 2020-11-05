import { Server } from "./server.js";
import { Renderer } from "./renderer.js";
import { Local } from "./local.js";

let local = new Local();
let renderer = new Renderer(local);

let requestFrame;

function frame(time) {
    renderer.draw();
    requestFrame(frame);
}

if (typeof window !== 'undefined') {
    if (window.requestAnimationFrame) requestFrame = window.requestAnimationFrame;
    else if (window.webkitRequestAnimationFrame) requestFrame = window.webkitRequestAnimationFrame;
}

window.onresize = renderer.resize.bind(renderer);

window.onkeydown = (e) => {
    switch (e.key.toUpperCase()) {
        case "W": local.startMoveFront(); break;
        case "S": local.startMoveBack(); break;
        case "A": local.startRotateLeft(); break;
        case "D": local.startRotateRight(); break;
        default: break;
    }
}

window.onkeyup = (e) => {
    switch (e.key.toUpperCase()) {
        case "W": local.stopMoveFront(); break;
        case "S": local.stopMoveBack(); break;
        case "A": local.stopRotateLeft(); break;
        case "D": local.stopRotateRight(); break;
        default: break;
    }   
}

local.start();

frame(0);

