let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    initLevel();
    world = new World(canvas, keyboard);
    hideStartScreen();
    playGameMusic();
}

function hideStartScreen() {
    document.getElementById("startScreen").style.display = "none";
}

function playGameMusic() {
    playSound(GAME_AUDIO, false, 0, true, 0.1);
}