let canvas;
let world;
let keyboard = new Keyboard();

function init(restart = false) {
    if(restart)
        resetGame();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    hideScreens();
    playGameMusic();
}

function hideScreens() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
}

function playGameMusic() {
    playSound(GAME_AUDIO, false, 0, true, 0.1);
}

function pauseGameMusic() {
    pauseSound(GAME_AUDIO);
}

function showGameOver(win = true) {
    pauseGameMusic();
    if (win) {
        document.getElementById("gameOverScreen").style.display = "flex";
        document.getElementById("gameOverScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/game over!.png')";
    }else {
        document.getElementById("gameOverScreen").style.display = "flex";
        document.getElementById("gameOverScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
    }
}

function returnToStart() {
    window.location.reload();
}

function resetGame() {
    world = null;
    level1 = null;
    keyboard = new Keyboard();
    GAME_AUDIO.currentTime = 0;
    GAME_LOST_AUDIO.currentTime = 0;
    GAME_WON_AUDIO.currentTime = 0;
    YES_AUDIO.currentTime = 0;
    BOSS_DEAD_AUDIO.currentTime = 0;
    audioPaused = false;
}
