/**
* Global variable to the maximum number of bottles
*/
const MAX_BOTTLES = 17;

/**
 *  Class representing status bar for collected bottles in the game.
 *  @extends DrawableObject
 */
class BottleBar extends DrawableObject {
    x = 15;
    y = 100;
    width = 200;
    height = 60;

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    collectedBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.setCollectedBottles(this.collectedBottles);
    }

    
    /**
     * Function to set the number of collected bottles and to update the bottle bar.
     * @param {number} bottle - The number of collected bottles.
     */
    setCollectedBottles(bottle) {
        this.collectedBottles = bottle;
        let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;
        let path = this.IMAGES_BOTTLES[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}
