export class Player {
  constructor(
    x,
    y,
    width,
    height,
    imageSrc,
    frameCount,
    frameWidth,
    frameHeight,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dy = 0;
    this.onGround = true;

    this.image = new Image();
    this.image.src = imageSrc;

    this.frameIndex = 0;
    this.frameCount = frameCount;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDelay = 0;
  }

  draw(ctx) {
    if (!this.image.complete) return;

    this.frameDelay++;
    if (this.frameDelay >= 8) {
      this.frameIndex = (this.frameIndex + 1) % this.frameCount;
      this.frameDelay = 0;
    }

    ctx.drawImage(
      this.image,
      this.frameIndex * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
