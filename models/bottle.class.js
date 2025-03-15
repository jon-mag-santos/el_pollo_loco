/**
 * Class representing a bottle object.
 * @extends MoveableObject
 */

class Bottle extends MoveableObject {
    x = 450 + Math.floor(Math.random() * 3950);
    y = 375;
    width = 60;
    height = 60;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    }
}
