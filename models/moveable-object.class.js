class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    energy=1;
    speed;
    speedY = 0;
    acceleration = 5;
    otherDirection = false;
    animationIntervals = null;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()|| this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this.y > 180)
                this.y = 180
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    playMovement(arr, fps, moveLeft) {
        const intervalTime = 1000 / fps; // Calculate the interval time for example 60 FPS (16.67ms)
        const imgs = arr;
        // Start the interval loop
        const intervalId = setInterval(() => {
            let i = this.currentImage % imgs.length;
            let path = imgs[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (moveLeft) {
                this.moveLeft();
            }
        }, intervalTime);
        return intervalId;
    }
 

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(mo){
        return this.x + this.width -this.offset.right > mo.x + mo.offset.left &&
            this.y +this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x  + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom
    }

    resetAnimation(frames) {
        clearInterval(frames);
    }

    hit() {
        this.energy -= 5;
        if(this.energy <= 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; //difference in sec
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}