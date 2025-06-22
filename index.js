import{a as c,S as l}from"./assets/vendor-B6Fq-XDb.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const p="50832143-3e18ca1c7d3ff8d3379931b93",u="https://pixabay.com/api/";async function f(r,o){const i={key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:1},{data:s}=await c(u,{params:i});return s.hits}function d(r){return r.map(({webformatURL:o,largeImageURL:i,tags:s,likes:e,views:t,comments:n,downloads:a})=>`
<li class="gallery-item"><a href="${i}"><img src="${o}" alt="${s}">
<div class="info">
<p><b>Likes</b>${e}</p>
<p><b>Views</b>${t}</p>
<p><b>Comments</b>${n}</p>
<p><b>Downloads</b>${a}</p>
</div>
</a></li>
    `).join("")}const m=document.querySelector(".gallery");new l(".gallery a");document.querySelector(".load-btn");f().then(r=>{console.log(r),m.insertAdjacentHTML("beforeend",d(r))}).catch(r=>{console.log(r.message)});
//# sourceMappingURL=index.js.map
