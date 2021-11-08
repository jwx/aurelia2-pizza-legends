import { OverworldEvent } from "./overworld-event";
import { Sprite } from "./sprite";

export class GameObject {
  public id = null;
  public isMounted = false;
  public x = 0;
  public y = 0;
  public direction = "down";

  public behaviorLoop = [];
  public behaviorLoopIndex = 0;
  public talking = [];
  public isStanding = false;

  public sprite = new Sprite(this);

  init(config) {
    this.x = config.x ?? this.x;
    this.y = config.y ?? this.y;
    this.direction = config.direction ?? this.direction;
    this.sprite.init({
      src: config.src ?? "/images/characters/people/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop ?? this.behaviorLoop;
    this.talking = config.talking ?? this.talking;
    return this;
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10)
  }

  update(_state) { }

  async doBehaviorEvent(map) {
    //Don't do anything if there is a more important cutscene or I don't have config to do anything
    //anyway.
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    //Setting up our event with relevant info
    const eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent(map, eventConfig);
    await eventHandler.init();

    //Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    //Do it again!
    this.doBehaviorEvent(map);
  }
}
