(function(){var d=window.modules||[],b=null;d.leonidas__client=function(){null===b&&(b=function(b,h,j,a){this.id=b;this.appName=h;this.state=null!=j?j:{};null==a&&(a=null);if(null==this.id)throw Error("Client Id is required");if(null==this.appName)throw Error("App Name is required");this.lastUpdate=null!=a?a:new Date(0)});return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commander=function(){if(null===b){var d,h,j,a;d=require("leonidas/commands/command");h=require("leonidas/commands/organizer");j=require("leonidas/commands/processor");a=require("leonidas/commands/synchronizer");var c=function(a,c,g,b){this.client=a;this.organizer=c;this.processor=g;this.synchronizer=b};c.create=function(e,c,g){var b;b=new h;c=new j(c);g=new a(g,e,b,c);return new this(e,b,c,g)};c.prototype.startSync=function(a,c){null==a&&(a=
1E3);null==c&&(c=5E3);this.pushInterval=setInterval(this.synchronizer.push,a);return this.pullInterval=setInterval(this.synchronizer.pull,c)};c.prototype.stopSync=function(){clearInterval(this.pushInterval);return clearInterval(this.pullInterval)};c.prototype.forceSync=function(){this.synchronizer.push();return this.synchronizer.pull()};c.prototype.issueCommand=function(a,c){var g;g=new d(a,c,this.client.id);this.organizer.local.addCommand(g);return this.processor.runCommand(g)};b=c}return b};window.modules=
d})();(function(){var d=window.modules||[],b=null;d.leonidas__commands__command=function(){if(null===b){var d=function(b,j,a,c,e){this.name=b;this.data=j;this.clientId=a;null==c&&(c=null);this.id=null!=e?e:null;this.timestamp=null!=c?c:new Date};d.prototype.toHash=function(){return{id:this.id,name:this.name,data:this.data,clientId:this.clientId,timestamp:this.timestamp.getTime()}};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__command_list=function(){if(null===b){var d=[].indexOf||function(a){for(var c=0,e=this.length;c<e;c++)if(c in this&&this[c]===a)return c;return-1},h=function(){this.commands=[]},j;h.prototype.addCommand=function(a){null==a.id&&(a.id=j(this.commands));return this.commands.push(a)};h.prototype.addCommands=function(a){var c,e,f,g;g=[];e=0;for(f=a.length;e<f;e++)c=a[e],g.push(this.addCommand(c));return g};h.prototype.commandsThrough=function(a){var c,
e,f,g,b;g=this.commands;b=[];e=0;for(f=g.length;e<f;e++)c=g[e],c.timestamp<=a&&b.push(c);return b};h.prototype.commandsSince=function(a){var c,e,f,b,h;b=this.commands;h=[];e=0;for(f=b.length;e<f;e++)c=b[e],c.timestamp>a&&h.push(c);return h};j=function(a){c;for(var c,e;0<=d.call(function(){var c,b,h;h=[];c=0;for(b=a.length;c<b;c++)e=a[c],h.push(e.id);return h}(),c);)c=""+(new Date).getTime()+"-"+a.length;return c};b=h}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__handler=function(){if(null===b){var d=function(){};d.prototype.handles=function(b){return b.name===this.name};d.prototype.run=function(){throw Error("Every CommandHandler should override #run.");};d.prototype.rollback=function(){throw Error("Every CommandHandler should override #rollback.");};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__organizer=function(){if(null===b){var d;d=require("leonidas/commands/command_list");var h=function(){this.local=new d;this.external=new d};h.prototype.commandsThrough=function(b){var a,c,e,f,g;f=this.allCommands();g=[];c=0;for(e=f.length;c<e;c++)a=f[c],a.timestamp<=b&&g.push(a);return g};h.prototype.commandsSince=function(b){var a,c,e,f,g;f=this.allCommands();g=[];c=0;for(e=f.length;c<e;c++)a=f[c],a.timestamp>b&&g.push(a);return g};
h.prototype.allCommands=function(){var b,a,c,e,f;e=this.local.commands;f=[];a=0;for(c=e.length;a<c;a++)b=e[a],f.push(b);e=this.external.commands;a=0;for(c=e.length;a<c;a++)b=e[a],f.push(b);return f};h.prototype.commandsFor=function(b,a){var c,e,f,g,h;null==a&&(a=null);null==a&&(a=new Date(0));g=this.commandsSince(a);h=[];e=0;for(f=g.length;e<f;e++)c=g[e],c.clientId===b&&h.push(c);return h};b=h}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__processor=function(){if(null===b){var d=function(b){this.handlers=b};d.prototype.runCommand=function(b){var d,a,c,e,f;e=this.handlers;f=[];a=0;for(c=e.length;a<c;a++)d=e[a],d.handles(b)?f.push(d.run(b)):f.push(void 0);return f};d.prototype.runCommands=function(b){var d,a,c,e;b.sort(function(a,c){return a.timestamp>c.timestamp?1:-1});e=[];a=0;for(c=b.length;a<c;a++)d=b[a],e.push(this.runCommand(d));return e};d.prototype.rollbackCommand=
function(b){var d,a,c,e,f;e=this.handlers;f=[];a=0;for(c=e.length;a<c;a++)d=e[a],d.handles(b)?f.push(d.rollback(b)):f.push(void 0);return f};d.prototype.rollbackCommands=function(b){var d,a,c,e;b.sort(function(a,c){return a.timestamp<c.timestamp?1:-1});e=[];a=0;for(c=b.length;a<c;a++)d=b[a],e.push(this.rollbackCommand(d));return e};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__synchronizer=function(){if(null===b){var d,h=function(a,c){return function(){return a.apply(c,arguments)}};require("lib/reqwest");d=require("leonidas/commands/command");var j=function(a,c,e,b){this.syncUrl=a;this.client=c;this.organizer=e;this.processor=b;this.reconcile=h(this.reconcile,this);this.pull=h(this.pull,this);this.push=h(this.push,this);this.stableTimestamp=new Date(0);this.externalClients=[]};j.prototype.push=function(){var a,
c=this,b,d,g,h;g=this.organizer.local.commandsSince(this.client.lastUpdate);h=[];b=0;for(d=g.length;b<d;b++)a=g[b],h.push(a);if(0!==h.length){b=reqwest;d=""+this.syncUrl;g=this.client.appName;var j=this.client.id,m=this.externalClients,q,r,u;u=[];q=0;for(r=h.length;q<r;q++)a=h[q],u.push(a.toHash());return b({url:d,type:"json",method:"post",data:{appName:g,clientId:j,clients:m,commands:u},error:function(){return console.log("push error")},success:function(b){var e;if(b.success)return e=Math.max.apply(c,
function(){var c,b,e;e=[];c=0;for(b=h.length;c<b;c++)a=h[c],e.push(a.timestamp);return e}()),c.client.lastUpdate=new Date(e),c.externalClients=b.data.currentClients;if("reconcile required"===b.message&&null==c.reconcileTimeout)return c.reconcileTimeout=setTimeout(c.reconcile,1E3)}})}};j.prototype.pull=function(){var a=this;return reqwest({url:""+this.syncUrl,type:"json",method:"get",data:{appName:this.client.appName,clientId:this.client.id,clients:this.externalClients},error:function(){return console.log("pull error")},
success:function(c){var b;if(c.success){var f,g,h,j;h=c.data.commands;j=[];f=0;for(g=h.length;f<g;f++)b=h[f],j.push(new d(b.name,b.data,b.connection,new Date(b.timestamp),b.id));a.processor.rollbackCommands(a.organizer.commandsSince(a.stableTimestamp));a.organizer.external.addCommands(j);a.processor.runCommands(a.organizer.commandsSince(a.stableTimestamp));a.externalClients=c.data.currentClients;return a.stableTimestamp=c.data.stableTimestamp}if("reconcile required"===c.message&&null==a.reconcileTimeout)return a.reconcileTimeout=
setTimeout(a.reconcile,1E3)}})};j.prototype.reconcile=function(){var a,b,e,d,h,j,t=this;b={};e=this.client.id;var m;j=this.organizer.local.commands;m=[];d=0;for(h=j.length;d<h;d++)a=j[d],m.push(a.toHash());b[e]=m;j=this.externalClients;d=0;for(h=j.length;d<h;d++){a=j[d];e=this.organizer.commandsFor(a.id);m=b;for(var q=""+a.id,r=void 0,u=void 0,x=void 0,x=[],r=0,u=e.length;r<u;r++)a=e[r],x.push(a.toHash());m[q]=x}return reqwest({url:""+this.syncUrl+"/reconcile",type:"json",method:"post",data:{appName:this.client.appName,
clientId:this.client.id,clients:this.externalClients,commandList:b,stableTimestamp:this.stableTimestamp},error:function(){return console.log("reconcile error")},success:function(b){if(b.success)return t.externalClients=b.data.currentClients,clearInterval(t.reconcileTimeout),t.reconcileTimeout=null;if("reconcile required"===b.message)return t.reconcileTimeout=setTimeout(t.reconcile,1E3)}})};b=j}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null,C=function(){var b=function(){function b(D){A=D}function a(b,a){this.o=b;this.fn=a;c.apply(this,arguments)}function c(a,c){function d(b){a.timeout&&clearTimeout(f.timeout);for(f.timeout=null;0<f._completeHandlers.length;)f._completeHandlers.shift()(b)}function h(a,b,c){f._responseArgs.resp=a;f._responseArgs.msg=b;f._responseArgs.t=c;for(f._erred=!0;0<f._errorHandlers.length;)f._errorHandlers.shift()(a,b,c);d(a)}this.url="string"==typeof a?a:a.url;this.timeout=
null;this._fulfilled=!1;this._fulfillmentHandlers=[];this._errorHandlers=[];this._completeHandlers=[];this._erred=!1;this._responseArgs={};var f=this,g;if(!(g=a.type))g=(g=this.url.match(/\.(json|jsonp|html|xml)(\?|$)/))?g[1]:"js";var I=g;c=c||function(){};a.timeout&&(this.timeout=setTimeout(function(){f.abort()},a.timeout));a.success&&this._fulfillmentHandlers.push(function(){a.success.apply(a,arguments)});a.error&&this._errorHandlers.push(function(){a.error.apply(a,arguments)});a.complete&&this._completeHandlers.push(function(){a.complete.apply(a,
arguments)});var p;var q=function(a){var b=J.dataFilter(a.responseText,I);if(b=a.responseText=b)switch(I){case "json":try{a=r.JSON?r.JSON.parse(b):eval("("+b+")")}catch(D){return h(a,"Could not parse JSON in response",D)}break;case "js":a=eval(b);break;case "html":a=b;break;case "xml":a=a.responseXML&&a.responseXML.parseError&&a.responseXML.parseError.errorCode&&a.responseXML.parseError.reason?null:a.responseXML}f._responseArgs.resp=a;f._fulfilled=!0;for(c(a);0<f._fulfillmentHandlers.length;)f._fulfillmentHandlers.shift()(a);
d(a)},k=this.o,n=(k.method||"GET").toUpperCase(),m="string"===typeof k?k:k.url;g=!1!==k.processData&&k.data&&"string"!==typeof k.data?e.toQueryString(k.data):k.data||null;var s;if(("jsonp"==k.type||"GET"==n)&&g)m=m+(/\?/.test(m)?"&":"?")+g,g=null;if("jsonp"==k.type){p=m;g=C++;s=k.jsonpCallback||"callback";var n=k.jsonpCallbackName||e.getcallbackPrefix(g),m=RegExp("((^|\\?|&)"+s+")=([^&]+)"),t=p.match(m),l=u.createElement("script"),w=0,y=-1!==navigator.userAgent.indexOf("MSIE 10.0");t?"?"===t[3]?p=
p.replace(m,"$1="+n):n=t[3]:p=p+(/\?/.test(p)?"&":"?")+(s+"="+n);r[n]=b;l.type="text/javascript";l.src=p;l.async=!0;"undefined"!==typeof l.onreadystatechange&&!y&&(l.event="onclick",l.htmlFor=l.id="_reqwest_"+g);l.onload=l.onreadystatechange=function(){if(l[z]&&"complete"!==l[z]&&"loaded"!==l[z]||w)return!1;l.onload=l.onreadystatechange=null;l.onclick&&l.onclick();k.success&&k.success(A);A=void 0;E.removeChild(l);w=1};E.appendChild(l);p={abort:function(){l.onload=l.onreadystatechange=null;k.error&&
k.error({},"Request is aborted: timeout",{});A=void 0;E.removeChild(l);w=1}}}else{s=K();s.open(n,m,!0);n=k.headers||{};n.Accept=n.Accept||B.accept[k.type]||B.accept["*"];!k.crossOrigin&&!n[H]&&(n[H]=B.requestedWith);n[G]||(n[G]=k.contentType||B.contentType);for(p in n)n.hasOwnProperty(p)&&s.setRequestHeader(p,n[p]);"undefined"!==typeof k.withCredentials&&"undefined"!==typeof s.withCredentials&&(s.withCredentials=!!k.withCredentials);var v=this;s.onreadystatechange=function(){if(v._aborted)return h(v.request);
v.request&&4==v.request[z]&&(v.request.onreadystatechange=L,x.test(v.request.status)?q(v.request):h(v.request))};k.before&&k.before(s);s.send(g);p=s}this.request=p}function e(b,c){return new a(b,c)}function d(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function h(a,b){var c=a.name,e=a.tagName.toLowerCase(),g=function(a){a&&!a.disabled&&b(c,d(a.attributes.value&&a.attributes.value.specified?a.value:a.text))},j;if(!a.disabled&&c)switch(e){case "input":/reset|button|image|file/i.test(a.type)||(g=/checkbox/i.test(a.type),
e=/radio/i.test(a.type),j=a.value,(!g&&!e||a.checked)&&b(c,d(g&&""===j?"on":j)));break;case "textarea":b(c,d(a.value));break;case "select":if("select-one"===a.type.toLowerCase())g(0<=a.selectedIndex?a.options[a.selectedIndex]:null);else for(e=0;a.length&&e<a.length;e++)a.options[e].selected&&g(a.options[e])}}function y(){var a,b;for(b=0;b<arguments.length;b++){a=arguments[b];/input|select|textarea/i.test(a.tagName)&&h(a,this);for(var c=["input","select","textarea"],e=void 0,d=void 0,f=void 0,e=0;e<
c.length;e++){f=a[F](c[e]);for(d=0;d<f.length;d++)h(f[d],this)}}}function t(){return e.toQueryString(e.serializeArray.apply(null,arguments))}function m(){var a={};y.apply(function(b,c){b in a?(a[b]&&!w(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments);return a}function q(a,b,c,e){var d,f,g=/\[\]$/;if(w(b))for(d=0;b&&d<b.length;d++)f=b[d],c||g.test(a)?e(a,f):q(a+"["+("object"===typeof f?d:"")+"]",f,c,e);else if("[object Object]"===b.toString())for(d in b)q(a+"["+d+"]",b[d],c,e);else e(a,b)}var r=
window,u=document,x=/^20\d$/,F="getElementsByTagName",z="readyState",G="Content-Type",H="X-Requested-With",E=u[F]("head")[0],C=0,M="reqwest_"+ +new Date,A,L=function(){},w="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},B={contentType:"application/x-www-form-urlencoded",requestedWith:"XMLHttpRequest",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",
js:"application/javascript, text/javascript"}},K=r.XMLHttpRequest?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")},J={dataFilter:function(a){return a}};a.prototype={abort:function(){this._aborted=!0;this.request.abort()},retry:function(){c.call(this,this.o,this.fn)},then:function(a,b){this._fulfilled?a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b));
return this},always:function(a){this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a);return this},fail:function(a){this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a);return this}};e.serializeArray=function(){var a=[];y.apply(function(b,c){a.push({name:b,value:c})},arguments);return a};e.serialize=function(){if(0===arguments.length)return"";var a,b=Array.prototype.slice.call(arguments,0);(a=b.pop())&&a.nodeType&&
b.push(a)&&(a=null);a&&(a=a.type);return("map"==a?m:"array"==a?e.serializeArray:t).apply(null,b)};e.toQueryString=function(a,b){var c,e=b||!1,d=[],f=encodeURIComponent,g=function(a,b){b="function"===typeof b?b():null==b?"":b;d[d.length]=f(a)+"="+f(b)};if(w(a))for(c=0;a&&c<a.length;c++)g(a[c].name,a[c].value);else for(c in a)q(c,a[c],e,g);return d.join("&").replace(/%20/g,"+")};e.getcallbackPrefix=function(){return M};e.compat=function(b,c){b&&(b.type&&(b.method=b.type)&&delete b.type,b.dataType&&
(b.type=b.dataType),b.jsonpCallback&&(b.jsonpCallbackName=b.jsonpCallback)&&delete b.jsonpCallback,b.jsonp&&(b.jsonpCallback=b.jsonp));return new a(b,c)};e.ajaxSetup=function(a){a=a||{};for(var b in a)J[b]=a[b]};return e};"undefined"!=typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd?define(b):this.reqwest=b();!0};d.lib__reqwest=function(){null===b&&(b=C());return b};window.modules=d})();
(function(){var d=window.modules||[];window.require=function(b){b=b.replace(/\//g,"__");-1===b.indexOf("__")&&(b="__"+b);return null===d[b]?null:d[b]()}})();

