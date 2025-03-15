/**
 *  Class representing a collectable coin object.
 * @extends MoveableObject class
 */

class Coin extends MoveableObject {
    x = 500;
    width = 100;
    height = 100;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    percentage = 100;
    animationInterval;
    offset = {
        top: 40,
        right: 40,
        bottom: 75,
        left: 40
    };

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.loadImage('img/8_coin/coin_1.png');
        this.x += x;
        this.y = Math.floor(y * Math.random()) + (Math.floor(Math.random() * 10) + 1);
        this.animate();
    }


    /**
    * Function to animate the coin's appearance
    * @function
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200)
    }


    /**
    * Function to stop the coin's animation.
    * @function
    */
    stopAnimation() {
        clearInterval(this.animationInterval);
    }
}