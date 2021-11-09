export class Keyboard {
    private static subscribers = [];

    static keyDown(event) {
        for (const subscriber of Keyboard.subscribers) {
            if (subscriber.keys.includes(event.code)) {
                if (subscriber.noRepeat && subscriber.isPressed) {
                    return;
                }
                // Subscriber's pressed returns true if skipped so continue
                if (subscriber.pressed(event)) {
                    return;
                }
                subscriber.pressedKeys.add(event.code);
                return;
            }
        }
    }
    static keyUp(event) {
        for (const subscriber of Keyboard.subscribers) {
            if (subscriber.keys.includes(event.code) && subscriber.pressedKeys.has(event.code)) {
                // Subscriber's released returns true if skipped so continue
                if (subscriber.released(event)) {
                    return;
                }
                subscriber.pressedKeys.delete(event.code);
                return;
            }
        }
    }

    static subscribe(keys, pressed, released?, noRepeat = true) {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }
        const subscriber = {
            keys,
            pressed,
            released: released ?? (() => { }),
            noRepeat,
            pressedKeys: new Set(),
            dispose: () => { Keyboard.unsubscribe(subscriber) },
        }
        Keyboard.subscribers.unshift(subscriber);
        return subscriber;
    }

    static unsubscribe(subscriber) {
        Keyboard.subscribers = Keyboard.subscribers.filter(sub => sub !== subscriber);
    }
}
