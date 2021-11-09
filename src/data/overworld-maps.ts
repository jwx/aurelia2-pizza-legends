import { Person } from "../lib/person";
import { Utils } from "../lib/utils";

export const OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person().init({
        isPlayerControlled: true,
        x: Utils.withGrid(5),
        y: Utils.withGrid(6),
      }),
      npcA: new Person().init({
        x: Utils.withGrid(7),
        y: Utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy...", faceHero: "npcA" },
              { type: "textMessage", text: "Go away!" },
              { who: "hero", type: "walk", direction: "up" },
            ]
          }
        ]
      }),
      npcB: new Person().init({
        x: Utils.withGrid(8),
        y: Utils.withGrid(5),
        src: "/images/characters/people/npc2.png",
        // behaviorLoop: [
        //   { type: "walk",  direction: "left" },
        //   { type: "stand",  direction: "up", time: 800 },
        //   { type: "walk",  direction: "up" },
        //   { type: "walk",  direction: "right" },
        //   { type: "walk",  direction: "down" },
        // ]
      }),
    },
    walls: {
      [Utils.asGridCoord(7, 6)]: true,
      [Utils.asGridCoord(8, 6)]: true,
      [Utils.asGridCoord(7, 7)]: true,
      [Utils.asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [Utils.asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 500 },
            { type: "textMessage", text: "You can't be in there!" },
            { who: "npcB", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ]
        }
      ],
      [Utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen" }
          ]
        }
      ]
    }

  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person().init({
        isPlayerControlled: true,
        x: Utils.withGrid(5),
        y: Utils.withGrid(5),
      }),
      npcB: new Person().init({
        x: Utils.withGrid(8),
        y: Utils.withGrid(8),
        src: "/images/characters/people/npc3.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "You made it!", faceHero: "npcB" },
            ]
          }
        ]
      }),

      // npcB0: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB1: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB2: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB3: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB4: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB5: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB6: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB7: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB8: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB9: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),

      // npcB10: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB11: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB12: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB13: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB14: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB15: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB16: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB17: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB18: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB19: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),

      // npcB20: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB21: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB22: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB23: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB24: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB25: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB26: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB27: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB28: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB29: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),

      // npcB30: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB31: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB32: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB33: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB34: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB35: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB36: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB37: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB38: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB39: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),

      // npcB40: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB41: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB42: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB43: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB44: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB45: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB46: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB47: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB48: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),
      // npcB49: new Person().init({
      //   x: Utils.withGrid(8),
      //   y: Utils.withGrid(8),
      //   src: "/images/characters/people/npc3.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "You made it!", faceHero: "npcB" },
      //       ]
      //     }
      //   ]
      // }),

    }
  },
}
