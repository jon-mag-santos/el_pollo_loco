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
    deathAnimation = false;
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

    playAnimation(arr, fps, moveLeft) {
        const intervalTime = (fps) ? fps : 1000 / 10;  // Calculate the interval time for 60 FPS (16.67ms)
        let currentImage = 0; // To store the current image index
        const imgs = arr;  // Images to be used for animation

        // Start the animation using setInterval
        const intervalId = setInterval(() => {
            let i = currentImage % imgs.length;  // Get the current image index
            let path = imgs[i];  // Get the image path at the current index
            this.img = this.imageCache[path];  // Set the current image from the cache
            currentImage++;
            if(moveLeft)
            // Move to the next image
                 this.moveLeft();

            // Optionally, stop the animation after a certain time
            // If you want to stop it after a specific condition, use `clearInterval` elsewhere.
        }, intervalTime);

        return intervalId; // Return the intervalId so we can cancel the animation later
    }

    cancelAnimation(intervalId) {
        clearInterval(intervalId); // Stop the animation using clearInterval
        intervalId = null;
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

    stopAnimation() {
        clearInterval(this.animationIntervals);
        this.animationIntervals = null;
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
            playSound(HURT_AUDIO);
        }else if(this instanceof Chicken) {
            playSound(CHICKEN_HURT_AUDIO);
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; //difference in sec
        return timePassed < 1;
    }

    isDead() {
        return this.energy <= 0;
    }
}