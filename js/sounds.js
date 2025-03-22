const BOSS_DEAD_AUDIO = new Audio("./audio/boss_dead.mp3"); 
const BOSS_INTRO_AUDIO = new Audio("./audio/boss_intro_sound.mp3");
const BOTTLE_COLLECT_AUDIO = new Audio("./audio/bottle_collect.mp3"); 
const BOTTLE_SPLASH_AUDIO = new Audio("./audio/bottle_shatter.mp3"); 
const BOTTLE_THROW_AUDIO = new Audio("./audio/bottle_throw.mp3"); 
const CHICKEN_HURT_AUDIO = new Audio("./audio/chicken_hurt.mp3"); 
const COIN_AUDIO = new Audio("./audio/coin.mp3"); 
const GAME_LOST_AUDIO = new Audio("./audio/game_lost.mp3"); 
const GAME_WON_AUDIO = new Audio("./audio/game_won.mp3"); 
const GAME_AUDIO = new Audio("./audio/game.mp3"); 
const HURT_AUDIO = new Audio("./audio/hurt.mp3"); 
const JUMP_AUDIO = new Audio("./audio/jump.mp3"); 
const WALK_AUDIO = new Audio("./audio/walk.mp3");
let audioPaused = false;

function playSound(audio, timeout = false, time = 0) {
    if(timeout && !audioPaused) {
        audio.play();
        setTimeout(() => {
            audio.pause();
            audioPaused = true;
        }, time);
    }else if(!timeout) {
        audio.play();
    }
}