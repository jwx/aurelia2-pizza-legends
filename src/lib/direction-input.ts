import { Keyboard } from "./keyboard";

export class DirectionInput {
  public heldDirections = [];

  public map = {
    "ArrowUp": "up",
    "KeyW": "up",
    "ArrowDown": "down",
    "KeyS": "down",
    "ArrowLeft": "left",
    "KeyA": "left",
    "ArrowRight": "right",
    "KeyD": "right",
  };

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    Keyboard.subscribe(Object.keys(this.map),
      e => {
        const dir = this.map[e.code];
        if (!this.heldDirections.includes(dir)) {
          this.heldDirections.unshift(dir);
        }
      },
      e => {
        const dir = this.map[e.code];
        const index = this.heldDirections.indexOf(dir);
        if (index > -1) {
          this.heldDirections.splice(index, 1);
        }
      },
      false);
  }
}
