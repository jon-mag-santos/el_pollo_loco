class Chicken extends MoveableObject {
    y = 250;
    width = 100;
    height = 80;

    constructor(x) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = x;
    }
    moveLeft() {
        console.log("moving left");
    }
}