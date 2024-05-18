import View from "./view.js";

class SearchResultsView extends View {
  data;
  showButton;
  _parentElement = document.querySelector(".search-results-container");
  _generateMarkup() {
    let data = this.data;
    let { items } = data;
    let html = items
      .map((item) => {
        let kind = item.id.kind;
        let id = item.id.videoId;
        let channelId = item.snippet.channelId;
        let channelName = item.snippet.channelTitle;
        let title = item.snippet.title;
        let description = item.snippet.description;
        let thumbnail = item.snippet.thumbnails.high? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url;
        if (kind !== "youtube#video") return;
        return `<a href="#vid=${id}" class="search-result-video-link">
              <div class="serach-result result-video-box">
                <div class="search-result-video-thumbnail">
                  <img
                    src="${thumbnail}"
                    alt="${title}"
                    class="search-result-video-thumbnail-pic"
                  />
                </div>
                <div class="search-result-video-info">
                  <h3 class="search-result-video-title">${title}</h3>
                  <span class="mini-info-span artist-name">${channelName}</span>
                  <p class="mini-description">
                    ${description}
                  </p>
                </div>
              </div>
            </a>`;
      })
      .join("");

    return html + `<button class="show-more-btn">show more &rarr;</button>`;
  }
  getQuery() {
    return document.querySelector(".search-input").value;
  }
  handleSearch(handler) {
    document
      .querySelector(".nav-search-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        handler();
      });
  }
}
export default new SearchResultsView();
