class World {
    ctx;
    canvas;
    keyboard;
    character = new Character(this);
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    coin_collected = 0;
    bottleBar = new BottleBar();
    bottle_collected = 0;
    endBossBar = new EndbossBar();
    throwableObjects = [];
    lastBottleThrown = 0;
    level = level1;
    cam_x = -100;
    runInterval = null;
    requestId = null;

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
        this.requestId = requestAnimationFrame(function () {
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
        this.addObjsToMap(this.level.coins);
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
        if (this.keyboard.LEFT && !this.character.speed == 0)
            this.character.otherDirection = true;

        if (this.keyboard.RIGHT && !this.character.speed == 0)
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
            this.collectingCoin();
            this.checkBossEscaping();
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
                    this.character.updateStatusBar();
                }
            } else
                return false;
        });
    }

    isCollisionFromAbove(enemy) {
        let enemyHead = enemy.y + enemy.height - enemy.offset.top;
        let characterFoot = this.character.y + this.character.height - this.character.offset.bottom;
        return this.character.afterJump && (enemyHead > characterFoot);
    }

    enemyDeath(index, enemy) {
        enemy.stopAnimation();
        enemy.loadImage(enemy.IMG_DEAD);
        setTimeout(() => {
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 200);
    }

    checkCollisionsWithEndboss() {
        let endBoss = this.level.endboss[0];
        if (endBoss.isColliding(this.character)) {
            this.takingHit(this.character);
            this.character.updateStatusBar();
            endBoss.collisionPause();
            this.isAttacking(endBoss);
            setTimeout(() => {
                endBoss.restoreSpeed();
            }, 500);
        }
    }

    isAttacking(endBoss) {
        if (!endBoss.attackAnimation) {
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
        } else {
            let timePassed = new Date().getTime() - character.lastHit;
            timePassed = timePassed / 1000;
            if (timePassed > 1)
                character.takingHit = false;
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.canThrowObject()) {
            let x = (!this.character.otherDirection) ? this.character.x + this.character.width - this.character.offset.right - 40 : this.character.x + this.character.offset.left - 40;
            let y = this.character.y + this.character.offset.top;
            let bottle = new ThrowableObject(x, y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.lastBottleThrown = new Date().getTime();
            playSound(BOTTLE_THROW_AUDIO);
            this.bottle_collected--;
            let percentage = (this.bottle_collected > 20) ? 100 :
                (this.bottle_collected * 10 / 2 > 30) ? this.bottle_collected * 10 / 2 :
                    (this.bottle_collected > 0) ? 30 : 0;
            this.bottleBar.setPercentage(percentage);
        }
    }

    canThrowObject() {
        let timePassed = new Date().getTime() - this.lastBottleThrown;
        timePassed /= 1000;
        return timePassed > 1 && this.bottle_collected > 0;
    }

    checkBottleCollided() {
        let endBoss = this.level.endboss[0];
        let enemies = this.level.enemies;
        this.throwableObjects.forEach(bottle => {
            if (!bottle.isSplashed) {
                if (endBoss.isColliding(bottle) && !bottle.hasCollided) {
                    endBoss.hit();
                    bottle.isSplashed = true;
                    bottle.hasCollided = true;
                    playSound(BOTTLE_SPLASH_AUDIO);
                } else {
                    enemies.forEach(enemy => {
                        if (enemy.isColliding(bottle) && !enemy.isDead() && !bottle.hasCollided) {
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
                playSound(BOTTLE_SPLASH_AUDIO);
                const index = this.throwableObjects.indexOf(bottle);
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 90);
            }
        });
    }

    checkDeathsAfterCollision() {
        let enemies = this.level.enemies;
        if (this.level.endboss[0].isDead()) {
            playSound(BOSS_DEAD_AUDIO, true, 1000);
            this.gameOver();
        } else if (this.character.isDead()) {
            this.gameOver(false);
        } else if (enemies.length > 0) {
            for (const enemy of enemies) {
                if (enemy.isDead() && !enemy.deathAnimation) {
                    const index = enemies.indexOf(enemy);
                    enemy.deathAnimation = true;
                    this.enemyDeath(index, enemy);
                    break;
                }
            }
        }
    }

    checkBossEscaping() {
        if((this.level.endboss[0].x < -200 && this.character.x >= 100) || 
            (this.character.x - this.level.endboss[0].x > 1000) ||
            this.allBottlesUsed()) {
            this.gameOver(false);
        }
    }

    allBottlesUsed() {
        return this.throwableObjects.length == 0 && this.bottle_collected == 0 && this.level.bottles.length == 0;
    }

    gameOver(win = true) {
        this.character.speed = 0;
        this.character.stopAnimation();
        this.level.endboss[0].speed = 0;
        if (this.level.endboss[0].walkAnimation && !this.level.endboss[0].isDead())
            this.level.endboss[0].destructor();
        this.level.clouds.forEach(cloud => {
            cloud.speed = 0;
        });
        this.destroyThrowableObject();
        clearInterval(this.runInterval);
        this.runInterval = null;
        this.gameOverCelebration(win);
        showGameOver(win);
    }

    gameOverCelebration(win) {
        if (win) {
            this.character.loadImage("img/2_character_pepe/3_jump/J-35.png");
            playSound(GAME_WON_AUDIO, true, 1000);
            playSound(YES_AUDIO, true, 1000);
        } else
            playSound(GAME_LOST_AUDIO, true, 4000);
    }

    collectingBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
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
                this.updateBottleBar();
            }
        });
    }

    updateBottleBar() {
        let percentage = (this.bottle_collected > 0 && this.bottle_collected < 6) ? 30 :
                        (this.bottle_collected * 10 / 2 < 100) ? this.bottle_collected * 10 / 2 :
                        (this.bottle_collected < 23) ? 90 : 100;
        this.bottleBar.setPercentage(percentage);
    }

    collectingCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                playSound(COIN_AUDIO);
                this.coinCollected(coin);
            }
        })
    }

    coinCollected(coin) {
        this.level.coins.forEach((item, index) => {
            if (item === coin) {
                this.level.coins.splice(index, 1);
                this.coin_collected++;
                this. updateCoinBar();
            }
        });
    }

    updateCoinBar() {
        let percentage = (this.coin_collected > 0 && this.coin_collected < 6) ? 30 :
                        (this.coin_collected * 10 / 2 < 100) ? this.coin_collected * 10 / 2 :
                        (this.coin_collected < 20) ? 90 : 100;
        this.coinBar.setPercentage(percentage);
    }

    destructor() {
        clearInterval(this.runInterval);
        cancelAnimationFrame(this.requestId);
        this.requestId = null;
        this.ctx = null;
        this.canvas = null;
        this.keyboard = null;
        this.character.destructor();
        this.character = null;
        this.statusBar = null;
        this.coinBar = null;
        this.coin_collected = 0;
        this.bottleBar = null;
        this.bottle_collected = 0;
        this.endBossBar = null;
        this.destroyThrowableObject();
        this.lastBottleThrown = 0;
        this.destroyLevelEnemies();
        this.level = [];
    }

    destroyLevelEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.destructor();
        });
        this.level.endboss[0].destructor();
    }

    destroyThrowableObject() {
        if(this.throwableObjects[0])
            this.throwableObjects[0].destructor();
        this.throwableObjects = [];
    }
}