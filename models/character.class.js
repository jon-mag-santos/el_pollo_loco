/**
 * Represents the main character in the game.
 * @extends MoveableObject
 */

class Character extends MoveableObject {
    y = -20;
    height = 275;
    width = 100;
    speed = 8;
    idleTimer = 0;
    longIdle = 2000;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/running_3.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
        this.jumping = false;
        this.offset = {
            top: 80,
            right: 20,
            bottom: 20,
            left: 20
        };
    }


    /**
     * Animates the character's movements and state transitions.
     */
    animate() {
        intervals.push(setInterval(() => {
            this.animatePepe();
        }, 1000 / 60));

        intervals.push(setInterval(() => {
            this.animatePepeState();
        }, 100));
    }


    /**
    * Pepe's basic movements.
    */
    animatePepe() {
        this.checkIdleTimer();
        this.pepeWalking();
        this.pepeJumping();
        this.positionCamera();
    }


    /**
    * It manages state changes depending on the current state of Pepe
    */
    animatePepeState() {
        if (this.isDead() && !this.world.gameOver) {
            this.playDeath();
        } else if (this.isHurt() && !this.world.gameOver) {
            this.isHurting();
        } else if (this.isAboveGround()) {
            this.isJumping();
        } else {
            if (!throwingBottle) { // Pepe does not idle, if he throws bottles!
                if (this.idleTimer > this.longIdle) {
                    this.isLongIdle();
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.isWalking();
                } else {
                    this.isIdle();
                }
            }else {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
                this.isIdle();   
                this.idleTimer = 0; 
            }
        }
    }


    /**
     * Updates the idle timer based on user input.
     */
    checkIdleTimer() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.idleTimer += 1000 / 120;
        } else {
            this.idleTimer = 0;
        }
    }


    /**
     * Pepe movement (walking).
     */
    pepeWalking() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.pause();
        }
    }


    /**
    * Pepe jumping.
    */
    pepeJumping() {
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
            this.jump();
            this.idleTimer = 0;
        }
    }


    /**
    * Camera position based on character's x-coordinate & endboss' x-coordinate
    */
    positionCamera() {
        if (this.world.level.endboss[0].x > this.x - 100) {
            this.world.camera_x = -this.x + 100;
            bossEscaping = false;
        } else {
            this.world.camera_x = -this.x + 500;
            bossEscaping = true;
        }
    }


    /**
    * Check if character's state when dead.
    */
    playDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.endGame();
    }


    /**
    * Check pepe's state when hurt.
    */
    isHurting() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }


    /**
    * Check Pepe's state when jumping.
    */
    isJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
    }


    /**
    * Check Pepe's state during long idle periods.
    */
    isLongIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }


    /**
    * Check Pepe's state during walking periods.
    */
    isWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
    * Check Pepe's state when idle.
    */
    isIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }
}
