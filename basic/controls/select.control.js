import subscribe from '../services/subscribe.service.js';
import write from '../services/write.service.js';
import enableHandler from '../services/enablehandler.service.js';

export default class {
  static parameters() {
    return {
      items: {
        type: 'array'
      },
      defaultValue: {
        type: 'number'
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
      <div class="select">
        <select bind-value="value">
          <!--option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="benis"></option-->
        </select>
      </div>
    `;
  }

  createdCallback() {
    Object.assign(this.element, {
      getValue: () => this.getValue(),
      setValue: (value) => this.setValue(value)
    });
    let $ = this.$;

    if(typeof this.items !== 'undefined')
      this.setItems(this.items);

    if(typeof this.defaultValue !== 'undefined')
      this.setValue(this.defaultValue);

    $('select').on('change', () => {
      let value = parseFloat($('select').val()); //only numeric values suported atm
      this.setValue(value);
      this.write.writeValue(value);
    });

    this.subscribe.subscribe( (e) => { this.setValue(e.value);});
    this.enableHandler.toggleClasses([], ['inactive'], $('.select'));
    this.enableHandler.setDisabledState($('select'));
  }

  setItems(items) {
    for(let i in items){
      this.addItem(items[i].text, items[i].value);
    }
  }

  addItem(text, value){
    this.$('select')
      .append($('<option>', { value : value})
      .text(text));
  }

  setValue(value) {
    this.value = value;

    let valueChangedEvent = new CustomEvent('valuechanged', {detail: this.value});
    this.element.dispatchEvent(valueChangedEvent);
  }

  getValue() {
    return Promise.resolve(this.value);
  }
}
