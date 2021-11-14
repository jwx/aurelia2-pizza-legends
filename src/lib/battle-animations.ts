import { Utils } from "./utils";

export class BattleAnimations {
    static async spin(event, resolve) {
        const duration = event.caster.team === 'player' ? 885 : 700;
        const peak = 0.25;
        const movement = event.caster.team === 'player' ? '160px,-35px' : '-160px,35px';
        const rotation = event.caster.team === 'player' ? '45deg' : '-45deg';

        event.caster.pizzaElement.animate([
            { zIndex: 0, transform: 'translate3d(0,0,0) rotate(0deg) scale(2)', offset: 0 },
            { zIndex: 100, transform: `translate3d(${movement},0) rotate(${rotation}) scale(2)`, offset: peak },
            { zIndex: 0, transform: 'translate3d(0,0,0) scale(2)', offset: 1 },
        ], { duration, iterations: 1 });

        // Continue battle cycle right around when the pizzas collide
        await Utils.wait(duration * peak);
        resolve();
    }
}
