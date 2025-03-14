/**
 * Function to control touch events for mobile buttons.
 */
function mobileBtnTouchEvents() {
    const leftButton = document.getElementById("mob-left");
    const rightButton = document.getElementById("mob-right");
    const jumpButton = document.getElementById("mob-jump");
    const bottleButton = document.getElementById("mob-bottle");

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

    bottleButton.addEventListener("touchstart", (event) => {
        throwingBottle = true;
        event.preventDefault();
        keyboard.D = true;
    });

    bottleButton.addEventListener("touchend", (event) => {
        throwingBottle = false;
        keyboard.D = false;
    });
}





