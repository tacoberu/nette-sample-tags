/*! netteForms.js | (c) 2004, 2020 David Grudl (https://davidgrudl.com) */
(function(n,u){if(n.JSON)if("function"===typeof define&&define.amd)define(function(){return u(n)});else if("object"===typeof module&&"object"===typeof module.exports)module.exports=u(n);else{var d=!n.Nette||!n.Nette.noInit;n.Nette=u(n);d&&n.Nette.initOnLoad()}})("undefined"!==typeof window?window:this,function(n){function u(a){return function(b){return a.call(this,b)}}var d={formErrors:[],version:"2.4",addEvent:function(a,b,c){"DOMContentLoaded"===b&&"loading"!==a.readyState?c.call(this):a.addEventListener?
a.addEventListener(b,c):"DOMContentLoaded"===b?a.attachEvent("onreadystatechange",function(){"complete"===a.readyState&&c.call(this)}):a.attachEvent("on"+b,u(c))},getValue:function(a){var b;if(a){if(a.tagName){if("radio"===a.type){var c=a.form.elements;for(b=0;b<c.length;b++)if(c[b].name===a.name&&c[b].checked)return c[b].value;return null}if("file"===a.type)return a.files||a.value;if("select"===a.tagName.toLowerCase()){b=a.selectedIndex;c=a.options;var e=[];if("select-one"===a.type)return 0>b?null:
c[b].value;for(b=0;b<c.length;b++)c[b].selected&&e.push(c[b].value);return e}if(a.name&&a.name.match(/\[\]$/)){c=a.form.elements[a.name].tagName?[a]:a.form.elements[a.name];e=[];for(b=0;b<c.length;b++)("checkbox"!==c[b].type||c[b].checked)&&e.push(c[b].value);return e}return"checkbox"===a.type?a.checked:"textarea"===a.tagName.toLowerCase()?a.value.replace("\r",""):a.value.replace("\r","").replace(/^\s+|\s+$/g,"")}return a[0]?d.getValue(a[0]):null}return null},getEffectiveValue:function(a){var b=d.getValue(a);
a.getAttribute&&b===a.getAttribute("data-nette-empty-value")&&(b="");return b},validateControl:function(a,b,c,e,f){a=a.tagName?a:a[0];b=b||d.parseJSON(a.getAttribute("data-nette-rules"));e=void 0===e?{value:d.getEffectiveValue(a)}:e;for(var h=0,k=b.length;h<k;h++){var g=b[h],l=g.op.match(/(~)?([^?]+)/),q=g.control?a.form.elements.namedItem(g.control):a;g.neg=l[1];g.op=l[2];g.condition=!!g.rules;if(q)if("optional"===g.op)f=!d.validateRule(a,":filled",null,e);else if(!f||g.condition||":filled"===g.op)if(q=
q.tagName?q:q[0],l=a===q?e:{value:d.getEffectiveValue(q)},l=d.validateRule(q,g.op,g.arg,l),null!==l)if(g.neg&&(l=!l),g.condition&&l){if(!d.validateControl(a,g.rules,c,e,":blank"===g.op?!1:f))return!1}else if(!g.condition&&!l&&!d.isDisabled(q)){if(!c){var w=d.isArray(g.arg)?g.arg:[g.arg];b=g.msg.replace(/%(value|\d+)/g,function(p,r){return d.getValue("value"===r?q:a.form.elements.namedItem(w[r].control))});d.addError(q,b)}return!1}}return"number"!==a.type||a.validity.valid?!0:(c||d.addError(a,"Please enter a valid value."),
!1)},validateForm:function(a,b){var c=a.form||a,e=!1;d.formErrors=[];if(c["nette-submittedBy"]&&null!==c["nette-submittedBy"].getAttribute("formnovalidate"))if(e=d.parseJSON(c["nette-submittedBy"].getAttribute("data-nette-validation-scope")),e.length)e=new RegExp("^("+e.join("-|")+"-)");else return d.showFormErrors(c,[]),!0;var f={},h;for(h=0;h<c.elements.length;h++){var k=c.elements[h];if(!k.tagName||k.tagName.toLowerCase()in{input:1,select:1,textarea:1,button:1}){if("radio"===k.type){if(f[k.name])continue;
f[k.name]=!0}if(!(e&&!k.name.replace(/]\[|\[|]|$/g,"-").match(e)||d.isDisabled(k)||d.validateControl(k,null,b)||d.formErrors.length))return!1}}e=!d.formErrors.length;d.showFormErrors(c,d.formErrors);return e},isDisabled:function(a){if("radio"===a.type){for(var b=0,c=a.form.elements;b<c.length;b++)if(c[b].name===a.name&&!c[b].disabled)return!1;return!0}return a.disabled},addError:function(a,b){d.formErrors.push({element:a,message:b})},showFormErrors:function(a,b){for(var c=[],e,f=0;f<b.length;f++){var h=
b[f].element,k=b[f].message;d.inArray(c,k)||(c.push(k),!e&&h.focus&&(e=h))}c.length&&(alert(c.join("\n")),e&&e.focus())},expandRuleArgument:function(a,b){if(b&&b.control){var c=a.elements.namedItem(b.control),e={value:d.getEffectiveValue(c)};d.validateControl(c,null,!0,e);b=e.value}return b}},x=!1;d.validateRule=function(a,b,c,e){e=void 0===e?{value:d.getEffectiveValue(a)}:e;":"===b.charAt(0)&&(b=b.substr(1));b=b.replace("::","_");b=b.replace(/\\/g,"");var f=d.isArray(c)?c.slice(0):[c];if(!x){x=!0;
for(var h=0,k=f.length;h<k;h++)f[h]=d.expandRuleArgument(a.form,f[h]);x=!1}return d.validators[b]?d.validators[b](a,d.isArray(c)?f:f[0],e.value,e):null};d.validators={filled:function(a,b,c){return"number"===a.type&&a.validity.badInput?!0:""!==c&&!1!==c&&null!==c&&(!d.isArray(c)||!!c.length)&&(!n.FileList||!(c instanceof n.FileList)||c.length)},blank:function(a,b,c){return!d.validators.filled(a,b,c)},valid:function(a){return d.validateControl(a,null,!0)},equal:function(a,b,c){function e(g){return"number"===
typeof g||"string"===typeof g?""+g:!0===g?"1":""}if(void 0===b)return null;c=d.isArray(c)?c:[c];b=d.isArray(b)?b:[b];a=0;var f=c.length;a:for(;a<f;a++){for(var h=0,k=b.length;h<k;h++)if(e(c[a])===e(b[h]))continue a;return!1}return!0},notEqual:function(a,b,c){return void 0===b?null:!d.validators.equal(a,b,c)},minLength:function(a,b,c){if("number"===a.type){if(a.validity.tooShort)return!1;if(a.validity.badInput)return null}return c.length>=b},maxLength:function(a,b,c){if("number"===a.type){if(a.validity.tooLong)return!1;
if(a.validity.badInput)return null}return c.length<=b},length:function(a,b,c){if("number"===a.type){if(a.validity.tooShort||a.validity.tooLong)return!1;if(a.validity.badInput)return null}b=d.isArray(b)?b:[b,b];return(null===b[0]||c.length>=b[0])&&(null===b[1]||c.length<=b[1])},email:function(a,b,c){return/^("([ !#-[\]-~]|\\[ -~])+"|[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?$/i.test(c)},
url:function(a,b,c,e){/^[a-z\d+.-]+:/.test(c)||(c="http://"+c);return/^https?:\/\/((([-_0-9a-z\u00C0-\u02FF\u0370-\u1EFF]+\.)*[0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)?[a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF])?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-f:]{3,39}\])(:\d{1,5})?(\/\S*)?$/i.test(c)?(e.value=c,!0):!1},regexp:function(a,b,c){a="string"===typeof b?b.match(/^\/(.*)\/([imu]*)$/):
!1;try{return a&&(new RegExp(a[1],a[2].replace("u",""))).test(c)}catch(e){}},pattern:function(a,b,c,e,f){if("string"!==typeof b)return null;try{try{var h=new RegExp("^(?:"+b+")$",f?"ui":"u")}catch(k){h=new RegExp("^(?:"+b+")$",f?"i":"")}if(n.FileList&&c instanceof FileList){for(a=0;a<c.length;a++)if(!h.test(c[a].name))return!1;return!0}return h.test(c)}catch(k){}},patternCaseInsensitive:function(a,b,c){return d.validators.pattern(a,b,c,null,!0)},integer:function(a,b,c){return"number"===a.type&&a.validity.badInput?
!1:/^-?[0-9]+$/.test(c)},"float":function(a,b,c,e){if("number"===a.type&&a.validity.badInput)return!1;c=c.replace(/ +/g,"").replace(/,/g,".");return/^-?[0-9]*\.?[0-9]+$/.test(c)?(e.value=c,!0):!1},min:function(a,b,c){if("number"===a.type){if(a.validity.rangeUnderflow)return!1;if(a.validity.badInput)return null}return null===b||parseFloat(c)>=b},max:function(a,b,c){if("number"===a.type){if(a.validity.rangeOverflow)return!1;if(a.validity.badInput)return null}return null===b||parseFloat(c)<=b},range:function(a,
b,c){if("number"===a.type){if(a.validity.rangeUnderflow||a.validity.rangeOverflow)return!1;if(a.validity.badInput)return null}return d.isArray(b)?(null===b[0]||parseFloat(c)>=b[0])&&(null===b[1]||parseFloat(c)<=b[1]):null},submitted:function(a){return a.form["nette-submittedBy"]===a},fileSize:function(a,b,c){if(n.FileList)for(a=0;a<c.length;a++)if(c[a].size>b)return!1;return!0},image:function(a,b,c){if(n.FileList&&c instanceof n.FileList)for(a=0;a<c.length;a++)if((b=c[a].type)&&"image/gif"!==b&&"image/png"!==
b&&"image/jpeg"!==b)return!1;return!0},"static":function(a,b){return b}};d.toggleForm=function(a,b){var c;d.toggles={};for(c=0;c<a.elements.length;c++)a.elements[c].tagName.toLowerCase()in{input:1,select:1,textarea:1,button:1}&&d.toggleControl(a.elements[c],null,null,!b);for(c in d.toggles)d.toggle(c,d.toggles[c],b)};d.toggleControl=function(a,b,c,e,f){b=b||d.parseJSON(a.getAttribute("data-nette-rules"));f=void 0===f?{value:d.getEffectiveValue(a)}:f;for(var h=!1,k=[],g=function(){d.toggleForm(a.form,
a)},l,q=0,w=b.length;q<w;q++){var p=b[q],r=p.op.match(/(~)?([^?]+)/),m=p.control?a.form.elements.namedItem(p.control):a;if(m){l=c;if(!1!==c){p.neg=r[1];p.op=r[2];l=a===m?f:{value:d.getEffectiveValue(m)};l=d.validateRule(m,p.op,p.arg,l);if(null===l)continue;else p.neg&&(l=!l);p.rules||(c=l)}if(p.rules&&d.toggleControl(a,p.rules,l,e,f)||p.toggle){h=!0;if(e){r=!document.addEventListener;var y=m.tagName?m.name:m[0].name;m=m.tagName?m.form.elements:m;for(var t=0;t<m.length;t++)m[t].name!==y||d.inArray(k,
m[t])||(d.addEvent(m[t],r&&m[t].type in{checkbox:1,radio:1}?"click":"change",g),k.push(m[t]))}for(var v in p.toggle||[])Object.prototype.hasOwnProperty.call(p.toggle,v)&&(d.toggles[v]=d.toggles[v]||(p.toggle[v]?l:!l))}}}return h};d.parseJSON=function(a){return"{op"===(a||"").substr(0,3)?eval("["+a+"]"):JSON.parse(a||"[]")};d.toggle=function(a,b,c){if(a=document.getElementById(a))a.style.display=b?"":"none"};d.initForm=function(a){d.toggleForm(a);a.noValidate||(a.noValidate=!0,d.addEvent(a,"submit",
function(b){d.validateForm(a)||(b&&b.stopPropagation?(b.stopPropagation(),b.preventDefault()):n.event&&(event.cancelBubble=!0,event.returnValue=!1))}))};d.initOnLoad=function(){d.addEvent(document,"DOMContentLoaded",function(){for(var a=0;a<document.forms.length;a++)for(var b=document.forms[a],c=0;c<b.elements.length;c++)if(b.elements[c].getAttribute("data-nette-rules")){d.initForm(b);break}d.addEvent(document.body,"click",function(e){for(e=e.target||e.srcElement;e;){if(e.form&&e.type in{submit:1,
image:1}){e.form["nette-submittedBy"]=e;break}e=e.parentNode}})})};d.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};d.inArray=function(a,b){if([].indexOf)return-1<a.indexOf(b);for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1};d.webalize=function(a){a=a.toLowerCase();var b="",c;for(c=0;c<a.length;c++){var e=d.webalizeTable[a.charAt(c)];b+=e?e:a.charAt(c)}return b.replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")};d.webalizeTable={"\u00e1":"a","\u00e4":"a","\u010d":"c",
"\u010f":"d","\u00e9":"e","\u011b":"e","\u00ed":"i","\u013e":"l","\u0148":"n","\u00f3":"o","\u00f4":"o","\u0159":"r","\u0161":"s","\u0165":"t","\u00fa":"u","\u016f":"u","\u00fd":"y","\u017e":"z"};return d});
