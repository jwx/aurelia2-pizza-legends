export class TurnCycle {
    public currentTeam = 'player';

    constructor(public battle, public turnHandler) { }

    public get oppositeTeam() {
        return this.currentTeam === "player" ? "enemy" : "player";
    }

    async turn() {
        //Get the caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];
        const enemyId = this.battle.activeCombatants[this.oppositeTeam];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.turnHandler({
            type: "submissionMenu",
            caster,
            enemy,
        });
        const resultingEvents = submission.action.success;
        for (const resultingEvent of resultingEvents) {
            await this.turnHandler({
                ...resultingEvent,
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            });
        }

        this.currentTeam = this.oppositeTeam;
        this.turn();

    }

    async init() {
        await this.turnHandler({
            type: "textMessage",
            text: "The battle is starting!"
        })

        //Start the first turn!
        this.turn();
    }
}
