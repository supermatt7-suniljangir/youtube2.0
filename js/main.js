import * as model from "./model.js";
import HomePageView from "./view/HomePageView.js";
import VideoView from "./view/VideoView.js";

const hamburger = document.querySelector(".hamburger-menu");

const sidebar = document.querySelector(".nav-sidebar");
let overlay = document.querySelector(".overlay");

let descContent = document.querySelector(".description-content");
hamburger.addEventListener("click", (e) => {
  sidebar.classList.toggle("translate");
  overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", (e) => {
  overlay.classList.add("hidden");
  sidebar.classList.remove("translate");
});

document.body.addEventListener("click", (e) => {
  let toggleDesc = e.target.closest(".toggle-description");
  let navSidebarLink = e.target.closest(".nav-sidebar-link");
  let historyLink = e.target.closest("#history");
  let logoLink = e.target.closest(".logo-link");
  let searchBtn = e.target.closest(".search-btn");
  if (navSidebarLink) manipulateNavLinks();
  if (toggleDesc) toggleDesc.nextElementSibling.classList.toggle("hidden");

  if (historyLink) manipulateHistoryPage();
  if (logoLink) {
    manipulateLogoLink();
    // model.state.currentPage = HomePageView;
  }
  if (searchBtn) manipulateSearchPage();
});
window.addEventListener("hashchange", function (e) {
  let hash = window.location.hash;
  if (hash.includes("tag")) manipulateNavLinks();
  if (hash.includes("history")) manipulateHistoryPage();
  if (hash.includes("home") || hash === "#" || hash === "") {
    manipulateLogoLink();
    // model.state.currentPage = HomePageView;
  }
});
function manipulateSearchPage() {
  let searchQuery = document.querySelector(".search-input").value;
  if (!searchQuery) return;
  document
    .querySelectorAll("section")
    .forEach((section) => section.classList.remove("hidden"));
  document.querySelector("#video-player").classList.add("hidden");
  VideoView._render("")

  document
    .querySelector(".home-videos-mega-container")
    ?.classList.add("hidden");
  document
    .querySelector(".search-results-mega-container")
    ?.classList.remove("hidden");
  document
    .querySelector(".history-videos-mega-container")
    .classList.add("hidden");
}

document.querySelector(".nav-search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  manipulateSearchPage();
});

function manipulateNavLinks() {
  sidebar.classList.remove("translate");
  overlay.classList.add("hidden");
  document
    .querySelectorAll("section")
    .forEach((section) => section.classList.remove("hidden"));
  document.querySelector("#video-player").classList.add("hidden");
  VideoView._render("")

  document
    .querySelector(".home-videos-mega-container")
    ?.classList.remove("hidden");
  document
    .querySelector(".search-results-mega-container")
    ?.classList.add("hidden");
  document
    .querySelector(".history-videos-mega-container")
    .classList.add("hidden");
}
function manipulateHistoryPage() {
  sidebar.classList.remove("translate");
  overlay.classList.add("hidden");
  document
    .querySelectorAll("section")
    .forEach((section) => section.classList.remove("hidden"));
  document.querySelector("#video-player").classList.add("hidden");
  VideoView._render("")

  document
    .querySelector(".home-videos-mega-container")
    ?.classList.add("hidden");
  document
    .querySelector(".search-results-mega-container")
    ?.classList.add("hidden");
  document
    .querySelector(".history-videos-mega-container")
    .classList.remove("hidden");
}

function manipulateLogoLink() {
  document.querySelector(".search-input").value = "";
  document
    .querySelectorAll("section")
    .forEach((section) => section.classList.remove("hidden"));
  document.querySelector("#video-player").classList.add("hidden");
VideoView._render("")
  document
    .querySelector(".home-videos-mega-container")
    ?.classList.remove("hidden");
  document
    .querySelector(".search-results-mega-container")
    .classList.add("hidden");
  document
    .querySelector(".history-videos-mega-container")
    .classList.add("hidden");
}
