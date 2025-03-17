class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    energy=1;
    speed;
    speedY = 0;
    acceleration = 5;
    otherDirection = false;
    animationIntervals = [];

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
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

    playMovement(arr, interval) {
        const movement = setInterval(() => {
            let i = this.currentImage % arr.length;
            let path = arr[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, interval);
        this.animationIntervals.push(movement);
    }

    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        return Math.random();
    }

    isColliding(mo){
        return this.x + this.width -this.offset.right > mo.x + mo.offset.left &&
            this.y +this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x  + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height -mo.offset.bottom
    }

    resetAnimation() {
        this.animationIntervals = [];
    }

}