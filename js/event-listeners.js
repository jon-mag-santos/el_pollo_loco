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
});