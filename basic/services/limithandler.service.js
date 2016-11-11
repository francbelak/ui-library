export default class {
  static parameters() {
    return {
      highhigh: {
        type: 'number'
      },
      high: {
        type: 'number'
      },
      low: {
        type: 'number'
      },
      lowlow: {
        type: 'number'
      }
    };
  }

  createdCallback() {
    this.limits = ['-limit-low-low', '-limit-low', '-limit-high', '-limit-high-high'];
  }

  getCurrentLimit(value){
    if(typeof this.lowlow === 'number' && value < this.lowlow) //--> should be renamed to lowlow, low, high, highhigh to be consistent
      return this.limits[0];
    else if(typeof this.low === 'number' && value < this.low)
      return this.limits[1];
    else if(typeof this.highhigh === 'number' && value > this.highhigh)
      return this.limits[3];
    else if(typeof this.high === 'number' && value > this.high)
      return this.limits[2];

    return '';
  }

  setLimitClass($ele, value) {
    let activeClass = this.getCurrentLimit(value);

    $ele.removeClass(this.limits.join(' '));
    $ele.addClass(activeClass);
  }
}
