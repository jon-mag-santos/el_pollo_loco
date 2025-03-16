let canvas;
let ctx;
let character = new MoveableObject('./img/2_character_pepe/2_walk/W-21.png');

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    let imgToDraw = new Image();
    imgToDraw.src = character.img;
    setTimeout(() => {
        ctx.drawImage(imgToDraw,20, 20, character.x, character.y);
    }, 2000);
    
}