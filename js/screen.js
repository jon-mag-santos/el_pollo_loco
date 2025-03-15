/**
 * Global variable for detection of mobile devices based on window dimension.
 */
const isMobileDevice = window.innerWidth <= 1368;

/**
 * Function to toggle fullscreen mode.
 */
function toggleFullscreenMode() {
    let container = document.getElementById('canvas-container');
    let canvas = document.getElementById('canvas');
    let fullscreenButton = document.querySelector('.fullscreen-toggle');
    let fullscreenIcon = document.getElementById('fullscreenIcon');

    if (!document.fullscreenElement) {
        requestFullscreen(container);
        setCanvasWidthHeight(canvas, '100vw', '100vh');
        fullscreenButton.innerText = 'Fullscreen Off';
        fullscreenIcon.src = './img/12_icons/FULLSCREEN_OFF_icon.png';
    } else {
        exitFullscreen();
        resetCanvasWidthHeight(canvas);
        fullscreenButton.innerText = 'Fullscreen On';
        fullscreenIcon.src = './img/12_icons/FULLSCREEN_ON_icon.png';
    }
}

/**
 * Function to set the canvas width and height.
 * @param {HTMLElement} canvas - The canvas element.
 * @param {string} width - The width of the canvas.
 * @param {string} height - The height of the canvas.
 */
function setCanvasWidthHeight(canvas, width, height) {
    canvas.style.width = width;
    canvas.style.height = height;
}

/**
 * Function to reset the canvas width and height to default.
 * @param {HTMLElement} canvas - The canvas element.
 */
function resetCanvasWidthHeight(canvas) {
    setCanvasWidthHeight(canvas, '720px', '480px');
}

/**
 * Function to update canvas width and height based on fullscreen mode.
 */
function updateCanvasWidthHeight() {
    let canvas = document.getElementById('canvas');
    if (document.fullscreenElement) {
        setCanvasWidthHeight(canvas, '100vw', '100vh');
    } else {
        resetCanvasWidthHeight(canvas);
    }
}

/**
 * Function to request fullscreen mode.
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * Function to exit fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Function to control fullscreen change event.
 */
function fullscreenChanging() {
    let fullscreenButton = document.querySelector('.fullscreen-toggle');
    if (document.fullscreenElement) {
        fullscreenButton.innerText = 'Fullscreen Off';
        setCanvasWidthHeight(document.getElementById('canvas'), '100vw', '100vh');
    } else {
        fullscreenButton.innerText = 'Fullscreen On';
        resetCanvasWidthHeight(document.getElementById('canvas'));
    }
}

/**
 * Function to toggle the rotate screen container based on window dimensions.
 */
function toggleScreenRotation() {
    const rotateContainer = document.querySelector('.rotation-container');

    if (isMobileDevice && window.innerHeight > window.innerWidth) {
        rotateContainer.style.display = 'flex';
        setCanvasWidthHeight(document.getElementById('canvas'), '100vw', '100vh');
    } else {
        rotateContainer.style.display = 'none';
    }
}

/**
 * Function to toggle the mobile button container based on window dimensions.
 */
function toggleMobBtnContainer() {
    const mobileBtnContainer = document.querySelector('.mob-btn-container');
    if (isMobileDevice) {
        mobileBtnContainer.style.display = 'flex';
    } else {
        mobileBtnContainer.style.display = 'none';
    }
}

/**
 * Function to toggle the in-game menu.
 */
function toggleInGameMenu() {
    const inGameMenu = document.getElementById('igMenu');
    inGameMenu.style.display = 'flex';
}

document.addEventListener("fullscreenchange", fullscreenChanging);
document.addEventListener("webkitfullscreenchange", fullscreenChanging);
document.addEventListener("msfullscreenchange", fullscreenChanging);
window.addEventListener('DOMContentLoaded', () => {
    toggleScreenRotation();
});
window.addEventListener('orientationchange', toggleScreenRotation, toggleMobBtnContainer, toggleInGameMenu);
window.addEventListener('resize', toggleScreenRotation, toggleMobBtnContainer, toggleInGameMenu);