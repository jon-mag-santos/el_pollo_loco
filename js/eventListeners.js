/**
 * Handle keyboard keydown events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener("keydown", (event) => {
    if (!gameActive) return;

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

    if (event.code == 'KeyD') {
        keyboard.D = true;
        throwingBottle = true;
    }

});

/**
 * Handle keyboard keyup events.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener("keyup", (event) => {
    if (!gameActive) return;

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

    if (event.code == 'KeyD') {
        keyboard.D = false;
        throwingBottle = false;
    }
});

/**
 * Handle touch events for mobile buttons.
 */
function mobileButtonTouch() {
    const leftButton = document.getElementById("mobile-left");
    const rightButton = document.getElementById("mobile-right");
    const jumpButton = document.getElementById("mobile-jump");
    const throwButton = document.getElementById("mobile-throw");

    leftButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    leftButton.addEventListener("touchend", (event) => {
        keyboard.LEFT = false;
    });

    rightButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    rightButton.addEventListener("touchend", (event) => {
        keyboard.RIGHT = false;
    });

    jumpButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    jumpButton.addEventListener("touchend", (event) => {
        keyboard.SPACE = false;
    });

    throwButton.addEventListener("touchstart", (event) => {
        throwingBottle = true; 
        event.preventDefault();
        keyboard.D = true;
    });

    throwButton.addEventListener("touchend", (event) => {
        keyboard.D = false;
        throwingBottle = false;
    });
}

document.addEventListener("fullscreenchange", onFullscreenChange);
document.addEventListener("webkitfullscreenchange", onFullscreenChange);
document.addEventListener("msfullscreenchange", onFullscreenChange);
window.addEventListener('DOMContentLoaded', () => {
    toggleRotateScreen();
});
window.addEventListener('orientationchange', toggleRotateScreen, toggleMobileButtonContainer, toggleInGameMenu);
window.addEventListener('resize', toggleRotateScreen, toggleMobileButtonContainer, toggleInGameMenu);
