class World {
    ctx;
    canvas;
    keyboard;
    character = new Character();
    level = level1;
    cam_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cam_x, 0);
        this.addObjsToMap(this.level.backgroundObjects);
        this.addObjsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjsToMap(this.level.enemies);
        this.addObjsToMap(this.level.endboss);
        this.ctx.translate(-this.cam_x, 0);

        //draw will always executed
        let self = this
        requestAnimationFrame(function () {
            self.draw();
            self.checkOtherDirection();
        });

    }

    addObjsToMap(objs) {
        objs.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkOtherDirection() {
        if (this.keyboard.LEFT) {
            this.character.otherDirection = true;
        } else
            this.character.otherDirection = false;
    }

    setWorld() {
        this.character.world = this;
    }
}