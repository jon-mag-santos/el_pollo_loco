/**
 * Globale variable to define canvas maximal width
 */
const canvasMaxWidth = 719;

/**
 * Function to initialize the game level with  enemies, clouds, background objects, coins, bottles, and an endboss.
 */
function initGameLevel() {
    level1 = new Level(
        // Background objects array
        [
            new BackgroundObject('img/5_background/layers/air.png', -canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvasMaxWidth),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', canvasMaxWidth * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', canvasMaxWidth * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', canvasMaxWidth * 2),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvasMaxWidth * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvasMaxWidth * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvasMaxWidth * 3),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', canvasMaxWidth * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', canvasMaxWidth * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', canvasMaxWidth * 4),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvasMaxWidth * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvasMaxWidth * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvasMaxWidth * 5),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', canvasMaxWidth * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', canvasMaxWidth * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', canvasMaxWidth * 6),
            new BackgroundObject('img/5_background/layers/air.png', canvasMaxWidth * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvasMaxWidth * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvasMaxWidth * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvasMaxWidth * 7)
        ],
        // Clouds array
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        // Enemies array
        [
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Snake(),
            new Snake(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        // Bottles array
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        // Coins array
        [
            new Coin(200, 150),
            new Coin(250, 100),
            new Coin(300, 150),
            new Coin(1000, 100),
            new Coin(1050, 150),
            new Coin(1100, 150),
            new Coin(1150, 100),
            new Coin(1450, 200),
            new Coin(1800, 150),
            new Coin(1850, 75),
            new Coin(2400, 150),
            new Coin(2450, 100),
            new Coin(2500, 150),
            new Coin(2750, 50),
            new Coin(3100, 150),
            new Coin(3150, 75),
            new Coin(3450, 150),
            new Coin(3550, 100),
            new Coin(3600, 150),
            new Coin(4000, 50)
        ],
        // Endboss
        [new Endboss()]
    );
}
