const BOSS_DEAD_AUDIO = new Audio("./audio/boss_dead.mp3"); 
const BOSS_INTRO_AUDIO = new Audio("./audio/boss_intro_sound.mp3");
const BOTTLE_COLLECT_AUDIO = new Audio("./audio/bottle_collect.mp3"); 
const BOTTLE_SPLASH_AUDIO = new Audio("./audio/bottle_shatter.mp3"); 
const BOTTLE_THROW_AUDIO = new Audio("./audio/bottle_throw.mp3"); 
const CHICKEN_HURT_AUDIO = new Audio("./audio/chicken_hurt.mp3"); 
const CHICK_HURT_AUDIO = new Audio("./audio/small_chicken_hurt.mp3"); 
const SNAKE_HURT_AUDIO = new Audio("./audio/snake_hurt.mp3"); 
const COIN_AUDIO = new Audio("./audio/coin.mp3"); 
const GAME_LOST_AUDIO = new Audio("./audio/game_lost.mp3"); 
const GAME_WON_AUDIO = new Audio("./audio/game_won.mp3"); 
const GAME_AUDIO = new Audio("./audio/game.mp3"); 
const HURT_AUDIO = new Audio("./audio/hurt.mp3"); 
const JUMP_AUDIO = new Audio("./audio/jump.mp3"); 
const WALK_AUDIO = new Audio("./audio/walk.mp3");
const YES_AUDIO = new Audio("./audio/yes.mp3");
let soundMuted = false;

function playSound(audio, timeout = false, time = 0, loop = false, volume = null) {
    if(volume)
        audio.volume = volume;
    if(timeout && !soundMuted) {
        audio.play();
        setTimeout(() => {
            pauseSound(audio);
        }, time);
    }else if(loop) {
        audio.loop = true;
        audio.play();
    }else if(!timeout && !loop && !soundMuted) {
        audio.play();
    }
}

function pauseSound(audio){
    audio.pause();
}

function toggleSound() {
    soundMuted = !soundMuted;
    GAME_AUDIO.muted = soundMuted;
    let soundBtn = document.getElementById("soundBtn");
    soundBtn.src = (soundMuted) ? "./img/10_additional_icons/sound_off.png" :
                                    "./img/10_additional_icons/sound_on.png";
}

function playGameMusic() {
    playSound(GAME_AUDIO, false, 0, true, 0.2);
}

function pauseGameMusic() {
    pauseSound(GAME_AUDIO);
}