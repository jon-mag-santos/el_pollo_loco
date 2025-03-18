class World {
    ctx;
    canvas;
    keyboard;
    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endBossBar = new EndbossBar();
    level = level1;
    cam_x = -100;
    runInterval = null;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cam_x, 0);
        this.drawBasicObjs();
        this.ctx.translate(-this.cam_x, 0);
        this.drawFixedObjs();
        this.ctx.translate(this.cam_x, 0);
        this.drawEnemies();
        this.ctx.translate(-this.cam_x, 0);

        //draw will always executed
        let self = this
        requestAnimationFrame(function () {
            self.draw();
            self.checkOtherDirection();
        });

    }

    drawBasicObjs() {
        this.addObjsToMap(this.level.backgroundObjects);
        this.addObjsToMap(this.level.clouds);
        this.addToMap(this.character);
    }

    drawFixedObjs() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (!this.isCharacterTooFar(this.level.endboss[0])){
            this.addToMap(this.endBossBar);
        }
    }

    isCharacterTooFar(endBoss) {
        return this.character.x + 590 < endBoss.x;
    }

    drawEnemies() {
        this.addObjsToMap(this.level.enemies);
        this.addObjsToMap(this.level.endboss);
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
        mo.drawFrame(this.ctx);

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

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisionsWithEnemies();
            this.checkCollisionsWithEndboss();
        }, 1000 / 60);

    }

    checkCollisionsWithEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isColliding(this.character)) {
                if (this.isCollisionFromAbove(enemy)) {
                    this.character.afterJump = false;
                    this.enemyDeath(this.level.enemies.indexOf(enemy), enemy);
                    this.character.jump();
                } else {
                    console.log("collision with enemy")
                    //this.character.hit();
                    console.log(this.character.energy);
                }
            }
        });
    }

    isCollisionFromAbove(enemy) {
        let enemyHeadX = enemy.x - enemy.offset.left
        let rightFootX = this.character.x + this.character.width - this.character.offset.right;
        let leftFootX = this.character.x + this.character.offset.left
        return this.character.afterJump && !(enemyHeadX > (rightFootX || leftFootX));
    }

    enemyDeath(index, enemy) {
        enemy.stopAnimation();
        enemy.loadImage(enemy.IMG_DEAD);
        setTimeout(() => {
            if (index > -1)
                this.level.enemies.splice(index, 1);
        }, 200);

    }


    checkCollisionsWithEndboss() {
        let endBoss = this.level.endboss[0];
        if (endBoss.isColliding(this.character)) {
            console.log("collision with boss")
            //this.character.hit();
            console.log(this.character.energy);
            endBoss.isAttacking = true;
            endBoss.stopAnimation();
            endBoss.isWalking();
        } else if (endBoss.isAttacking && this.isCharacterTooFar(endBoss)) {
            endBoss.stopWalking();
            endBoss.loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        } else if (endBoss.isAttacking) {
            endBoss.isWalking();
        }
    }

}