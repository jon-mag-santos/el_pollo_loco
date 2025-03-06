/**
 * Represents a health bar for the end boss.
 * @class
 * @extends DrawableObject
 */

class EndbossHealthbar extends DrawableObject {
    IMAGES_BOSS_HEALTH_FULL = ['img/7_statusbars/2_statusbar_endboss/blue.png'];
    IMAGES_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/blue/0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/20.png',
        'iimg/7_statusbars/2_statusbar_endboss/blue/40.png',
        'iimg/7_statusbars/2_statusbar_endboss/blue/60.png',
        'iimg/7_statusbars/2_statusbar_endboss/blue/80.png',
        'iimg/7_statusbars/2_statusbar_endboss/blue/100.png',
    ];

    bossEnergy = 100;

    constructor() {
        super();
        this.id = EndbossHealthbar.counter;
        this.loadImages(this.IMAGES_BOSS_HEALTH_FULL);
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.bossEnergy);
    }


    /**
     * Sets the boss's energy percentage and updates the health bar image accordingly.
     * @function
     * @param {number} bossEnergy - The current energy level of the end boss.
     */
    setPercentage(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let path;
        if (this.bossEnergy === 100) {
            path = this.IMAGES_BOSS_HEALTH_FULL[0];
        } else {
            let percentage = (this.bossEnergy / 100) * 100;
            path = this.IMAGES_BOSS_HEALTH[this.findIndexPerc(percentage)];
        }
        this.img = this.imageCache[path];
    }
}
