class Endboss extends MoveableObject {
    y = 60;
    width = 400;
    height = 390;
    speed = 15;
    isAttacking = false;
    energy = 100;
    walkAnimation = null;
    hurtAnimation = null;
    offset = {
        top: 0,
        bottom: 0,
        left: 80,
        right: 70
    };

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];



    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1400;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isDead()){
                this.speed = 0;
            }else if(this.isHurt() && this.newHit()) {
            console.log("End Boss is hurt", this.energy);
                this.isAttacking = false;
                this.lastHit = this.energy;
                this.isHurting();
            }else if(this.isAttacking && !this.walkAnimation) {
                this.isWalking();
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_ALERT, 500);

    }

    isWalking() {
        if (!this.walkAnimation && !this.animationIntervals) {  // Only start walking if it's not already walking
            this.walkAnimation = this.playAnimation(this.IMAGES_WALKING, false, true);
        }
    }

    stopWalking() {
        if (this.walkAnimation) {
            this.cancelAnimation(this.walkAnimation); // Stop the animation if it's running
        }
    }

    isHurting() {
        if(!this.hurtAnimation && !this.isAttacking) {
            if (this.animationIntervals)
                this.stopAnimation();
            this.stopWalking();
            this.hurtAnimation = this.playAnimation(this.IMAGES_HURT, 300, false);
            this.animationIntervals = true;
            this.isAttacking = true;
            setTimeout(() => {
                this.cancelAnimation(this.hurtAnimation);
                this.animationIntervals = null;
                this.hurtAnimation = null;
                setTimeout(() => {
                    this.isWalking();
                }, 200);
            }, 600);
        }else if(this.isAttacking) {
            this.cancelAnimation(this.hurtAnimation);
            this.animationIntervals = null;
            this.hurtAnimation = null;
            setTimeout(() => {
                this.isWalking();
            }, 200);
        }
    }

    newHit() {
        return this.energy != this.lastHit;
    }

    playMovement(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}