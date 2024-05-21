import View from "./view.js";

class VideoView extends View {
  _parentElement = document.querySelector("#video-player");
  data;
  _generateMarkup() {
    let data = this.data;
    if(!data) return;
    // console.log(data);
    let [channleInfo, suggestedVideos, video] = data;
    // destructring video
    let {
      id,
      kind,
      snippet: { channelId, channelTitle, description, title, publishedAt },
    } = video;

    // destructuring channel
    let { logo, subscriberCount } = channleInfo;
    let subsInMillion = (subscriberCount / 1000000).toFixed(2); // Convert to million with two decimal places
    let subsInHundredThousand = (subscriberCount / 100000).toFixed(2); // Convert to hundred thousand with two decimal places
    if (kind !== "youtube#video") return;
    let html = `<div class="video-player-container">
        <div class="video-frame-container">
          <iframe
            src="https://www.youtube.com/embed/${id}?autoplay=0&controls=1&vq=small"
            id="videoPlayerIFrame"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
            allowfullscreen 
          ></iframe>
        </div>
        <div class="video-information">
          <h2 class="video-title">
            ${title}
          </h2>
          <!--<a href="#channel=${channelId}" class="video-artist-link artist-link"> </a>-->
          <div class="artist-info">
            <img src="${logo}" alt="artist-pic" class="artist-logo" />
            <div class="artist-channel-info">
              <h3 class="artist-name">${channelTitle}</h3>
              <span class="mini-info-span artist-subsribers-count"
                >${
                  subscriberCount >= 1000000
                    ? subsInMillion + "M"
                    : subsInHundredThousand + "K"
                } subscribers</span
              >
            </div>
          </div>
      
          <div class="video-description">
            <h2 class="video-description-title toggle-description">
              Description &darr;
            </h2>

            <p class="description-content hidden">
              ${description}
            </p>
          </div>
        </div>
      </div>
      <aside class="suggested-videos-container">
        <h2 class="more-like-this">more like this-</h2>
        <br />
        ${suggestedVideos
          ?.slice(10)
          .map((sideVideo) => {
            let {
              id: { videoId: id },
              snippet: { title, channelTitle, thumbnails },
            } = sideVideo;
            let thumbnailHigh = thumbnails.high?.url;
            let thumbnailDefault = thumbnails.default.url;
            return `<a href="#vid=${id}" class="suggested-video-link">
          <div class="suggested-video-box">
            <img
              src="${thumbnailHigh ? thumbnailHigh : thumbnailDefault}"
              alt="${title}"
              class="suggested-video-thumbnail"
            />
            <div class="suggested-video-info">
              <h4 class="suggested-video-title">
               ${title}
              </h4>
              <span
                class="mini-info-span suggested-video-artist-name artist-name"
                >${channelTitle}</span
              >
            </div>
          </div>
        </a>`;
          })
          .join("")}
      </aside>`;
    return html;
  }
}
export default new VideoView();
