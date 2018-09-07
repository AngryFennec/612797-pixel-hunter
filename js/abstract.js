class AbstractView {
  let

get template() {
  return template;
}

render(templ) {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
}
bind() {
}

get element() {
  if (this.domElement === undefined) {
    render(template());
    bind();
  }
  return domElement;
}
}
