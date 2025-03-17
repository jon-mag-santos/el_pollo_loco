class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    speed;
    speedY = 0;
    acceleration = 5;
    otherDirection = false;

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

    playMovement(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        return Math.random();
    }

}