class ThrowableObject extends MoveableObject {
    width = 100;
    height = 80;
    speed = 40;
    isSplashed = false;
    offset = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 10
    };

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throwInterval = null;
        this.throw(otherDirection);
        this.animate();
    }

    throw(otherDirection) {
        this.speedY = 30;
        this.speedX = (otherDirection) ? 30 : -30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if(!this.isSplashed) {
                if(otherDirection){
                    this.moveLeft();
                } else {
                    this.moveRight();
                }
            }else {
                this.animateSplash();
            }
        }, 60);
    }

    animate() {
        this.animationIntervals = this.playMovement(this.IMAGES_ROTATION, 20);
    }

    animateSplash() {
        this.stopAnimation();
        this.animationIntervals = this.playMovement(this.IMAGES_SPLASH, 40);
    }
}