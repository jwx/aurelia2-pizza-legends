import { bindable } from "aurelia";
import { BattleEvent } from "../lib/battle-event";
import { TurnCycle } from "../lib/turn-cycle";

export class Battle {
    @bindable battle = null;

    public turnCycle: TurnCycle;
    public textMessage = null;
    public submissionMenu = null;

    attaching() {
        this.init();
    }

    init() {
        this.turnCycle = new TurnCycle(this.battle, event => {
            return new BattleEvent(this, event).init();
        });
        this.turnCycle.init();
    }
}
