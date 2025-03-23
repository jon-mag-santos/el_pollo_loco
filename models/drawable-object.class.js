class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Bottle ||
            this instanceof Coin
        ) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect( this.x, this.y, this.width,this.height);
        ctx.stroke();
        ctx.fillStyle = "red";
        if (this instanceof Character)
            ctx.fillStyle = "green";
        ctx.fillRect(this.x + this.width -this.offset.right, this.y +this.height - this.offset.bottom, 5, 5);
        ctx.fillRect(this.x + this.width -this.offset.right, this.y + this.offset.top, 5, 5);
        if (this instanceof Character)
            ctx.fillStyle = "yellow";
        ctx.fillRect(this.x + this.offset.left, this.y +this.height - this.offset.bottom, 5, 5);
        ctx.fillRect(this.x + this.offset.left, this.y + this.offset.top,5,5);
    
           
        }
    }
}