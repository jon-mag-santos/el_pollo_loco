/**
 * Class representing a throwable object.
 * @extends MoveableObject
 */

class ThrowableObject extends MoveableObject {
    height = 80;
    width = 65;
    speedY = 30;
    speedX = 20;
    hasCollided;
    rotationInterval;

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    offset = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 10
    };

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throwInterval = null;
        this.throw(otherDirection);
        this.animate();
    }


    /**
     * Function to throw the object with a specific trajectory and initiates animation.
     */
    throw(otherDirection) {
        if (!otherDirection) {
            this.speedY = 30;
            this.speedX = 30;
            this.applyGravity();
            this.throwInterval = setInterval(() => {
                this.x += 25;
            }, 60);
            this.playThrowSound();
        } else
            this.throwBack();
    }

    /**
     * Function to throw the object back with a specific trajectory and initiates animation.
     */
    throwBack() {
        this.x -= 95;
        this.speedY = 30;
        this.speedX = -30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x -= 50;
        }, 60);
        this.playThrowSound();
    }


    /**
     * Function to animate the rotation of the throwable object.
     */
    animate() {
        this.rotationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 30);
    }


    /**
     * Function to animate the splash effect when the throwable object hits a target.
     */
    animateBottleSplash() {
        clearInterval(this.rotationInterval);
        this.speedX = 0;
        this.speedY = 0;
        this.applyGravity(false);
        clearInterval(this.throwInterval);
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }


    /**
     * Function to play the sound effect when the throwable object is thrown.
     */
    playThrowSound() {
        if (!audioMuted) {
            let throwSound = new Audio('audio/bottle_throw.mp3');
            throwSound.play();
        }
    }
}