class Cloud extends MoveableObject {
    y = 10;
    width = 800;
    height = 300;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/"+ this.randomCloud() + ".png");
        this.x = Math.random() * 3100;
        this.animate();
    }

    animate() {
        setInterval(()=> {
         this.x -= this.moveLeft() * 1;
         if(this.x < -1000)
            this.x = 3100;
        }, 1000/60);  
     }

     randomCloud() {
        return Math.floor(Math.random()*2 + 1);
    }
}