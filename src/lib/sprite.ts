export class Sprite {
  public image = new Image();
  public isLoaded = false;

  //Shadow
  public shadow = new Image();
  public useShadow = true;
  public isShadowLoaded = false;

  //Configure Animation & Initial State
  public animations = {
    "idle-down": [[0, 0]],
    "idle-right": [[0, 1]],
    "idle-up": [[0, 2]],
    "idle-left": [[0, 3]],
    "walk-down": [[1, 0], [0, 0], [3, 0], [0, 0],],
    "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1],],
    "walk-up": [[1, 2], [0, 2], [3, 2], [0, 2],],
    "walk-left": [[1, 3], [0, 3], [3, 3], [0, 3],]
  };
  public currentAnimation = "idle-right";
  public currentAnimationFrame = 0;

  public animationFrameLimit = 8;
  public frameLimit = 8;
  public animationFrameProgress = this.animationFrameLimit;
  public frameProgress = 0;

  public frameX = 0;
  public frameY = 0;

  constructor(
    //Reference the game object
    public gameObject = null
  ) { }

  init(config) {
    //Set up the image
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Shadow
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations ?? this.animations;

    this.animationFrameLimit = config.animationFrameLimit ?? this.animationFrameLimit;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  update() {
    this.frameX = this.animations[this.currentAnimation][this.currentFrame][0];
    this.frameY = this.animations[this.currentAnimation][this.currentFrame][1];
    this.frameProgress++;
  }

  get currentFrame() {
    const progress = Math.max(this.frameProgress, 0);
    const limit = this.frameLimit;
    const length = this.animations[this.currentAnimation].length;
    const frame = Math.floor(progress / limit) % length;
    return frame;
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.frameProgress = 0;
    }
  }
}
