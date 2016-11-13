export default class {
  static parameters() {
    return {
      minimum: {
        type: 'number',
        default: 0,
        required: true
      },
      maximum: {
        type: 'number',
        default: 100,
        required: true
      }
    };
  }

  getRelativeValue(value) {
    if (value < this.minimum)
      return 0;
    else if (value > this.maximum)
      return 1;

    return (value-this.minimum) / (this.maximum-this.minimum);
  }

  isInRange(value) {
    return value >= this.minimum && value <= this.maximum;
  }

  mapRangeToRange(value, out_min, out_max) {
    return (value - this.minimum) * (out_max - out_min) / (this.maximum - this.minimum) + out_min;
  }
}
