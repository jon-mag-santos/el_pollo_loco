class World {
    character = new Character();
    enemies = [
        new Chicken(200),
        new Chicken(300),
        new Chicken(400)
    ];
    
    draw() {
        ctx = canvas.getContext("2d");
        ctx.drawImage(this.character.img, this.character.x, this.character.y, 100, 200);
        this.enemies.forEach(enemy => {
            ctx.drawImage(enemy.img, enemy.x, enemy.y, 100, 200);
        });
    }
}