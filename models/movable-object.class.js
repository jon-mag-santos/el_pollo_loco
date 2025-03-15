/**
* Class representing moveable object
* @extends DrawableObject class.
*/
class MoveableObject extends DrawableObject {
    energy = 100;
    lastHitTime = 0;
    hitCooldown = 250;
    speed = 0.2;
    speedY = 0;
    acceleration = 2;
    
    otherDirection = false;


    /**
     * Function to apply gravity to the moveable object.
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 40);
    }


    /**
     * Function to check if the moveable object is above the ground or falling.
     * @returns {boolean} True if above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            if(this instanceof Character && this.y > 150){ // Keeping Pepe above the ground
                this.y = 150;
            }
            return this.y < 150;  
        }
    }

    /**
     * Function to move the moveable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Function to move the moveable object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Function to make the moveable object jump.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Function to check if the moveable object is colliding with another moveable object.
     * @param {MoveableObject} mo - The other moveable object to check collision with.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }


    /**
     * Function to control the hit event on the moveable object, reducing its energy.
     */
    hit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHitTime > this.hitCooldown) {
            this.lastHitTime = currentTime;
            this.energy -= 10;

            if (this.energy < 0) {
                this.energy = 0;
            }
        }
    }


    /**
     * Function to check if the moveable object is hurt based on the hit cooldown.
     * @returns {boolean} True if hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHitTime;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * Function to check if the moveable object.
     * @returns {boolean} 
     */
    isDead() {
        if (this instanceof Character && this.energy <= 0) {
            this.world.gameOver = true;
        }
        return this.energy <= 0;
    }


    /**
     * Function to play an animation on the moveable object by updating its image.
     * @param {string[]} images - An array of image paths to use for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}