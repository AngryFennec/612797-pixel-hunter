export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const changeScreen2 = (object) => {
  mainElement.innerHTML = ``;
  object.renewLives();
  mainElement.appendChild(object.element);
};
