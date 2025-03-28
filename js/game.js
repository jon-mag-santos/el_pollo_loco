let canvas;
let world;
let keyboard = new Keyboard();
const isMobileDevice = window.innerWidth <= 1368;

/**
 * Function to initialize the game.
 * @param {boolean} restart - The value is true when the user want to play again directly after game over.
 */
function init(restart = false) {
    if(restart)
        resetGame();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    hideScreens();
    adjustControls();
    playGameMusic();
    enableMobileBtn();
}

/**
 * Function to hide start screen and game over screen.
 */
function hideScreens() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
}

/**
 * Function to adjust the sound and fullscreen control buttons by justifying center or space-around.
 */
function adjustControls() {
    let divBtnControl = document.getElementById("divBtnControl");
    const hasClass = divBtnControl.classList.contains("game-running");
    if (!hasClass) {
        divBtnControl.classList.add("game-running");
        divBtnControl.style.justifyContent = "center";
        divBtnControl.style.gap = (document.fullscreenElement) ? "40px" : "20px";
    }else {
        divBtnControl.classList.remove("game-running");
        divBtnControl.style.justifyContent = "space-around";
        divBtnControl.style.gap = "0px";
    }
}

/**
 * Function to display game over screen according to game results.
 * @param {boolean} win - if false, show "you lost!" game over screen.
 */
function showGameOver(win = true) {
    pauseGameMusic();
    if (win) {
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("gameOverScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/game over!.png')";
    }else {
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("gameOverScreen").style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
    }
}

/**
 * Function to return to start screen.
 */
function returnToStart() {
    resetGame();
    document.getElementById("startScreen").style.display = "block";
    document.getElementById("gameOverScreen").style.display = "none";
}

/**
 * Function to reset the principal game scopes.
 */
function resetGame() {
    if (world)
        world.destructor();
    world = null;
    level1 = null;
    keyboard = new Keyboard();
    canvas = null;
    GAME_AUDIO.currentTime = 0;
    GAME_LOST_AUDIO.currentTime = 0;
    GAME_WON_AUDIO.currentTime = 0;
    YES_AUDIO.currentTime = 0;
    BOSS_DEAD_AUDIO.currentTime = 0;
    audioPaused = false;
    pauseGameMusic();
    adjustControls();
    disableMobileBtn();
}

/**
 * Function to activate the fullscreen mode.
 */
function fullScreen() {
    let element = document.getElementById("gameContainer");
    let fullscreenBtn = document.getElementById("fullscreenBtn");
    let canvas = document.getElementById("canvas");
    if(!document.fullscreenElement) {
        enterFullscreen(element);
        adjustCanvasSize(canvas, "100vw !important", "100vh !important");
        adjustBtnsControl("40px")
        fullscreenBtn.src = "./img/10_additional_icons/fullscreen_off.png";
    }else {
        exitFullscreen();
        adjustCanvasSize(canvas, "720px !important", "480px !important");
        adjustBtnsControl("20px")
        fullscreenBtn.src = "./img/10_additional_icons/fullscreen_on.png";
    }
}

/**
 * Function to request the fullscreen mode according to the user's web browser.
 * @param {document} element - The div id="gameContainer".
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}

/**
 * Function to exit the fullscreen mode according to the user's web browser.
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozFullScreen) { 
        document.mozCancelFullScreen(); 
    }
}

/**
 * Function to request the fullscreen mode according to the user's web browser.
 * @param {document} canvas - The canvas.
 * @param {string} width - The width value.
 * @param {string} height - The height value.
 */
function adjustCanvasSize(canvas, width, height) {
    canvas.style.width = width;
    canvas.style.height = height;
}

/**
 * Function to adjust the space betweeen the buttons from the div id= "divBtnControl".
 * @param {document} gap - The space in pixel.
 */
function adjustBtnsControl(gap = "0px") {
    let divBtnControl = document.getElementById("divBtnControl");
    const hasClass = divBtnControl.classList.contains("game-running");
    divBtnControl.style.gap = (hasClass) ? gap : "0px";
}

/**
 * Function to show the screen with game instructions.
 */
function showInstructions() {
    document.getElementById("instructionScreen").style.display = "block";
}

/**
 * Function to close the screen with game instructions.
 */
function closeInstructions() {
    document.getElementById("instructionScreen").style.display = "none";
}

/**
 * Function to show the screen with the imprint and privacy police.
 */
function showImprint() {
    document.getElementById("imprintScreen").style.display = "block";
}

/**
 * Function to close the screen with the imprint and privacy police.
 */
function closeImprint() {
    document.getElementById("imprintScreen").style.display = "none";
}

/**
 * Function to show the screen with the story.
 */
function showStory() {
    document.getElementById("storyScreen").style.display = "block";
}

/**
 * Function to close the screen with the story.
 */
function closeStory() {
    document.getElementById("storyScreen").style.display = "none";
}

/**
 * Function to toggle rotation from the screen.
 */
function toggleScreenRotation() {
    let rotateContainer = document.getElementById("rotationContainer");
    let canvas = document.getElementById("canvas");
    if (window.matchMedia("(orientation: portrait)").matches) {
        rotateContainer.style.display = "flex";
        adjustCanvasSize(canvas, "100vw !important", "100vh !important");
        document.body.style.zoom=1.0;
    } else {
        rotateContainer.style.display = "none";
        adjustCanvasSize(canvas, "720px !important", "480px !important");
        document.body.style.zoom=1.0;
    }
}

/**
 * Function to enable the control button for mobile devices.
 */
function enableMobileBtn() {
    let bottomControls = document.getElementById("bottomControls");
    bottomControls.classList.remove("out-of-game");
    
}

/**
 * Function to disable the control button for mobile devices.
 */
function disableMobileBtn() {
    let bottomControls = document.getElementById("bottomControls");
    bottomControls.classList.add("out-of-game");
}