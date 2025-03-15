/**
 * Global variables to the class in the game.
 */
let canvas;
let world;
let gameActive = true;
let keyboard = new Keyboard();
let intervals = [];

/**
 * Global variable to control if the end boss invade the village by crossing the game beggining
 * It represents to lose the game
 */
let bossEscaped = false;
/**
 * Global variable to control if the end boss is leaving Pepe behind
 */
let bossEscaping = false;
/**
 * Global variable to control if Pepe is throwing or trying to throw bottles
 */
let throwingBottle = false;

/**
 * Function to initialize the game.
 */
function init() {
    resetGame();
    initGameLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    playGameMusic();
    screensHidden();
    mobileBtnTouchEvents();
    toggleInGameMenu();
    toggleScreenRotation();
    toggleMobBtnContainer(); 
    muteAudioElements();
}

/**
 * Function to play the game again.
 */
function restartGame() {
    init();
}

/**
 * Function to reset the game.
 */
function resetGame() {
    world = null;
    keyboard = new Keyboard();
    intervals = [];
    gameActive = true;
}

/**
 * Function to reset the animationFrame ID.
 */
function resetFrameId() {
    if (animationFrameId !== 0) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = 0;
}

/**
 *  Function to add an interval to the intervals array.
 */
function addInterval(interval) {
    intervals.push(interval);
}

/**
 * Function to clear all intervals and animationFrame ID.
 */
function clearAllIntervals() {
    resetFrameId();
    intervals.forEach((intervalId) => {
        clearInterval(intervalId);
    });
    intervals = [];
}

/**
 * Function to return to the main menu.
 */
function returnMainMenu() {
    clearAllIntervals();
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('igMenu').style.display = 'none';
}

/**
 * Function to unset displaying of screens.
 */
function screensHidden() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('gameOverScreen').style.display = 'none';
}

/**
 * Function to show the end game screen.
 */
function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const mobileBtnContainer = document.querySelector('.mob-btn-container');
    if (world.isEndbossDefeated()) {
        showWonScreen(gameOverScreen, mobileBtnContainer);
    } else if (world.isPepeDead() || bossEscaped) {
        showLostScreen(gameOverScreen, mobileBtnContainer);
    }
    gameOverScreen.style.display = 'flex';
    gameActive = false;
    stopGameMusic();
    clearAllIntervals();
}

/**
 * Function to show the game won screen.
 */
function showWonScreen(gameOverScreen, mobileBtnContainer) {
    gameWonSound();
    gameOverScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/game over.png')";
    mobileBtnContainer.style.display = 'none';
}

/**
 * Function to show the game lost screen.
 */
function showLostScreen(gameOverScreen, mobileBtnContainer) {
    gameLostSound();
    gameOverScreen.style.backgroundImage = "url('img/9_intro_outro_screens/start/game_over/you lost.png')";
    mobileBtnContainer.style.display = 'none';
}

/**
 * Function to open the controls screen.
 */
function menuControls() {
    document.getElementById('ctrlsMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Function to close the controls screen.
 */
function closeMenuControls() {
    document.getElementById('ctrlsMenu').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

/**
 * Function to open the settings screen.
 */
function menuSettings() {
    document.getElementById('settingsMenu').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Function to close the settings screen.
 */
function closeMenuSettings() {
    document.getElementById('settingsMenu').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

/**
 * Function to open the story screen.
 */
function menuStory() {
    document.getElementById('storyMenu').style.display = 'flex';
    document.getElementById('menu').style.display = 'none';
}

/**
 * Function to close the story screen.
 */
function closeMenuStory() {
    document.getElementById('storyMenu').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}


