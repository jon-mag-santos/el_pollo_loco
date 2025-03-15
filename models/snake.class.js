/**
 * Class representing a snake enemy
 * @extends MoveableObject
 */

class Snake extends MoveableObject {
    x = 500 + Math.floor(Math.random() * 3600);
    y = 350;
    height = 80;
    width = 70;
    energy = 1;
    speed = 0;

    IMAGES_ATTACKING = [
        'img/3_enemie_snake/2_attack/1_a.png',
        'img/3_enemie_snake/2_attack/2_a.png',
        'img/3_enemie_snake/2_attack/3_a.png',
        'img/3_enemie_snake/2_attack/4_a.png',
        'img/3_enemie_snake/2_attack/5_a.png',
        'img/3_enemie_snake/2_attack/6_a.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemie_snake/3_dead/dead.png'
    ];

    deathSound = new Audio('audio/snake_hurt.mp3');
    offset = {
        top: 5,
        right: 5,
        bottom: -55,
        left: 5
    };

    constructor() {
        super().loadImage('img/3_enemie_snake/2_attack/1_a.png');
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.movementInterval = null;
        this.animationInterval = null;
        this.animate();
    }


    /**
    * Function to initiate intervals for snake movement and animation.
    */
    animate() {
        this.movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_ATTACKING);
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