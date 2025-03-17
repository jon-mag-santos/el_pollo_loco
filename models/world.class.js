class World {
    ctx;
    canvas;
    keyboard;
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];

    backgroundObjects = [
        new BackgroundObject("img/5_background/layers/air.png"),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png"),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png"),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png")
    ]

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setKeyboard();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjsToMap(this.backgroundObjects);
        this.addObjsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjsToMap(this.enemies);

        //draw will always executed
        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });
        
    }

    addObjsToMap(objs) {
        objs.forEach((o)=> {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        mo.draw(this.ctx);
    }

    setKeyboard() {
        this.character.keyboard = this.keyboard;
    }
}