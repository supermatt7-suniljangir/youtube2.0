import View from "./view.js";

class HomePageView extends View {
  data;

  showButton;
  _parentElement = document.querySelector(".home-videos-container");
  _generateMarkup() {
    let data = this.data;

    let { items } = data;
    console.log(data)
    let html = items
      .map((item) => {
        let kind = item.id.kind;
        let id = item.id.videoId;
        let channelId = item.snippet.channelId;
        let channelName = item.snippet.channelTitle;
        let title = item.snippet.title;
        let thumbnail = item.snippet.thumbnails.high? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url;

        // let
        // <iframe
        //   id="videoIframe"
        //   width="100%"
        //   src=" https://www.youtube.com/embed/${id}?controls=0&autoplay=1&mute=1"
        //   height="100%"
        //   frameborder="0"
        //   allowfullscreen
        //   auplay="true"
        //   allow="autoplay"
        //   class="hidden"
        // ></iframe>
        if (kind !== "youtube#video" || title.includes("#shorts") || title.includes("#youtubeshorts") ) return;
        return ` <a href="#vid=${id}" class="video-box-link video-link watch-link">
              <div class="video-box">
                <div class="thumbnail">
                 
                  <img
                    src="${thumbnail}"
                    alt="${title}"
                    class="thumbnail-pic"
                  />
                </div>

                <div class="video-box-mini-info">
                  <h3 class="video-title heading-tertiary">
                  ${title}
                   
                  </h3>
                  <h4 class="video-cretor-title heading-quaternary">
                  ${channelName}
                  </h4>
                  <!--<p class="mini-info-para">
                    <span class="mini-info-span release-time"
                      >4 years ago</span>-->
                  </p>
                </div>
              </div>
            </a>`;
      })
      .join("");

    return (
      html +
      `<button class="show-more-btn show-more-suggested">show more &rarr;</button>`
    );
  }
}
export default new HomePageView();
