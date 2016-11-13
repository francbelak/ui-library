import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';
import enableHandler from '../services/enablehandler.service.js';
import formatHandler from '../services/formathandler.service.js';
import rangeHandler from '../services/rangehandler.service.js';

export default class {
  static parameters() {
    return {
      default: {
        type: 'number'
      }
    };
  }

  static components() {
    return {
      subscribe,
      write,
      enableHandler,
      formatHandler,
      rangeHandler
    };
  }

  static styleUrls() {
    return [
      'ui-library/master.css'
    ];
  }

  static template() {
    return `
      <div class="range-wrapper">
        <div class="input-wrapper">
          <input class="range" type="range" bind-min="rangeHandler.minimum" bind-max="rangeHandler.maximum" bind-value="value" on-input="_onInput"></input>
          <div class="label-wrapper">
            <span class="label label-min">{{rangeHandler.minimum}}</span>
            <span class="label label-max">{{rangeHandler.maximum}}</span>
          </div>
        </div>
        <div class="output-value">{{value|formatHandler.format}}</div>
      </div>
    `;
  }

  createdCallback() {
    Object.assign(this.element, {
      getValue: () => this.getValue(),
      setValue: (value) => this.setValue(value)
    });

    let $ = this.$;

    this.enableHandler.setDisabledState($('input'));

    this.setValue(this.default);

    this.subscribe.subscribe( (e) => {this.setValue(e.value); });
  }

  getValue() {
    return Promise.resolve(this.value);
  }

  _onInput() {
        //TODO: these should only be executed when input is done (mouseUp)
    this.setValue(parseFloat(this.$('input').val()));
    this.write.writeValue(this.value);
  }

  setValue(value) {
    let $ = this.$;

    if (typeof value === 'string' && !isNaN(value)) //coming from trigger setValue
      this.value = value;
    else if (typeof value === 'number')
      this.value = value;
    //else
      //throw 'typeError';

    let relativeValue = this.rangeHandler.getRelativeValue(value);
    $('input')[0].style.setProperty('--percent', relativeValue*100 + '%');

    if (!this.enableHandler.isEnabled()) {
      return;
    }

    let valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
    this.element.dispatchEvent(valueChangedEvent);
  }
}
