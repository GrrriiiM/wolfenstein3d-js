const images = [
    "walls",
    "decorations"
];

class Renderer {
    constructor(sceneManager, commandManager, elementQuerySelector) {
        this.w = 320;
        this.h = 200;
        
        let querySelector = elementQuerySelector || "body";
        this.element = document.querySelector(querySelector);
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.element.appendChild(this.canvas);
        this.loadImages(this.element);

        this.sceneManager = sceneManager || new SceneManager();
        this.sceneManager.setRenderer(this);
        this.commandManager = commandManager || new CommandManager();
        this.commandManager.setRenderer(this);
        
        window.onresize = () => this.onresize();
        window.onkeydown = (e) => this.commandManager.onkeydown(e.key);
        window.onkeyup = (e) => this.commandManager.onkeyup(e.key);
    }

    start() {
        this.onresize();
        let requestFrame;
        let renderer = this;
        function frame(time) {
            renderer.sceneManager.scene?.draw();
            requestFrame(frame);
        }
        if (window.requestAnimationFrame) requestFrame = window.requestAnimationFrame;
        else if (window.webkitRequestAnimationFrame) requestFrame = window.webkitRequestAnimationFrame;
        frame(0);
    }

    loadImages(element) {
        this.images = {};
        images.forEach(_ => {
            var img = document.createElement("img");
            img.style = "display: none";
            img.src = `assets/${_}.png`;
            element.appendChild(img);
            this.images[_] = img;
        })
    }

    onresize() {
        const f = this.w / this.h;
        let w = this.element.clientWidth;
        let h = this.element.clientHeight * f;
        if (w < h) {
            w = this.element.clientWidth;
            h = w * (this.h / this.w);
        } else {
            h = this.element.clientHeight;
            w = h * (this.w / this.h);
        }
        this.canvas.style.width = w;
        this.canvas.style.height = h;
        this.canvas.style.marginLeft = `calc(50vw - ${w / 2}px)`;
        this.canvas.style.marginTop = `calc(50vh - ${h / 2}px)`;
        this.sceneManager.scene?.onresize();
    }
}

