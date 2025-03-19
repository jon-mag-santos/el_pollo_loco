let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    hideStartScreen();
    world = new World(canvas, keyboard);
    
}

function hideStartScreen() {
    document.getElementById("startScreen").style.display = "none";
}