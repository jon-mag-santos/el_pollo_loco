class Chicken extends MoveableObject {
    y = 350;
    width = 100;
    height = 80;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 400 + Math.random() * 900;
    }
    moveLeft() {
        console.log("moving left");
    }
}