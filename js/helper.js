import {
  AJAX_URL,
  API_KEY_1,
  API_KEY_2,
  API_KEY_3,
  TIMEOUT_SEC,
} from "./config.js";

let timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(
          "could not fetch data, please check your network connection and try again"
        )
      );
    }, s * 1000);
  });
};

async function FetchData(url) {
  const fetchUrl = `${AJAX_URL}/${url}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY_3,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  try {
    const fetchPromise = fetch(fetchUrl, options);
    let res = await Promise.race([fetchPromise, timeOut(TIMEOUT_SEC)]);
    if (!res.ok) throw new Error("could not fetch data, please try again.");
    let data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export { FetchData };

 

