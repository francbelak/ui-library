import enableHandler from '../services/enablehandler.service.js';

export default class {
  static parameters() {
    return {
      label: {
        type: 'string',
        default: ''
      }
    };
  }

  static components() {
    return {
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
      <button class="button" on-click="clicked">{{label}}</button>
    `;
  }

  createdCallback() {
    this.enableHandler.setDisabledState(this.$('button'));
  }

  _fireClickedTrigger(value) {
    let buttonClickedEvent = new CustomEvent('clicked');

    if (value)
      buttonClickedEvent = new CustomEvent('clicked', {detail: value});

    this.element.dispatchEvent(buttonClickedEvent);
  }

  clicked() {
    this.enableHandler.callIfEnabled(this._fireClickedTrigger.bind(this));
  }
}
