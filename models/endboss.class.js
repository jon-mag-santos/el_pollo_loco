class Endboss extends MoveableObject {
    y = 60;
    width = 400;
    height = 390;
    speed = 3;
    isAttacking = false;
    animationIntervals = null;
    offset = {
        top: 0,
        bottom: 0,
        left: 50,
        right: 70
    }

    IMAGES_WALKING = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png"
    ]

    IMAGES_ALERT = [
       "img/4_enemie_boss_chicken/2_alert/G5.png",
       "img/4_enemie_boss_chicken/2_alert/G6.png",
       "img/4_enemie_boss_chicken/2_alert/G7.png",
       "img/4_enemie_boss_chicken/2_alert/G8.png",
       "img/4_enemie_boss_chicken/2_alert/G9.png",
       "img/4_enemie_boss_chicken/2_alert/G10.png",
       "img/4_enemie_boss_chicken/2_alert/G11.png",
       "img/4_enemie_boss_chicken/2_alert/G12.png"
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png"
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    

    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1400 ;

        this.animate();
    }

    animate() {
        //this.animationIntervals = this.playMovement(this.IMAGES_WALKING, 10, false);
        this.animationIntervals =  this.playMovement(this.IMAGES_ALERT, 2);
    
    }

    isWalking() {
        clearInterval(this.animationIntervals);
        const intervalTime = 1000 / 6;  // Calculate the interval time for 60 FPS (16.67ms)
        let lastTime = 0; // To store the time of the last frame
        const imgs = this.IMAGES_WALKING;  // Images to be used for animation

        const animate = (time) => {
            const deltaTime = time - lastTime; // Time difference between frames
            if (deltaTime >= intervalTime) {  // Check if it's time for the next frame
                let i = this.currentImage % imgs.length;  // Get the current image index
                let path = imgs[i];  // Get the image path at the current index
                this.img = this.imageCache[path];  // Set the current image from the cache
                this.currentImage++;  // Move to the next image
                lastTime = time;  // Update the last frame time
            }
            this.moveLeft();
            // Continue the animation loop by calling requestAnimationFrame again
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }


}