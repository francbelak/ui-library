import enableHandler from '../services/enablehandler.service.js';
import limitHandler from '../services/limithandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';
import write from '../services/write.service.js';
import subscribe from '../services/subscribe.service.js';

export default class {
  static parameters() {
    return {
      default: {
        type: 'number'
      },
      steps: {
        type: 'number'
      },
      interval: {
        type: 'number',
        default: 250
      }
    };
  }

  static components() {
    return {
      enableHandler,
      limitHandler,
      rangeHandler,
      write,
      subscribe
    };
  }

  static styleUrls() {
    return [
      'ui-library/master.css'
    ];
  }

  static template() {
    return `
      <div class="inc-dec">
        <button class="box" on-mousedown="decrement" on-mouseup="_clearInterval" on-mouseout="_clearInterval">-</button>
        <div class="value">{{testValue}}</div>
        <button class="box" on-mousedown="increment" on-mouseup="_clearInterval" on-mouseout="_clearInterval">+</button>
      </div>
    `;
  }

  createdCallback() {
    this.intervalID = null;

    this._updateValue(this.default);
    this.subscribe.subscribe((e) => {this._updateValue(e.value);});

    this.enableHandler.setDisabledState(this.$('button'));
    this._setLimits();
  }

  _setLimits() {
    this.limitHandler.setLimitClass(this.$('.inc-dec, button'), this.testValue);
  }

  _updateValue(value) {
    this.testValue = value;
    this._setLimits();
  }

  _setValue(increment) {
    this.intervalID = setInterval(() => {
      let steps = this.steps;

      if (!increment)
        steps = -steps;

      if(!this.rangeHandler.isInRange(this.testValue + steps))
        return;

      this.testValue += steps;
      this.write.writeValue(this.testValue);
      this._setLimits();
    }, this.interval);
  }

  _clearInterval() {
    clearInterval(this.intervalID);
  }

  increment() {
    this.enableHandler.callIfEnabled(() => { this._setValue(true); });
  }

  decrement() {
    this.enableHandler.callIfEnabled(() => { this._setValue(false); });
  }
}
