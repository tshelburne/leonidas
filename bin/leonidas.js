(function(){var e=window.modules||[],b=null;e.leonidas__client=function(){null===b&&(b=function(b,h,j,c){this.id=b;this.appName=h;this.appType=null!=j?j:"";null==c&&(c=null);if(null==this.id)throw Error("Client Id is required");if(null==this.appName)throw Error("App Name is required");this.lastUpdate=null!=c?c:0});return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commander=function(){if(null===b){var e,h,j,c;e=require("leonidas/commands/command");h=require("leonidas/commands/organizer");j=require("leonidas/commands/processor");c=require("leonidas/commands/synchronizer");var a=function(d,a,c,h){this.client=d;this.organizer=a;this.processor=c;this.synchronizer=h};a.create=function(d,a,f){var b;b=new h;a=new j(a);f=new c(f,d,b,a);return new this(d,b,a,f)};a.prototype.startSync=function(a,c){null==a&&(a=
1E3);null==c&&(c=5E3);this.pushInterval=setInterval(this.synchronizer.push,a);return this.pullInterval=setInterval(this.synchronizer.pull,c)};a.prototype.stopSync=function(){clearInterval(this.pushInterval);return clearInterval(this.pullInterval)};a.prototype.forceSync=function(){this.synchronizer.push();return this.synchronizer.pull()};a.prototype.issueCommand=function(a,c){var f;f=new e(a,c,this.client.id);this.organizer.local.addCommand(f);return this.processor.runCommand(f)};b=a}return b};window.modules=
e})();(function(){var e=window.modules||[],b=null;e.leonidas__commands__command=function(){if(null===b){var e=function(b,j,c,a,d){this.name=b;this.data=j;this.clientId=c;null==a&&(a=null);this.id=null!=d?d:null;this.timestamp=null!=a?a:new Date};e.prototype.toHash=function(){return{id:this.id,name:this.name,data:this.data,clientId:this.clientId,timestamp:this.timestamp.getTime()}};b=e}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commands__command_list=function(){if(null===b){var e=[].indexOf||function(c){for(var a=0,d=this.length;a<d;a++)if(a in this&&this[a]===c)return a;return-1},h=function(){this.commands=[]},j;h.prototype.addCommand=function(c){null==c.id&&(c.id=j(this.commands));return this.commands.push(c)};h.prototype.addCommands=function(c){var a,d,g,f;f=[];d=0;for(g=c.length;d<g;d++)a=c[d],f.push(this.addCommand(a));return f};h.prototype.commandsThrough=function(c){var a,
d,g,f,b;f=this.commands;b=[];d=0;for(g=f.length;d<g;d++)a=f[d],a.timestamp<=c&&b.push(a);return b};h.prototype.commandsSince=function(c){var a,d,g,f,b;f=this.commands;b=[];d=0;for(g=f.length;d<g;d++)a=f[d],a.timestamp>c&&b.push(a);return b};j=function(c){var a,d;for(a=""+(new Date).getTime()+"-"+c.length;0<=e.call(function(){var a,f,b;b=[];a=0;for(f=c.length;a<f;a++)d=c[a],b.push(d.id);return b}(),a);)a=""+(new Date).getTime()+"-"+c.length;return a};b=h}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commands__handler=function(){if(null===b){var e=function(){};e.prototype.handles=function(b){return b.name===this.name};e.prototype.run=function(){throw Error("Every CommandHandler should override #run.");};e.prototype.rollback=function(){throw Error("Every CommandHandler should override #rollback.");};b=e}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commands__organizer=function(){if(null===b){var e;e=require("leonidas/commands/command_list");var h=function(){this.local=new e;this.external=new e};h.prototype.commandsFrom=function(b){var c,a,d,g,f;g=this.allCommands();f=[];a=0;for(d=g.length;a<d;a++)c=g[a],c.timestamp>=b&&f.push(c);return f};h.prototype.commandsThrough=function(b){var c,a,d,g,f;g=this.allCommands();f=[];a=0;for(d=g.length;a<d;a++)c=g[a],c.timestamp<=b&&f.push(c);return f};
h.prototype.commandsSince=function(b){var c,a,d,g,f;g=this.allCommands();f=[];a=0;for(d=g.length;a<d;a++)c=g[a],c.timestamp>b&&f.push(c);return f};h.prototype.commandsTo=function(b){var c,a,d,g,f;g=this.allCommands();f=[];a=0;for(d=g.length;a<d;a++)c=g[a],c.timestamp<b&&f.push(c);return f};h.prototype.allCommands=function(){var b,c,a,d,g;d=this.local.commands;g=[];c=0;for(a=d.length;c<a;c++)b=d[c],g.push(b);d=this.external.commands;c=0;for(a=d.length;c<a;c++)b=d[c],g.push(b);return g};h.prototype.commandsFor=
function(b,c){var a,d,g,f,e;null==c&&(c=null);null==c&&(c=new Date(0));f=this.commandsSince(c);e=[];d=0;for(g=f.length;d<g;d++)a=f[d],a.clientId===b&&e.push(a);return e};b=h}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commands__processor=function(){if(null===b){var e=function(b){this.handlers=b};e.prototype.runCommand=function(b){var e,c,a,d,g;d=this.handlers;g=[];c=0;for(a=d.length;c<a;c++)e=d[c],e.handles(b)?g.push(e.run(b)):g.push(void 0);return g};e.prototype.runCommands=function(b){var e,c,a,d;b.sort(function(a,d){return a.timestamp>d.timestamp?1:-1});d=[];c=0;for(a=b.length;c<a;c++)e=b[c],d.push(this.runCommand(e));return d};e.prototype.rollbackCommand=
function(b){var e,c,a,d,g;d=this.handlers;g=[];c=0;for(a=d.length;c<a;c++)e=d[c],e.handles(b)?g.push(e.rollback(b)):g.push(void 0);return g};e.prototype.rollbackCommands=function(b){var e,c,a,d;b.sort(function(a,d){return a.timestamp<d.timestamp?1:-1});d=[];c=0;for(a=b.length;c<a;c++)e=b[c],d.push(this.rollbackCommand(e));return d};b=e}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null;e.leonidas__commands__synchronizer=function(){if(null===b){var e,h=function(a,d){return function(){return a.apply(d,arguments)}};require("lib/reqwest");e=require("leonidas/commands/command");var j=function(a,d,b,c){this.syncUrl=a;this.client=d;this.organizer=b;this.processor=c;this.reconcile=h(this.reconcile,this);this.push=h(this.push,this);this.pull=h(this.pull,this);this.stableTimestamp=0;this.externalClients={};this.lastPushAttempt=0},c;j.prototype.pull=
function(){var a=this;return reqwest({url:""+this.syncUrl,type:"json",method:"get",data:{appName:this.client.appName,appType:this.client.appType,clientId:this.client.id,externalClients:this.externalClients},error:function(){return console.log("pull error")},success:function(d){var b,c,h,j,r;if(d.success){if(0<d.data.commands.length){var q;j=d.data.commands;q=[];b=0;for(h=j.length;b<h;b++)c=j[b],q.push(new e(c.name,c.data,c.clientId,new Date(c.timestamp),c.id));b=Math.min.apply(Math,function(){var a,
b,d;d=[];a=0;for(b=q.length;a<b;a++)c=q[a],d.push(c.timestamp);return d}());a.processor.rollbackCommands(a.organizer.commandsFrom(b));a.organizer.external.addCommands(q);a.processor.runCommands(a.organizer.commandsFrom(b))}r=d.data.externalClients;h=0;for(j=r.length;h<j;h++)b=r[h],a.externalClients[b.id]=b.lastUpdate;return a.stableTimestamp=d.data.stableTimestamp}if("reconcile required"===d.message&&null==a.reconcileTimeout)return a.reconcileTimeout=setTimeout(a.reconcile,1E3)}})};j.prototype.push=
function(){var a,b=this,e,f,h,j;h=this.organizer.local.commandsSince(this.client.lastUpdate);j=[];e=0;for(f=h.length;e<f;e++)a=h[e],j.push(a);if(0!==j.length)return this.lastPushAttempt=(new Date).valueOf(),reqwest({url:""+this.syncUrl,type:"json",method:"post",data:{appName:this.client.appName,appType:this.client.appType,clientId:this.client.id,pushedAt:this.lastPushAttempt,commands:c(j)},error:function(){return console.log("push error")},success:function(a){if(a.success)return b.client.lastUpdate=
b.lastPushAttempt;if("reconcile required"===a.message&&null==b.reconcileTimeout)return b.reconcileTimeout=setTimeout(b.reconcile,1E3)}})};j.prototype.reconcile=function(){var a,b,e,f=this;a={};a[this.client.id]=c(this.organizer.local.commands);for(e in this.externalClients)b=this.organizer.commandsFor(e),a[e]=c(b);return reqwest({url:""+this.syncUrl+"/reconcile",type:"json",method:"post",data:{appName:this.client.appName,appType:this.client.appType,clientId:this.client.id,externalClients:this.externalClients,
commandList:a,stableTimestamp:this.stableTimestamp},error:function(){return console.log("reconcile error")},success:function(a){if(a.success)return clearInterval(f.reconcileTimeout),f.reconcileTimeout=null;if("reconcile required"===a.message)return f.reconcileTimeout=setTimeout(f.reconcile,1E3)}})};c=function(a){var b,c,e,h;c={};e=0;for(h=a.length;e<h;e++)b=a[e],c[b.id]=b.toHash();return c};b=j}return b};window.modules=e})();
(function(){var e=window.modules||[],b=null,u=function(){var b=function(){function b(a){x=a}function c(b,c){this.o=b;this.fn=c;a.apply(this,arguments)}function a(a,c){function e(b){a.timeout&&clearTimeout(g.timeout);for(g.timeout=null;0<g._completeHandlers.length;)g._completeHandlers.shift()(b)}function f(a,b,c){g._responseArgs.resp=a;g._responseArgs.msg=b;g._responseArgs.t=c;for(g._erred=!0;0<g._errorHandlers.length;)g._errorHandlers.shift()(a,b,c);e(a)}this.url="string"==typeof a?a:a.url;this.timeout=
null;this._fulfilled=!1;this._fulfillmentHandlers=[];this._errorHandlers=[];this._completeHandlers=[];this._erred=!1;this._responseArgs={};var g=this,h;if(!(h=a.type))h=(h=this.url.match(/\.(json|jsonp|html|xml)(\?|$)/))?h[1]:"js";var C=h;c=c||function(){};a.timeout&&(this.timeout=setTimeout(function(){g.abort()},a.timeout));a.success&&this._fulfillmentHandlers.push(function(){a.success.apply(a,arguments)});a.error&&this._errorHandlers.push(function(){a.error.apply(a,arguments)});a.complete&&this._completeHandlers.push(function(){a.complete.apply(a,
arguments)});var n;var q=function(a){var b=D.dataFilter(a.responseText,C);if(b=a.responseText=b)switch(C){case "json":try{a=w.JSON?w.JSON.parse(b):eval("("+b+")")}catch(d){return f(a,"Could not parse JSON in response",d)}break;case "js":a=eval(b);break;case "html":a=b;break;case "xml":a=a.responseXML&&a.responseXML.parseError&&a.responseXML.parseError.errorCode&&a.responseXML.parseError.reason?null:a.responseXML}g._responseArgs.resp=a;g._fulfilled=!0;for(c(a);0<g._fulfillmentHandlers.length;)g._fulfillmentHandlers.shift()(a);
e(a)},k=this.o,m=(k.method||"GET").toUpperCase(),s="string"===typeof k?k:k.url;h=!1!==k.processData&&k.data&&"string"!==typeof k.data?d.toQueryString(k.data):k.data||null;var p;if(("jsonp"==k.type||"GET"==m)&&h)s=s+(/\?/.test(s)?"&":"?")+h,h=null;if("jsonp"==k.type){n=s;h=I++;p=k.jsonpCallback||"callback";var m=k.jsonpCallbackName||d.getcallbackPrefix(h),s=RegExp("((^|\\?|&)"+p+")=([^&]+)"),r=n.match(s),l=B.createElement("script"),u=0,v=-1!==navigator.userAgent.indexOf("MSIE 10.0");r?"?"===r[3]?n=
n.replace(s,"$1="+m):m=r[3]:n=n+(/\?/.test(n)?"&":"?")+(p+"="+m);w[m]=b;l.type="text/javascript";l.src=n;l.async=!0;"undefined"!==typeof l.onreadystatechange&&!v&&(l.event="onclick",l.htmlFor=l.id="_reqwest_"+h);l.onload=l.onreadystatechange=function(){if(l[y]&&"complete"!==l[y]&&"loaded"!==l[y]||u)return!1;l.onload=l.onreadystatechange=null;l.onclick&&l.onclick();k.success&&k.success(x);x=void 0;A.removeChild(l);u=1};A.appendChild(l);n={abort:function(){l.onload=l.onreadystatechange=null;k.error&&
k.error({},"Request is aborted: timeout",{});x=void 0;A.removeChild(l);u=1}}}else{p=J();p.open(m,s,!0);m=k.headers||{};m.Accept=m.Accept||z.accept[k.type]||z.accept["*"];!k.crossOrigin&&!m[E]&&(m[E]=z.requestedWith);m[F]||(m[F]=k.contentType||z.contentType);for(n in m)m.hasOwnProperty(n)&&p.setRequestHeader(n,m[n]);"undefined"!==typeof k.withCredentials&&"undefined"!==typeof p.withCredentials&&(p.withCredentials=!!k.withCredentials);var t=this;p.onreadystatechange=function(){if(t._aborted)return f(t.request);
t.request&&4==t.request[y]&&(t.request.onreadystatechange=K,H.test(t.request.status)?q(t.request):f(t.request))};k.before&&k.before(p);p.send(h);n=p}this.request=n}function d(a,b){return new c(a,b)}function e(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function f(a,b){var c=a.name,d=a.tagName.toLowerCase(),f=function(a){a&&!a.disabled&&b(c,e(a.attributes.value&&a.attributes.value.specified?a.value:a.text))},h;if(!a.disabled&&c)switch(d){case "input":/reset|button|image|file/i.test(a.type)||(f=/checkbox/i.test(a.type),
d=/radio/i.test(a.type),h=a.value,(!f&&!d||a.checked)&&b(c,e(f&&""===h?"on":h)));break;case "textarea":b(c,e(a.value));break;case "select":if("select-one"===a.type.toLowerCase())f(0<=a.selectedIndex?a.options[a.selectedIndex]:null);else for(d=0;a.length&&d<a.length;d++)a.options[d].selected&&f(a.options[d])}}function h(){var a,b;for(b=0;b<arguments.length;b++){a=arguments[b];/input|select|textarea/i.test(a.tagName)&&f(a,this);for(var c=["input","select","textarea"],d=void 0,e=void 0,g=void 0,d=0;d<
c.length;d++){g=a[G](c[d]);for(e=0;e<g.length;e++)f(g[e],this)}}}function u(){return d.toQueryString(d.serializeArray.apply(null,arguments))}function r(){var a={};h.apply(function(b,c){b in a?(a[b]&&!v(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments);return a}function q(a,b,c,d){var e,f,g=/\[\]$/;if(v(b))for(e=0;b&&e<b.length;e++)f=b[e],c||g.test(a)?d(a,f):q(a+"["+("object"===typeof f?e:"")+"]",f,c,d);else if("[object Object]"===b.toString())for(e in b)q(a+"["+e+"]",b[e],c,d);else d(a,b)}var w=
window,B=document,H=/^20\d$/,G="getElementsByTagName",y="readyState",F="Content-Type",E="X-Requested-With",A=B[G]("head")[0],I=0,L="reqwest_"+ +new Date,x,K=function(){},v="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},z={contentType:"application/x-www-form-urlencoded",requestedWith:"XMLHttpRequest",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",
js:"application/javascript, text/javascript"}},J=w.XMLHttpRequest?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")},D={dataFilter:function(a){return a}};c.prototype={abort:function(){this._aborted=!0;this.request.abort()},retry:function(){a.call(this,this.o,this.fn)},then:function(a,b){this._fulfilled?a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b));
return this},always:function(a){this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a);return this},fail:function(a){this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a);return this}};d.serializeArray=function(){var a=[];h.apply(function(b,c){a.push({name:b,value:c})},arguments);return a};d.serialize=function(){if(0===arguments.length)return"";var a,b=Array.prototype.slice.call(arguments,0);(a=b.pop())&&a.nodeType&&
b.push(a)&&(a=null);a&&(a=a.type);return("map"==a?r:"array"==a?d.serializeArray:u).apply(null,b)};d.toQueryString=function(a,b){var c,d=b||!1,e=[],f=encodeURIComponent,g=function(a,b){b="function"===typeof b?b():null==b?"":b;e[e.length]=f(a)+"="+f(b)};if(v(a))for(c=0;a&&c<a.length;c++)g(a[c].name,a[c].value);else for(c in a)q(c,a[c],d,g);return e.join("&").replace(/%20/g,"+")};d.getcallbackPrefix=function(){return L};d.compat=function(a,b){a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&
(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp));return new c(a,b)};d.ajaxSetup=function(a){a=a||{};for(var b in a)D[b]=a[b]};return d};"undefined"!=typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd?define(b):this.reqwest=b();!0};e.lib__reqwest=function(){null===b&&(b=u());return b};window.modules=e})();
(function(){var e=window.modules||[];window.require=function(b){b=b.replace(/\//g,"__");-1===b.indexOf("__")&&(b="__"+b);return null===e[b]?null:e[b]()}})();

