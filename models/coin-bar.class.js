/**
* Global variable to the maximum number of coins
*/
const MAX_COINS = 20;

/**
*  Class representing the collected coins bar.
*  @extends DrawableObject class.
*/

class CoinBar extends DrawableObject {
    x = 15;
    y = 50;
    width = 200;
    height = 60;

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    collectedCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setCollectedCoins(this.collectedCoins);  
    }


    /**
    * Function to set the number of collected coins and to update the coin bar.
    * @param {number} count - The number of collected coins.
    */
    setCollectedCoins(count) {
        this.collectedCoins = count;
        let percentage = (this.collectedCoins / MAX_COINS) * 100;
        let path = this.IMAGES_COINS[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}
