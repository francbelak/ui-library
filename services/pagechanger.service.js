export default class {
  createdCallback() {
    if (!top.window.pageHandler)
      top.window.pageHandler = {};

    this.handler = top.window.pageHandler;
  }

  listenToChange(name, handler) {
    this.handler[name] = handler;
  }

  openPage(page, name) {
    if (typeof this.handler[name] === 'function')
      this.handler[name](page);
  }
}
