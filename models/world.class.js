/**
 * Global variable to store the animation frame ID
 */
let animationFrameId = 0;

/**
 * Class representing the game world where characters and objects interact.
 */
class World {
    character = new Character();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    statusBar = new Statusbar();
    gameOver = false;
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collectedCoins = 0;
    DKeyPressed = false;
    showEndbossHealthbar = false;
    canThrowBottle = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.energy = 100; //Assuring that the new game does not break after lost games
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Function to draw the game.
     */
    draw() {
        if (!gameActive) return;
        this.resetCanvas();
        this.drawBackground();
        this.drawGameObjs();
        this.drawMainCharacter();
        this.drawStatusBars();
        animationFrameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Function to draw the background objects.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Function to draw the main character on the game screen.
     */
    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Function to draw the status bar, bottle bar, coin bar, and endboss health bar.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.endLevelBossHealthBar();
        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthbar);
        }
    }

    /**
     * Function to show endboss health bar if Pepe get to level end.
     */
    endLevelBossHealthBar() {
        if (this.character.x > 4500) {
            this.showEndbossHealthbar = true;
        }
    }

    /**
     * Function to draw game objects including enemies, coins, endboss, bottles, clouds, and throwable objects.
     */
    drawGameObjs() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjsToMap(this.level.clouds);
        this.addObjsToMap(this.level.enemies);
        this.addObjsToMap(this.level.coins);
        this.addObjsToMap(this.level.endboss);
        this.addObjsToMap(this.level.bottles);
        this.addObjsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Function to add a object to the game, to control direction and flip the image.
     * @param {DrawableObject} mo - the moveable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Function to add multiple objects to map.
     * @param {Object[]} objs - Array of objects to add to the map.
     */
    addObjsToMap(objs) {
        objs.forEach(o => {
            this.addToMap(o);
        })
    }
  
    /**
     * Function to flip the image and to adjust its position on the screen.
     * @param {DrawableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Function to flip back the image and to restore its screen position.
     * @param {DrawableObject} mo - The movable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Function to reset the canvas.
     */
    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Function to set the reference to the game world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Function to start the game loop that checks for collisions.
     */
    run() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkBottleHitEndbossCollisions();
            this.isEndbossEscaped();
        }, 10);
    }

    /**
     * Function to check collisions of the character with enemies.
     */
    checkCollisions() {
        this.checkCollisionsEnemies();
        this.checkCollisionEndboss();
    }

    /**
     * Function to check collision between the character and enemies.
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.isCollisionAfterJump(enemy);
                } else if (this.character.energy > 0) {
                    this.controlCollision();
                }
            }
        });
        this.checkCollisionsBottleEnemy();
    }

    /**
     * Function to check collision between the character and an endboss.
     */
    checkCollisionEndboss() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            this.level.endboss.forEach(boss => {
                if (this.character.isColliding(boss)) {
                    this.controlCollision();
                }
            });
        }
    }

    /**
     * Function to control collisions between the characters, Pepe's energy reducing and status bar update.
     */
    controlCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * Function to control the collision between the character and an enemy after jump.
     * @param {Enemy} enemy - The enemy collided.
     */
    isCollisionAfterJump(enemy) {
        enemy.energy--;
        this.character.jump();
        if (enemy.energy === 0) {
            enemy.dead();
            setTimeout(() => {
                this.eliminateEnemy(enemy);
            }, 500);
        }
    }

    /**
     * Function to eliminate an enemy from the level.
     * @param {Enemy} e - The enemy to eliminate.
     */
    eliminateEnemy(e) {
        const i = this.level.enemies.indexOf(e);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
        }
    }

    /**
     * Function to play the death animation for an enemy
     */
    playEnemyDeadAnimation(enemy) {
        if (enemy.energy <= 0) {
            enemy.dead();
        }
    }


    /**
     * Function to check collisions between throwable objects and enemies.
     */
    checkCollisionsBottleEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.isColliding(bottle)) {
                    this.controlBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }

    /**
     * Function to control the collision between a bottle and an enemy.
     */
    controlBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        this.playEnemyDeadAnimation(enemy);
        playBreakingSound();
        bottle.animateBottleSplash();
        this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
    }


    /**
     *  Function to remove the bottle and enemy after a collision.
     */
    removeBottleAndEnemyAfterCollision(bottleIndex, enemy) {
        if (enemy.energy === 0) {
            setTimeout(() => {
                this.eliminateEnemy(enemy);
            }, 500);
        }
        setTimeout(() => {
            this.removeBottleAfterCollision(bottleIndex);
        }, 1000);
    }

    

    /**
     * Function to check collisions between the character and coins, updates collected coins, and plays a sound.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                playSound('audio/coin.mp3', 0.1);
                coin.stopAnimation();
            }
        });
    }

    /**
     * Function to check collisions between the character and bottles, updates collected bottles, and plays a sound.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
                playSound('audio/bottle_collect.mp3', 1);
            }
        });
    }

    /**
     * Function to check if the character can throw a bottle and adds a throwable object to the game.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrowBottle && this.bottleBar.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 650);
        }
    }

    /**
     * Function to check collisions between throwable objects (bottles) and the endboss.
     */
    checkBottleHitEndbossCollisions() {
        this.throwableObjects.forEach((bottle, i) => {
            if (this.isBottleCollidingWithEndboss(bottle)) {
                this.controlBottleEndbossCollision(bottle, i);
            }
        });
    }

    /**
     * Function to check if a bottle is colliding with the endboss.
     * @param {ThrowableObject} bottle - The throwable object (bottle) to check for collision.
     */
    isBottleCollidingWithEndboss(bottle) {
        return !bottle.hasCollided && this.level.endboss[0].isColliding(bottle);
    }

    /**
     * Function to control the collision between a bottle and the end boss.
     * @param {ThrowableObject} bottle - The bottle that collided with the end boss.
     * @param {number} i - The index of the bottle in the throwable objects array.
     */
    controlBottleEndbossCollision(bottle, i) {
        bottle.hasCollided = true;
        this.level.endboss[0].bossIsHurt();
        playBreakingSound();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.removeBottleAfterCollision(i);
        }, 1000);
    }

    /**
     * Function to remove a bottle from the throwable objects array after a collision.
     * @param {number} i - The index of the bottle to remove from the array.
     */
    removeBottleAfterCollision(i) {
        this.throwableObjects.splice(i, 1);
    }

    
    /**
     * Function to check if the endboss is defeated.
     */
    isEndbossDefeated() {
        return this.level.endboss[0] && this.level.endboss[0].isDead;
    }

    /**
     *  Function to check if endboss escaped
     */

    isEndbossEscaped() {
        if( this.level.endboss[0].x <= 0) {
           gameActive = false;
           bossEscaped = true;
           showGameOverScreen();

           setInterval(() => {
            this.level.endboss[0].x = 5000;
           }, 1000);
        }
    }

    /**
     * Function to check if Pepe is dead (out of energy).
     */
    isPepeDead() {
        return this.character && this.character.energy <= 0;
    }

    /**
     * Function to end the game.
     */
    gameEnd() {
        if (!this.gameOver && this.isPepeDead()) {
            this.gameOver = true;
            this.bottleBar.setCollectedBottles(0);
            this.throwableObjects = [];
            showGameOverScreen();
        }
    }
}