(function(){var d=window.modules||[],b=null;d.leonidas__client=function(){null===b&&(b=function(b,f,h,a,c){this.id=b;this.appName=f;this.state=null!=h?h:{};this.appType=null!=a?a:"";null==c&&(c=null);if(null==this.id)throw Error("Client Id is required");if(null==this.appName)throw Error("App Name is required");this.lastUpdate=null!=c?c:0});return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commander=function(){if(null===b){var d,f,h,a;d=require("leonidas/commands/command");f=require("leonidas/commands/organizer");h=require("leonidas/commands/processor");a=require("leonidas/commands/synchronizer");var c=function(e,a,c,b){this.client=e;this.organizer=a;this.processor=c;this.synchronizer=b};c.create=function(e,c,k){var b;b=new f;c=new h(c);k=new a(k,e,b,c);return new this(e,b,c,k)};c.prototype.startSync=function(a,c){null==a&&(a=
1E3);null==c&&(c=5E3);this.pushInterval=setInterval(this.synchronizer.push,a);return this.pullInterval=setInterval(this.synchronizer.pull,c)};c.prototype.stopSync=function(){clearInterval(this.pushInterval);return clearInterval(this.pullInterval)};c.prototype.forceSync=function(){this.synchronizer.push();return this.synchronizer.pull()};c.prototype.issueCommand=function(a,c){var k;k=new d(a,c,this.client.id);this.organizer.local.addCommand(k);return this.processor.runCommand(k)};b=c}return b};window.modules=
d})();(function(){var d=window.modules||[],b=null;d.leonidas__commands__command=function(){if(null===b){var d=function(b,h,a,c,e){this.name=b;this.data=h;this.clientId=a;null==c&&(c=null);this.id=null!=e?e:null;this.timestamp=null!=c?c:new Date};d.prototype.toHash=function(){return{id:this.id,name:this.name,data:this.data,clientId:this.clientId,timestamp:this.timestamp.getTime()}};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__command_list=function(){if(null===b){var d=[].indexOf||function(a){for(var c=0,e=this.length;c<e;c++)if(c in this&&this[c]===a)return c;return-1},f=function(){this.commands=[]},h;f.prototype.addCommand=function(a){null==a.id&&(a.id=h(this.commands));return this.commands.push(a)};f.prototype.addCommands=function(a){var c,e,g,k;k=[];e=0;for(g=a.length;e<g;e++)c=a[e],k.push(this.addCommand(c));return k};f.prototype.commandsThrough=function(a){var c,
e,g,k,b;k=this.commands;b=[];e=0;for(g=k.length;e<g;e++)c=k[e],c.timestamp<=a&&b.push(c);return b};f.prototype.commandsSince=function(a){var c,e,g,b,f;b=this.commands;f=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.timestamp>a&&f.push(c);return f};h=function(a){c;for(var c,e;0<=d.call(function(){var c,b,f;f=[];c=0;for(b=a.length;c<b;c++)e=a[c],f.push(e.id);return f}(),c);)c=""+(new Date).getTime()+"-"+a.length;return c};b=f}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__handler=function(){if(null===b){var d=function(){};d.prototype.handles=function(b){return b.name===this.name};d.prototype.run=function(){throw Error("Every CommandHandler should override #run.");};d.prototype.rollback=function(){throw Error("Every CommandHandler should override #rollback.");};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__organizer=function(){if(null===b){var d;d=require("leonidas/commands/command_list");var f=function(){this.local=new d;this.external=new d};f.prototype.commandsThrough=function(b){var a,c,e,g,f;g=this.allCommands();f=[];c=0;for(e=g.length;c<e;c++)a=g[c],a.timestamp<=b&&f.push(a);return f};f.prototype.commandsSince=function(b){var a,c,e,g,f;g=this.allCommands();f=[];c=0;for(e=g.length;c<e;c++)a=g[c],a.timestamp>b&&f.push(a);return f};
f.prototype.allCommands=function(){var b,a,c,e,g;e=this.local.commands;g=[];a=0;for(c=e.length;a<c;a++)b=e[a],g.push(b);e=this.external.commands;a=0;for(c=e.length;a<c;a++)b=e[a],g.push(b);return g};f.prototype.commandsFor=function(b,a){var c,e,g,f,d;null==a&&(a=null);null==a&&(a=new Date(0));f=this.commandsSince(a);d=[];e=0;for(g=f.length;e<g;e++)c=f[e],c.clientId===b&&d.push(c);return d};b=f}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__processor=function(){if(null===b){var d=function(b){this.handlers=b};d.prototype.runCommand=function(b){var d,a,c,e,g;e=this.handlers;g=[];a=0;for(c=e.length;a<c;a++)d=e[a],d.handles(b)?g.push(d.run(b)):g.push(void 0);return g};d.prototype.runCommands=function(b){var d,a,c,e;b.sort(function(c,a){return c.timestamp>a.timestamp?1:-1});e=[];a=0;for(c=b.length;a<c;a++)d=b[a],e.push(this.runCommand(d));return e};d.prototype.rollbackCommand=
function(b){var d,a,c,e,g;e=this.handlers;g=[];a=0;for(c=e.length;a<c;a++)d=e[a],d.handles(b)?g.push(d.rollback(b)):g.push(void 0);return g};d.prototype.rollbackCommands=function(b){var d,a,c,e;b.sort(function(c,a){return c.timestamp<a.timestamp?1:-1});e=[];a=0;for(c=b.length;a<c;a++)d=b[a],e.push(this.rollbackCommand(d));return e};b=d}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null;d.leonidas__commands__synchronizer=function(){if(null===b){var d,f=function(a,c){return function(){return a.apply(c,arguments)}};require("lib/reqwest");d=require("leonidas/commands/command");var h=function(a,c,e,b){this.syncUrl=a;this.client=c;this.organizer=e;this.processor=b;this.reconcile=f(this.reconcile,this);this.push=f(this.push,this);this.pull=f(this.pull,this);this.stableTimestamp=0;this.externalClients=[];this.lastPushAttempt=0};h.prototype.pull=
function(){var a=this;return reqwest({url:""+this.syncUrl,type:"json",method:"get",data:{appName:this.client.appName,clientId:this.client.id,clients:this.externalClients},error:function(){return console.log("pull error")},success:function(c){var e;if(c.success){var b,f,w,h;w=c.data.commands;h=[];b=0;for(f=w.length;b<f;b++)e=w[b],h.push(new d(e.name,e.data,e.connection,new Date(e.timestamp),e.id));a.processor.rollbackCommands(a.organizer.commandsSince(a.stableTimestamp));a.organizer.external.addCommands(h);
a.processor.runCommands(a.organizer.commandsSince(a.stableTimestamp));a.externalClients=c.data.currentClients;return a.stableTimestamp=c.data.stableTimestamp}if("reconcile required"===c.message&&null==a.reconcileTimeout)return a.reconcileTimeout=setTimeout(a.reconcile,1E3)}})};h.prototype.push=function(){var a,c=this,b,d,f,h;f=this.organizer.local.commandsSince(this.client.lastUpdate);h=[];b=0;for(d=f.length;b<d;b++)a=f[b],h.push(a);if(0!==h.length){this.lastPushAttempt=(new Date).valueOf();b=reqwest;
d=""+this.syncUrl;f=this.client.appName;var s=this.client.id,m=this.lastPushAttempt,t,u,x;x=[];t=0;for(u=h.length;t<u;t++)a=h[t],x.push(a.toHash());return b({url:d,type:"json",method:"post",data:{appName:f,clientId:s,pushedAt:m,commands:x},error:function(){return console.log("push error")},success:function(a){if(a.success)return c.client.lastUpdate=c.lastPushAttempt;if("reconcile required"===a.message&&null==c.reconcileTimeout)return c.reconcileTimeout=setTimeout(c.reconcile,1E3)}})}};h.prototype.reconcile=
function(){var a,c,b,d,f,h,s=this;c={};b=this.client.id;var m;h=this.organizer.local.commands;m=[];d=0;for(f=h.length;d<f;d++)a=h[d],m.push(a.toHash());c[b]=m;h=this.externalClients;d=0;for(f=h.length;d<f;d++){a=h[d];b=this.organizer.commandsFor(a.id);m=c;for(var t=""+a.id,u=void 0,x=void 0,z=void 0,z=[],u=0,x=b.length;u<x;u++)a=b[u],z.push(a.toHash());m[t]=z}return reqwest({url:""+this.syncUrl+"/reconcile",type:"json",method:"post",data:{appName:this.client.appName,appType:this.client.appType,clientId:this.client.id,
clients:this.externalClients,commandList:c,stableTimestamp:this.stableTimestamp},error:function(){return console.log("reconcile error")},success:function(a){if(a.success)return clearInterval(s.reconcileTimeout),s.reconcileTimeout=null;if("reconcile required"===a.message)return s.reconcileTimeout=setTimeout(s.reconcile,1E3)}})};b=h}return b};window.modules=d})();
(function(){var d=window.modules||[],b=null,E=function(){var b=function(){function b(a){B=a}function a(a,b){this.o=a;this.fn=b;c.apply(this,arguments)}function c(a,c){function f(b){a.timeout&&clearTimeout(p.timeout);for(p.timeout=null;0<p._completeHandlers.length;)p._completeHandlers.shift()(b)}function g(a,b,c){p._responseArgs.resp=a;p._responseArgs.msg=b;p._responseArgs.t=c;for(p._erred=!0;0<p._errorHandlers.length;)p._errorHandlers.shift()(a,b,c);f(a)}this.url="string"==typeof a?a:a.url;this.timeout=
null;this._fulfilled=!1;this._fulfillmentHandlers=[];this._errorHandlers=[];this._completeHandlers=[];this._erred=!1;this._responseArgs={};var p=this,r;if(!(r=a.type))r=(r=this.url.match(/\.(json|jsonp|html|xml)(\?|$)/))?r[1]:"js";var k=r;c=c||function(){};a.timeout&&(this.timeout=setTimeout(function(){p.abort()},a.timeout));a.success&&this._fulfillmentHandlers.push(function(){a.success.apply(a,arguments)});a.error&&this._errorHandlers.push(function(){a.error.apply(a,arguments)});a.complete&&this._completeHandlers.push(function(){a.complete.apply(a,
arguments)});var q;var t=function(a){var b=H.dataFilter(a.responseText,k);if(b=a.responseText=b)switch(k){case "json":try{a=u.JSON?u.JSON.parse(b):eval("("+b+")")}catch(d){return g(a,"Could not parse JSON in response",d)}break;case "js":a=eval(b);break;case "html":a=b;break;case "xml":a=a.responseXML&&a.responseXML.parseError&&a.responseXML.parseError.errorCode&&a.responseXML.parseError.reason?null:a.responseXML}p._responseArgs.resp=a;p._fulfilled=!0;for(c(a);0<p._fulfillmentHandlers.length;)p._fulfillmentHandlers.shift()(a);
f(a)},j=this.o,n=(j.method||"GET").toUpperCase(),m="string"===typeof j?j:j.url;r=!1!==j.processData&&j.data&&"string"!==typeof j.data?d.toQueryString(j.data):j.data||null;var v;if(("jsonp"==j.type||"GET"==n)&&r)m=m+(/\?/.test(m)?"&":"?")+r,r=null;if("jsonp"==j.type){q=m;r=E++;v=j.jsonpCallback||"callback";var n=j.jsonpCallbackName||d.getcallbackPrefix(r),m=RegExp("((^|\\?|&)"+v+")=([^&]+)"),s=q.match(m),l=x.createElement("script"),w=0,A=-1!==navigator.userAgent.indexOf("MSIE 10.0");s?"?"===s[3]?q=
q.replace(m,"$1="+n):n=s[3]:q=q+(/\?/.test(q)?"&":"?")+(v+"="+n);u[n]=b;l.type="text/javascript";l.src=q;l.async=!0;"undefined"!==typeof l.onreadystatechange&&!A&&(l.event="onclick",l.htmlFor=l.id="_reqwest_"+r);l.onload=l.onreadystatechange=function(){if(l[C]&&"complete"!==l[C]&&"loaded"!==l[C]||w)return!1;l.onload=l.onreadystatechange=null;l.onclick&&l.onclick();j.success&&j.success(B);B=void 0;F.removeChild(l);w=1};F.appendChild(l);q={abort:function(){l.onload=l.onreadystatechange=null;j.error&&
j.error({},"Request is aborted: timeout",{});B=void 0;F.removeChild(l);w=1}}}else{v=K();v.open(n,m,!0);n=j.headers||{};n.Accept=n.Accept||D.accept[j.type]||D.accept["*"];!j.crossOrigin&&!n[I]&&(n[I]=D.requestedWith);n[J]||(n[J]=j.contentType||D.contentType);for(q in n)n.hasOwnProperty(q)&&v.setRequestHeader(q,n[q]);"undefined"!==typeof j.withCredentials&&"undefined"!==typeof v.withCredentials&&(v.withCredentials=!!j.withCredentials);var y=this;v.onreadystatechange=function(){if(y._aborted)return g(y.request);
y.request&&4==y.request[C]&&(y.request.onreadystatechange=L,z.test(y.request.status)?t(y.request):g(y.request))};j.before&&j.before(v);v.send(r);q=v}this.request=q}function d(b,c){return new a(b,c)}function f(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function k(a,b){var c=a.name,d=a.tagName.toLowerCase(),e=function(a){a&&!a.disabled&&b(c,f(a.attributes.value&&a.attributes.value.specified?a.value:a.text))},h;if(!a.disabled&&c)switch(d){case "input":/reset|button|image|file/i.test(a.type)||(e=/checkbox/i.test(a.type),
d=/radio/i.test(a.type),h=a.value,(!e&&!d||a.checked)&&b(c,f(e&&""===h?"on":h)));break;case "textarea":b(c,f(a.value));break;case "select":if("select-one"===a.type.toLowerCase())e(0<=a.selectedIndex?a.options[a.selectedIndex]:null);else for(d=0;a.length&&d<a.length;d++)a.options[d].selected&&e(a.options[d])}}function w(){var a,b;for(b=0;b<arguments.length;b++){a=arguments[b];/input|select|textarea/i.test(a.tagName)&&k(a,this);for(var c=["input","select","textarea"],d=void 0,e=void 0,f=void 0,d=0;d<
c.length;d++){f=a[G](c[d]);for(e=0;e<f.length;e++)k(f[e],this)}}}function s(){return d.toQueryString(d.serializeArray.apply(null,arguments))}function m(){var a={};w.apply(function(b,c){b in a?(a[b]&&!A(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments);return a}function t(a,b,c,d){var e,f,g=/\[\]$/;if(A(b))for(e=0;b&&e<b.length;e++)f=b[e],c||g.test(a)?d(a,f):t(a+"["+("object"===typeof f?e:"")+"]",f,c,d);else if("[object Object]"===b.toString())for(e in b)t(a+"["+e+"]",b[e],c,d);else d(a,b)}var u=
window,x=document,z=/^20\d$/,G="getElementsByTagName",C="readyState",J="Content-Type",I="X-Requested-With",F=x[G]("head")[0],E=0,M="reqwest_"+ +new Date,B,L=function(){},A="function"==typeof Array.isArray?Array.isArray:function(a){return a instanceof Array},D={contentType:"application/x-www-form-urlencoded",requestedWith:"XMLHttpRequest",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",
js:"application/javascript, text/javascript"}},K=u.XMLHttpRequest?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")},H={dataFilter:function(a){return a}};a.prototype={abort:function(){this._aborted=!0;this.request.abort()},retry:function(){c.call(this,this.o,this.fn)},then:function(a,b){this._fulfilled?a(this._responseArgs.resp):this._erred?b(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):(this._fulfillmentHandlers.push(a),this._errorHandlers.push(b));
return this},always:function(a){this._fulfilled||this._erred?a(this._responseArgs.resp):this._completeHandlers.push(a);return this},fail:function(a){this._erred?a(this._responseArgs.resp,this._responseArgs.msg,this._responseArgs.t):this._errorHandlers.push(a);return this}};d.serializeArray=function(){var a=[];w.apply(function(b,c){a.push({name:b,value:c})},arguments);return a};d.serialize=function(){if(0===arguments.length)return"";var a,b=Array.prototype.slice.call(arguments,0);(a=b.pop())&&a.nodeType&&
b.push(a)&&(a=null);a&&(a=a.type);return("map"==a?m:"array"==a?d.serializeArray:s).apply(null,b)};d.toQueryString=function(a,b){var c,d=b||!1,e=[],f=encodeURIComponent,g=function(a,b){b="function"===typeof b?b():null==b?"":b;e[e.length]=f(a)+"="+f(b)};if(A(a))for(c=0;a&&c<a.length;c++)g(a[c].name,a[c].value);else for(c in a)t(c,a[c],d,g);return e.join("&").replace(/%20/g,"+")};d.getcallbackPrefix=function(){return M};d.compat=function(b,c){b&&(b.type&&(b.method=b.type)&&delete b.type,b.dataType&&
(b.type=b.dataType),b.jsonpCallback&&(b.jsonpCallbackName=b.jsonpCallback)&&delete b.jsonpCallback,b.jsonp&&(b.jsonpCallback=b.jsonp));return new a(b,c)};d.ajaxSetup=function(a){a=a||{};for(var b in a)H[b]=a[b]};return d};"undefined"!=typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd?define(b):this.reqwest=b();!0};d.lib__reqwest=function(){null===b&&(b=E());return b};window.modules=d})();
(function(){var d=window.modules||[];window.require=function(b){b=b.replace(/\//g,"__");-1===b.indexOf("__")&&(b="__"+b);return null===d[b]?null:d[b]()}})();

