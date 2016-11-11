import ButtonDefault from '../controls/button-default.control.js';
import write from '../services/write.service.js';

export default class extends ButtonDefault {
  static parameters() {
    let parameters = super.parameters();
    parameters.base = { type: 'address' };
    parameters.value = { type: 'primitive' };
    return parameters;
  }

  static components() {
    let components = super.components();
    components.write = write;
    return components;
  }

  _fireClickedTrigger() {
    super._fireClickedTrigger(this.value);
    this.write.writeValue(this.value);
  }

  //TODO: @paroga fix bind-schaden to avoid this unnecessary code duplicate
  clicked() {
    this.enableHandler.callIfEnabled(this._fireClickedTrigger.bind(this));
  }
}
