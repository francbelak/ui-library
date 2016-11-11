import enableHandler from '../services/enablehandler.service.js';
import limitHandler from '../services/limithandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';

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
        type: 'number'
      }
    };
  }

  static components() {
    return {
      enableHandler,
      limitHandler,
      rangeHandler
    };
  }

  static styleUrls() {
    return [
      'ui-library/basic/master.css'
    ];
  }

  static template() {
    return `
    <!--style>
      .wrapper {
        color: var(--input-color, #9c9c9c);
        display: flex;
        height: 100%;
        text-align: center;
        width: 100%;
      }

      .flex {
        display: flex;
        justify-content: center;
      }

      button {
        flex: 1;
        background-color: var(--input-bg, #f9f8f8);
        border: none;
        outline: none;
      }

      button:hover {
        box-shadow: 0px 0px 21px 0px rgba(138,138,138,1);
        cursor: pointer;
        z-index: 99999;

      }

      button.disabled {
        cursor: not-allowed;;
      }

      button.disabled:hover {
        box-shadow: none;
      }

      .label {
        align-self: center;
        -webkit-user-select: none;
      }

      .outputValue {
        flex: 3;
        background-color: var(--input-bg, #f9f8f8);
      }

      .-limit-low-low {
        background-color: var(--low-low-color, rgb(236, 30, 83));
      }

      .-limit-low {
        background-color: var(--low-color, rgb(254, 229, 128));
      }

      .-limit-high {
        background-color: var(--high-color, rgb(254, 229, 128));
      }

      .-limit-high-high {
        background-color: var(--high-high-color, rgb(236, 30, 83));
      }
    </style>
    <div class="wrapper">
      <button class="flex" on-mousedown="decrement" on-mouseup="_clearInterval" on-mouseout="_clearInterval">
        <span class="label">-</span>
      </button>
      <div class="outputValue flex">
        <span class="label">{{testValue}}</span>
      </div>
      <button class="flex" on-mousedown="increment" on-mouseup="_clearInterval" on-mouseout="_clearInterval">
        <span class="label">+</span>
      </button>
    </div-->
    <div class="inc-dec">
      <button class="box" on-mousedown="decrement" on-mouseup="_clearInterval" on-mouseout="_clearInterval">-</button>
      <div class="value">{{testValue}}</div>
      <button class="box" on-mousedown="increment" on-mouseup="_clearInterval" on-mouseout="_clearInterval">+</button>
    </div>
    `;
  }

  createdCallback() {
    //wpwp.readData and bind on value
    this.intervalID = null;
    this.testValue = this.default;

    this.enableHandler.setDisabledState(this.$('button'));
    this._setLimits();
  }

  _setLimits() {
    this.limitHandler.setLimitClass(this.$('button, .outputValue'), this.testValue);
  }

  _setValue(increment) {
    this.intervalID = setInterval(() => {
      let steps = this.steps;

      if (!increment)
        steps = -steps;

      if(!this.rangeHandler.isInRange(this.testValue + steps))
        return;

      this.testValue += steps;
      console.log('wpcp.writeData: ', this.testValue);
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
