export class Combatant {
    update(changes) {
        Object.keys(changes).forEach(key => {
            this[key] = changes[key];
        });
        return this;
    }
}
