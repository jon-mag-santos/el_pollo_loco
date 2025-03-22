class Endboss extends MoveableObject {
    y = 60;
    width = 400;
    height = 390;
    speed = 15;
    energy = 100;
    walkAnimation = null;
    hurtAnimation = null;
    attackAnimation = null;
    bossIntro = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 80,
        right: 70
    };
    world;
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
                playSound(BOSS_DEAD_AUDIO, true, 1000);
                this.cancelAllAnimations();
                this.endBossDead();
            }else if(this.isHurt() && this.newHit()) {
                this.world.endBossBar.setPercentage(this.energy);
                this.lastHit = this.energy;
                this.isHurting();
            }else if(!this.world.isCharacterTooFar(this) && !this.bossIntro) {
                playSound(BOSS_INTRO_AUDIO);
                setTimeout(() => {
                    this.bossIntro = true;
                }, 1500);
            }else if(!this.world.isCharacterTooFar(this) && this.bossIntro) {
                this.isWalking();
            }else if(this.isColliding(this.world.character)) {
                this.isAttacking();
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_ALERT, 500);

    }

    isWalking() {
        if(this.animationIntervals)
            this.stopAnimation();
        if (!this.walkAnimation) {
            this.walkAnimation = this.playAnimation(this.IMAGES_WALKING, false, true);
        }
    }

    collisionPause() {
        this.speed = 0;
    }

    restoreSpeed(){
        this.speed = 15;
    }

    isHurting() {
        if(!this.hurtAnimation) {
            if (this.animationIntervals)
                this.stopAnimation();
            if (this.walkAnimation) {
                this.collisionPause();
            }
            this.hurtAnimation = this.playAnimation(this.IMAGES_HURT, 300);
            setTimeout(() => {
                this.hurtAnimation = this.cancelAnimation(this.hurtAnimation);
                if(!this.walkAnimation) {
                    this.isWalking();
                }else
                    this.restoreSpeed();
            }, 600);
        }
    }

    newHit() {
        return this.energy != this.lastHit;
    }

    cancelAllAnimations(exception = null) {
        this.stopAnimation();
        this.hurtAnimation = (exception == this.hurtAnimation ) ? this.hurtAnimation : this.cancelAnimation(this.hurtAnimation);
        this.walkAnimation = (exception == this.walkAnimation ) ? this.walkAnimation : this.cancelAnimation(this.walkAnimation);
        this.attackAnimation = (exception == this.attackAnimation ) ? this.attackAnimation : this.cancelAnimation(this.attackAnimation);
    }

    endBossDead() {
        if (!this.deathAnimation) {
            this.deathAnimation = this.playAnimation(this.IMAGES_DEAD, 300);
            setTimeout(() => {
                this.cancelAnimation(this.deathAnimation);
                this.loadImage("img/4_enemie_boss_chicken/5_dead/G26.png");
            }, 600);
        }
    }
}