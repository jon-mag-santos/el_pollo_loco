class MoveableObject extends DrawableObject {
    x = 50;
    y = 200;
    img;
    speed;
    otherDirection = false;
    
    playMovement(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        return Math.random();
    }

}