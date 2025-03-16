class MoveableObject {
    x = 50;
    y = 200;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    
    moveRight() {
        console.log("moving right");
    }

}