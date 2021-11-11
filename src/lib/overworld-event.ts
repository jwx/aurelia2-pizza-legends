import { OverworldMaps } from "../data/overworld-maps";
import { Pizzas } from "../data/pizzas";
import { Utils } from "./utils";

export class OverworldEvent {
  constructor(public map, public event) { }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    })

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    })

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)

  }

  textMessage(resolve) {

    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = Utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }

    this.map.overworld.textMessage = {
      owner: this.map.overworld,
      text: this.event.text,
      resolve,
    };
  }

  async changeMap(resolve) {
    await this.map.overworld.viewportElement.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], 300).finished;

    this.map.overworld.startMap(OverworldMaps[this.event.map]);

    await this.map.overworld.viewportElement.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], 300).finished;
    resolve();
  }

  battle(resolve) {
    this.map.overworld.battle = {
      combatants: {
        "player1": {
          ...Pizzas.s001,
          team: "player",
          hp: 30,
          maxHp: 50,
          xp: 75,
          maxXp: 100,
          level: 1,
          status: null
        },
        "enemy1": {
          ...Pizzas.v001,
          team: "enemy",
          hp: 20,
          maxHp: 50,
          xp: 20,
          maxXp: 100,
          level: 1,
        },
        "enemy2": {
          ...Pizzas.f001,
          team: "enemy",
          hp: 25,
          maxHp: 50,
          xp: 30,
          maxXp: 100,
          level: 1,
        },
      },
      activeCombatants: {
        player: "player1",
        enemy: "enemy2",
      },
      resolve,
    };
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }

}