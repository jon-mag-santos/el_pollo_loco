class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    
    draw() {
        ctx = canvas.getContext("2d");
        ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}