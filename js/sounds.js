/**
 * Global variable to the class sounds
 */
let gameMusic = new Audio('audio/game.mp3');
let gameWon = new Audio('audio/game_won.mp3');
let yesSound = new Audio('audio/yes.mp3');
let gameLost = new Audio('audio/game_lost.mp3');
let audioMuted = false;
let gameMusicMuted = false;

/**
 * Function to set volume and to play the game music.
 */
function playGameMusic() {
    gameMusic.volume = 0.1;
    gameMusic.muted = gameMusicMuted;
    gameMusic.play();
}

/**
 * Function to stop the game music and to reset it.
 */
function stopGameMusic() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
}

/**
 * Function to play the game won sound.
 */
function gameWonSound() {
    if (!audioMuted) {
        gameWon.play();
        yesSound.play();
    }
}

/**
 * Function to play the game lost sound.
 */
function gameLostSound() {
    if (!audioMuted) {
        gameLost.play();
    }
}

/**
 * Function to toggle the mute status of the game audio and updates the UI.
 */
function toggleSound() {
    audioMuted = !audioMuted;
    updateAudioStatus();
    muteAudioElements();
}

/**
 * Function to update the mute status of the game music and images.
 */
function updateAudioStatus() {
    gameMusicMuted = !gameMusicMuted;
    gameMusic.muted = gameMusicMuted;
    let musicToggleButton = document.getElementById('musicToggleBtn');
    let soundIcon = document.getElementById('soundIcon');
    if (gameMusicMuted) {
        musicToggleButton.innerText = 'Sound Off';
        soundIcon.src = './img/12_icons/SOUND_OFF_icon.png';
    } else {
        musicToggleButton.innerText = 'Sound On';
        soundIcon.src = './img/12_icons/SOUND_ON_icon.png';
    }
    if (gameActive) {
        muteAudioElements();
    }
}

/**
 * Function to mute or unmute all audio elements 
 */
function muteAudioElements() {
    if (gameMusic) {
        gameMusic.muted = audioMuted;
    } else
        gameMusic.play();
    if (world) {
        muteEnemiesSounds();
        mutePepeSounds();
        muteEndbossSounds();
    }
}

/**
 * Function to mute or unmute enemies sounds 
 */
function muteEnemiesSounds() {
    if (world.level && world.level.enemies) {
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken || enemy instanceof Snake || enemy instanceof Chick) {
                enemy.deathSound.muted = audioMuted;
            }
        });
    }
}

/**
 * Function to mute or unmute endboss enemy sounds
 */
function muteEndbossSounds() {
    if (world.level && world.level.endboss) {
        world.level.endboss.forEach((endboss) => {
            endboss.alertSound.muted = audioMuted;
            endboss.hurtSound.muted = audioMuted;
            endboss.deadSound.muted = audioMuted;
        });
    }
}

/**
 * Function to mute or unmute Pepe's sounds
 */
function mutePepeSounds() {
    if (world.character) {
        world.character.walkingSound.muted = audioMuted;
        world.character.hurtSound.muted = audioMuted;
    }
}

/**
 * Function to play a game sound with the given file path and optional volume.
 * @param {string} soundFilePath - The file path of the sound to be played.
 * @param {number} [volume=0.2] - The volume level of the sound (default is 0.2).
 */
function playSound(soundFilePath, volume = 0.2) {
    let gameSound = new Audio(soundFilePath);
    gameSound.volume = volume;
    if (!audioMuted) {
        gameSound.play();
    }
}

/**
 * Function to play the bottle breaking
 */
function playBreakingSound() {
    if (!audioMuted) {
        this.playSound('audio/bottle_break.mp3');
    }
}
