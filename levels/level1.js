/**
 * Function to initialize the game level with  enemies, clouds, background objects, coins, bottles, and an endboss.
 */
function initGameLevel() {
    level1 = new Level(
        // Background objects array
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7)
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
            new Bottle(0),
            new Bottle(100),
            new Bottle(650),
            new Bottle(950),
            new Bottle(1200),
            new Bottle(1300),
            new Bottle(1450),
            new Bottle(1650),
            new Bottle(1750),
            new Bottle(2050),
            new Bottle(2350),
            new Bottle(2550),
            new Bottle(2950),
            new Bottle(3250),
            new Bottle(3550),
            new Bottle(3700),
            new Bottle(3950)
        ],
        // Coins array
        [
            new Coin(200, 150),
            new Coin(250, 100),
            new Coin(300, 150),
            new Coin(1000, 100),
            new Coin(1050, 150),
            new Coin(1050, 50),
            new Coin(1100, 100),
            new Coin(1450, 200),
            new Coin(1800, 150),
            new Coin(1800, 75),
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
