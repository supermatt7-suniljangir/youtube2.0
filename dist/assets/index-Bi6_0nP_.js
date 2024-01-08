var J=Object.defineProperty;var X=(t,e,n)=>e in t?J(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var l=(t,e,n)=>(X(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();let G="https://youtube-v31.p.rapidapi.com",Y="470cc9a0d2msh9decef21ceeb279p13fab6jsn7b4098762e45",z=20,W=function(t){return new Promise(function(e,n){setTimeout(()=>{n(new Error("could not fetch data, please check your network connection and try again"))},t*1e3)})};async function w(t){const e=`${G}/${t}`,n={method:"GET",headers:{"X-RapidAPI-Key":Y,"X-RapidAPI-Host":"youtube-v31.p.rapidapi.com"}};try{const r=fetch(e,n);let s=await Promise.race([r,W(z)]);if(!s.ok)throw new Error("could not fetch data, please try again.");return await s.json()}catch(r){throw r}}const a={ResultVideos:[],video:{},channel:{},suggestedVideos:[],moreVideos:[],historyVideos:[],nextPageToken:"",prevPageToken:"",query:"",searchQuery:"",currentPage:{}};async function b(t,e){try{let n=await w(`search?q=${t}&part=snippet%2Cid&maxResults=50${e||""}`);if(!n||n.items.length===0)throw new Error("could not find the data you were looking for, please try again.");return n.items.forEach(r=>{a.ResultVideos.push(r)}),n}catch(n){throw n}}async function Z(t){try{let e=await w(`videos?part=snippet%2CcontentDetails%2Cstatistics&id=${t}`);if(a.video=e,!e)throw new Error("video not found, please try again");return e}catch(e){throw e}}async function ee(t){try{const e=`search?relatedToVideoId=${t}&part=id%2Csnippet&type=video&maxResults=10`;let n=await w(e);if(!n)throw new Error("no suggested videos found");return a.suggestedVideos=n.items,n}catch(e){throw e}}async function te(t){try{const e=`channels?part=snippet%2Cstatistics&id=${t}`;let n=await w(e);if(!n)throw new Error("channel information could not be found");return a.channel=n,n}catch(e){throw e}}class L{_clear(){this._parentElement.innerHTML=""}_renderMessage(e){this._parentElement.innerHTML="";let n=`<div class="message">${e}</div>`;this._parentElement.insertAdjacentHTML("afterbegin",n)}handleMoreMarkup(e){document.body.addEventListener("click",n=>{let r=n.target.closest(".show-more-btn");r&&(this.showButton=r,e())})}_render(e){this.data=e,this._clear();let n=this._generateMarkup();this._parentElement.insertAdjacentHTML("afterbegin",n)}_renderSpinner(){const e='<div class="spinner"></div>';this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}handleHashChange(e){window.addEventListener("hashchange",e)}_renderMore(e){this.data=e;let n=this._generateMarkup();this._parentElement.insertAdjacentHTML("beforeend",n)}_dataReceivedNotice(e){e.classList.add("hidden")}_dataFetchingNotice(e){e.textContent="loading videos..."}}class ne extends L{constructor(){super(...arguments);l(this,"data");l(this,"showButton");l(this,"_parentElement",document.querySelector(".home-videos-container"))}_generateMarkup(){let n=this.data,{items:r}=n;return r.map(i=>{let o=i.id.kind,d=i.id.videoId;i.snippet.channelId;let p=i.snippet.channelTitle,c=i.snippet.title,h=i.snippet.thumbnails.high.url;if(o==="youtube#video")return` <a href="#vid=${d}" class="video-box-link video-link watch-link">
              <div class="video-box">
                <div class="thumbnail">
                 
                  <img
                    src="${h}"
                    alt="${c}"
                    class="thumbnail-pic"
                  />
                </div>

                <div class="video-box-mini-info">
                  <h3 class="video-title heading-tertiary">
                  ${c}
                   
                  </h3>
                  <h4 class="video-cretor-title heading-quaternary">
                  ${p}
                  </h4>
                  <!--<p class="mini-info-para">
                    <span class="mini-info-span release-time"
                      >4 years ago</span>-->
                  </p>
                </div>
              </div>
            </a>`}).join("")+'<button class="show-more-btn show-more-suggested">show more &rarr;</button>'}}const u=new ne;class re extends L{constructor(){super(...arguments);l(this,"_parentElement",document.querySelector("#video-player"));l(this,"data")}_generateMarkup(){let n=this.data,[r,s,i]=n,{id:o,kind:d,snippet:{channelId:p,channelTitle:c,description:h,title:y,publishedAt:q}}=i,{logo:$,subscriberCount:_}=r,N=(_/1e6).toFixed(2),F=(_/1e5).toFixed(2);return d!=="youtube#video"?void 0:`<div class="video-player-container">
        <div class="video-frame-container">
          <iframe
            src="https://www.youtube.com/embed/${o}?autoplay=0&controls=1&vq=small"
            id="videoPlayerIFrame"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write;picture-in-picture; "
            allowfullscreen
          ></iframe>
        </div>
        <div class="video-information">
          <h2 class="video-title">
            ${y}
          </h2>
          <!--<a href="#channel=${p}" class="video-artist-link artist-link"> </a>-->
          <div class="artist-info">
            <img src="${$}" alt="artist-pic" class="artist-logo" />
            <div class="artist-channel-info">
              <h3 class="artist-name">${c}</h3>
              <span class="mini-info-span artist-subsribers-count"
                >${_>=1e6?N+"M":F+"K"} subscribers</span
              >
            </div>
          </div>
      
          <div class="video-description">
            <h2 class="video-description-title toggle-description">
              Description &darr;
            </h2>

            <p class="description-content hidden">
              ${h}
            </p>
          </div>
        </div>
      </div>
      <aside class="suggested-videos-container">
        <h2 class="more-like-this">more like this-</h2>
        <br />
        ${s==null?void 0:s.slice(10).map(B=>{var P;let{id:{videoId:Q},snippet:{title:k,channelTitle:K,thumbnails:E}}=B,M=(P=E.high)==null?void 0:P.url,U=E.default.url;return`<a href="#vid=${Q}" class="suggested-video-link">
          <div class="suggested-video-box">
            <img
              src="${M||U}"
              alt="${k}"
              class="suggested-video-thumbnail"
            />
            <div class="suggested-video-info">
              <h4 class="suggested-video-title">
               ${k}
              </h4>
              <span
                class="mini-info-span suggested-video-artist-name artist-name"
                >${K}</span
              >
            </div>
          </div>
        </a>`}).join("")}
      </aside>`}}const f=new re;class ie extends L{constructor(){super(...arguments);l(this,"data");l(this,"_parentElement",document.querySelector(".history-videos-container"))}_generateMarkup(){return`${this.data.map(s=>{let{id:i,snippet:{title:o,thumbnails:{high:{url:d}}}}=s;return console.log(o,i),`<a href="#vid=${i}" class="history-video-link">
            <div class="history-video-box">
              <img class="history-video-thumbnail" src="${d}"></img>
              <h4 class="history-video-title">${o}</h4>
            </div>
          </a>
           `}).join("")}`}handleClearHistory(n){document.querySelector(".clear-history").addEventListener("click",n)}}const m=new ie;class se extends L{constructor(){super(...arguments);l(this,"data");l(this,"showButton");l(this,"_parentElement",document.querySelector(".search-results-container"))}_generateMarkup(){let n=this.data,{items:r}=n;return r.map(i=>{let o=i.id.kind,d=i.id.videoId;i.snippet.channelId;let p=i.snippet.channelTitle,c=i.snippet.title,h=i.snippet.description,y=i.snippet.thumbnails.high.url;if(o==="youtube#video")return`<a href="#vid=${d}" class="search-result-video-link">
              <div class="serach-result result-video-box">
                <div class="search-result-video-thumbnail">
                  <img
                    src="${y}"
                    alt="${c}"
                    class="search-result-video-thumbnail-pic"
                  />
                </div>
                <div class="search-result-video-info">
                  <h3 class="search-result-video-title">${c}</h3>
                  <span class="mini-info-span artist-name">${p}</span>
                  <p class="mini-description">
                    ${h}
                  </p>
                </div>
              </div>
            </a>`}).join("")+'<button class="show-more-btn">show more &rarr;</button>'}getQuery(){return document.querySelector(".search-input").value}handleSearch(n){document.querySelector(".nav-search-form").addEventListener("submit",r=>{r.preventDefault(),n()})}}const g=new se;async function I(t){try{u._renderSpinner();let e=await b(`${t}`);u._render(e),a.query=t,a.currentPage=u,a.nextPageToken=e.nextPageToken}catch(e){u._renderMessage(`${e}`),console.error(e)}}async function V(){let t=a.query,e=a.nextPageToken,n=a.currentPage;try{let r=await b(`${t}`,`&pageToken=${e}`);a.nextPageToken=r.nextPageToken,n._parentElement.querySelectorAll(".show-more-btn").forEach(s=>s.classList.add("hidden")),n._renderMore(r)}catch(r){n._renderMessage("encounterd problem while fetching more data "+r)}}async function ae(t){try{document.querySelectorAll("section").forEach($=>$.classList.add("hidden"));let e=[];f._parentElement.classList.remove("hidden"),f._renderSpinner();let n=await Z(`${t}`);console.log(n);let[r]=n.items,{snippet:{channelId:s}}=r;oe(r,t);let i=await de(`${t}`),o=await ce(`${s}`),[d]=o.items,{kind:p,statistics:{subscriberCount:c},snippet:{thumbnails:{high:{url:h}}}}=d,y={logo:h,subscriberCount:c,channelId:s},{items:q}=i;e=[y,q,r],f._render(e),A()}catch(e){f._renderMessage("error playing the video:"+e),console.error(e)}}function oe(t,e){var r;let n=(r=a.historyVideos)==null?void 0:r.findIndex(s=>s.id===e);n!==-1&&a.historyVideos.splice(n,1),a.historyVideos.unshift(t),localStorage.setItem("videoHistory",JSON.stringify(a.historyVideos))}function le(){localStorage.removeItem("videoHistory"),a.historyVideos=[],C()}function A(){try{let t=JSON.parse(localStorage.getItem("videoHistory"));if(!t||t.length<1)return;a.historyVideos=t}catch(t){throw m._renderMessage(t),t}}async function T(t){try{if(t.includes("tag")){let e=t.slice(5);u._renderSpinner();let n=await b(`${e}`);a.query=e,u._render(n)}}catch(e){u._renderMessage("could not fetch specific videos : "+e),console.error(e)}}async function de(t){try{return await ee(`${t}`)}catch(e){console.error(e)}}async function ce(t){try{return await te(`${t}`)}catch(e){console.error(e)}}function C(){try{a.currentPage=m;let t=a.historyVideos;m._renderSpinner(),!t||t.length<1?m._renderMessage("no history found"):m._render(t)}catch(t){m._renderMessage(t),console.error(t)}}async function ue(){try{a.currentPage=g,g._renderSpinner();let t=g.getQuery();window.location.hash=`search?=${t}`;let e=await b(`${t}`);if(e.items.length<1||!e)throw new Error("could not find any video, please try again");g._render(e),document.querySelector(".showing-search-results-for-heading").textContent=`showing results for: ${t}`,a.query=t,a.nextPageToken=e.nextPageToken}catch(t){console.error(t),g._renderMessage(t)}}function he(){window.addEventListener("hashchange",function(e){let n=window.location.hash;x(n),T(n),H(n),(n===""||n==="#home")&&(a.currentPage=u,I(a.query))});let t=window.location.hash;x(t),T(t),H(t)}function me(){window.addEventListener("load",function(t){A()})}function x(t){let e="";t.includes("vid=")&&(e=t.slice(5),ae(`${e}`))}function H(t){t.includes("history")&&C()}function ge(){I(`${a.query?a.query:"jurassic park"}`),u.handleMoreMarkup(V),he(),me(),g.handleSearch(ue),m.handleClearHistory(le),g.handleMoreMarkup(V)}ge();const pe=document.querySelector(".hamburger-menu"),S=document.querySelector(".nav-sidebar");let v=document.querySelector(".overlay");document.querySelector(".description-content");pe.addEventListener("click",t=>{S.classList.toggle("translate"),v.classList.toggle("hidden")});v.addEventListener("click",t=>{v.classList.add("hidden"),S.classList.remove("translate")});document.body.addEventListener("click",t=>{let e=t.target.closest(".toggle-description"),n=t.target.closest(".nav-sidebar-link"),r=t.target.closest("#history"),s=t.target.closest(".logo-link"),i=t.target.closest(".search-btn");n&&j(),e&&e.nextElementSibling.classList.toggle("hidden"),r&&O(),s&&R(),i&&D()});window.addEventListener("hashchange",function(t){let e=window.location.hash;e.includes("tag")&&j(),e.includes("history")&&O(),(e.includes("home")||e==="#"||e==="")&&R()});function D(){var e,n;document.querySelector(".search-input").value&&(document.querySelectorAll("section").forEach(r=>r.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),(e=document.querySelector(".home-videos-mega-container"))==null||e.classList.add("hidden"),(n=document.querySelector(".search-results-mega-container"))==null||n.classList.remove("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden"))}document.querySelector(".nav-search-form").addEventListener("submit",t=>{t.preventDefault(),D()});function j(){var t,e;S.classList.remove("translate"),v.classList.add("hidden"),document.querySelectorAll("section").forEach(n=>n.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.remove("hidden"),(e=document.querySelector(".search-results-mega-container"))==null||e.classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden")}function O(){var t,e;S.classList.remove("translate"),v.classList.add("hidden"),document.querySelectorAll("section").forEach(n=>n.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.add("hidden"),(e=document.querySelector(".search-results-mega-container"))==null||e.classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.remove("hidden")}function R(){var t;document.querySelector(".search-input").value="",document.querySelectorAll("section").forEach(e=>e.classList.remove("hidden")),document.querySelector("#video-player").classList.add("hidden"),(t=document.querySelector(".home-videos-mega-container"))==null||t.classList.remove("hidden"),document.querySelector(".search-results-mega-container").classList.add("hidden"),document.querySelector(".history-videos-mega-container").classList.add("hidden")}
