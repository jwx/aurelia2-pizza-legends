import { BattleAnimations } from "./battle-animations";
import { Utils } from "./utils";

export class BattleEvent {
  constructor(public battle, public event) { }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    this.battle.textMessage = {
      owner: this.battle,
      text,
      resolve,
    };
  }

  async stateChange(resolve) {
    const { target, damage } = this.event;
    if (damage) {
      //modify the target to have less HP
      target.update({
        hp: target.hp - damage
      });

      //blink briefly
      target.pizzaElement.animate(
        { visibility: ['visible', 'hidden'] },
        { duration: 300, iterations: 2, easing: 'steps(2, start)' }
      );
    }
    resolve();
  }

  submissionMenu(resolve) {
    this.battle.submissionMenu = {
      caster: this.event.caster,
      enemy: this.event.enemy,
      resolve: submission => {
        this.battle.submissionMenu = null;
        //submission { what move to use, who to use it on }
        resolve(submission)
      }
    };
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
}
