class World {
    ctx;
    canvas;
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];

    constructor (canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx = canvas.getContext("2d");
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        //draw will always executed
        let self = this
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}