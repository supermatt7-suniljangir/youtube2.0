import { FetchData } from "./helper.js";
const state = {
  ResultVideos: [],
  video: {},
  channel: {},
  suggestedVideos: [],
  moreVideos: [],
  historyVideos: [],
  nextPageToken: "",
  prevPageToken: "",
  query: "",
  searchQuery: "",
  currentPage: {},
};
async function getVIdeosData(query, PageToken) {
  try {
    let data = await FetchData(
      `search?q=${query}&part=snippet%2Cid&order=relevance&regionCode=US&maxResults=100${
        PageToken ? PageToken : ""
      }`
    );
    if (!data || data.items.length === 0) {
      throw new Error(
        "could not find the data you were looking for, please try again."
      );
    }

    data.items.forEach((item) => {
      state.ResultVideos.push(item);
    });
    return data;
  } catch (err) {
    throw err;
  }
}

async function getVideo(id) {
  try {
    let data = await FetchData(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
    );
    state.video = data;
    if (!data) throw new Error("video not found, please try again");
    return data;
  } catch (err) {
    throw err;
  }
}
async function getSuggestedVideos(videoId) {
  try {
    const url = `search?relatedToVideoId=${videoId}&part=id%2Csnippet&type=video&maxResults=10`;
    let data = await FetchData(url);
    if (!data) throw new Error("no suggested videos found");

    state.suggestedVideos = data.items;
    return data;
  } catch (err) {
    throw err;
  }
}
async function getChnnelInfo(channelId) {
  try {
    const url = `channels?part=snippet%2Cstatistics&id=${channelId}`;
    let data = await FetchData(url);
    if (!data) throw new Error("channel information could not be found");
    state.channel = data;
    return data;
  } catch (err) {
    throw err;
  }
}

export {
  FetchData,
  state,
  getVIdeosData,
  getVideo,
  getChnnelInfo,
  getSuggestedVideos,
};
