class Chicken extends MoveableObject {
    y = 350;
    width = 100;
    height = 80;

    IMAGES_WALKING =[
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    constructor() {
        super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 900;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playMovement(this.IMAGES_WALKING);
            this.x -= this.moveLeft() * 5;
        }, 200);
        
    }

    playMovement(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
}