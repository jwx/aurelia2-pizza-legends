import { OverworldEvent } from "./overworld-event";
import { Utils } from "./utils";

export class OverworldMap {
  public gameObjects = [];
  public cutsceneSpaces = {};
  public walls = {};

  public lowerImage = new Image();
  public upperImage = new Image();

  public isCutscenePlaying = false;

  constructor(public overworld) { }

  public init(config) {
    this.gameObjects = config.gameObjects ?? this.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces ?? this.cutsceneSpaces
    this.walls = config.walls ?? this.walls;

    this.lowerImage.src = config.lowerSrc;
    this.upperImage.src = config.upperSrc;
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = Utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {
      const object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      object.mount(this);
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent(this, events[i]);
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //Reset NPCs to do their idle behavior
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = Utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events)
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = Utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }

}

