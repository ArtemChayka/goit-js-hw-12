import{a as m,S as y}from"./assets/vendor-CigWwf1c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const g="50832143-3e18ca1c7d3ff8d3379931b93",h="https://pixabay.com/api/";async function c(t,r=1){const s={key:g,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r},{data:n}=await m(h,{params:s});return n}function l(t){return t.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:o,comments:i,downloads:p})=>`
<li class="gallery-item"><a href="${s}"><img src="${r}" alt="${n}">
<div class="info">
<p><b>Likes</b>${e}</p>
<p><b>Views</b>${o}</p>
<p><b>Comments</b>${i}</p>
<p><b>Downloads</b>${p}</p>
</div>
</a></li>
    `).join("")}new y(".gallery a");const d=document.querySelector(".gallery"),u=document.querySelector(".load-more-btn");u.addEventListener("click",b);let a=3,f="";c(f,a).then(t=>{console.log(t),d.insertAdjacentHTML("beforeend",l(t.hits)),u.classList.replace("load-more-btn-hidden","load-more-btn")}).catch(t=>{console.log(t.message)});async function b(){a++;try{const t=await c(f,a);console.log(t),d.insertAdjacentHTML("beforeend",l(t.hits))}catch(t){console.log(t.message)}}
//# sourceMappingURL=index.js.map
