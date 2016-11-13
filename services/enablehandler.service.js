export default class {
  static parameters() {
    return {
      enabled: {
        type: 'boolean',
        default: true
      }
    };
  }

  toggleClasses($ele, enabledClasses, disabledClasses) {
    if (this.isEnabled()) {
      this._removeClasses(disabledClasses, $ele);
      this._setClasses($ele, enabledClasses);
    } else {
      this._removeClasses(enabledClasses, $ele);
      this._setClasses($ele, disabledClasses);
    }
  }

  toggleProperty($ele, property) {
    $ele.prop(property, !this.isEnabled());
  }

  setDisabledState($ele) {
    if (typeof this.isEnabled() === 'undefined')
      $ele.prop('disabled', false);
    else
      $ele.prop('disabled', !this.isEnabled());
  }

  enableControl(nodeValue, fn) {
    if (this.enabled) {
      fn(this.enabled);
    } else {
      fn(this.enabled);
    }
  }

  callIfEnabled(fn) {
    if(!this.isEnabled())
      return false;

    fn();
    return true;
  }

  //maybe there should be a separate class helper
  _setClasses($ele, classes) {
    $ele.addClass(classes);
  }

  _removeClasses(classes, $ele) {
    for (let clazz of classes)
      for (let i = 0; i < $ele.length; i++) //not so nice
        $($ele[i]).removeClass(clazz);
  }

  /**
   * to add multiple classes use same handling like jquery
   * https://api.jquery.com/addclass/
   * e.g.: $( "p" ).addClass( "myClass yourClass" );
   */
  addClassIfDisabled($ele, classes) {
    if (!this.isEnabled()) {
      this._setClasses($ele, classes);
      return true;
    }
    return false;
  }

  isEnabled() {
    return this.enabled;
  }
}
