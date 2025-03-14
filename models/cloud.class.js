/**
* Class representing a cloud object 
* @extends MoveableObject class.
*/

class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 6500;
        this.animate();
    }


    /**
    * Function to animate the cloud
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x = window.innerWidth + 3000;
            }
        }, 1000 / 60);
    }
}