!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("san-router",[],e):"object"==typeof exports?exports["san-router"]=e():t["san-router"]=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist",e(e.s=6)}([function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var r=(0,s.default)(t),n=(0,s.default)(e),o=r.path;if(0===o.indexOf("/"))return t;var i=o.split("/"),a=n.path.split("/");a.pop();for(var u=0;u<i.length;u++){var c=i[u];switch(c){case"..":a.pop();break;case".":break;default:a.push(c)}}return""!==a[0]&&a.unshift(""),a.join("/")+(r.queryString?"?"+r.queryString:"")}e.__esModule=!0,e.default=o;var i=r(1),s=n(i)},function(t,e,r){"use strict";function n(t){var e={};e.hash="";var r=t.indexOf("#");r>=0&&(e.hash=t.slice(r+1),t=t.slice(0,r)),e.queryString="";var n={};e.query=n;var o=t.indexOf("?");return o>=0&&(e.queryString=t.slice(o+1),t=t.slice(0,o),e.queryString.split("&").forEach(function(t){var e=t.indexOf("="),r="";e>0&&(r=t.slice(e+1),t=t.slice(0,e));var o=decodeURIComponent(t);r=decodeURIComponent(r),n.hasOwnProperty(o)?n[o]=[].concat(n[o],r):n[o]=r})),e.path=t,e}e.__esModule=!0,e.default=n},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=r(7),a=n(s),u=r(8),c=n(u),f=Symbol("eventPool"),p=function(){function t(){o(this,t)}return t.prototype.on=function(t,e,r,n){this[f]||(this[f]=Object.create(null)),this[f][t]||(this[f][t]=new c.default);var o=this[f][t];n=Object.assign({},n),r&&(n.thisObject=r),o.add(e,n)},t.prototype.once=function(t,e,r,n){n=Object.assign({},n),n.once=!0,this.on(t,e,r,n)},t.prototype.un=function(t,e,r){if(this[f]&&this[f][t]){var n=this[f][t];n.remove(e,r)}},t.prototype.fire=function(t,e){if(1===arguments.length&&"object"===("undefined"==typeof t?"undefined":i(t))&&(e=t,t=e.type),!t)throw new Error("No event type specified");if("*"===t)throw new Error("Cannot fire global event");var r=e instanceof a.default?e:new a.default(t,e);if(r.target=this,this[f]&&this[f][t]){var n=this[f][t];n.execute(r,this)}if(this[f]&&this[f]["*"]){var o=this[f]["*"];o.execute(r,this)}return r},t.prototype.destroyEvents=function(){if(this[f]){for(var t in this[f])this[f][t]&&this[f][t].dispose();this[f]=null}},t}();e.default=p},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(6),i=r(0),s=n(i);e.default={template:'<a href="{{href}}" onclick="return false;" on-click="clicker($event)" target="{{target}}" class="{{class}}" style="{{style}}"><slot></slot></a>',clicker:function(t){var e=this.data.get("href");"string"==typeof e&&o.router.locator.redirect(e.replace(/^#/,"")),t.preventDefault?t.preventDefault():t.returnValue=!1},computed:{href:function t(){var e=this.data.get("to");if("string"==typeof e){var t=(0,s.default)(e,o.router.locator.current);return"hash"===o.router.mode&&(t="#"+t),t}}}}},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(){var t=location.href.indexOf("#"),e=t<0?"/":location.href.slice(t+1);return e}e.__esModule=!0;var u=r(2),c=n(u),f=r(0),p=n(f),l=function(t){function e(){o(this,e);var r=i(this,t.call(this));return r.current=a(),r.referrer="",r.hashChangeHandler=function(){r.redirect(a())},r}return s(e,t),e.prototype.start=function(){window.addEventListener&&window.addEventListener("hashchange",this.hashChangeHandler,!1),window.attachEvent&&window.attachEvent("onhashchange",this.hashChangeHandler)},e.prototype.stop=function(){window.removeEventListener&&window.removeEventListener("hashchange",this.hashChangeHandler,!1),window.detachEvent&&window.detachEvent("onhashchange",this.hashChangeHandler)},e.prototype.redirect=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{force:!1};t=(0,p.default)(t,this.current);var r=this.current,n=t!==r;n?(this.referrer=r,this.current=t,location.hash=t):r=this.referrer,!n&&!e.force||e.silent||this.fire("redirect",{url:t,referrer:r})},e.prototype.reload=function(){this.redirect(this.current,{force:!0})},e}(c.default);e.default=l},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(){return location.pathname+location.search}e.__esModule=!0;var u=r(2),c=n(u),f=r(0),p=n(f),l=function(t){function e(){o(this,e);var r=i(this,t.call(this));return r.current=a(),r.referrer="",r.popstateHandler=function(){r.referrer=r.current,r.current=a(),r.fire("redirect",{url:r.current,referrer:r.referrer})},r}return s(e,t),e.prototype.start=function(){window.addEventListener("popstate",this.popstateHandler)},e.prototype.stop=function(){window.removeEventListener("popstate",this.popstateHandler)},e.prototype.redirect=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{force:!1};t=(0,p.default)(t,this.current);var r=this.current,n=t!==r;n&&(this.referrer=r,this.current=t,history.pushState({},"",t)),!n&&!e.force||e.silent||this.fire("redirect",{url:t,referrer:r})},e.prototype.reload=function(){this.fire("redirect",{url:this.current,referrer:this.referrer})},e}(c.default);e.default=l,l.isSupport="pushState"in window.history},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0,e.Link=e.router=e.Router=e.version=void 0;var i=r(4),s=n(i),a=r(5),u=n(a),c=r(1),f=n(c),p=r(3),l=n(p),h=365611,d=function(){return(++h).toString()},y=(e.version="1.1.1",e.Router=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.mode,i=void 0===n?"hash":n;o(this,t),this.routes=[],this.routeAlives=[],this.listeners=[],this.locatorRedirectHandler=function(t){function r(){l=1,p++,d()}for(var n=(0,f.default)(t.url),o=void 0,i=0;i<e.routes.length;i++){var s=e.routes[i],a=s.rule.exec(n.path);if(a){o=s;for(var u=s.keys||[],c=1;c<a.length;c++)n.query[u[c]||c]=a[c];n.referrer=t.referrer,n.config=s.config;break}}var p=0,l=1,h={hash:n.hash,queryString:n.queryString,query:n.query,path:n.path,referrer:n.referrer,config:n.config,resume:r,suspend:function(){l=0},stop:function(){l=-1}},d=function(){l>0&&(p<e.listeners.length?(e.listeners[p].call(e,h,n.config),l>0&&r()):y())},y=function(){if(o)e.doRoute(o,n);else for(var t=e.routeAlives.length;t--;)e.routeAlives[t].component.dispose(),e.routeAlives.splice(t,1)};d()},this.setMode(i)}return t.prototype.listen=function(t){this.listeners.push(t)},t.prototype.unlisten=function(t){for(var e=this.listeners.length;e--;)this.listeners[e]===t&&this.listeners.splice(e,1)},t.prototype.doRoute=function(t,e){for(var r=!1,n=this.routeAlives.length;n--;){var o=this.routeAlives[n];o.id===t.id?(o.component.data.set("route",e),o.component._callHook("route"),r=!0):(o.component.dispose(),this.routeAlives.splice(n,1))}if(!r)if(t.Component){var i=new t.Component;i.data.set("route",e),i._callHook("route");var s=document.querySelector(t.target);s&&i.attach(s),this.routeAlives.push({component:i,id:t.id})}else t.handler.call(this,e)},t.prototype.add=function(t){var e=t.rule,r=t.handler,n=t.target,o=void 0===n?"#main":n,i=t.Component,s=[""];if("string"==typeof e){var a=e.replace(/\/:([a-z0-9_-]+)(?=\/|$)/gi,function(t,e){return s.push(e),"/([^/\\s]+)"});e=new RegExp("^"+a+"$","i")}if(!(e instanceof RegExp))throw new Error("Rule must be string or RegExp!");var u=d();return this.routes.push({id:u,rule:e,handler:r,keys:s,target:o,Component:i,config:t}),this},t.prototype.start=function(){return this.isStarted||(this.isStarted=!0,this.locator.on("redirect",this.locatorRedirectHandler),this.locator.start(),this.locator.reload()),this},t.prototype.stop=function(){return this.locator.un("redirect",this.locatorRedirectHandler),this.locator.stop(),this.isStarted=!1,this},t.prototype.setMode=function(t){if(t=t.toLowerCase(),this.mode!==t){this.mode=t;var e=!1;switch(this.isStarted&&(this.stop(),e=!0),t){case"hash":this.locator=new s.default;break;case"html5":this.locator=new u.default}return e&&this.start(),this}},t}());e.router=new y;e.Link=l.default},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(t){return"[object Object]"===Object.prototype.toString.call(t)},s=new Set(["type","target","preventDefault","isDefaultPrevented","stopPropagation","isPropagationStopped","stopImmediatePropagation","isImmediatePropagationStopped"]),a=function(){function t(e,r){n(this,t),"object"===("undefined"==typeof e?"undefined":o(e))&&(r=e,e=r.type),i(r)?Object.assign(this,r):r&&(this.data=r),e&&(this.type=e)}return t.prototype.isDefaultPrevented=function(){return!1},t.prototype.preventDefault=function(){this.isDefaultPrevented=function(){return!0}},t.prototype.isPropagationStopped=function(){return!1},t.prototype.stopPropagation=function(){this.isPropagationStopped=function(){return!0}},t.prototype.isImmediatePropagationStopped=function(){return!1},t.prototype.stopImmediatePropagation=function(){this.isImmediatePropagationStopped=function(){return!0},this.stopPropagation()},t.fromEvent=function(e,r){var n={type:e.type,preserveData:!1,syncState:!1};r=Object.assign(n,r);var o=new t(r.type);if(r.preserveData)for(var i in e)e.hasOwnProperty(i)&&!s.has(i)&&(o[i]=e[i]);return r.extend&&Object.assign(o,r.extend),r.syncState&&!function(){var t=o.preventDefault;o.preventDefault=function(){e.preventDefault(),t.call(this)};var r=e.stopPropagation;o.stopPropagation=function(){e.stopPropagation(),r.call(this)};var n=e.stopImmediatePropagation;o.stopImmediatePropagation=function(){e.stopImmediatePropagation(),n.call(this)}}(),o},t.delegate=function(e,r,n,o,i){var s="string"==typeof r,a={object:e,type:s?r:n},u={object:s?n:r,type:s?o:n},c=s?i:o;if(c=Object.assign({preserveData:!1},c),"function"==typeof a.object.on&&"function"==typeof u.object.on&&"function"==typeof u.object.fire){var f=function(e){var r=t.fromEvent(e,c);r.type=u.type,r.target=u.object,u.object.fire(u.type,r)};a.object.on(a.type,f)}},t}();e.default=a},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var o=Symbol("queue"),i=function(t,e,r){return t&&t.handler===e&&t.thisObject==r},s=function(){function t(){n(this,t),this[o]=[]}return t.prototype.add=function(t,e){if(t!==!1&&"function"!=typeof t)throw new Error("event handler must be a function or const false");for(var r=Object.assign({handler:t},e),n=0;n<this[o].length;n++){var s=this[o][n];if(i(s,t,r.thisObject))return}this[o].push(r)},t.prototype.remove=function(t,e){if(!t)return void this.clear();for(var r=0;r<this[o].length;r++){var n=this[o][r];if(i(n,t,e))return void(this[o][r]=null)}},t.prototype.clear=function(){this[o].length=0},t.prototype.execute=function(t,e){for(var r=this[o],n=0;n<r.length;n++){if("function"==typeof t.isImmediatePropagationStopped&&t.isImmediatePropagationStopped())return;var i=r[n];if(i){var s=i.handler;s===!1?("function"==typeof t.preventDefault&&t.preventDefault(),"function"==typeof t.stopPropagation&&t.stopPropagation()):s.call(i.thisObject||e,t),i.once&&this.remove(i.handler,i.thisObject)}}},t.prototype.length=function(){return this[o].filter(function(t){return!!t}).length},t.prototype.dispose=function(){this.clear(),this[o]=null},t}();e.default=s}])});