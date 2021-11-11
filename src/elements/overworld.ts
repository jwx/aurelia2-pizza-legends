import { OverworldMaps } from '../data/overworld-maps';
import { OverworldMap } from "../lib/overworld-map";
import { Keyboard } from '../lib/keyboard';
import { DirectionInput } from '../lib/direction-input';
import { Utils } from '../lib/utils';

export class Overworld {
  public viewportElement;
  public map = null;

  public textMessage = null;
  public battle = null;

  private actionListener;
  private directionInput;

  attaching() {
    this.init();
  }


  get objects() {
    return Object.values(this.map?.gameObjects ?? {});
  }

  get camera() {
    const position = this.map?.gameObjects.hero ?? { x: 0, y: 0 };
    return { x: position.x - Utils.withGrid(10.5), y: position.y - Utils.withGrid(6) };
  }

  startGameLoop() {
    const step = () => {
      //Update all objects
      Object.values(this.map.gameObjects).forEach((object: any) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      });

      requestAnimationFrame(() => {
        step();
      });
    }
    step();
  }

  initKeyboard() {
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }

  bindActionInput() {
    //Is there a person here to talk to?
    this.actionListener = Keyboard.subscribe('Enter', () => this.map.checkForActionCutscene());

    // Temporarily start battle
    Keyboard.subscribe('Space', () => {
      if (this.battle == null) {
        this.map.startCutscene([
          { type: 'battle' },
        ]);
      } else {
        this.battle.resolve();
        this.battle = null;
      }
    });
    // Temporarily set battle enemy
    Keyboard.subscribe(['Digit1', 'Digit2'], (e) => {
      if (this.battle != null) {
        this.battle.activeCombatants.enemy = e.code.replace('Digit', 'enemy');
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e: any) => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene()
      }
    })
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(this);
    this.map.init(mapConfig);
    this.map.mountObjects();
  }

  init() {
    this.startMap(OverworldMaps.DemoRoom);

    this.initKeyboard();
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // this.map.startCutscene([
    //   { type: 'battle' },
    // ]);
  }
}