let canvas;
let ctx;
let character = new Character('./img/2_character_pepe/2_walk/W-21.png');
let enemy = new Chicken('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    let imgToDraw = new Image();
    imgToDraw.src = character.img;
    setTimeout(() => {
        ctx.drawImage(imgToDraw,20, 20, character.x, character.y);
        imgToDraw.src = enemy.img;
    }, 2000);
    
    setTimeout(() => {
        ctx.drawImage(imgToDraw,200, 20, enemy.x, enemy.y);
    }, 3000);
}