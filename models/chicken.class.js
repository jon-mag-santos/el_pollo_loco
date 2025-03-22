class Chicken extends MoveableObject {
    y = 350;
    width = 100;
    height = 80;
    speed = 5;
    energy = 1;
    offset = {
        top: 5,
        bottom: 0,
        left: -1,
        right: 5
    }

    IMAGES_WALKING =[
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMG_DEAD = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"]

    constructor() {
        super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 900;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isDead()){
                this.stopAnimation();
                this.speed = 0;
                this.loadImage(this.IMG_DEAD);
            }
        }, 150);
        this.animationIntervals = this.playAnimation(this.IMAGES_WALKING, 200, true);      

    }
    
}