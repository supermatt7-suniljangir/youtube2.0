export default class View {
  _clear() {
    this._parentElement.innerHTML = "";
  }
  _renderMessage(msg) {
    this._parentElement.innerHTML = "";
    let html = `<div class="message">${msg}</div>`;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  handleMoreMarkup(handler) {
    document.body.addEventListener("click", (e) => {
      let btn = e.target.closest(".show-more-btn");

      if (btn) {
        this.showButton = btn;
        btn.textContent = "loading videos...";
        handler();
      }
    });
  }
  _render(data) {
    this.data = data;
    this._clear();
    let html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  _renderSpinner() {
    const markUp = `<div class="spinner"></div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  handleHashChange(handler) {
    window.addEventListener("hashchange", handler);
  }
  _renderMore(data) {
    this.data = data;
    let html = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
}
