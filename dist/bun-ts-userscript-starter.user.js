// ==UserScript==
// @name         bun-ts-userscript-starter
// @namespace    https://github.com/genzj/bun-ts-userscript-starter
// @version      1.0.2.1735972969744
// @description  A Greasemonkey/Tampermonkey/Violentmonkey Bun + TypeScript boilerplate
// @license      MIT
// @author       genzj
// @updateURL    https://github.com/genzj/bun-ts-userscript-starter/raw/main/dist/bun-ts-userscript-starter.user.js
// @downloadURL  https://github.com/genzj/bun-ts-userscript-starter/raw/main/dist/bun-ts-userscript-starter.user.js
// @match        http*://example.com/
// @match        http*://www.example.com/
// @grant        GM_addStyle
// ==/UserScript==

// src/html/main-content.html
var main_content_default = "<div class=\"injected-html\">\r\n    This is some injected html in the page.\r\n</div>\r\n";

// src/scss/style.scss
var style_default = ".injected-html{color:#fffc;background:linear-gradient(90deg,#020024 0%,#090979 35%,#00d4ff 100%);font-family:Arial,Helvetica,sans-serif}";

// src/index.ts
class App {
  constructor() {
    this.injectHTML(main_content_default);
    console.log("If you see this message, it means that the script has been injected :)");
    const typedArray1 = new Int8Array(8);
    GM_xmlhttpRequest({
      data: 5
    });
  }
  injectHTML(htmlContent) {
    GM_addStyle(style_default);
    document.querySelector("body")?.insertAdjacentHTML("afterbegin", htmlContent);
  }
}
var yourAppInstance = new App;

//# debugId=EE6532170E78F4E264756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi5cXHNyY1xcc2Nzc1xcc3R5bGUuc2NzcyIsICIuLlxcc3JjXFxpbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsKICAgICJleHBvcnQgZGVmYXVsdCBcIi5pbmplY3RlZC1odG1se2NvbG9yOiNmZmZjO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDkwZGVnLCMwMjAwMjQgMCUsIzA5MDk3OSAzNSUsIzAwZDRmZiAxMDAlKTtmb250LWZhbWlseTpBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZn1cIjsiLAogICAgImltcG9ydCBBUFBfSFRNTCBmcm9tIFwiLi9odG1sL21haW4tY29udGVudC5odG1sXCI7XG5pbXBvcnQgU1RZTEVTIGZyb20gXCIuL3Njc3Mvc3R5bGUuc2Nzc1wiO1xuXG5jbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluamVjdEhUTUwoQVBQX0hUTUwpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJJZiB5b3Ugc2VlIHRoaXMgbWVzc2FnZSwgaXQgbWVhbnMgdGhhdCB0aGUgc2NyaXB0IGhhcyBiZWVuIGluamVjdGVkIDopXCJcbiAgICApO1xuICAgIGNvbnN0IHR5cGVkQXJyYXkxID0gbmV3IEludDhBcnJheSg4KVxuICAgIEdNX3htbGh0dHBSZXF1ZXN0KHtcbiAgICAgIGRhdGE6IDUsXG4gICAgfSlcbiAgfVxuICBwcml2YXRlIGluamVjdEhUTUwoaHRtbENvbnRlbnQ6IHN0cmluZykge1xuICAgIEdNX2FkZFN0eWxlKFNUWUxFUyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik/Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaHRtbENvbnRlbnQpO1xuICB9XG59XG5cbmNvbnN0IHlvdXJBcHBJbnN0YW5jZSA9IG5ldyBBcHAoKTtcbiIKICBdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFBQSxJQUFlOzs7QUNHZixNQUFNLElBQUk7QUFBQSxFQUNSLFdBQVcsR0FBRztBQUNaLFNBQUssV0FBVyxvQkFBUTtBQUN4QixZQUFRLElBQ04sd0VBQ0Y7QUFDQSxVQUFNLGNBQWMsSUFBSSxVQUFVLENBQUM7QUFDbkMsc0JBQWtCO0FBQUEsTUFDaEIsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBO0FBQUEsRUFFSyxVQUFVLENBQUMsYUFBcUI7QUFDdEMsZ0JBQVksYUFBTTtBQUNsQixhQUFTLGNBQWMsTUFBTSxHQUFHLG1CQUFtQixjQUFjLFdBQVc7QUFBQTtBQUVoRjtBQUVBLElBQU0sa0JBQWtCLElBQUk7IiwKICAiZGVidWdJZCI6ICJFRTY1MzIxNzBFNzhGNEUyNjQ3NTZFMjE2NDc1NkUyMSIsCiAgIm5hbWVzIjogW10KfQ==
