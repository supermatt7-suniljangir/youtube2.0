import * as model from "./model.js";
import HomePageView from "./view/HomePageView.js";
import VideoView from "./view/VideoView.js";
import HistoryView from "./view/HistoryView.js";
import SearchResultsView from "./view/SearchResultsView.js";
async function controlHomePage(query) {
  try {
    HomePageView._renderSpinner();
    let data = await model.getVIdeosData(`${query}`);
    console.log(data);
    HomePageView._render(data);
    model.state.query = query;
    model.state.currentPage = HomePageView;
    model.state.nextPageToken = data.nextPageToken;
  } catch (err) {
    HomePageView._renderMessage(`${err}`);
    console.error(err);
  }
}
async function controlMoreData() {
  let query = model.state.query;
  let nextPageToken = model.state.nextPageToken;
  let currentPage = model.state.currentPage;
  try {
    let data = await model.getVIdeosData(
      `${query}`,
      `&pageToken=${nextPageToken}`
    );
    model.state.nextPageToken = data.nextPageToken;
    currentPage._parentElement
      .querySelectorAll(".show-more-btn")
      .forEach((btn) => btn.classList.add("hidden"));
    currentPage._renderMore(data);
  } catch (err) {
    currentPage._renderMessage(
      "encounterd problem while fetching more data " + err
    );
  }
}
async function controlVideo(id) {
  try {
    document.querySelectorAll("section").forEach((section) => section.classList.add("hidden"));
    let data = [];
    VideoView._parentElement.classList.remove("hidden");
    VideoView._renderSpinner();
    // get video data
    let videoData = await model.getVideo(`${id}`);
    console.log(videoData);

    if (!videoData || !Array.isArray(videoData.items) || videoData.items.length === 0) {
      throw new Error('Invalid video data received, data-length: 0');
    }

// destructuring video

    let [video] = videoData.items;

     // add video to the watches history
     controlSetHistory(video, id);

    // destructuring channel id
    let {
      snippet: { channelId },
    } = video;


    // manage suggested video///////////////////////////////////////
    let suggestedVideosInfo = await controlSuggestedVideos(`${id}`);

    // get channel information
    let channelInfo = await controlChannel(`${channelId}`);
      // Check if channelInfo.items is an array and has elements
      if (!channelInfo || !Array.isArray(channelInfo.items) || channelInfo.items.length === 0) {
        throw new Error('Invalid channel data received');
      }
    // destructring channel data and making anobject out of it
    let [channel] = channelInfo.items;
    let {
      statistics: { subscriberCount },
      snippet: {
        thumbnails: {
          high: { url: logo },
        },
      },
    } = channel;
    let channelData = { logo, subscriberCount, channelId };

   
    
    // get suggested Videos
    // destructuring suggested videos object
    let { items: suggestedVideosData } = suggestedVideosInfo;
    ///////////////////////////////////////////////////////////////

    // creating data object to render
    data = [channelData, suggestedVideosData, video];
    // render video data
    VideoView._render(data);

    // update videos history
    controlGetHistory();
  } catch (err) {
    VideoView._renderMessage(
      "error playing the video:" +
        " " +
        "please note that the API used in this project is no longer stable and is facing downtime, generally this bug is fixed automatically after some time, so you could try refreshing your browser window. i appologize sincerely and am looking forward for better next time, " + err
    );
    console.error(err);
  }
}
function controlSetHistory(video, id) {
  // check if the video has already been into the history, if yes then replace it with the newest possible place
  let itemToBeRemovedIndex = model.state.historyVideos?.findIndex((item) => {
    return item.id === id;
  });

  if (itemToBeRemovedIndex !== -1) {
    // The element with the specified id was found
    model.state.historyVideos.splice(itemToBeRemovedIndex, 1);
  }
  model.state.historyVideos.unshift(video);
  localStorage.setItem(
    "videoHistory",
    JSON.stringify(model.state.historyVideos)
  );
}
function controlClearHistory() {
  localStorage.removeItem("videoHistory");
  model.state.historyVideos = [];
  controlHistoryPage();
}
function controlGetHistory() {
  try {
    // get data from local storage
    let data = JSON.parse(localStorage.getItem("videoHistory"));
    // if no data return
    if (!data || data.length < 1) return;

    model.state.historyVideos = data;
  } catch (err) {
    HistoryView._renderMessage(err);
    throw err;
  }
}

async function controlTagVideos(hash) {
  try {
    if (hash.includes("tag")) {
      let tag = hash.slice(5);
      HomePageView._renderSpinner();
      let data = await model.getVIdeosData(`${tag}`);
      model.state.query = tag;
      HomePageView._render(data);
    }
  } catch (err) {
    HomePageView._renderMessage("could not fetch specific videos : " + err);
    console.error(err);
  }
}
async function controlSuggestedVideos(id) {
  try {
    let data = await model.getSuggestedVideos(`${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function controlChannel(channelId) {
  try {
    let data = await model.getChnnelInfo(`${channelId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function controlHistoryPage() {
  try {
    model.state.currentPage = HistoryView;
    let data = model.state.historyVideos;
    HistoryView._renderSpinner();
    if (!data || data.length < 1)
      HistoryView._renderMessage("no history found");
    else HistoryView._render(data);
  } catch (err) {
    HistoryView._renderMessage(err);
    console.error(err);
  }
}

async function controlSearchVideos() {
  try {
    model.state.currentPage = SearchResultsView;
    SearchResultsView._renderSpinner();
    let query = SearchResultsView.getQuery();
    window.location.hash = `search?=${query}`;
    let data = await model.getVIdeosData(`${query}`);
    if (data.items.length < 1 || !data)
      throw new Error("could not find any video, please try again");
    SearchResultsView._render(data);
    document.querySelector(
      ".showing-search-results-for-heading"
    ).textContent = `showing results for: ${query}`;

    model.state.query = query;
    model.state.nextPageToken = data.nextPageToken;
  } catch (err) {
    console.error(err);

    SearchResultsView._renderMessage(err);
  }
}
function controlHashChange() {
  window.addEventListener("hashchange", function (e) {
    let hash = window.location.hash;

    if (hash === "" || hash === "#home") {
      model.state.currentPage = HomePageView;
      controlHomePage(model.state.query);
    }
  initVideoPlayer(hash);
  controlTagVideos(hash);
  initHistoryVideos(hash);
});
}

function controlOnLoad() {
  window.addEventListener("load", function (e) {
    controlGetHistory();
  });
}
function initVideoPlayer(hash) {
  let id = "";
  if (hash.includes("vid=")) {
    id = hash.slice(5);
    controlVideo(`${id}`);
  }
}
function initHistoryVideos(hash) {
  if (hash.includes("history")) {
    controlHistoryPage();
  }
}
function init() {
  controlHomePage(`${model.state.query ? model.state.query : "jurassic park"}`);
  HomePageView.handleMoreMarkup(controlMoreData);
  controlHashChange();
  controlOnLoad();
  SearchResultsView.handleSearch(controlSearchVideos);
  // clear history
  HistoryView.handleClearHistory(controlClearHistory);
  SearchResultsView.handleMoreMarkup(controlMoreData);
}
init();
