import { bindable } from "aurelia";
import { Keyboard } from "../lib/keyboard";

export class TextMessage {
  @bindable textMessage;

  public index = 0;
  private subscriptionNext;
  private timeout;

  attaching() {
    this.subscriptionNext = Keyboard.subscribe('Enter', () => {
      this.done();
    });
    this.textMessage.delay = this.textMessage.delay ?? 60;
    this.timeout = setTimeout(() => this.next(), this.textMessage.delay);
  }

  detaching() {
    this.subscriptionNext.dispose();
  }

  get text() {
    return this.textMessage.text.substring(0, this.index);
  }

  next() {
    this.index++;
    if (this.textMessage.text[this.index] === '') {
      this.index++;
    }
    if (this.index <= this.textMessage.text.length) {
      this.timeout = setTimeout(() => this.next(), this.textMessage.delay);
    }
  }

  done() {
    if (this.index < this.textMessage.text.length) {
      this.index = this.textMessage.text.length;
      clearTimeout(this.timeout);
    } else {
      this.index = 0;
      this.textMessage.owner.textMessage = null;
      this.textMessage.resolve();
    }
  }
}
