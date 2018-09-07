// button-view.js
import AbstractView from "./abstract-view";

/**
 * Модуль ButtonView описывает внешний вид и поведение
 * всех кнопок в нашем приложении.
 * Этот модуль ничего не знает про то действие, которое
 * будет выполнено при нажатии на кнопку и просто передаёт
 * её внешнему обработчику (onClick). В этом заключается
 * особенность подхода MV*: каждый модуль выполняет свою
 * роль, и модуль отображения описывает только логику отображения
 **/
export default class ButtonView extends AbstractView {
  constructor(title = `Нажми меня полностью`) {
    super();
    this.title = title;
  }

  get template() {
    return `<button>${this.title}</button>`;
  }

  /**
   * Метод bind описывает поведение кнопки при нажатии на нее.
   **/
  bind() {
    this.element.onclick = (evt) => {
      evt.preventDefault();
      this.onClick();
    };
  }

  onClick() {
  }
}
