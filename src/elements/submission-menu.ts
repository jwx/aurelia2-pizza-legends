import { bindable } from "aurelia";
import { Actions } from "../data/actions";

export class SubmissionMenu {
    @bindable submissionMenu = null;

    constructor() { }

    public attaching() {
        this.init();
    }

    decide() {
        this.submissionMenu.resolve({
            action: Actions[this.submissionMenu.caster.actions[0]],
            target: this.submissionMenu.enemy,
        })
    }

    init() {
        this.decide()
    }
}
