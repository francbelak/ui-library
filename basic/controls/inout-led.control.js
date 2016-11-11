/* global CustomEvent */
import enableHandler from '../services/enablehandler.service.js';
import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';

export default class {
  static parameters() {
    return {
      defaultValue: {
        type: 'boolean',
        default: false
      }
    };
  }

  static components() {
    return {
      subscribe,
      write,
      enableHandler
    };
  }

  static styleUrls() {
    return [
      'ui-library/basic/master.css'
    ];
  }

  static template() {
    return `
    <div class="checkbox">
      <input type="checkbox" id="checkbox" on-click="clicked">
      <label class="checkbox" for="checkbox">
    </div>
    `;
  }

  createdCallback() {
    Object.assign(this.element, {
      getValue: () => this.getValue(),
      setValue: (value) => this.setValue(value)
    });

    if (typeof this.subscribe.base !== 'undefined') {
      this.subscribe.subscribe( (e) => {
        if(typeof e.value === 'boolean'){
          this.value = e.value;
          this._updateValue();
        }
        else if (typeof e.value === 'number'){
          this.value = (e.value !== 0);
          this._updateValue();
        }
        else {
          throw 'inout led: not supported datatype: ' + typeof e.value;
        }
      });
    } else if (typeof this.defaultValue === 'boolean') {
      this.value = this.defaultValue;
      this._updateValue();
    }

    //this.enableHandler.setObserver(()=>{
    this.enableHandler.addClassIfDisabled(this.$('.checkbox'), 'inactive');
    //});
  }

  _fireClickedTrigger() {
    let clickedEvent = new CustomEvent('clicked', {detail:!this.value});
    this.element.dispatchEvent(clickedEvent);
    if(typeof this.write.base !== 'undefined')
      this.write.writeValue(this.value);
  }

  _updateValue(){
    this.$('.checkbox>input[type="checkbox"]').prop('checked', this.value);
    let valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
    this.element.dispatchEvent(valueChangedEvent);
  }

  clicked(e) {
    e.preventDefault();
    this.enableHandler.callIfEnabled(this._fireClickedTrigger.bind(this));
  }

  setValue(value) {
    if(typeof this.subscribe.base === 'undefined'){ //only apply if not bound to base variable
      this.value = value;
      this._updateValue();
    }
    else
      console.warn('inout-led: setValue ignored, bound to variable: ' + this.subscribe.base);
  }

  getValue() {
    return Promise.resolve(this.value);
  }
}
