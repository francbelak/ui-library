export default class {
  static parameters() {
    return {
      formatMode: {
          /*number, enum,..- ->parameters should be grouped and assignet to mode somehow*/
        type: 'string'
      },
      postDecimals: {
        type: 'number'
      },
      preDecimals: {
        type: 'number'
      },
      linearFactor: {
        type: 'number'
      },
      linearOffset: {
        type: 'number'
      },
      unit: {
        type: 'string'
      }
    };
  }

  format(value) {
    if(this.formatMode === 'number')
      return this.formatNumber(value);

    /*default return if no mode is set:*/
    return value;
  }

  formatNumber(value){
    if(isNaN(value)){
      console.warn('formathandler: value is not a number');
      /*return original value:*/
      return value;
    }

    let formattedValue = value;

    if(typeof this.linearFactor !== 'undefined')
      formattedValue = this.formatLinearFactor(formattedValue);

    if(typeof this.LinearOffset !== 'undefined')
      formattedValue = this.formatLinearOffset(formattedValue);

    if(typeof this.postDecimals !== 'undefined')
      formattedValue = this.formatPostDecimals(formattedValue);

    if(typeof this.preDecimals !== 'undefined')
      formattedValue = this.formatPreDecimals(formattedValue);

    if(typeof this.unit !== 'undefined')
      formattedValue = this.formatUnit(formattedValue);

    return formattedValue;
  }

  formatLinearFactor(value){
    return value*this.linearFactor;
  }

  formatLinearOffset(value){
    return value+this.linearOffset;
  }

  formatPostDecimals(value){
    /*todo: error handling*/
    return value.toFixed(this.postDecimals);
  }

    /*adds leading zeros to get specified pre decimal length*/
  formatPreDecimals(value){
    /*todo: error handling*/
    let numberParts = value.split('.');
    let preDecimals = numberParts[0];

    let formattedValue = preDecimals;
    while (formattedValue.length < this.preDecimals)
      formattedValue = '0' + formattedValue;

    if(numberParts.length > 1){ /*add post decimals again if existing*/
      let postDecimals = numberParts[1];
      formattedValue = formattedValue + '.' + postDecimals;
    }

    return formattedValue;
  }

  formatUnit(value){
    return value + ' ' + this.unit;
  }
}
