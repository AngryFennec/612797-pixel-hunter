export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`already defined`);
    }
  }

  get template() {
    return;
  }

  get render() {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = this.template;
    return wrapper;
  }

  bind() {
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render;
    this.bind();
    return this._element;
  }
}
