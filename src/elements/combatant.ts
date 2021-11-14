import { bindable } from "aurelia";

export class CombatantCustomElement {
    @bindable combatant;

    public pizzaElement;

    get hpPercent() {
        return Math.max(this.combatant.hp, 0) / this.combatant.maxHp * 100;
    }

    get xpPercent() {
        return this.combatant.xp / this.combatant.maxXp * 100;
    }


    attaching() {
        this.combatant.pizzaElement = this.pizzaElement;
    }
}
