/**
 * Class representing the health bar for the end boss.
 * @extends DrawableObject
 */

class EndbossHealthbar extends DrawableObject {
    x = 500;
    y = 0;
    width = 200;
    height = 60;

    IMAGES_BOSS_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/bar/0.png',
        'img/7_statusbars/2_statusbar_endboss/bar/20.png',
        'img/7_statusbars/2_statusbar_endboss/bar/40.png',
        'img/7_statusbars/2_statusbar_endboss/bar/60.png',
        'img/7_statusbars/2_statusbar_endboss/bar/80.png',
        'img/7_statusbars/2_statusbar_endboss/bar/100.png',
    ];

    bossEnergy = 100;

    constructor() {
        super();
        this.id = EndbossHealthbar.counter;
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.setPercentage(this.bossEnergy);
    }


    /**
     * Function to set the boss's energy percentage and update the health.
     * @param {number} bossEnergy - The current energy level of the end boss.
     */
    setPercentage(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let percentage = (this.bossEnergy / 100) * 100;
        let path = this.IMAGES_BOSS_HEALTH[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}
