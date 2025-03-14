/**
 * Class representing a endboss character
 * @extends MoveableObject
 */

class Endboss extends MoveableObject {
    x = 5000;
    y = 55;
    height = 400;
    width = 250;
    speed = 18;
    energy = 120;
    isDead = false;
    hadFirstContact = false;
    alertAnimationPlayed = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    alertSound = new Audio('audio/boss_intro_sound.mp3');
    hurtSound = new Audio('audio/chicken_hurt.mp3');
    deadSound = new Audio('audio/boss_dead.mp3');

    offset = {
        top: 60,
        right: 20,
        bottom: 90,
        left: 20
    };

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animationIntervals = [];
        this.animate();
    }

    /**
     * Function to animate the endboss's behavior, including starting an alert animation.
     */
    animate() {
        const animationInterval = setInterval(() => {
            if (this.alertPostionConditions()) {
                this.alertAnimation(animationInterval);
            }
        }, 120);
        this.animationIntervals.push(animationInterval);

        addInterval(animationInterval);
    }

    /**
     * Function to set an animation interval for a set of images.
     * This function plays the animation and triggers the isCompleted callback when finished.
     *
     * @param {Array<string>} imgs - Array of image paths for the animation frames.
     * @param {number} interval- The time interval between each frame in milliseconds.
     * @param {function|null} isCompleted - Callback function to execute when the animation is complete.
     * @returns {number} - The ID of the animation interval.
     */
    setAnimationInterval(imgs, interval, isCompleted = null) {
        let animationCounter = 0;
        const animationLength = imgs.length;
        return setInterval(() => {
            this.playAnimation(imgs);
            animationCounter++;
            if (animationCounter / animationLength >= 1) {
                clearInterval(this.deathAnimationInterval);
                if (isCompleted) {
                    isCompleted();
                } 
            }
        }, interval);
    }

    /**
     * Function to check if the alert animation start position conditions.
     */
    alertPostionConditions() {
        return world && world.character.x > 4500 && !this.hadFirstContact;
    }

    /**
     * Function to start the alert animation for the endboss character.
     *
     * @param {number} interval - The interval at which to check for starting the alert animation.
     */
    alertAnimation(interval) {
        if (!this.alertAnimationPlayed) {
            this.alertSound.play();
            this.alertAnimationInterval = this.setAnimationInterval(this.IMAGES_ALERT, 275, () => {
                clearInterval(this.alertAnimationInterval);
                this.alertAnimationPlayed = true;
                setTimeout(() => {
                    this.hadFirstContact = true;
                    this.walkingAnimation();
                }, 1000);
            });
            clearInterval(interval);
        }
    }

    /**
    * Function to start the walking animation for the endboss character.
    */
    walkingAnimation() {
        const walkingInterval = setInterval(() => {
            if (this.energy > 0 && !this.isDead) {
                this.updateSpeed();
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.bossIsDead()) {
                clearInterval(walkingInterval);
            }
        }, 120);
    }

    /**
     * Function to stop the endboss.
     */
    stopEndBoss() {
        this.speed = 0;
    }

    /**
     * Function to update the speed according to energy or position
     */
    updateSpeed() {
        if (this.energy < 60 || bossEscaping) {
            this.speed = 24 + Math.random() * 1.2;
        } else {
            this.speed;
        }
    }

    /**
     * Function to control when the endboss is hurt.
     */
    bossIsHurt() {
        this.energyReduced();
        this.hurtAnimation();
        this.updateBossHealthBar();
    }

    /**
    * Function to reduce the endboss's energy limited to 0.
    */
    energyReduced() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Function to start the hurt animation for the endboss character.
     * This animation occurs when the endboss is hit.
     */
    hurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopEndBoss();
            this.hurtSound.play();
            this.hurtAnimationInterval = this.setAnimationInterval(this.IMAGES_HURT, 300, () => {
                this.restoreWalkAnimation();
            });
        }
    }

    /**
     * Function to update the health bar of the endboss in the game world.
     */
    updateBossHealthBar() {
        world.endbossHealthbar.setPercentage(this.energy);
    }



    /**
     * Function to restore the endboss walking animation after the hurt.
     */
    restoreWalkAnimation() {
        clearInterval(this.hurtAnimationInterval);
        this.hurtAnimationInterval = null;
        this.playAnimation(this.IMAGES_WALKING);
        this.updateSpeedAfterDelay(0.05);
    }


    /**
     * Function to update the endboss' speed after a specified delay.
     *
     * @param {number} delay - The delay in seconds before resuming movement.
     */
    updateSpeedAfterDelay(delay) {
        setTimeout(() => {
            this.speed = 16 + Math.random() * 1.2;
        }, delay * 1000);
    }

    /**
     * Function to check if the endboss is dead.
     */
    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.resetAllAnimations();
            this.deadSound.play();
            this.deathAnimation();
            setTimeout(() => {
                showGameOverScreen();
            }, 1000);
            this.clearIntervals();
        }
    }

    /**
     * Function to clear all animation intervals associated with the endboss.
     */
    clearIntervals() {
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
        this.animationIntervals.forEach(interval => {
            const index = intervals.indexOf(interval);
            if (index !== -1) {
                intervals.splice(index, 1);
            }
        });
    }

    /**
     * Function to reset all animations for the endboss, including hurt animation and movement.
     */
    resetAllAnimations() {
        clearInterval(this.hurtAnimationInterval);
        this.stopEndBoss();
    }

    /**
     * Function to play the death animation for the endboss.
     */
    deathAnimation() {
        this.deathAnimationInterval = this.setAnimationInterval(this.IMAGES_DEAD, 250, () => {
            this.endDeathAnimation();
        });
    }

    /**
     * Function to end the death animation for the endboss and load the final image.
     */
    endDeathAnimation() {
        clearInterval(this.deathAnimationInterval);
        this.deathAnimationInterval = null;
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
    }

}
