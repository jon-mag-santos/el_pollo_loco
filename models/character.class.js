class Character extends MoveableObject {
    x = 20;
    y = 187;
    width = 150;
    height = 250;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
    }
    jump() {
        console.log("jump");
    }
}