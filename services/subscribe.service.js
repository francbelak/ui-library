export default class {
  static parameters() {
    return {
      base: {
        type: 'address'
      }
    };
  }

  createdCallback() {
    if (!this.base)
      return;
    this.wpcp.subscribeData([{id:this.base}], e => {
      if (typeof this.onchange === 'function')
        this.onchange(e);
    });
  }

  subscribe(fn){
    if (!this.base){
      return;
    }

    this.wpcp.subscribeData([{id:this.base}], fn);
  }
}
