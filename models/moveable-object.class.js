class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    energy = 1;
    speed;
    speedY = 0;
    acceleration = 5;
    otherDirection = false;
    animationIntervals = null;
    deathAnimation = null;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (!(this instanceof ThrowableObject)) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
                if (this.y > 180)
                    this.y = 180
            } else {
                if (!this.isSplashed) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if(this.y >= 375){
                        this.isSplashed = true;
                        this.y = 375;
                    }
                }
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    playAnimation(arr, fps, moveLeft = false) {
        const intervalTime = (fps) ? fps : 1000 / 10; 
        const imgs = arr;
        const intervalId = setInterval(() => {
            let i = this.currentImage % imgs.length;
            let path = imgs[i]; 
            this.img = this.imageCache[path];
            this.currentImage++;
            if(moveLeft)
                 this.moveLeft();
        }, intervalTime);
        
        return intervalId;
    }

    cancelAnimation(intervalId) {
        clearInterval(intervalId);
        return null;
    }

    stopAnimation() {
        clearInterval(this.animationIntervals);
        this.animationIntervals = null;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    hit() {
        this.hurtSound();
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hurtSound(){
        if(this instanceof Character) {
            if (!this.isDead())
                playSound(HURT_AUDIO);
        }
        if(this instanceof Chicken || this instanceof Endboss) {
            playSound(CHICKEN_HURT_AUDIO);
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy <= 0;
    }
}