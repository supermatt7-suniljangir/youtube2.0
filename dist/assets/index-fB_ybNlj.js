var Q=Object.defineProperty;var U=(t,e,r)=>e in t?Q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var d=(t,e,r)=>(U(t,typeof e!="symbol"?e+"":e,r),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();let K="https://youtube-v31.p.rapidapi.com",J="85426bea6emsh1fa99ea739a1b3fp141535jsn3d972ccaf024",X=20,G=function(t){return new Promise(function(e,r){setTimeout(()=>{r(new Error("could not fetch data, please check your network connection and try again"))},t*1e3)})};async function w(t){const e=`${K}/${t}`,r={method:"GET",headers:{"X-RapidAPI-Key":J,"X-RapidAPI-Host":"youtube-v31.p.rapidapi.com"}};try{const i=fetch(e,r);let s=await Promise.race([i,G(X)]);if(!s.ok)throw new Error("could not fetch data, please try again.");return await s.json()}catch(i){throw i}}const a={ResultVideos:[],video:{},channel:{},suggestedVideos:[],moreVideos:[],historyVideos:[],nextPageToken:"",prevPageToken:"",query:"",searchQuery:"",currentPage:{}};async function b(t,e){try{let r=await w(`search?q=${t}&part=snippet%2Cid&order=relevance&regionCode=US&maxResults=100${e||""}`);if(!r||r.items.length===0)throw new Error("could not find the data you were looking for, please try again.");return r.items.forEach(i=>{a.ResultVideos.push(i)}),r}catch(r){throw r}}async function Y(t){try{let e=await w(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${t}`);if(a.video=e,!e)throw new Error("video not found, please try again");return e}catch(e){throw e}}async function z(t){try{const e=`search?relatedToVideoId=${t}&part=id%2Csnippet&type=video&maxResults=10`;let r=await w(e);if(!r)throw new Error("no suggested videos found");return a.suggestedVideos=r.items,r}catch(e){throw e}}async function W(t){try{const e=`channels?part=snippet%2Cstatistics&id=${t}`;let r=await w(e);if(!r)throw new Error("channel information could not be found");return a.channel=r,r}catch(e){throw e}}class L{_clear(){this._parentElement.innerHTML=""}_renderMessage(e){this._parentElement.innerHTML="";let r=`<div class="message">${e}</div>`;this._parentElement.insertAdjacentHTML("afterbegin",r)}handleMoreMarkup(e){document.body.addEventListener("click",r=>{let i=r.target.closest(".show-more-btn");i&&(this.showButton=i,i.textContent="loading videos...",e())})}_render(e){this.data=e,this._clear();let r=this._generateMarkup();this._parentElement.insertAdjacentHTML("afterbegin",r)}_renderSpinner(){const e='<div class="spinner"></div>';this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}handleHashChange(e){window.addEventListener("hashchange",e)}_renderMore(e){this.data=e;let r=this._generateMarkup();this._parentElement.insertAdjacentHTML("beforeend",r)}}class Z extends L{constructor(){super(...arguments);d(this,"data");d(this,"showButton");d(this,"_parentElement",document.querySelector(".home-videos-container"))}_generateMarkup(){let r=this.data,{items:i}=r;return console.log(r),i.map(n=>{let o=n.id.kind,c=n.id.videoId;n.snippet.channelId;let m=n.snippet.channelTitle,l=n.snippet.title,g=n.snippet.thumbnails.high?n.snippet.thumbnails.high.url:n.snippet.thumbnails.default.url;if(!(o!=="youtube#video"||l.includes("#shorts")||l.includes("#youtubeshorts")))return` <a href="#vid=${c}" class="video-box-link video-link watch-link">
              <div class="video-box">
                <div class="thumbnail">
                 
                  <img
                    src="${g}"
                    alt="${l}"
                    class="thumbnail-pic"
                  />
                </div>

                <div class="video-box-mini-info">
                  <h3 class="video-title heading-tertiary">
                  ${l}
                   
                  </h3>
                  <h4 class="video-cretor-title heading-quaternary">
                  ${m}
                  </h4>
                  <!--<p class="mini-info-para">
                    <span class="mini-info-span release-time"
                      >4 years ago</span>-->
                  </p>
                </div>
              </div>
            </a>`}).join("")+'<button class="show-more-btn show-more-suggested">show more &rarr;</button>'}}const u=new Z;class ee extends L{constructor(){super(...arguments);d(this,"_parentElement",document.querySelector("#video-player"));d(this,"data")}_generateMarkup(){let r=this.data;if(!r)return;let[i,s,n]=r,{id:o,kind:c,snippet:{channelId:m,channelTitle:l,description:g,title:f,publishedAt:_}}=n,{logo:j,subscriberCount:$}=i,D=($/1e6).toFixed(2),O=($/1e5).toFixed(2);return c!=="youtube#video"?void 0:`<div class="video-player-container">
        <div class="video-frame-container">
          <iframe
            src="https://www.youtube.com/embed/${o}?autoplay=0&controls=1&vq=small"
            id="videoPlayerIFrame"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
            allowfullscreen 
          ></iframe>
        </div>
        <div class="video-information">
          <h2 class="video-title">
            ${f}
          </h2>
          <!--<a href="#channel=${m}" class="video-artist-link artist-link"> </a>-->
          <div class="artist-info">
            <img src="${j}" alt="artist-pic" class="artist-logo" />
            <div class="artist-channel-info">
              <h3 class="artist-name">${l}</h3>
              <span class="mini-info-span artist-subsribers-count"
                >${$>=1e6?D+"M":O+"K"} subscribers</span
              >
            </div>
          </div>
      
          <div class="video-description">
            <h2 class="video-description-title toggle-description">
              Description &darr;
            </h2>

            <p class="description-content hidden">
              ${g}
            </p>
          </div>
        </div>
      </div>
      <aside class="suggested-videos-container">
        <h2 class="more-like-this">more like this-</h2>
        <br />
        ${s==null?void 0:s.slice(10).map(R=>{var P;let{id:{videoId:N},snippet:{title:q,channelTitle:B,thumbnails:k}}=R,E=(P=k.high)==null?void 0:P.url,F=k.default.url;return`<a href="#vid=${N}" class="suggested-video-link">
          <div class="suggested-video-box">
            <img
              src="${E||F}"
              alt="${q}"
              class="suggested-video-thumbnail"
            />
            <div class="suggested-video-info">
              <h4 class="suggested-video-title">
               ${q}
              </h4>
              <span
                class="mini-info-span suggested-video-artist-name artist-name"
                >${B}</span
              >
            </div>
          </div>
        </a>`}).join("")}
      </aside>`}}const h=new ee;class te extends L{constructor(){super(...arguments);d(this,"data");d(this,"_parentElement",document.querySelector(".history-videos-container"))}_generateMarkup(){return`${this.data.map(s=>{let{id:n,snippet:{title:o,thumbnails:{high:{url:c}}}}=s;return console.log(o,n),`<a href="#vid=${n}" class="history-video-link">
            <div class="history-video-box">
              <img class="history-video-thumbnail" src="${c}"></img>
              <h4 class="history-video-title">${o}</h4>
            </div>
          </a>
           `}).join("")}`}handleClearHistory(r){document.querySelector(".clear-history").addEventListener("click",r)}}const p=new te;class re extends L{constructor(){super(...arguments);d(this,"data");d(this,"showButton");d(this,"_parentElement",document.querySelector(".search-results-container"))}_generateMarkup(){let r=this.data,{items:i}=r;return i.map(n=>{let o=n.id.kind,c=n.id.videoId;n.snippet.channelId;let m=n.snippet.channelTitle,l=n.snippet.title,g=n.snippet.description,f=n.snippet.thumbnails.high?n.snippet.thumbnails.high.url:n.snippet.thumbnails.default.url;if(o==="youtube#video")return`<a href="#vid=${c}" class="search-result-video-link">
              <div class="serach-result result-video-box">
                <div class="search-result-video-thumbnail">
                  <img
                    src="${f}"
                    alt="${l}"
                    class="search-result-video-thumbnail-pic"
                  />
                </div>
                <div class="search-result-video-info">
                  <h3 class="search-result-video-title">${l}</h3>
                  <span class="mini-info-span artist-name">${m}</span>
                  <p class="mini-description">
                    ${g}
                  </p>
                </div>
              </div>
            </a>`}).join("")+'<button class="show-more-btn">show more &rarr;</button>'}getQuery(){return document.querySelector(".search-input").value}handleSearch(r){document.querySelector(".nav-search-form").addEventListener("submit",i=>{i.preventDefault(),r()})}}const y=new re;async function V(t){try{u._renderSpinner();let e=await b(`${t}`);console.log(e),u._render(e),a.query=t,a.currentPage=u,a.nextPageToken=e.nextPageToken}catch(e){u._renderMessage(`${e}`),console.error(e)}}async function M(){let t=a.query,e=a.nextPageToken,r=a.currentPage;try{let i=await b(`${t}`,`&pageToken=${e}`);a.nextPageToken=i.nextPageToken,r._parentElement.querySelectorAll(".show-more-btn").forEach(s=>s.classList.add("hidden")),r._renderMore(i)}catch(i){r._renderMessage("encounterd problem while fetching more data "+i)}}async function ne(t){try{document.querySelectorAll("section").forEach(_=>_.classList.add("hidden"));let e=[];h._parentElement.classList.remove("hidden"),h._renderSpinner();let r=await Y(`${t}`);if(console.log(r),!r||!Array.isArray(r.items)||r.items.length===0)throw new Error("Invalid video data received, data-length: 0");let[i]=r.items;ie(i,t);let{snippet:{channelId:s}}=i,n=await oe(`${t}`),o=await le(`${s}`);if(!o||!Array.isArray(o.items)||o.items.length===0)throw new Error("Invalid channel data received");let[c]=o.items,{statistics:{subscriberCount:m},snippet:{thumbnails:{high:{url:l}}}}=c,g={logo:l,subscriberCount:m,channelId:s},{items:f}=n;e=[g,f,i],h._render(e),x()}catch(e){h._renderMessage("error playing the video: please note that the API used in this project is no longer stable and is facing downtime, generally this bug is fixed automatically after some time, so you could try refreshing your browser window. i appologize sincerely and am looking forward for better next time, "+e),console.error(e)}}function ie(t,e){var i;let r=(i=a.historyVideos)==null?void 0:i.findIndex(s=>s.id===e);r!==-1&&a.historyVideos.splice(r,1),a.historyVideos.unshift(t),localStorage.setItem("videoHistory",JSON.stringify(a.historyVideos))}function se(){localStorage.removeItem("videoHistory"),a.historyVideos=[],I()}function x(){try{let t=JSON.parse(localStorage.getItem("videoHistory"));if(!t||t.length<1)return;a.historyVideos=t}catch(t){throw p._renderMessage(t),t}}async function ae(t){try{if(t.includes("tag")){let e=t.slice(5);u._renderSpinner();let r=await b(`${e}`);a.query=e,u._render(r)}}catch(e){u._renderMessage("could not fetch specific videos : "+e),console.error(e)}}async function oe(t){try{return await z(`${t}`)}catch(e){console.error(e)}}async function le(t){try{return await W(`${t}`)}catch(e){console.error(e)}}function I(){try{a.currentPage=p;let t=a.historyVideos;p._renderSpinner(),!t||t.length<1?p._renderMessage("no history found"):p._render(t)}catch(t){p._renderMessage(t),console.error(t)}}async function de(){try{a.currentPage=y,y._renderSpinner();let t=y.getQuery();window.location.hash=`search?=${t}`;let e=await b(`${t}`);if(e.items.length<1||!e)throw new Error("could not find any video, please try again");y._render(e),document.querySelector(".showing-search-results-for-heading").textContent=`showing results for: ${t}`,a.query=t,a.nextPageToken=e.nextPageToken}catch(t){console.error(t),y._renderMessage(t)}}function ce(){window.addEventListener("hashchange",function(t){let e=window.location.hash;(e===""||e==="#home")&&(a.currentPage=u,V(a.query)),he(e),ae(e),me(e)})}function ue(){window.addEventListener("load",function(t){x()})}function he(t){let e="";t.includes("vid=")&&(e=t.slice(5),ne(`${e}`))}function me(t){t.includes("history")&&I()}function ge(){V(`${a.query?a.query:"jurassic park"}`),u.handleMoreMarkup(M),ce(),ue(),y.handleSearch(de),p.handleClearHistory(se),y.handleMoreMarkup(M)}ge();const pe=document.querySelector(".hamburger-menu"),S=document.querySelector(".nav-sidebar");let v=document.querySelector(".overlay");document.querySelector(".description-content");pe.addEventListener("click",t=>{S.classList.toggle("translate"),v.classList.toggle("hidden")});v.addEventListener("click",t=>{v.classList.add("hidden"),S.classList.remove("translate")});document.body.addEventListener("click",t=>{let e=t.target.closest(".toggle-description"),r=t.target.closest(".nav-sidebar-link"),i=t.target.closest("#history"),s=t.target.closest(".logo-link"),n=t.target.closest(".search-btn");r&&H(),e&&e.nextElementSibling.classList.toggle("hidden"),i&&A(),s&&C(),n&&T()});window.addEventListener("hashchange",function(t){let e=window.location.hash;e.includes("tag")&&H(),e.includes("history")&&A(),(e.includes("home")||e==="#"||e==="")&&C()});function T(){var e,r;document.querySelector(".search-input").value&&(document.querySelectorAll("section").forEach(i=>i.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),h._render(""),(e=document.querySelector(".home-videos-mega-container"))==null||e.classList.add("hidden"),(r=document.querySelector(".search-results-mega-container"))==null||r.classList.remove("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden"))}document.querySelector(".nav-search-form").addEventListener("submit",t=>{t.preventDefault(),T()});function H(){var t,e;S.classList.remove("translate"),v.classList.add("hidden"),document.querySelectorAll("section").forEach(r=>r.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),h._render(""),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.remove("hidden"),(e=document.querySelector(".search-results-mega-container"))==null||e.classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden")}function A(){var t,e;S.classList.remove("translate"),v.classList.add("hidden"),document.querySelectorAll("section").forEach(r=>r.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),h._render(""),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.add("hidden"),(e=document.querySelector(".search-results-mega-container"))==null||e.classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.remove("hidden")}function C(){var t;document.querySelector(".search-input").value="",document.querySelectorAll("section").forEach(e=>e.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),h._render(""),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.remove("hidden"),document.querySelector(".search-results-mega-container").classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden")}
