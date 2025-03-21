class Character extends MoveableObject {
    x = 20;
    y = 10;
    width = 150;
    height = 250;
    speed = 10;
    world;
    longIdle= false;
    idleStart = false;
    afterJump = false;
    throwingBottle = false;
    takingHit = 0;
    energy = 100;
    offset = {
        top: 120,
        bottom: 15,
        left: 40,
        right: 50
    }
 

    IMAGES_IDLE = [
        "../img/2_character_pepe/1_idle/idle/I-1.png",
        "../img/2_character_pepe/1_idle/idle/I-2.png",
        "../img/2_character_pepe/1_idle/idle/I-3.png",
        "../img/2_character_pepe/1_idle/idle/I-4.png",
        "../img/2_character_pepe/1_idle/idle/I-5.png",
        "../img/2_character_pepe/1_idle/idle/I-6.png",
        "../img/2_character_pepe/1_idle/idle/I-7.png",
        "../img/2_character_pepe/1_idle/idle/I-8.png",
        "../img/2_character_pepe/1_idle/idle/I-9.png",
        "../img/2_character_pepe/1_idle/idle/I-10.png"
 
     ];
     
     IMAGES_LONG_IDLE = [
        "../img/2_character_pepe/1_idle/long_idle/I-11.png",
        "../img/2_character_pepe/1_idle/long_idle/I-12.png",
        "../img/2_character_pepe/1_idle/long_idle/I-13.png",
        "../img/2_character_pepe/1_idle/long_idle/I-14.png",
        "../img/2_character_pepe/1_idle/long_idle/I-15.png",
        "../img/2_character_pepe/1_idle/long_idle/I-16.png",
        "../img/2_character_pepe/1_idle/long_idle/I-17.png",
        "../img/2_character_pepe/1_idle/long_idle/I-18.png",
        "../img/2_character_pepe/1_idle/long_idle/I-19.png",
        "../img/2_character_pepe/1_idle/long_idle/I-20.png"
 
     ];
 
     IMAGES_WALKING =[
         "../img/2_character_pepe/2_walk/W-21.png",
         "../img/2_character_pepe/2_walk/W-22.png",
         "../img/2_character_pepe/2_walk/W-25.png",
         "../img/2_character_pepe/2_walk/W-24.png",
         "../img/2_character_pepe/2_walk/W-23.png",
         "../img/2_character_pepe/2_walk/W-26.png"
 
     ];
 
     IMAGES_JUMPING = [
         "../img/2_character_pepe/3_jump/J-31.png",
         "../img/2_character_pepe/3_jump/J-32.png",
         "../img/2_character_pepe/3_jump/J-33.png",
         "../img/2_character_pepe/3_jump/J-34.png",
         "../img/2_character_pepe/3_jump/J-35.png",
         "../img/2_character_pepe/3_jump/J-36.png",
         "../img/2_character_pepe/3_jump/J-37.png",
         "../img/2_character_pepe/3_jump/J-38.png",
         "../img/2_character_pepe/3_jump/J-39.png"
     ];
 
     IMAGES_HURT = [
         "../img/2_character_pepe/4_hurt/H-41.png",
         "../img/2_character_pepe/4_hurt/H-42.png",
         "../img/2_character_pepe/4_hurt/H-43.png"
     ];
 
     IMAGES_DEAD = [
         "../img/2_character_pepe/5_dead/D-51.png",
         "../img/2_character_pepe/5_dead/D-52.png",
         "../img/2_character_pepe/5_dead/D-53.png",
         "../img/2_character_pepe/5_dead/D-54.png",
         "../img/2_character_pepe/5_dead/D-55.png",
         "../img/2_character_pepe/5_dead/D-56.png",
         "../img/2_character_pepe/5_dead/D-57.png"
     ];

    constructor(world) {
        super().loadImage("./img/2_character_pepe/3_jump/J-37.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x 
                || this.world.keyboard.LEFT && this.x > 0) {
                this.isWalking(this.world.keyboard.RIGHT);
            }

            if(this.world.keyboard.UP || this.world.keyboard.SPACE){
                playSound(JUMP_AUDIO);
                this.afterJump = this.isJumping();
            }
            this.positionCameraX();
        }, 1000/60);

        this.animationInterval = setInterval(() => {
            if(this.isDead()){
                if(this.speed != 0){
                    this.playAnimation(this.IMAGES_DEAD);
                    setTimeout(() => {
                        this.speed = 0;
                    }, 350);
                }
            }else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            }else if(this.world.keyboard.UP || this.world.keyboard.SPACE){
                this.playAnimation(this.IMAGES_JUMPING);
            }else{
                this.playAnimation(this.IMAGES_IDLE, true);
            }
        }, 150);  
    }

    playAnimation(arr, idle){
        arr = this.isLongIdle(this.currentImage, arr, idle);
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = (this.afterJump && this.isAboveGround()) ? this.imageCache[this.IMAGES_JUMPING[6]] : this.imageCache[path];
        this.currentImage++;
    }

    isLongIdle(currentImage, arr, idle) {
        if(!idle || this.afterJump || this.isAboveGround() || this.world.isThrowing) {
            this.longIdle = false;
            this.idleStart = false;
            return arr;
        } else if(currentImage % 10 > 0 && !this.idleStart){
            this.currentImage = 0;
            this.idleStart = true;
        }
        if (!this.longIdle && currentImage % arr.length == 9 || this.longIdle) {
            this.longIdle = true;
            return this.IMAGES_LONG_IDLE;
        }else {
            this.longIdle = false;
            return arr;
        }      
    }

    isWalking(right) {
        if (right) {
            this.moveRight();
        }else
            this.moveLeft();
    }

    jump() {
        this.speedY = 20;
        this.y = this.speedY;
    }

    isJumping() {
        if (!this.isAboveGround()){
            this.jump();
        }
        while(this.isAboveGround()){
            return true;
        }
        return false;
    }

    positionCameraX() {
        if (this.world.level.endboss[0].x > this.x - 350) {
            this.world.cam_x = -this.x + 100;
        } else {
            this.world.cam_x = -this.x + 500;
        }
    }

}