parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i0aF":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,t=arguments[3];!function(t,o){"function"==typeof e&&e.amd?e([],o):"undefined"!=typeof exports?o():(o(),t.FileSaver={})}(this,function(){"use strict";function e(e,t,o){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){i(n.response,t,o)},n.onerror=function(){console.error("could not download file")},n.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function n(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(o)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,i=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype?function(t,i,r){var c=a.URL||a.webkitURL,s=document.createElement("a");i=i||t.name||"download",s.download=i,s.rel="noopener","string"==typeof t?(s.href=t,s.origin===location.origin?n(s):o(s.href)?e(t,i,r):n(s,s.target="_blank")):(s.href=c.createObjectURL(t),setTimeout(function(){c.revokeObjectURL(s.href)},4e4),setTimeout(function(){n(s)},0))}:"msSaveOrOpenBlob"in navigator?function(t,a,i){if(a=a||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(t,i),a);else if(o(t))e(t,a,i);else{var r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){n(r)})}}:function(t,o,n,i){if((i=i||open("","_blank"))&&(i.document.title=i.document.body.innerText="downloading..."),"string"==typeof t)return e(t,o,n);var r="application/octet-stream"===t.type,c=/constructor/i.test(a.HTMLElement)||a.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent);if((s||r&&c)&&"object"==typeof FileReader){var l=new FileReader;l.onloadend=function(){var e=l.result;e=s?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),i?i.location.href=e:location=e,i=null},l.readAsDataURL(t)}else{var u=a.URL||a.webkitURL,f=u.createObjectURL(t);i?i.location=f:location.href=f,i=null,setTimeout(function(){u.revokeObjectURL(f)},4e4)}});a.saveAs=i.saveAs=i,"undefined"!=typeof module&&(module.exports=i)});
},{}],"VQom":[function(require,module,exports) {
var define;
var global = arguments[3];
var t,i=arguments[3];!function(i,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof t&&t.amd?t(["exports"],n):n(i.d3_queue=i.d3_queue||{})}(this,function(t){"use strict";var i=[].slice,n={};function r(t){if(!(t>=1))throw new Error;this._size=t,this._call=this._error=null,this._tasks=[],this._data=[],this._waiting=this._active=this._ended=this._start=0}function a(t){if(!t._start)try{!function(t){for(;t._start=t._waiting&&t._active<t._size;){var i=t._ended+t._active,r=t._tasks[i],a=r.length-1,s=r[a];r[a]=e(t,i),--t._waiting,++t._active,r=s.apply(null,r),t._tasks[i]&&(t._tasks[i]=r||n)}}(t)}catch(i){t._tasks[t._ended+t._active-1]&&s(t,i)}}function e(t,i){return function(n,r){t._tasks[i]&&(--t._active,++t._ended,t._tasks[i]=null,null==t._error&&(null!=n?s(t,n):(t._data[i]=r,t._waiting?a(t):o(t))))}}function s(t,i){var n,r=t._tasks.length;for(t._error=i,t._data=void 0,t._waiting=NaN;--r>=0;)if((n=t._tasks[r])&&(t._tasks[r]=null,n.abort))try{n.abort()}catch(i){}t._active=NaN,o(t)}function o(t){!t._active&&t._call&&t._call(t._error,t._data)}function _(t){return new r(arguments.length?+t:1/0)}r.prototype=_.prototype={constructor:r,defer:function(t){if("function"!=typeof t||this._call)throw new Error;if(null!=this._error)return this;var n=i.call(arguments,1);return n.push(t),++this._waiting,this._tasks.push(n),a(this),this},abort:function(){return null==this._error&&s(this,new Error("abort")),this},await:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=function(i,n){t.apply(null,[i].concat(n))},o(this),this},awaitAll:function(t){if("function"!=typeof t||this._call)throw new Error;return this._call=t,o(this),this}},t.version="2.0.3",t.queue=_});
},{}],"KBwM":[function(require,module,exports) {
var e=require("d3-queue").queue,n=+new Date;module.exports=function(t,a){var o=!!L.mapbox,i=t.getSize(),r=new e(1),c=document.createElement("canvas");c.width=i.x,c.height=i.y;var s=c.getContext("2d"),l=document.createElement("canvas");l.width=1,l.height=1;var d=l.getContext("2d");if(d.fillStyle="rgba(0,0,0,0)",d.fillRect(0,0,1,1),t.eachLayer(function(e){e instanceof L.TileLayer?r.defer(f,e):e._heat&&r.defer(m,e._canvas)}),t.eachLayer(function(e){if(!L.esri)return;e instanceof L.esri.DynamicMapLayer&&r.defer(h,e)}),t._pathRoot)r.defer(m,t._pathRoot);else if(t._panes){var u=t._panes.overlayPane.getElementsByTagName("canvas").item(0);u&&r.defer(m,u)}function f(n,a){var r=L.TileLayer.Canvas&&n instanceof L.TileLayer.Canvas,c=document.createElement("canvas");c.width=i.x,c.height=i.y;var s=c.getContext("2d"),d=t.getPixelBounds(),u=t.getZoom(),f=n.options.tileSize;if(u>n.options.maxZoom||u<n.options.minZoom||o&&n instanceof L.mapbox.tileLayer&&!n.options.tiles)return a();var m,g,h=L.bounds(d.min.divideBy(f)._floor(),d.max.divideBy(f)._floor()),x=[],y=new e(1);for(m=h.min.y;m<=h.max.y;m++)for(g=h.min.x;g<=h.max.x;g++)x.push(new L.Point(g,m));function p(e,n,t,a){a(null,{img:e,pos:n,size:t})}function w(e,t,a,o){var i=new Image;i.crossOrigin="",i.onload=function(){o(null,{img:this,pos:t,size:a})},i.onerror=function(e){""!=n.options.errorTileUrl&&void 0===e.target.errorCheck?(e.target.errorCheck=!0,e.target.src=n.options.errorTileUrl):o(null,{img:l,pos:t,size:a})},i.src=e}function _(e){s.drawImage(e.img,Math.floor(e.pos.x),Math.floor(e.pos.y),e.size,e.size)}x.forEach(function(e){var t=e.clone();n._adjustTilePoint&&n._adjustTilePoint(e);var a=t.scaleBy(new L.Point(f,f)).subtract(d.min);if(e.y>=0)if(r){var o=n._tiles[e.x+":"+e.y];y.defer(p,o,a,f)}else{var i=v(n.getTileUrl(e));y.defer(w,i,a,f)}}),y.awaitAll(function(e,n){n.forEach(_),a(null,{canvas:c})})}function m(e,n){var a=t.getPixelBounds(),o=t.getPixelOrigin(),r=document.createElement("canvas");r.width=i.x,r.height=i.y;var c=r.getContext("2d"),s=L.DomUtil.getPosition(e).subtract(a.min).add(o);try{c.drawImage(e,s.x,s.y,r.width-2*s.x,r.height-2*s.y),n(null,{canvas:r})}catch(l){console.error("Element could not be drawn on canvas",e)}}function g(e,n){var a=document.createElement("canvas"),o=a.getContext("2d"),r=t.getPixelBounds(),c=new L.Point(r.min.x,r.min.y),s=t.project(e.getLatLng()),l=/^data\:/.test(e._icon.src),d=l?e._icon.src:v(e._icon.src),u=new Image,f=e.options.icon.options,m=f.iconSize,g=s.subtract(c),h=L.point(f.iconAnchor||m&&m.divideBy(2,!0));m instanceof L.Point&&(m=[m.x,m.y]);var x=Math.round(g.x-m[0]+h.x),y=Math.round(g.y-h.y);a.width=i.x,a.height=i.y,u.crossOrigin="",u.onload=function(){o.drawImage(this,x,y,m[0],m[1]),n(null,{canvas:a})},u.src=d,l&&u.onload()}function h(e,n){var t=document.createElement("canvas");t.width=i.x,t.height=i.y;var a=t.getContext("2d"),o=new Image;o.crossOrigin="",o.src=v(e._currentImage._image.src),o.onload=function(){a.drawImage(o,0,0),n(null,{canvas:t})}}function v(e){return function(e){return!!e.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i)}(e)||-1!==e.indexOf("mapbox.com/styles/v1")?e:e+(e.match(/\?/)?"&":"?")+"cache="+n}t.eachLayer(function(e){e instanceof L.Marker&&e.options.icon instanceof L.Icon&&r.defer(g,e)}),r.awaitAll(function(e,n){if(e)throw e;n.forEach(function(e){e&&e.canvas&&s.drawImage(e.canvas,0,0)}),a(null,c)})};
},{"d3-queue":"VQom"}],"epB2":[function(require,module,exports) {
"use strict";var t=require("file-saver"),n=i(require("leaflet-image"));function i(t){return t&&t.__esModule?t:{default:t}}const a=console.log,e=console.error,d=t=>document.querySelector(t),o=[23.012455,78.085792],c=[28.642257,77.218603],v=0,r=120,s=r-v,l=5,u=s/l,m=["blue","green","orange","yellow","red"],p="pk.eyJ1IjoidGVzdGluZ21hcGJveGlpdGsiLCJhIjoiY2pvanlqN3JnMDFiOTNwbW5xbG83NnE1cSJ9.Fx5Gu72P14nE2qcVshLMbg",_=[],f={},b={},h=[],y=d("#searchBar");let g=null,w=null,k=null,C=4;function M(){a("hi from the main thread"),g=S(),new Worker("worker.a3677681.js").onmessage=(t=>E(t,g))}function S(){const t={attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',accessToken:p,maxZoom:18},n="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}";w=L.tileLayer(n,{...t,id:"mapbox.satellite"}),k=L.tileLayer(n,{...t,id:"mapbox.streets"});const i={preferCanvas:!0,layers:[w],center:c,zoom:10};return L.map("mapid",i)}M();const j=t=>t.trim().toLowerCase(),x=t=>Math.round(100*(t+Number.EPSILON))/100;function E(t,n){if("done"===t.data)return a("worker is done"),J(n);if(t.data.length<1)return a("length of row < 1");const i=t.data[0];if(!G(i)){if(C<1)return;return C--,a("event:",t),a("data is not valid")}const e=j(i.station_name);f[i.station_code]=i,b[e]=i;const d=T(i.yr_mean),o={color:"rgb(".concat(d,", 0, ").concat(255-d,")"),colorClass:"red"};for(let a=0,p=v;a<l&&!(i.yr_mean<p);a++,p+=u)o.colorClass=m[a];const c='\n    <div class="station_name">'.concat(i.station_name,"(").concat(i.station_code,')</div>\n    <div class="station_delay ').concat(o.colorClass,'">\n\n        <div>Time period</div><div>Mean delay<br/>(in minutes)</div><div>Standard deviation<br/>of delay</div>\n        <div>Oct 2017 to Oct 2018</div><div>').concat(x(i.yr_mean),"</div><div>").concat(x(i.yr_std),"</div>\n        <div>October 2017</div><div>").concat(x(i.oct17_mean),"</div><div>").concat(x(i.oct17_std),"</div>\n        <div>November 2017</div><div>").concat(x(i.nov17_mean),"</div><div>").concat(x(i.nov17_std),"</div>\n        <div>Decmber 2017</div><div>").concat(x(i.dec17_mean),"</div><div>").concat(x(i.dec17_std),"</div>\n        <div>January 2018</div><div>").concat(x(i.jan18_mean),"</div><div>").concat(x(i.jan18_std),"</div>\n        <div>February 2018</div><div>").concat(x(i.feb18_mean),"</div><div>").concat(x(i.feb18_std),"</div>\n        <div>March 2018</div><div>").concat(x(i.mar18_mean),"</div><div>").concat(x(i.mar18_std),"</div>\n        <div>April 2018</div><div>").concat(x(i.apr18_mean),"</div><div>").concat(x(i.apr18_std),"</div>\n        <div>May 2018</div><div>").concat(x(i.may18_mean),"</div><div>").concat(x(i.may18_std),"</div>\n        <div>June 2018</div><div>").concat(x(i.jun18_mean),"</div><div>").concat(x(i.jun18_std),"</div>\n        <div>July 2018</div><div>").concat(x(i.jul18_mean),"</div><div>").concat(x(i.jul18_std),"</div>\n        <div>August 2018</div><div>").concat(x(i.aug18_mean),"</div><div>").concat(x(i.aug18_std),"</div>\n        <div>September 2018</div><div>").concat(x(i.sep18_mean),"</div><div>").concat(x(i.sep18_std),"</div>\n        <div>October 2018</div><div>").concat(x(i.oct18_mean),"</div><div>").concat(x(i.oct18_std),"</div>\n        <div>Christmas 2017</div><div>").concat(x(i.christmas17_mean),"</div><div>").concat(x(i.christmas17_std),"</div>\n        <div>Diwali 2018</div><div>").concat(x(i.diwali18_mean),"</div><div>").concat(x(i.diwali18_std),"</div>\n        <div>Holi 2018</div><div>").concat(x(i.holi18_mean),"</div><div>").concat(x(i.holi18_std),"</div>\n\n    </div>\n    "),r=L.circleMarker([i.longitude,i.latitude],{radius:1,color:o.color});r.bindPopup(c),_.push(r),f[i.station_code].marker=r,b[e].marker=r;const s=document.createElement("option");s.value=e,h.push(s)}function G(t){return"latitude"in t&&null!==t.latitude&&("longitude"in t&&null!==t.longitude&&("station_code"in t&&null!==t.station_code))}function J(t){const n=L.layerGroup(_);t.addLayer(n);var i={Satellite:w,Streets:k},a={Stations:n};L.control.layers(i,a).addTo(t);const e=document.createElement("datalist");e.id="stations-name-list",e.append(...h),document.body.appendChild(e),y.addEventListener("keyup",t=>{"Enter"===t.key&&O()}),y.addEventListener("change",()=>O());const o=d("#save");o.addEventListener("click",()=>N(o,t)),d("#loading").classList.add("hidden")}function O(){const t=y.value.trim().toUpperCase();if(t in f){a("Found it");const n=f[t];g.panTo([n.longitude,n.latitude]),n.marker.openPopup()}else{if(!(t.toLowerCase()in b))return alert("Couldn't find station");{a("Found it");const n=b[t.toLowerCase()];g.panTo([n.longitude,n.latitude]),n.marker.openPopup()}}}function T(t){let n=0;return 255*(n=t>r?1:t<v?0:(t-v)/s)}function N(i,e){const o=d("#loading");o.classList.remove("hidden"),(0,n.default)(e,(n,i)=>{if(o.classList.add("hidden"),n)return a(n);const e="map_saved_at_".concat(Date(),".png");i.toBlob(n=>(0,t.saveAs)(n,e))})}
},{"file-saver":"i0aF","leaflet-image":"KBwM","./worker.js":[["worker.a3677681.js","iltZ"],"worker.a3677681.js.map",["stationdata.a071382a.csv","Gtfx"],"iltZ"]}]},{},["epB2"], null)
//# sourceMappingURL=main.a1890fcc.js.map