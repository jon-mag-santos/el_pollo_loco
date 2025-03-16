class Cloud extends MoveableObject {
    y = 10;
    width = 800;
    height = 300;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/full.png");
        this.x = 400 + Math.random() * 5;
    }
}