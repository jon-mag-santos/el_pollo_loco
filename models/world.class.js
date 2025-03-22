class World {
    ctx;
    canvas;
    keyboard;
    character = new Character(this);
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    bottle_collected = 0;
    endBossBar = new EndbossBar();
    throwableObjects = [];
    isThrowing = false;
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
        this.drawCollectableObjs();
        this.ctx.translate(-this.cam_x, 0);

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
        this.addObjsToMap(this.throwableObjects);
    }

    drawFixedObjs() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (!this.isCharacterTooFar(this.level.endboss[0])) {
            this.addToMap(this.endBossBar);
        }
    }

    drawCollectableObjs() {
        this.addObjsToMap(this.level.bottles);
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
        if (this.keyboard.LEFT && !this.character.isDead())
            this.character.otherDirection = true;

        if (this.keyboard.RIGHT && !this.character.isDead())
            this.character.otherDirection = false;
    }

    setWorld() {
        this.level.endboss[0].world = this;
    }

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisionsWithEnemies();
            this.checkCollisionsWithEndboss();
            this.checkThrowObjects();
            this.checkBottleCollided();
            this.checkBottleSplashed();
            this.checkDeathsAfterCollision();
            this.collectingBottle();
        }, 1000 / 60);

    }

    checkCollisionsWithEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isColliding(this.character) && !enemy.isDead()) {
                if (this.isCollisionFromAbove(enemy)) {
                    this.character.afterJump = false;
                    enemy.hit();
                    this.character.jump();
                } else {
                    this.takingHit(this.character);
                    this.statusBar.setPercentage(this.character.energy);
                }
            }else
               return false;
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
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }   
        },200 );   
    }

    checkCollisionsWithEndboss() {
        let endBoss = this.level.endboss[0];
        if (endBoss.isColliding(this.character)) {
            this.takingHit(this.character);
            this.statusBar.setPercentage(this.character.energy);
            endBoss.collisionPause();
            this.isAttacking(endBoss);
            setTimeout(() => {
                endBoss.restoreSpeed();
            }, 500);
        }
    }

    isAttacking(endBoss) {
        if(!endBoss.attackAnimation) {
            endBoss.cancelAllAnimations();
            endBoss.attackAnimation = endBoss.playAnimation(endBoss.IMAGES_ATTACK, 350);
            setTimeout(() => {
                endBoss.attackAnimation = endBoss.cancelAnimation(endBoss.attackAnimation);
            }, 1400);
        }
    }

    takingHit(character) {
        if (!character.takingHit) {
            character.hit();
            character.takingHit = true;
        }else {
            let timePassed = new Date().getTime() - character.lastHit;
            timePassed = timePassed / 1000;
            if (timePassed > 1)
                character.takingHit = false;
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.isThrowing && this.bottle_collected > 0) {
            let x = (!this.character.otherDirection) ? this.character.x + this.character.width - this.character.offset.right - 40 : this.character.x + this.character.offset.left - 40;
            let y = this.character.y + this.character.offset.top;
            let bottle = new ThrowableObject(x, y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.isThrowing = true;
            playSound(BOTTLE_THROW_AUDIO);
            this.bottle_collected--;
            let percentage = (this.bottle_collected*10 > 100) ? 100 : this.bottle_collected*10;
            this.bottleBar.setPercentage(percentage);
            setTimeout(() => {
                this.isThrowing = false;
            }, 500);
        }
    }

    checkBottleCollided() {
        let endBoss = this.level.endboss[0];
        let enemies = this.level.enemies;
        this.throwableObjects.forEach(bottle =>{
            if(!bottle.isSplashed) {
                if (endBoss.isColliding(bottle) && !bottle.hasCollided){
                    endBoss.hit();
                    bottle.isSplashed = true;
                    bottle.hasCollided = true;
                    playSound(BOTTLE_SPLASH_AUDIO);
                }else{
                    enemies.forEach(enemy => {
                        if (enemy.isColliding(bottle) && !enemy.isDead() && !bottle.hasCollided){
                            enemy.hit();
                            bottle.isSplashed = true;
                            bottle.hasCollided = true;
                            playSound(BOTTLE_SPLASH_AUDIO);
                        }
                    });
                }
            }
        }); 
    }

    checkBottleSplashed() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isSplashed) {
                const index = this.throwableObjects.indexOf(bottle);
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 90);
            }
        });
    }

    checkDeathsAfterCollision() {
        let enemies = this.level.enemies;
        for (const enemy of enemies) {
            if (enemy.isDead() && !enemy.deathAnimation) {
                const index =  enemies.indexOf(enemy);
                enemy.deathAnimation = true;
                this.enemyDeath(index, enemy);
                break;
            }  
        }
    }

    collectingBottle() { 
        this.level.bottles.forEach((bottle)=>{
            if(this.character.isColliding(bottle)) {
                playSound(BOTTLE_COLLECT_AUDIO);
                this.bottleCollected(bottle);
            }
        })
    }

    bottleCollected(bottle) {
        this.level.bottles.forEach((item, index) => {
            if (item === bottle) {
                this.level.bottles.splice(index, 1);
                this.bottle_collected++;
                console.log(this.bottle_collected);
                let percentage = (this.bottle_collected*10 < 100) ? this.bottle_collected*10 : 100;
                this.bottleBar.setPercentage(percentage);
            }
        });
    }
}