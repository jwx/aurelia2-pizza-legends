import { GameObject } from "./game-object";
import { Utils } from "./utils";

export class Person extends GameObject {
  public static directionUpdate = {
    "up": ["y", -1],
    "down": ["y", 1],
    "left": ["x", -1],
    "right": ["x", 1],
  }

  public movingProgressRemaining = 0;
  public isPlayerControlled = false;

  init(config) {
    super.init(config);
    this.isPlayerControlled = config.isPlayerControlled ?? this.isPlayerControlled;
    return this;
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {

      //More cases for starting to walk will come here
      //
      //

      //Case: We're keyboard ready and have an arrow pressed
      if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite();
    }
    this.sprite.update();
  }

  startBehavior(state, behavior) {
    //Set character direction to whatever behavior has
    this.direction = behavior.direction;

    if (behavior.type === "walk") {
      //Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior)
        }, 10);

        return;
      }

      //Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        Utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        })
        this.isStanding = false;
      }, behavior.time)
    }
  }

  updatePosition() {
    const [property, change] = Person.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;

    if (this.movingProgressRemaining === 0) {
      //We finished the walk!
      Utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id
      });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
