class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    speed;
    
    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        return Math.random();
    }

}