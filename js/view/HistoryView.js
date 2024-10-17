import View from "./view.js";

class History extends View {
  data;
  _parentElement = document.querySelector(".history-videos-container");
  _generateMarkup() {
    let data = this.data;
    let html = `${data
      .map((video) => {
        let {
          id,
          snippet: {
            title,
            thumbnails: {
              high: { url: thumbnail },
            },
          },
        } = video;
        console.log(title, id);
        return `<a href="#vid=${id}" class="history-video-link">
            <div class="history-video-box">
              <img class="history-video-thumbnail" src="${thumbnail}"></img>
              <h4 class="history-video-title">${title}</h4>
            </div>
          </a>
           `;
      })
      .join("")}`;

    return html;
  }
  handleClearHistory(handler) {
    document.querySelector(".clear-history").addEventListener("click", handler);
  }
}
export default new History();
