export default class {
  static parameters() {
    return {
      base: {
        type: 'address'
      }
    };
  }

  writeValue(value){
    if(typeof this.base !== 'undefined'){
      this.wpcp.writeData([{id:this.base, value: value}], e => {
        if (!e[0])
          console.log('Error writing value');
      });
    }
    else{
      console.warn('write: no base adress defined');
    }
  }
}
