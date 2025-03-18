class EndbossBar extends StatusBar {
    x = 500;
    y = 0;
    width = 200;
    height = 60;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/bar/0.png',
        'img/7_statusbars/2_statusbar_endboss/bar/20.png',
        'img/7_statusbars/2_statusbar_endboss/bar/40.png',
        'img/7_statusbars/2_statusbar_endboss/bar/60.png',
        'img/7_statusbars/2_statusbar_endboss/bar/80.png',
        'img/7_statusbars/2_statusbar_endboss/bar/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}
