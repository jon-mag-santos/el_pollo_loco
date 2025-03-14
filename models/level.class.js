/**
 *  Class representing a game level containing enemies, clouds, background objects, coins, bottles, endboss and end of game level
 */

class Level {
    backgroundObjects;
    clouds
    enemies;
    bottles;
    coins;
    endboss;
    level_end_x = 4700;

    constructor(bgObjects, clouds, enemies, bottles, coins, endboss) {
        this.backgroundObjects = bgObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
