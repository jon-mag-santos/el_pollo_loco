/**
 * Class representing a chicken enemy
 * @extends MoveableObject
 */

class Chicken extends MoveableObject {
    y = 350;
    height = 80;
    width = 70;
    energy = 1;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    deathSound = new Audio('audio/chicken_hurt.mp3');
    offset = {
        top: 5,
        right: 5,
        bottom: -55,
        left: 5
    };

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.movementInterval = null;
        this.animationInterval = null;
        this.animate();
    }


    /**
    * Function to initiate intervals movement and animation.
    */
    animate() {
        this.movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }


    /**
     * Function to clear the movement and animation intervals.
     */
    clearIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }


    /**
    * Function to the the death animation.
    */
    dead() {
        this.clearIntervals();
        this.playAnimation(this.IMAGES_DEAD);
        this.deathSound.play();
    }
}