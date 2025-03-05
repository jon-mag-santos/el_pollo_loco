/**
 * Class representing a snake character in the game.
 * @extends MoveableObject
 */

class Snake extends MoveableObject {
    y = 350;
    height = 80;
    width = 70;
    energy = 1;

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

    death_sound = new Audio('audio/snake_hurt.mp3');

    constructor(x) {
        super().loadImage('img/3_enemie_snake/2_attack/1_a.png');
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0;
        this.movementInterval = null;
        this.animationInterval = null;
        this.animate();
        this.offset = {
            top: 5,
            right: 5,
            bottom: -55,
            left: 5
        };
    }


    /**
    * Initiates intervals for snake movement and animation.
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
    * Stops the snakes movement and animation intervals.
    */
    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }


    /**
    * Initiates the death animation for the snake.
    * Stops movement and plays the death animation and sound.
    */
    playDeathAnimation() {
        this.stopIntervals();
        this.playAnimation(this.IMAGES_DEAD);
        this.death_sound.play();
    }
}