window.addEventListener("keydown", (event) => {
    if (event.code == 'ArrowUp')
        keyboard.UP = true;

    if (event.code == 'ArrowDown')
        keyboard.DOWN = true;

    if (event.code == 'ArrowLeft')
        keyboard.LEFT = true;

    if (event.code == 'ArrowRight')
        keyboard.RIGHT = true;

    if (event.code == 'Space')
        keyboard.SPACE = true;

    if (event.code == 'KeyD')
        keyboard.D = true;

    event.preventDefault();
});


window.addEventListener("keyup", (event) => {
    if (event.code == 'ArrowUp')
        keyboard.UP = false;

    if (event.code == 'ArrowDown')
        keyboard.DOWN = false;

    if (event.code == 'ArrowLeft')
        keyboard.LEFT = false;

    if (event.code == 'ArrowRight')
        keyboard.RIGHT = false;

    if (event.code == 'Space')
        keyboard.SPACE = false;

    if (event.code == 'KeyD')
        keyboard.D = false;

    event.preventDefault();
});

const leftButton = document.getElementById("mob-left");
const rightButton = document.getElementById("mob-right");
const jumpButton = document.getElementById("mob-jump");
const bottleButton = document.getElementById("mob-bottle");

leftButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
});

leftButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
});

rightButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
});

rightButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
});

jumpButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
});

jumpButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
});

bottleButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard.D = true;
});

bottleButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard.D = false;
});

window.addEventListener('DOMContentLoaded', () => {
    toggleScreenRotation();
});
window.addEventListener('orientationchange', toggleScreenRotation);
window.addEventListener('resize', toggleScreenRotation);
document.addEventListener("fullscreenchange", toggleScreenRotation);
document.addEventListener("webkitfullscreenchange", toggleScreenRotation);
document.addEventListener("msfullscreenchange", toggleScreenRotation);